// This will be expanded with actual ML models later
const getPlantingAdvice = (crop, weatherData, season) => {
  // Simple rule-based logic for now
  const recommendations = {
    grapes: {
      bestPlantingWindow: 'November - February',
      currentAdvice: checkPlantingConditions('grapes', weatherData),
      riskFactors: []
    },
    onion: {
      bestPlantingWindow: 'October - December',
      currentAdvice: checkPlantingConditions('onion', weatherData),
      riskFactors: []
    },
    tomato: {
      bestPlantingWindow: 'Throughout year (with irrigation)',
      currentAdvice: checkPlantingConditions('tomato', weatherData),
      riskFactors: []
    }
  };
  
  return recommendations[crop] || recommendations.grapes;
};

const getIrrigationAdvice = (crop, weatherData, soilMoisture = 50) => {
  const temp = weatherData.temperature.current;
  const rainProb = weatherData.rainfall.probability;
  
  let advice = '';
  let status = 'Safe';
  
  if (rainProb > 70) {
    advice = 'No irrigation needed - rain expected';
    status = 'Safe';
  } else if (temp > 35) {
    advice = 'Critical - Irrigate immediately';
    status = 'Critical';
  } else if (soilMoisture < 30) {
    advice = 'Irrigate today - soil moisture low';
    status = 'Warning';
  } else {
    advice = 'Soil moisture adequate - no irrigation needed';
    status = 'Safe';
  }
  
  return {
    advice,
    status,
    soilMoisture,
    nextIrrigation: soilMoisture < 40 ? 'Today' : 'In 2-3 days'
  };
};

const getHarvestAdvice = (crop, priceData) => {
  const currentPrice = priceData.modalPrice;
  const avgPrice = priceData.trend.reduce((sum, day) => sum + day.price, 0) / priceData.trend.length;
  const priceTrend = currentPrice > avgPrice ? 'rising' : 'falling';
  
  let advice = '';
  let bestTime = '';
  
  if (priceTrend === 'rising') {
    advice = 'Wait for better prices - market is rising';
    bestTime = 'Next 3-5 days';
  } else if (currentPrice < avgPrice * 0.8) {
    advice = 'Consider storing - prices too low';
    bestTime = 'Wait 1 week';
  } else {
    advice = 'Good time to sell - current prices are favorable';
    bestTime = 'Today/Tomorrow';
  }
  
  return {
    advice,
    bestTime,
    currentPrice,
    avgPrice,
    trend: priceTrend
  };
};

const checkPlantingConditions = (crop, weather) => {
  const temp = weather.temperature.current;
  const rainProb = weather.rainfall.probability;
  
  if (temp > 35) return 'Delay planting - too hot';
  if (rainProb > 60) return 'Good time to plant - rain expected';
  if (temp >= 20 && temp <= 30) return 'Ideal planting conditions';
  return 'Conditions are moderate for planting';
};

module.exports = {
  getPlantingAdvice,
  getIrrigationAdvice,
  getHarvestAdvice
};