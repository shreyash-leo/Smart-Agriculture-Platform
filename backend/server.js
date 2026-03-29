// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();

// Import routes
const cropRoutes = require('./routes/cropRoutes');
const mandiRoutes = require('./routes/mandiRoutes');
const profileRoutes = require('./routes/profileRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');

// Middleware
app.use(cors()); // This allows frontend to connect
app.use(express.json());

// Routes
app.use('/api/crops', cropRoutes);
app.use('/api/mandi', mandiRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});