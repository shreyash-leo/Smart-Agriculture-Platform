const express = require('express');
const router = express.Router();
const { getMandiPrices } = require('../services/mandiScraper');

// Get all crops mandi prices
router.get('/', async (req, res) => {
  try {
    const prices = await getMandiPrices('all');
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch mandi prices' });
  }
});

// Get specific crop mandi prices
router.get('/:crop', async (req, res) => {
  try {
    const crop = req.params.crop;
    const prices = await getMandiPrices(crop);
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch mandi prices' });
  }
});

module.exports = router;
