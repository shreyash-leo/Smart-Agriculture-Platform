const express = require('express');
const router = express.Router();

// Get list of crops and talukas
router.get('/', (req, res) => {
  res.json({
    crops: ['grapes', 'onions', 'tomatoes', 'corn', 'wheat', 'soybeans'],
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
    onions: {
      crop: 'Onions',
      plantingWindow: 'October - December',
      harvestingWindow: 'February - April',
      months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
      activities: ['Planting', 'Planting', 'Growing', 'Growing', 'Harvesting', 'Harvesting', 'Harvesting'],
      tips: 'Harvest when tops fall over. Cure in sun for 2-3 days.'
    },
    tomatoes: {
      crop: 'Tomatoes',
      plantingWindow: 'Throughout year (with irrigation)',
      harvestingWindow: '60-80 days after planting',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      activities: ['Planting', 'Growing', 'Harvesting', 'Harvesting', 'Growing', 'Planting', 'Growing', 'Harvesting', 'Harvesting', 'Planting', 'Growing', 'Harvesting'],
      tips: 'Stake plants for better yield. Water regularly.'
    },
    corn: {
      crop: 'Corn',
      plantingWindow: 'June - July',
      harvestingWindow: 'September - October',
      months: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      activities: ['Planting', 'Growing', 'Growing', 'Harvesting', 'Harvesting'],
      tips: 'Ensure proper spacing. Needs adequate sunlight.'
    },
    wheat: {
      crop: 'Wheat',
      plantingWindow: 'November',
      harvestingWindow: 'March - April',
      months: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
      activities: ['Planting', 'Growing', 'Growing', 'Growing', 'Harvesting', 'Harvesting'],
      tips: 'Irrigate at critical stages like crown root initiation.'
    },
    soybeans: {
      crop: 'Soybeans',
      plantingWindow: 'June - July',
      harvestingWindow: 'September - October',
      months: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      activities: ['Planting', 'Growing', 'Growing', 'Harvesting', 'Harvesting'],
      tips: 'Requires warm and moist climate. Inoculate seeds.'
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
    onions: {
      variety: 'Nasik Red, Agrifound Dark Red',
      water: 'Irrigate every 5-7 days. Stop 15 days before harvest.',
      fertilizer: 'Apply 60:40:40 NPK kg/acre',
      pests: 'Watch for thrips, purple blotch',
      harvest: 'Harvest when 50% necks collapse'
    },
    tomatoes: {
      variety: 'Vaishali, Abhinav',
      water: 'Drip irrigation. Maintain even moisture.',
      fertilizer: 'Apply 60:80:60 NPK kg/acre',
      pests: 'Watch for fruit borer, leaf curl virus',
      harvest: 'Harvest at breaker stage for distant market'
    },
    corn: {
      variety: 'African Tall, Vijay',
      water: 'Critical during silking and tasseling stages.',
      fertilizer: 'Apply 120:60:40 NPK kg/ha',
      pests: 'Watch for fall armyworm, stem borer',
      harvest: 'Harvest when moisture is around 20-25%'
    },
    wheat: {
      variety: 'HD 2967, PBW 343',
      water: 'Requires 4-6 irrigations depending on soil.',
      fertilizer: 'Apply 120:60:40 NPK kg/ha',
      pests: 'Watch for aphids, termites, rust',
      harvest: 'Harvest when grains are hard and moisture is < 12%'
    },
    soybeans: {
      variety: 'JS 335, NRC 86',
      water: 'Requires irrigation during flowering and pod development.',
      fertilizer: 'Apply 20:60:40 NPK kg/ha',
      pests: 'Watch for whitefly, stem fly, girdle beetle',
      harvest: 'Harvest when leaves turn yellow and drop off'
    }
  };
  
  if (tips[crop]) {
    res.json(tips[crop]);
  } else {
    res.status(404).json({ error: 'Crop not found' });
  }
});

module.exports = router;
