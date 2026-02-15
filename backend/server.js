const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // For MVP, allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger middleware (for debugging)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: '🌱 Climate-Smart Agriculture API is running',
    version: '1.0.0',
    status: 'MVP Mode - Using realistic simulated data',
    lastUpdated: new Date().toISOString(),
    endpoints: {
      weather: {
        all: 'GET /api/weather (use ?taluka=nashik)',
        specific: 'GET /api/weather/:taluka',
        example: '/api/weather/niphad'
      },
      mandi: {
        all: 'GET /api/mandi',
        specific: 'GET /api/mandi/:crop',
        example: '/api/mandi/grapes'
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
    },
    supportedTalukas: ['Nashik', 'Malegaon', 'Igatpuri', 'Dindori', 'Niphad', 'Sinnar', 'Yeola', 'Nandgaon', 'Chandwad', 'Baglan'],
    supportedCrops: ['grapes', 'onion', 'tomato']
  });
});

// Routes with error handling
const routeFiles = [
  { name: 'weather', path: './routes/weatherRoutes' },
  { name: 'mandi', path: './routes/mandiRoutes' },
  { name: 'recommendations', path: './routes/recommendationRoutes' },
  { name: 'crops', path: './routes/cropRoutes' }
];

routeFiles.forEach(route => {
  try {
    app.use(`/api/${route.name}`, require(route.path));
    console.log(`✅ ${route.name} routes loaded`);
  } catch (error) {
    console.error(`❌ Failed to load ${route.name} routes:`, error.message);
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.path}`,
    availableEndpoints: '/ for API documentation'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(50));
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Test it at: http://localhost:${PORT}`);
  console.log(`🌤️  Weather example: http://localhost:${PORT}/api/weather/niphad`);
  console.log(`💰 Mandi example: http://localhost:${PORT}/api/mandi/grapes`);
  console.log(`📅 Crop calendar: http://localhost:${PORT}/api/crops/onion/calendar`);
  console.log('='.repeat(50) + '\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Closing server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = app;