const axios = require('axios');

const getMandiPrices = async (crop = 'all') => {
  try {
    // For MVP: Generate realistic market prices with trends
    
    const crops = ['grapes', 'onion', 'tomato'];
    const prices = {};
    
    // Market dynamics based on day of week and season
    const dayOfWeek = new Date().getDay(); // 0 Sunday, 6 Saturday
    const month = new Date().getMonth();
    
    // Weekend effect (prices slightly lower on Sunday/Monday)
    const weekendEffect = (dayOfWeek === 0 || dayOfWeek === 1) ? -150 : 50;
    
    for (const c of crops) {
      prices[c] = generateRealisticPriceData(c, month, weekendEffect);
    }
    
    // Add cross-crop relationships (if onion prices are high, tomato often follows)
    if (prices.onion.modalPrice > prices.onion.avgPrice * 1.2) {
      prices.tomato.modalPrice += 200; // Tomato prices also rise
    }
    
    return crop === 'all' ? prices : prices[crop];
    
  } catch (error) {
    console.error('Error generating mandi prices:', error);
    return getSamplePriceData(crop);
  }
};

const generateRealisticPriceData = (crop, month, weekendEffect) => {
  // Base price ranges with seasonal adjustments
  const baseRanges = {
    grapes: { 
      min: 2800, 
      max: 5800, 
      basePrice: 4200,
      seasonal: [0, 200, 500, 800, 600, 200, -100, -200, -100, 100, 300, 400] // Month-wise adjustment
    },
    onion: { 
      min: 1200, 
      max: 3200, 
      basePrice: 2000,
      seasonal: [100, 0, -100, -200, 100, 400, 700, 800, 600, 300, 200, 150]
    },
    tomato: { 
      min: 900, 
      max: 2500, 
      basePrice: 1500,
      seasonal: [200, 300, 400, 300, 200, 100, 0, -100, -50, 100, 200, 250]
    }
  };
  
  const base = baseRanges[crop];
  const seasonalAdjustment = base.seasonal[month] || 0;
  
  // Add randomness
  const randomVariation = Math.floor(Math.random() * 300) - 150;
  const trendStrength = Math.random() > 0.6 ? 1 : -1; // Random trend direction
  
  // Calculate current price
  let currentPrice = base.basePrice + seasonalAdjustment + weekendEffect + randomVariation;
  currentPrice = Math.max(base.min, Math.min(base.max, currentPrice));
  
  // Generate 7-day trend
  const trend = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Create realistic trend (gradual changes, not completely random)
    const dayFactor = i * (trendStrength * (Math.random() * 30));
    const dayRandom = Math.random() * 100 - 50;
    
    let dayPrice = currentPrice - dayFactor + dayRandom;
    dayPrice = Math.max(base.min, Math.min(base.max, dayPrice));
    
    trend.push({
      date: date.toISOString().split('T')[0],
      price: Math.round(dayPrice),
      day: date.toLocaleDateString('en-IN', { weekday: 'short' })
    });
  }
  
  // Calculate average of last 7 days
  const avgPrice = Math.round(trend.reduce((sum, day) => sum + day.price, 0) / trend.length);
  
  // Determine market sentiment
  const priceChange = ((currentPrice - trend[trend.length - 2]?.price) / trend[trend.length - 2]?.price * 100).toFixed(1);
  const sentiment = currentPrice > avgPrice ? 'bullish' : (currentPrice < avgPrice ? 'bearish' : 'stable');
  
  return {
    commodity: crop.charAt(0).toUpperCase() + crop.slice(1),
    mandi: 'Nashik APMC',
    district: 'Nashik',
    state: 'Maharashtra',
    minPrice: base.min,
    maxPrice: base.max,
    modalPrice: Math.round(currentPrice),
    avgPrice: avgPrice,
    arrival: Math.floor(Math.random() * 1500) + 500, // 500-2000 quintals
    arrivalUnit: 'Quintals',
    lastUpdated: new Date().toISOString(),
    trend: trend,
    priceChange: parseFloat(priceChange),
    marketSentiment: sentiment,
    benchmark: getBenchmarkAdvice(crop, currentPrice, avgPrice),
    suggestedAction: getMarketAction(currentPrice, avgPrice, base.min, base.max)
  };
};

const getBenchmarkAdvice = (crop, currentPrice, avgPrice) => {
  if (currentPrice > avgPrice * 1.15) {
    return `📈 ${crop} prices are 15% above average - excellent market`;
  } else if (currentPrice > avgPrice * 1.05) {
    return `📊 ${crop} prices are above average - good selling opportunity`;
  } else if (currentPrice < avgPrice * 0.85) {
    return `📉 ${crop} prices are low - consider storage if possible`;
  } else {
    return `⚖️ ${crop} prices are near average - stable market`;
  }
};

const getMarketAction = (currentPrice, avgPrice, min, max) => {
  if (currentPrice > max * 0.9) {
    return 'SELL NOW - Near peak price';
  } else if (currentPrice > avgPrice * 1.1) {
    return 'Good time to sell';
  } else if (currentPrice < min * 1.1) {
    return 'Wait for better prices';
  } else if (currentPrice < avgPrice * 0.9) {
    return 'Hold if possible';
  } else {
    return 'Market stable - can sell';
  }
};

const getSamplePriceData = (crop) => {
  const priceRanges = {
    grapes: { min: 3000, max: 5000, current: 4000 },
    onion: { min: 1500, max: 2500, current: 2000 },
    tomato: { min: 1000, max: 2000, current: 1500 }
  };
  
  const range = priceRanges[crop] || priceRanges.grapes;
  
  return {
    commodity: crop,
    mandi: 'Nashik APMC',
    minPrice: range.min,
    maxPrice: range.max,
    modalPrice: range.current,
    arrival: Math.floor(Math.random() * 1000) + 500,
    lastUpdated: new Date().toISOString(),
    trend: generateTrendData()
  };
};

const generateTrendData = () => {
  const trend = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    trend.push({
      date: date.toISOString().split('T')[0],
      price: Math.floor(Math.random() * 2000) + 2000
    });
  }
  return trend;
};

module.exports = { getMandiPrices };