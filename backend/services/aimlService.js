// This will be expanded with actual ML models later
const getPlantingAdvice = (crop, weatherData, season) => {
  // Simple rule-based logic for now
  const recommendations = {
    grapes: {
      bestPlantingWindow: 'November - February',
      currentAdvice: checkPlantingConditions('grapes', weatherData),
      riskFactors: getRiskFactors('grapes', weatherData),
      soilPrep: 'Plough deeply, add organic matter. Ensure drainage channels.',
      varieties: 'Thompson Seedless, Sonaka, Manik Chaman'
    },
    onion: {
      bestPlantingWindow: 'October - December',
      currentAdvice: checkPlantingConditions('onion', weatherData),
      riskFactors: getRiskFactors('onion', weatherData),
      soilPrep: 'Raised beds recommended. Add FYM 20 tonnes/ha.',
      varieties: 'Nasik Red, Agrifound Dark Red, Bhima Super'
    },
    tomato: {
      bestPlantingWindow: 'Throughout year (with irrigation)',
      currentAdvice: checkPlantingConditions('tomato', weatherData),
      riskFactors: getRiskFactors('tomato', weatherData),
      soilPrep: 'Well-drained loamy soil. Add compost and neem cake.',
      varieties: 'Vaishali, Abhinav, Arka Vikas'
    }
  };
  
  return recommendations[crop] || recommendations.grapes;
};

const getIrrigationAdvice = (crop, weatherData, soilMoisture = 50) => {
  const temp = weatherData.temperature.current;
  const rainProb = weatherData.rainfall.probability;
  const humidity = weatherData.humidity;
  const forecast = weatherData.forecast || [];
  
  let advice = '';
  let status = 'Safe';
  let waterAmount = '';
  let timing = '';
  
  // Check upcoming rain
  const rainNext3Days = forecast.slice(0, 3).some(day => day.rain > 60);
  
  if (rainProb > 70 || rainNext3Days) {
    advice = '🚱 No irrigation needed - significant rain expected soon';
    status = 'Safe';
    waterAmount = 'Skip irrigation';
    timing = 'Wait for rain';
  } else if (temp > 38) {
    advice = '🔥 CRITICAL - Heat wave! Irrigate immediately';
    status = 'Critical';
    waterAmount = 'Heavy irrigation (25-30mm)';
    timing = 'Immediately, preferably early morning';
  } else if (temp > 35) {
    advice = '⚠️ High temperature - Irrigate today';
    status = 'Warning';
    waterAmount = 'Normal irrigation (15-20mm)';
    timing = 'Today evening or tomorrow morning';
  } else if (soilMoisture < 25) {
    advice = '⚠️ Soil moisture very low - Urgent irrigation needed';
    status = 'Critical';
    waterAmount = 'Heavy irrigation (20-25mm)';
    timing = 'Within 24 hours';
  } else if (soilMoisture < 40) {
    advice = '💧 Soil moisture low - Schedule irrigation';
    status = 'Warning';
    waterAmount = 'Light irrigation (10-15mm)';
    timing = 'Next 1-2 days';
  } else if (humidity > 85 && crop === 'grapes') {
    advice = '💨 High humidity - Skip irrigation to prevent fungal diseases';
    status = 'Safe';
    waterAmount = 'No irrigation';
    timing = 'Wait for humidity to drop';
  } else {
    advice = '✅ Soil moisture adequate - No irrigation needed';
    status = 'Safe';
    waterAmount = 'No irrigation required';
    timing = 'Check again in 3-4 days';
  }
  
  // Crop-specific adjustments
  if (crop === 'grapes' && status === 'Safe' && soilMoisture < 45) {
    advice = '🍇 Grapes need consistent moisture - consider light irrigation';
    status = 'Caution';
  }
  
  return {
    advice,
    status,
    soilMoisture,
    waterAmount,
    timing,
    nextIrrigation: getNextIrrigationEstimate(soilMoisture, rainProb, temp),
    cropStage: getCropStageAdvice(crop, soilMoisture),
    basedOn: {
      temperature: temp,
      rainProbability: rainProb,
      humidity: humidity,
      forecast: rainNext3Days ? 'Rain expected' : 'No rain expected'
    }
  };
};

