const express = require('express');
const router = express.Router();

// Get list of crops and talukas
router.get('/', (req, res) => {
  res.json({
    crops: ['grapes', 'onion', 'tomato'],
    nashikTalukas: ['Nashik', 'Malegaon', 'Igatpuri', 'Dindori', 'Niphad', 'Sinnar', 'Yeola', 'Nandgaon', 'Chandwad', 'Baglan']
  });
});

// Get planting calendar for specific crop
router.get('/:crop/calendar', (req, res) => {
  const crop = req.params.crop.toLowerCase();
  
  const calendars = {
    grapes: {
      crop: 'Grapes',
      plantingWindow: 'November - February',
      harvestingWindow: 'February - April',
      months: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
      activities: ['Planting', 'Growing', 'Growing', 'Growing', 'Harvesting', 'Harvesting'],
      tips: 'Plant after first winter rains. Requires good drainage.'
    },
    onion: {
      crop: 'Onion',
      plantingWindow: 'October - December',
      harvestingWindow: 'February - April',
      months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
      activities: ['Planting', 'Planting', 'Growing', 'Growing', 'Harvesting', 'Harvesting', 'Harvesting'],
      tips: 'Harvest when tops fall over. Cure in sun for 2-3 days.'
    },
    tomato: {
      crop: 'Tomato',
      plantingWindow: 'Throughout year (with irrigation)',
      harvestingWindow: '60-80 days after planting',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      activities: ['Planting', 'Growing', 'Harvesting', 'Harvesting', 'Growing', 'Planting', 'Growing', 'Harvesting', 'Harvesting', 'Planting', 'Growing', 'Harvesting'],
      tips: 'Stake plants for better yield. Water regularly.'
    }
  };
  
  if (calendars[crop]) {
    res.json(calendars[crop]);
  } else {
    res.status(404).json({ error: 'Crop not found' });
  }
});

// Get crop-specific tips
router.get('/:crop/tips', (req, res) => {
  const crop = req.params.crop.toLowerCase();
  
  const tips = {
    grapes: {
      variety: 'Thompson Seedless, Sonaka',
      water: 'Drip irrigation recommended. Water every 7-10 days.',
      fertilizer: 'Apply 50:25:50 NPK kg/acre',
      pests: 'Watch for powdery mildew, thrips',
      harvest: 'Harvest when TSS reaches 18-20° Brix'
    },
    onion: {
      variety: 'Nasik Red, Agrifound Dark Red',
      water: 'Irrigate every 5-7 days. Stop 15 days before harvest.',
      fertilizer: 'Apply 60:40:40 NPK kg/acre',
      pests: 'Watch for thrips, purple blotch',
      harvest: 'Harvest when 50% necks collapse'
    },
    tomato: {
      variety: 'Vaishali, Abhinav',
      water: 'Drip irrigation. Maintain even moisture.',
      fertilizer: 'Apply 60:80:60 NPK kg/acre',
      pests: 'Watch for fruit borer, leaf curl virus',
      harvest: 'Harvest at breaker stage for distant market'
    }
  };
  
  if (tips[crop]) {
    res.json(tips[crop]);
  } else {
    res.status(404).json({ error: 'Crop not found' });
  }
});

module.exports = router;
