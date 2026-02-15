const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: '🌱 Climate-Smart Agriculture API is running',
    version: '1.0.0',
    endpoints: {
      weather: {
        all: 'GET /api/weather (use ?taluka=nashik)',
        specific: 'GET /api/weather/:taluka'
      },
      mandi: {
        all: 'GET /api/mandi',
        specific: 'GET /api/mandi/:crop'
      },
      recommendations: {
        planting: 'POST /api/recommendations/planting',
        irrigation: 'POST /api/recommendations/irrigation',
        harvest: 'POST /api/recommendations/harvest'
      },
      crops: {
        list: 'GET /api/crops',
        calendar: 'GET /api/crops/:crop/calendar',
        tips: 'GET /api/crops/:crop/tips'
      }
    }
  });
});

// Routes
try {
  app.use('/api/weather', require('./routes/weatherRoutes'));
  console.log('✅ Weather routes loaded');
} catch (error) {
  console.error('❌ Failed to load weather routes:', error.message);
}

try {
  app.use('/api/mandi', require('./routes/mandiRoutes'));
  console.log('✅ Mandi routes loaded');
} catch (error) {
  console.error('❌ Failed to load mandi routes:', error.message);
}

try {
  app.use('/api/recommendations', require('./routes/recommendationRoutes'));
  console.log('✅ Recommendation routes loaded');
} catch (error) {
  console.error('❌ Failed to load recommendation routes:', error.message);
}

try {
  app.use('/api/crops', require('./routes/cropRoutes'));
  console.log('✅ Crop routes loaded');
} catch (error) {
  console.error('❌ Failed to load crop routes:', error.message);
}

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📡 Test it at: http://localhost:${PORT}\n`);
});