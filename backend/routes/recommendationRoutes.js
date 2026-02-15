const express = require('express');
const router = express.Router();
const { getWeatherData } = require('../services/weatherScraper');
const { getMandiPrices } = require('../services/mandiScraper');
const aimlService = require('../services/aimlService');

// Get planting advice
router.post('/planting', async (req, res) => {
  try {
    const { crop, taluka } = req.body;
    const weatherData = await getWeatherData(taluka);
    const advice = aimlService.getPlantingAdvice(crop, weatherData, 'current');
    res.json(advice);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate planting advice' });
  }
});

// Get irrigation advice
router.post('/irrigation', async (req, res) => {
  try {
    const { crop, taluka, soilMoisture } = req.body;
    const weatherData = await getWeatherData(taluka);
    const advice = aimlService.getIrrigationAdvice(crop, weatherData, soilMoisture);
    res.json(advice);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate irrigation advice' });
  }
});

// Get harvest advice
router.post('/harvest', async (req, res) => {
  try {
    const { crop } = req.body;
    const priceData = await getMandiPrices(crop);
    const advice = aimlService.getHarvestAdvice(crop, priceData);
    res.json(advice);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate harvest advice' });
  }
});

module.exports = router;
