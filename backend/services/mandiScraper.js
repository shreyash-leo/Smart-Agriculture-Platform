const axios = require('axios');

const getMandiPrices = async (crop = 'all') => {
  try {
    // Agmarknet API endpoint (you might need to register for API access)
    // For now, we'll use sample data
    
    const crops = ['grapes', 'onion', 'tomato'];
    const prices = {};
    
    for (const c of crops) {
      // You can use this URL structure (check actual Agmarknet API docs)
      // const response = await axios.get(`https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${process.env.AGMARKET_API_KEY}&format=json&filters[commodity]=${c}`);
      
      prices[c] = getSamplePriceData(c);
    }
    
    return crop === 'all' ? prices : prices[crop];
  } catch (error) {
    console.error('Error fetching mandi prices:', error);
    return getSamplePriceData(crop);
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
    arrival: Math.floor(Math.random() * 1000) + 500, // random arrival quantity
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