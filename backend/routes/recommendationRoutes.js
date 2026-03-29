// backend/routes/recommendationRoutes.js
const express = require('express');
const router = express.Router();

// Planting advice
router.post('/planting', (req, res) => {
  const { crop, taluka } = req.body;
  
  const advice = {
    grapes: {
      shouldPlant: true,
      daysToWait: 0,
      message: 'Ideal time for grape planting in ' + taluka,
      reason: 'Weather conditions are optimal'
    },
    onions: {
      shouldPlant: false,
      daysToWait: 5,
      message: 'Wait for better conditions',
      reason: 'High temperature expected'
    },
    tomatoes: {
      shouldPlant: true,
      daysToWait: 0,
      message: 'Good time for tomato planting',
      reason: 'Soil moisture adequate'
    }
  };
  
  res.json(advice[crop] || advice.grapes);
});

// Irrigation advice
router.post('/irrigation', (req, res) => {
  const { crop, taluka, soilMoisture = 50 } = req.body;
  
  const shouldIrrigate = soilMoisture < 45;
  
  res.json({
    shouldIrrigate,
    duration: shouldIrrigate ? 30 : 0,
    currentMoisture: soilMoisture,
    requiredMoisture: 70,
    evapotranspiration: 5,
    windSpeed: 12,
    bestTime: shouldIrrigate ? 'Morning 6-8 AM' : 'Not needed today'
  });
});

// Harvest advice
router.post('/harvest', (req, res) => {
  const { crop } = req.body;
  
  res.json({
    advice: 'Prices are good for ' + crop,
    bestTime: 'This week',
    confidence: 'High',
    currentPrice: 4000,
    avgPrice: 3800,
    trend: 'up',
    momentum: 5.2
  });
});

module.exports = router;