const getHarvestAdvice = (crop, priceData) => {
  const currentPrice = priceData.modalPrice;
  const avgPrice = priceData.avgPrice || priceData.trend.reduce((sum, day) => sum + day.price, 0) / priceData.trend.length;
  const trend = priceData.trend || [];
  
  // Calculate price momentum (last 3 days vs previous 3 days)
  const last3Days = trend.slice(-3).reduce((sum, day) => sum + day.price, 0) / 3;
  const prev3Days = trend.slice(-6, -3).reduce((sum, day) => sum + day.price, 0) / 3;
  const momentum = ((last3Days - prev3Days) / prev3Days * 100).toFixed(1);
  
  const priceTrend = currentPrice > avgPrice ? 'rising' : 'falling';
  const momentumDirection = momentum > 0 ? 'accelerating' : 'decelerating';
  
  let advice = '';
  let bestTime = '';
  let confidence = '';
  
  if (priceTrend === 'rising' && momentum > 5) {
    advice = '📈 Strong upward trend - Wait for better prices';
    bestTime = 'Next 5-7 days';
    confidence = 'High';
  } else if (priceTrend === 'rising') {
    advice = '📊 Market is rising - Consider waiting';
    bestTime = 'Next 3-5 days';
    confidence = 'Medium';
  } else if (currentPrice < avgPrice * 0.85) {
    advice = '📉 Prices too low - Store if possible';
    bestTime = 'Wait 1 week minimum';
    confidence = 'High - current prices are unfavorable';
  } else if (momentum < -5) {
    advice = '⬇️ Prices falling rapidly - Sell immediately';
    bestTime = 'Today/Tomorrow';
    confidence = 'High - to avoid further losses';
  } else {
    advice = '⚖️ Prices stable - Good time to sell';
    bestTime = 'Within this week';
    confidence = 'Medium';
  }
  
  return {
    advice,
    bestTime,
    confidence,
    currentPrice,
    avgPrice: Math.round(avgPrice),
    trend: priceTrend,
    momentum: parseFloat(momentum),
    priceDifference: currentPrice - Math.round(avgPrice),
    percentageDiff: ((currentPrice - avgPrice) / avgPrice * 100).toFixed(1),
    marketOutlook: getMarketOutlook(priceTrend, momentum),
    storageAdvice: getStorageAdvice(crop, currentPrice, avgPrice)
  };
};

const checkPlantingConditions = (crop, weather) => {
  const temp = weather.temperature.current;
  const rainProb = weather.rainfall.probability;
  const month = new Date().getMonth();
  
  // Ideal conditions by crop
  if (crop === 'grapes') {
    if (month >= 10 || month <= 1) return '✅ Ideal time for grape planting in Nashik';
    if (temp > 38) return '⚠️ Too hot for planting - wait for cooler weather';
    if (rainProb > 70) return '✅ Good time to plant - take advantage of rain';
  }
  
  if (crop === 'onion') {
    if (month >= 9 && month <= 11) return '✅ Perfect time for onion planting';
    if (temp > 35) return '⚠️ High temperature - ensure adequate irrigation';
  }
  
  if (temp > 38) return '❌ Delay planting - extreme heat';
  if (rainProb > 70) return '✅ Good time to plant - rain expected';
  if (temp >= 20 && temp <= 32) return '✅ Ideal planting conditions';
  return '⚠️ Conditions are moderate for planting';
};

const getRiskFactors = (crop, weather) => {
  const risks = [];
  const temp = weather.temperature.current;
  const rainProb = weather.rainfall.probability;
  const humidity = weather.humidity;
  
  if (crop === 'grapes' && humidity > 80) {
    risks.push('High risk of powdery mildew due to humidity');
  }
  if (crop === 'onion' && rainProb > 60) {
    risks.push('Risk of bulb rot in waterlogged conditions');
  }
  if (crop === 'tomato' && temp > 35) {
    risks.push('Flower drop possible due to high temperature');
  }
  if (rainProb > 70) {
    risks.push('Waterlogging risk - ensure drainage');
  }
  if (temp < 15) {
    risks.push('Cold damage possible for young plants');
  }
  
  return risks.length ? risks : ['No major risks identified'];
};

const getNextIrrigationEstimate = (soilMoisture, rainProb, temp) => {
  if (rainProb > 70) return 'No irrigation needed this week';
  if (soilMoisture < 30) return 'Immediately';
  if (soilMoisture < 45) return 'Within 2 days';
  if (temp > 35) return 'Within 3 days';
  return 'In 4-5 days';
};

const getCropStageAdvice = (crop, soilMoisture) => {
  const stages = {
    grapes: 'Flowering stage - consistent moisture critical',
    onion: 'Bulb formation stage - avoid water stress',
    tomato: 'Fruiting stage - regular water needed'
  };
  return stages[crop] || 'Maintain optimal moisture';
};

const getMarketOutlook = (trend, momentum) => {
  if (trend === 'rising' && momentum > 0) return 'Strong bullish - prices likely to increase further';
  if (trend === 'rising' && momentum < 0) return 'Bullish but slowing - may peak soon';
  if (trend === 'falling' && momentum < 0) return 'Strong bearish - prices still falling';
  if (trend === 'falling' && momentum > 0) return 'Bearish but recovering - watch closely';
  return 'Stable market - no major movements expected';
};

const getStorageAdvice = (crop, currentPrice, avgPrice) => {
  if (currentPrice < avgPrice * 0.8) {
    return `Store ${crop} for 2-3 weeks if you have cold storage`;
  }
  if (crop === 'onion' && currentPrice < avgPrice * 0.9) {
    return 'Onions can be stored for 2-3 months in proper conditions';
  }
  return 'No urgent need for storage';
};

module.exports = {
  getPlantingAdvice,
  getIrrigationAdvice,
  getHarvestAdvice
};