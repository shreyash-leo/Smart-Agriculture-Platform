const express = require('express');
const router = express.Router();
const { getWeatherData } = require('../services/weatherScraper');

// Get weather with optional taluka query parameter
router.get('/', async (req, res) => {
  try {
    const taluka = req.query.taluka || 'nashik';
    const weatherData = await getWeatherData(taluka);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Get weather for specific taluka
router.get('/:taluka', async (req, res) => {
  try {
    const taluka = req.params.taluka;
    const weatherData = await getWeatherData(taluka);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

module.exports = router;
