const axios = require('axios');
const cheerio = require('cheerio');

// For Nashik district - MVP version with realistic mock data
const getWeatherData = async (taluka = 'nashik') => {
  try {
    // For MVP: We'll return realistic generated data instead of actual scraping
    // This avoids website blocking and dependency issues
    
    // Base temperatures for different talukas in Nashik district
    const baseData = {
      'nashik': { temp: 28, rain: 30, humidity: 65 },
      'malegaon': { temp: 32, rain: 25, humidity: 55 },
      'igatpuri': { temp: 24, rain: 45, humidity: 75 },
      'dindori': { temp: 27, rain: 35, humidity: 68 },
      'niphad': { temp: 29, rain: 28, humidity: 62 },
      'sinnar': { temp: 30, rain: 22, humidity: 58 },
      'yeola': { temp: 31, rain: 20, humidity: 54 },
      'nandgaon': { temp: 29, rain: 32, humidity: 64 },
      'chandwad': { temp: 26, rain: 38, humidity: 70 },
      'baglan': { temp: 28, rain: 33, humidity: 66 }
    };
    
    const base = baseData[taluka.toLowerCase()] || baseData['nashik'];
    
    // Add time-based variation
    const hour = new Date().getHours();
    const timeFactor = hour > 14 ? -2 : (hour > 10 ? 3 : 0);
    
    // Add random variation to make it feel dynamic
    const randomTemp = Math.floor(Math.random() * 4) - 2; // -2 to +2
    const randomRain = Math.floor(Math.random() * 15) - 5; // -5 to +10
    const randomHumidity = Math.floor(Math.random() * 10) - 5; // -5 to +5
    
    // Seasonal adjustment
    const month = new Date().getMonth();
    const isMonsoon = month >= 5 && month <= 8; // June-September
    const monsoonBonus = isMonsoon ? 40 : -20;
    
    const currentTemp = Math.round(base.temp + timeFactor + randomTemp);
    const rainProb = Math.min(90, Math.max(5, base.rain + randomRain + monsoonBonus));
    const humidity = Math.min(95, Math.max(30, base.humidity + randomHumidity + (isMonsoon ? 15 : -5)));
    
    // Generate forecast for next 5 days
    const forecast = [];
    const days = ['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5'];
    
    for (let i = 0; i < 5; i++) {
      forecast.push({
        day: days[i],
        temp: Math.round(base.temp + (Math.random() * 6) - 3),
        rain: Math.min(90, Math.max(5, base.rain + (Math.random() * 30) - 15 + (isMonsoon ? 30 : -10))),
        condition: getWeatherCondition(i, isMonsoon)
      });
    }
    
    return {
      location: taluka.charAt(0).toUpperCase() + taluka.slice(1),
      temperature: {
        min: Math.round(currentTemp - (Math.random() * 5) - 3),
        max: Math.round(currentTemp + (Math.random() * 5) + 3),
        current: currentTemp,
        feelsLike: Math.round(currentTemp - (Math.random() * 2) + 1)
      },
      rainfall: {
        probability: rainProb,
        amount: rainProb > 50 ? Math.round((Math.random() * 20) + 5) : 0,
        forecast: rainProb > 70 ? 'Heavy rain expected' : (rainProb > 40 ? 'Light rain possible' : 'No rain expected')
      },
      humidity: humidity,
      windSpeed: Math.floor(Math.random() * 15) + 8, // 8-23 km/h
      windDirection: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
      visibility: Math.floor(Math.random() * 5) + 8, // 8-13 km
      uvIndex: Math.floor(Math.random() * 4) + 3, // 3-7
      forecast: forecast,
      advisory: generateWeatherAdvisory(rainProb, currentTemp, isMonsoon),
      lastUpdated: new Date().toISOString(),
      source: 'IMD Maharashtra (simulated for MVP)'
    };
    
  } catch (error) {
    console.error('Error generating weather data:', error);
    return getFallbackWeatherData(taluka);
  }
};

const getWeatherCondition = (day, isMonsoon) => {
  const conditions = isMonsoon ? 
    ['Light Rain', 'Cloudy', 'Heavy Rain', 'Thunderstorms', 'Rainy'] :
    ['Sunny', 'Partly Cloudy', 'Clear Sky', 'Hazy', 'Sunny'];
  
  return conditions[Math.floor(Math.random() * conditions.length)];
};

const generateWeatherAdvisory = (rainProb, temp, isMonsoon) => {
  if (rainProb > 70) {
    return '⚠️ Heavy rain expected. Delay irrigation and harvesting. Prepare drainage.';
  } else if (temp > 38) {
    return '🔥 Heat wave conditions. Increase irrigation frequency. Provide shade to crops.';
  } else if (isMonsoon && rainProb > 40) {
    return '🌧️ Monsoon active. Monitor for fungal diseases in grapes and tomatoes.';
  } else if (temp < 15) {
    return '❄️ Cold conditions. Protect young plants from frost.';
  } else {
    return '✅ Weather favorable for farming activities.';
  }
};

const getFallbackWeatherData = (taluka = 'Nashik') => {
  return {
    location: taluka,
    temperature: { min: 20, max: 30, current: 25, feelsLike: 26 },
    rainfall: { probability: 10, amount: 0, forecast: 'No rain expected' },
    humidity: 60,
    windSpeed: 10,
    windDirection: 'NW',
    visibility: 10,
    uvIndex: 5,
    forecast: [
      { day: 'Today', temp: 25, rain: 10, condition: 'Partly Cloudy' },
      { day: 'Tomorrow', temp: 26, rain: 15, condition: 'Sunny' },
      { day: 'Day 3', temp: 27, rain: 20, condition: 'Sunny' }
    ],
    advisory: '✅ Normal weather conditions.',
    lastUpdated: new Date().toISOString(),
    source: 'Fallback Data'
  };
};

module.exports = { getWeatherData };