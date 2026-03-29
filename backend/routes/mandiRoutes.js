// backend/routes/mandiRoutes.js
const express = require('express');
const router = express.Router();

// Get all crops mandi prices
router.get('/', async (req, res) => {
  try {
    // Your existing code
    const prices = {
      grapes: { modalPrice: 4500, marketSentiment: 'bullish', priceChange: 5 },
      onions: { modalPrice: 2800, marketSentiment: 'bearish', priceChange: -3 },
      tomatoes: { modalPrice: 3500, marketSentiment: 'stable', priceChange: 0 }
    };
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch mandi prices' });
  }
});

// Get specific crop mandi prices
router.get('/:crop', async (req, res) => {
  try {
    const crop = req.params.crop;
    
    // Mock data - replace with your actual data source
    const prices = {
      grapes: {
        commodity: 'Grapes',
        mandi: 'Lasalgaon',
        modalPrice: 4500,
        minPrice: 4200,
        maxPrice: 4800,
        marketSentiment: 'bullish',
        priceChange: 5,
        benchmark: 'Good quality grapes fetching premium',
        trend: [
          { day: 'Mon', price: 4200 },
          { day: 'Tue', price: 4250 },
          { day: 'Wed', price: 4300 },
          { day: 'Thu', price: 4350 },
          { day: 'Fri', price: 4400 },
          { day: 'Sat', price: 4450 },
          { day: 'Sun', price: 4500 }
        ]
      },
      onions: {
        commodity: 'Onions',
        mandi: 'Lasalgaon',
        modalPrice: 2800,
        minPrice: 2600,
        maxPrice: 3000,
        marketSentiment: 'bearish',
        priceChange: -3,
        benchmark: 'Prices dropping due to new arrival',
        trend: [
          { day: 'Mon', price: 2950 },
          { day: 'Tue', price: 2920 },
          { day: 'Wed', price: 2900 },
          { day: 'Thu', price: 2880 },
          { day: 'Fri', price: 2850 },
          { day: 'Sat', price: 2820 },
          { day: 'Sun', price: 2800 }
        ]
      },
      tomatoes: {
        commodity: 'Tomatoes',
        mandi: 'Nashik',
        modalPrice: 3500,
        minPrice: 3300,
        maxPrice: 3700,
        marketSentiment: 'stable',
        priceChange: 0,
        benchmark: 'Stable prices this week',
        trend: [
          { day: 'Mon', price: 3400 },
          { day: 'Tue', price: 3420 },
          { day: 'Wed', price: 3450 },
          { day: 'Thu', price: 3480 },
          { day: 'Fri', price: 3500 },
          { day: 'Sat', price: 3500 },
          { day: 'Sun', price: 3500 }
        ]
      }
    };
    
    if (prices[crop]) {
      res.json(prices[crop]);
    } else {
      res.json(prices.grapes);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch mandi prices' });
  }
});

module.exports = router;