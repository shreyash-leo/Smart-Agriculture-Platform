import React, { useState, useEffect } from 'react';
import { 
  FaArrowLeft,
  FaShoppingCart,
  FaUserCircle,
  FaHome,
  FaBell,
  FaTags,
  FaChartLine,
  FaCheckCircle,
  FaTable,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaSeedling,
  FaWater,
  FaLeaf
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Harvest = () => {
  const [notifications] = useState(2);
  const [selectedCrop, setSelectedCrop] = useState('grapes');
  const [userData, setUserData] = useState({
    name: 'John Farmer',
    location: 'Dindori Taluka, Nashik',
    farmSize: '12.5 acres'
  });
  
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // Navigation functions
  const goToHome = () => navigate('/');
  const goToPlanting = () => navigate('/planting');
  const goToIrrigation = () => navigate('/irrigation');
  const goToHarvest = () => navigate('/harvest');
  const goToProfile = () => navigate('/profile');

  // EXPANDED CROPS LIST - 10+ crops
  const crops = [
    { id: 'grapes', name: 'Grapes', icon: '🍇', nameMr: 'द्राक्षे', nameHi: 'अंगूर' },
    { id: 'onions', name: 'Onions', icon: '🧅', nameMr: 'कांदे', nameHi: 'प्याज' },
    { id: 'tomatoes', name: 'Tomatoes', icon: '🍅', nameMr: 'टोमॅटो', nameHi: 'टमाटर' },
    { id: 'wheat', name: 'Wheat', icon: '🌾', nameMr: 'गहू', nameHi: 'गेहूं' },
    { id: 'corn', name: 'Corn', icon: '🌽', nameMr: 'मका', nameHi: 'मक्का' },
    { id: 'sugarcane', name: 'Sugarcane', icon: '🎋', nameMr: 'ऊस', nameHi: 'गन्ना' },
    { id: 'cotton', name: 'Cotton', icon: '🌿', nameMr: 'कापूस', nameHi: 'कपास' },
    { id: 'rice', name: 'Rice', icon: '🌾', nameMr: 'तांदूळ', nameHi: 'चावल' },
    { id: 'bajra', name: 'Bajra', icon: '🌾', nameMr: 'बाजरी', nameHi: 'बाजरा' },
    { id: 'jowar', name: 'Jowar', icon: '🌾', nameMr: 'ज्वारी', nameHi: 'ज्वार' },
    { id: 'groundnut', name: 'Groundnut', icon: '🥜', nameMr: 'भुईमूग', nameHi: 'मूंगफली' },
    { id: 'soybean', name: 'Soybean', icon: '🌱', nameMr: 'सोयाबीन', nameHi: 'सोयाबीन' }
  ];

  // Price data for ALL crops
  const priceData = {
    grapes: {
      current: 4500,
      trend: 'up',
      change: 5,
      markets: [
        { name: 'Lasalgaon', price: 4500, change: 5 },
        { name: 'Pimpalgaon', price: 4450, change: 4 },
        { name: 'Nashik', price: 4400, change: 3 }
      ],
      weeklyTrend: [
        { day: 'Mon', price: 4200 }, { day: 'Tue', price: 4250 }, { day: 'Wed', price: 4300 },
        { day: 'Thu', price: 4350 }, { day: 'Fri', price: 4400 }, { day: 'Sat', price: 4450 }, { day: 'Sun', price: 4500 }
      ],
      recommendation: { action: 'wait', days: 3, expectedPrice: 4800, reason: 'Price expected to rise' }
    },
    onions: {
      current: 2800,
      trend: 'down',
      change: -3,
      markets: [
        { name: 'Lasalgaon', price: 2800, change: -3 },
        { name: 'Pimpalgaon', price: 2850, change: -2 },
        { name: 'Nashik', price: 2750, change: -4 }
      ],
      weeklyTrend: [
        { day: 'Mon', price: 2950 }, { day: 'Tue', price: 2920 }, { day: 'Wed', price: 2900 },
        { day: 'Thu', price: 2880 }, { day: 'Fri', price: 2850 }, { day: 'Sat', price: 2820 }, { day: 'Sun', price: 2800 }
      ],
      recommendation: { action: 'sell', days: 0, expectedPrice: 2800, reason: 'Ideal selling window now' }
    },
    tomatoes: {
      current: 3500,
      trend: 'stable',
      change: 0,
      markets: [
        { name: 'Lasalgaon', price: 3500, change: 0 },
        { name: 'Pimpalgaon', price: 3480, change: -1 },
        { name: 'Nashik', price: 3520, change: 1 }
      ],
      weeklyTrend: [
        { day: 'Mon', price: 3400 }, { day: 'Tue', price: 3420 }, { day: 'Wed', price: 3450 },
        { day: 'Thu', price: 3480 }, { day: 'Fri', price: 3500 }, { day: 'Sat', price: 3500 }, { day: 'Sun', price: 3500 }
      ],
      recommendation: { action: 'sellNow', days: 0, expectedPrice: 3500, reason: 'Price peak reached' }
    },
    wheat: {
      current: 3200,
      trend: 'up',
      change: 4,
      markets: [
        { name: 'Lasalgaon', price: 3200, change: 4 },
        { name: 'Nashik', price: 3150, change: 3 },
        { name: 'Pimpalgaon', price: 3180, change: 2 }
      ],
      weeklyTrend: [
        { day: 'Mon', price: 3000 }, { day: 'Tue', price: 3050 }, { day: 'Wed', price: 3100 },
        { day: 'Thu', price: 3120 }, { day: 'Fri', price: 3150 }, { day: 'Sat', price: 3180 }, { day: 'Sun', price: 3200 }
      ],
      recommendation: { action: 'wait', days: 5, expectedPrice: 3400, reason: 'Price expected to rise' }
    },
    corn: {
      current: 2900,
      trend: 'up',
      change: 3,
      markets: [
        { name: 'Lasalgaon', price: 2900, change: 3 },
        { name: 'Nashik', price: 2880, change: 2 },
        { name: 'Pimpalgaon', price: 2850, change: 1 }
      ],
      weeklyTrend: [
        { day: 'Mon', price: 2750 }, { day: 'Tue', price: 2780 }, { day: 'Wed', price: 2820 },
        { day: 'Thu', price: 2850 }, { day: 'Fri', price: 2870 }, { day: 'Sat', price: 2890 }, { day: 'Sun', price: 2900 }
      ],
      recommendation: { action: 'wait', days: 4, expectedPrice: 3100, reason: 'Price expected to rise' }
    },
    sugarcane: {
      current: 3800,
      trend: 'stable',
      change: 0,
      markets: [
        { name: 'Lasalgaon', price: 3800, change: 0 },
        { name: 'Nashik', price: 3780, change: -1 },
        { name: 'Pimpalgaon', price: 3820, change: 1 }
      ],
      weeklyTrend: [
        { day: 'Mon', price: 3800 }, { day: 'Tue', price: 3800 }, { day: 'Wed', price: 3790 },
        { day: 'Thu', price: 3810 }, { day: 'Fri', price: 3800 }, { day: 'Sat', price: 3800 }, { day: 'Sun', price: 3800 }
      ],
      recommendation: { action: 'sell', days: 0, expectedPrice: 3800, reason: 'Stable prices, good time to sell' }
    },
    cotton: {
      current: 5200,
      trend: 'up',
      change: 6,
      markets: [
        { name: 'Lasalgaon', price: 5200, change: 6 },
        { name: 'Nashik', price: 5150, change: 5 },
        { name: 'Pimpalgaon', price: 5100, change: 4 }
      ],
      weeklyTrend: [
        { day: 'Mon', price: 4800 }, { day: 'Tue', price: 4900 }, { day: 'Wed', price: 5000 },
        { day: 'Thu', price: 5050 }, { day: 'Fri', price: 5100 }, { day: 'Sat', price: 5150 }, { day: 'Sun', price: 5200 }
      ],
      recommendation: { action: 'wait', days: 7, expectedPrice: 5600, reason: 'Strong upward trend' }
    },
    rice: {
      current: 3400,
      trend: 'up',
      change: 2,
      markets: [
        { name: 'Lasalgaon', price: 3400, change: 2 },
        { name: 'Nashik', price: 3380, change: 1 },
        { name: 'Pimpalgaon', price: 3350, change: 0 }
      ],
      weeklyTrend: [
        { day: 'Mon', price: 3300 }, { day: 'Tue', price: 3320 }, { day: 'Wed', price: 3340 },
        { day: 'Thu', price: 3360 }, { day: 'Fri', price: 3380 }, { day: 'Sat', price: 3390 }, { day: 'Sun', price: 3400 }
      ],
      recommendation: { action: 'wait', days: 3, expectedPrice: 3500, reason: 'Gradual price increase' }
    },
    bajra: {
      current: 2600,
      trend: 'down',
      change: -2,
      markets: [
        { name: 'Lasalgaon', price: 2600, change: -2 },
        { name: 'Nashik', price: 2620, change: -1 },
        { name: 'Pimpalgaon', price: 2580, change: -3 }
      ],
      weeklyTrend: [
        { day: 'Mon', price: 2700 }, { day: 'Tue', price: 2680 }, { day: 'Wed', price: 2660 },
        { day: 'Thu', price: 2650 }, { day: 'Fri', price: 2630 }, { day: 'Sat', price: 2610 }, { day: 'Sun', price: 2600 }
      ],
      recommendation: { action: 'sellNow', days: 0, expectedPrice: 2600, reason: 'Prices falling, sell now' }
    },
    jowar: {
      current: 2750,
      trend: 'stable',
      change: 0,
      markets: [
        { name: 'Lasalgaon', price: 2750, change: 0 },
        { name: 'Nashik', price: 2740, change: -1 },
        { name: 'Pimpalgaon', price: 2760, change: 1 }
      ],
      weeklyTrend: [
        { day: 'Mon', price: 2750 }, { day: 'Tue', price: 2750 }, { day: 'Wed', price: 2740 },
        { day: 'Thu', price: 2750 }, { day: 'Fri', price: 2750 }, { day: 'Sat', price: 2750 }, { day: 'Sun', price: 2750 }
      ],
      recommendation: { action: 'sell', days: 0, expectedPrice: 2750, reason: 'Stable prices' }
    },
    groundnut: {
      current: 4800,
      trend: 'up',
      change: 4,
      markets: [
        { name: 'Lasalgaon', price: 4800, change: 4 },
        { name: 'Nashik', price: 4750, change: 3 },
        { name: 'Pimpalgaon', price: 4700, change: 2 }
      ],
      weeklyTrend: [
        { day: 'Mon', price: 4600 }, { day: 'Tue', price: 4650 }, { day: 'Wed', price: 4700 },
        { day: 'Thu', price: 4720 }, { day: 'Fri', price: 4750 }, { day: 'Sat', price: 4780 }, { day: 'Sun', price: 4800 }
      ],
      recommendation: { action: 'wait', days: 6, expectedPrice: 5100, reason: 'Upward trend expected to continue' }
    },
    soybean: {
      current: 4100,
      trend: 'up',
      change: 3,
      markets: [
        { name: 'Lasalgaon', price: 4100, change: 3 },
        { name: 'Nashik', price: 4050, change: 2 },
        { name: 'Pimpalgaon', price: 4000, change: 1 }
      ],
      weeklyTrend: [
        { day: 'Mon', price: 3950 }, { day: 'Tue', price: 3980 }, { day: 'Wed', price: 4000 },
        { day: 'Thu', price: 4030 }, { day: 'Fri', price: 4050 }, { day: 'Sat', price: 4080 }, { day: 'Sun', price: 4100 }
      ],
      recommendation: { action: 'wait', days: 4, expectedPrice: 4300, reason: 'Prices rising steadily' }
    }
  };

  const getCropName = (id) => {
    const crop = crops.find(c => c.id === id);
    if (!crop) return id;
    if (language === 'mr') return crop.nameMr;
    if (language === 'hi') return crop.nameHi;
    return crop.name;
  };

  const getText = (en, mr, hi) => {
    if (language === 'mr') return mr;
    if (language === 'hi') return hi;
    return en;
  };

  const currentCropData = priceData[selectedCrop];

  // Get location from profile (in real app, this would come from context/API)
  const userLocation = userData.location.split(',')[0]; // Gets "Dindori"

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F9F6] to-white">
      {/* Top Navbar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div onClick={goToHome} className="flex items-center gap-2 cursor-pointer">
              <div className="bg-[#1B5E20] p-2 rounded-xl shadow-lg">
                <FaLeaf className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold text-[#263238]">{t('agriSmart')}</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#" onClick={(e) => { e.preventDefault(); goToHome(); }} className="text-[#546E7A] hover:text-[#1B5E20] transition-colors flex items-center gap-1"><FaHome /> {t('home')}</a>
              <a href="#" onClick={(e) => { e.preventDefault(); goToPlanting(); }} className="text-[#546E7A] hover:text-[#1B5E20] transition-colors flex items-center gap-1"><FaSeedling /> {t('plantingInsights')}</a>
              <a href="#" onClick={(e) => { e.preventDefault(); goToIrrigation(); }} className="text-[#546E7A] hover:text-[#1B5E20] transition-colors flex items-center gap-1"><FaWater /> {t('irrigationControl')}</a>
              <a href="#" onClick={(e) => { e.preventDefault(); goToHarvest(); }} className="text-[#263238] font-medium hover:text-[#1B5E20] transition-colors border-b-2 border-[#1B5E20] pb-1 flex items-center gap-1"><FaShoppingCart /> {t('harvestingUpdates')}</a>
              <a href="#" onClick={(e) => { e.preventDefault(); goToProfile(); }} className="text-[#546E7A] hover:text-[#1B5E20] transition-colors flex items-center gap-1"><FaUserCircle /> {t('profile')}</a>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                <FaBell className="text-[#546E7A] text-xl" />
                {notifications > 0 && (
                  <span className="absolute top-1 right-1 bg-[#FBC02D] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">{notifications}</span>
                )}
              </button>
              <div onClick={goToProfile} className="w-10 h-10 rounded-full bg-gradient-to-r from-[#1B5E20] to-[#4CAF50] p-0.5 cursor-pointer hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <FaUserCircle className="text-[#1B5E20] text-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header with Back Button and Location from Profile */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={goToHome} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FaArrowLeft className="text-[#546E7A] text-xl" />
            </button>
            <h1 className="text-2xl font-bold text-[#263238] flex items-center gap-2">
              <FaShoppingCart className="text-[#1B5E20]" />
              {getText('Harvest & Market', 'काढणी व बाजार', 'कटाई और बाजार')}
            </h1>
          </div>
          
          {/* Location from Profile */}
          <div className="bg-[#E8F0E8] px-4 py-2 rounded-full text-sm font-medium text-[#1B5E20]">
            📍 {userLocation}
          </div>
        </div>

        {/* Crop Selection Grid - All crops visible */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#263238] mb-3">
            {getText('Select Crop', 'पीक निवडा', 'फसल चुनें')}
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {crops.map(crop => (
              <button
                key={crop.id}
                onClick={() => setSelectedCrop(crop.id)}
                className={`bg-white p-3 rounded-xl shadow-md flex flex-col items-center gap-1 transition-all
                  ${selectedCrop === crop.id 
                    ? 'border-2 border-[#1B5E20] ring-2 ring-[#1B5E20]/20 bg-[#F0F7F0]' 
                    : 'border border-gray-200 hover:border-[#1B5E20]'}`}
              >
                <span className="text-2xl">{crop.icon}</span>
                <span className="text-xs font-medium text-[#263238] text-center">
                  {getText(crop.name, crop.nameMr, crop.nameHi)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* FEATURE 1: Daily Mandi Price Cards - Shows ALL crops */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <h2 className="text-lg font-bold text-[#263238] mb-4 flex items-center gap-2">
            <FaTags className="text-[#1B5E20]" />
            {getText('Today\'s Mandi Prices', 'आजचे बाजार भाव', 'आज के मंडी भाव')} - {userLocation}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {crops.map(crop => {
              const data = priceData[crop.id];
              return (
                <div 
                  key={crop.id} 
                  onClick={() => setSelectedCrop(crop.id)}
                  className={`p-4 rounded-xl border-l-4 cursor-pointer transition-all ${
                    crop.id === selectedCrop 
                      ? 'border-[#1B5E20] bg-[#F0F7F0] shadow-md' 
                      : 'border-gray-200 bg-white hover:border-[#1B5E20] hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{crop.icon}</span>
                      <div>
                        <p className="font-semibold text-[#263238] text-sm">
                          {getText(crop.name, crop.nameMr, crop.nameHi)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-[#263238]">₹{data.current}</p>
                      <p className={`text-xs flex items-center gap-1 justify-end ${
                        data.trend === 'up' ? 'text-green-600' :
                        data.trend === 'down' ? 'text-red-600' :
                        'text-gray-600'
                      }`}>
                        {data.trend === 'up' && <FaArrowUp />}
                        {data.trend === 'down' && <FaArrowDown />}
                        {data.trend === 'stable' && <FaMinus />}
                        {data.change}%
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FEATURE 2: 7-Day Price Trend Chart - For selected crop */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <h2 className="text-lg font-bold text-[#263238] mb-4 flex items-center gap-2">
            <FaChartLine className="text-[#1B5E20]" />
            {getText('7-Day Price Trend', '७ दिवसांचा किंमत ट्रेंड', '७ दिन का मूल्य रुझान')} - {getCropName(selectedCrop)}
          </h2>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentCropData.weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="day" tick={{ fill: '#546E7A', fontSize: 12 }} />
                <YAxis tick={{ fill: '#546E7A', fontSize: 12 }} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#1B5E20" 
                  strokeWidth={3}
                  dot={{ fill: '#1B5E20', r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* FEATURE 3: Best Time to Sell Recommendation Box */}
        <div className="bg-gradient-to-r from-[#1B5E20] to-[#4CAF50] rounded-2xl shadow-xl p-6 mb-6 text-white">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FaCheckCircle className="text-[#FBC02D]" />
            {getText('Best Time to Sell', 'विक्रीसाठी सर्वोत्तम वेळ', 'बेचने का सर्वोत्तम समय')} - {getCropName(selectedCrop)}
          </h2>

          <div className="bg-white/10 rounded-xl p-5">
            <div className="text-center mb-4">
              <p className="text-3xl font-bold mb-2">
                {currentCropData.recommendation.action === 'sell' && '✅ ' + getText('SELL NOW', 'आता विका', 'अभी बेचें')}
                {currentCropData.recommendation.action === 'wait' && `⏳ ${getText('WAIT', 'प्रतीक्षा करा', 'प्रतीक्षा करें')} ${currentCropData.recommendation.days} ${getText('days', 'दिवस', 'दिन')}`}
                {currentCropData.recommendation.action === 'sellNow' && '⚠️ ' + getText('SELL NOW', 'आता विका', 'अभी बेचें')}
              </p>
              <p className="text-white/90">
                {getText('Expected Price', 'अपेक्षित किंमत', 'अपेक्षित कीमत')}: ₹{currentCropData.recommendation.expectedPrice}
              </p>
              <p className="text-sm text-white/80 mt-2">
                {currentCropData.recommendation.reason}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-xs opacity-80">{getText('Current Price', 'सध्याची किंमत', 'वर्तमान कीमत')}</p>
                <p className="text-lg font-semibold">₹{currentCropData.current}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-xs opacity-80">{getText('Change', 'बदल', 'बदलाव')}</p>
                <p className={`text-lg font-semibold ${
                  currentCropData.trend === 'up' ? 'text-green-300' :
                  currentCropData.trend === 'down' ? 'text-red-300' :
                  'text-white'
                }`}>
                  {currentCropData.change}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURE 4: Market Comparison Table */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <h2 className="text-lg font-bold text-[#263238] mb-4 flex items-center gap-2">
            <FaTable className="text-[#1B5E20]" />
            {getText('Market Comparison', 'बाजार तुलना', 'बाजार तुलना')} - {getCropName(selectedCrop)}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-sm font-medium text-[#546E7A]">{getText('Market', 'बाजार', 'बाजार')}</th>
                  <th className="text-right py-3 text-sm font-medium text-[#546E7A]">{getText('Price (₹)', 'किंमत (₹)', 'कीमत (₹)')}</th>
                  <th className="text-right py-3 text-sm font-medium text-[#546E7A]">{getText('Change', 'बदल', 'बदलाव')}</th>
                </tr>
              </thead>
              <tbody>
                {currentCropData.markets.map((market, idx) => (
                  <tr key={idx} className="border-b border-gray-100 last:border-0">
                    <td className="py-3 text-[#263238] font-medium">{market.name}</td>
                    <td className="py-3 text-right font-semibold text-[#263238]">₹{market.price}</td>
                    <td className="py-3 text-right">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        market.change > 0 ? 'bg-green-100 text-green-700' :
                        market.change < 0 ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {market.change > 0 && <FaArrowUp />}
                        {market.change < 0 && <FaArrowDown />}
                        {market.change === 0 && <FaMinus />}
                        {Math.abs(market.change)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Navigation */}
        <nav className="bg-white/80 backdrop-blur-md shadow-lg rounded-full px-6 py-2 mb-4">
          <div className="flex justify-around items-center">
            <button onClick={goToHome} className="flex flex-col items-center text-[#546E7A] hover:text-[#1B5E20] transition-colors">
              <FaHome className="text-2xl" />
              <span className="text-xs mt-1">{t('home')}</span>
            </button>
            <button onClick={goToPlanting} className="flex flex-col items-center text-[#546E7A] hover:text-[#1B5E20] transition-colors">
              <FaSeedling className="text-2xl" />
              <span className="text-xs mt-1">{t('plantingInsights')}</span>
            </button>
            <button onClick={goToIrrigation} className="flex flex-col items-center text-[#546E7A] hover:text-[#1B5E20] transition-colors">
              <FaWater className="text-2xl" />
              <span className="text-xs mt-1">{t('irrigationControl')}</span>
            </button>
            <button onClick={goToHarvest} className="flex flex-col items-center text-[#1B5E20]">
              <FaShoppingCart className="text-2xl" />
              <span className="text-xs mt-1 font-medium">{t('harvestingUpdates')}</span>
            </button>
            <button onClick={goToProfile} className="flex flex-col items-center text-[#546E7A] hover:text-[#1B5E20] transition-colors">
              <FaUserCircle className="text-2xl" />
              <span className="text-xs mt-1">{t('profile')}</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Harvest;