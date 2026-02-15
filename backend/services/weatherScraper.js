const axios = require('axios');
const cheerio = require('cheerio');

// For Nashik district
const getWeatherData = async (taluka = 'nashik') => {
  try {
    // IMD district forecast page for Maharashtra
    const response = await axios.get('https://mausam.imd.gov.in/maharashtra/');
    const $ = cheerio.load(response.data);
    
    // Parse Nashik region data
    // Note: You'll need to inspect the actual HTML structure
    
    // For now, return sample data
    return {
      location: taluka,
      temperature: {
        min: 22,
        max: 32,
        current: 28
      },
      rainfall: {
        probability: 30,
        amount: 5 // mm
      },
      humidity: 65,
      windSpeed: 12,
      forecast: [
        { day: 'Today', temp: 32, rain: 20 },
        { day: 'Tomorrow', temp: 31, rain: 40 },
        { day: 'Day 3', temp: 30, rain: 60 }
      ],
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return getFallbackWeatherData();
  }
};

const getFallbackWeatherData = () => {
  return {
    location: 'Nashik',
    temperature: { min: 20, max: 30, current: 25 },
    rainfall: { probability: 10, amount: 0 },
    humidity: 60,
    windSpeed: 10,
    forecast: [],
    lastUpdated: new Date().toISOString()
  };
};

module.exports = { getWeatherData };