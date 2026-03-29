import React, { useState, useEffect } from 'react';
import { 
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaSeedling,
  FaLeaf,
  FaTint,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
  FaBell,
  FaChevronRight,
  FaUserCircle,
  FaHome,
  FaWater,
  FaShoppingCart,
  FaThermometerHalf,
  FaCloudRain,
  FaSun,
  FaChartLine,
  FaTachometerAlt,
  FaClock,
  FaWind
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from '../services/api';

const Irrigation = () => {
  const [notifications] = useState(2);
  const [selectedCrop, setSelectedCrop] = useState('grapes');
  const [selectedLocation, setSelectedLocation] = useState('dindori');
  const [profileLocation, setProfileLocation] = useState('Dindori');
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfileLocation = async () => {
      try {
        const data = await api.profile.getProfile();
        if (data && data.location) {
          setProfileLocation(data.location);
          const locStr = data.location.toLowerCase();
          const match = locations.find(l => locStr.includes(l.id));
          if (match) setSelectedLocation(match.id);
        }
      } catch (err) {
        console.error("Failed to load profile location", err);
      }
    };
    loadProfileLocation();
  }, []);

  // Navigation functions
  const goToHome = () => navigate('/');
  const goToPlanting = () => navigate('/planting');
  const goToIrrigation = () => navigate('/irrigation');
  const goToHarvest = () => navigate('/harvest');
  const goToProfile = () => navigate('/profile');

  const locations = [
    { id: 'dindori', name: 'Dindori', nameMr: 'दिंडोरी', nameHi: 'दिंडोरी' },
    { id: 'niphad', name: 'Niphad', nameMr: 'निफाड', nameHi: 'निफाड' },
    { id: 'sinnar', name: 'Sinnar', nameMr: 'सिन्नर', nameHi: 'सिन्नर' },
    { id: 'igatpuri', name: 'Igatpuri', nameMr: 'इगतपुरी', nameHi: 'इगतपुरी' },
    { id: 'nashik', name: 'Nashik', nameMr: 'नाशिक', nameHi: 'नाशिक' }
  ];

  const crops = [
    { id: 'grapes', name: 'Grapes', icon: '🍇', color: '#8B5CF6', lightColor: '#EDE9FE', nameMr: 'द्राक्षे', nameHi: 'अंगूर' },
    { id: 'onions', name: 'Onions', icon: '🧅', color: '#F59E0B', lightColor: '#FEF3C7', nameMr: 'कांदे', nameHi: 'प्याज' },
    { id: 'tomatoes', name: 'Tomatoes', icon: '🍅', color: '#EF4444', lightColor: '#FEE2E2', nameMr: 'टोमॅटो', nameHi: 'टमाटर' },
    { id: 'corn', name: 'Corn', icon: '🌽', color: '#FCD34D', lightColor: '#FEF3C7', nameMr: 'मका', nameHi: 'मक्का' },
    { id: 'wheat', name: 'Wheat', icon: '🌾', color: '#F59E0B', lightColor: '#FEF3C7', nameMr: 'गहू', nameHi: 'गेहूं' },
    { id: 'soybeans', name: 'Soybeans', icon: '🌱', color: '#10B981', lightColor: '#D1FAE5', nameMr: 'सोयाबीन', nameHi: 'सोयाबीन' },
    { id: 'sugarcane', name: 'Sugarcane', icon: '🎋', color: '#65A30D', lightColor: '#ECFCCB', nameMr: 'ऊस', nameHi: 'गन्ना' },
    { id: 'cotton', name: 'Cotton', icon: '☁️', color: '#E2E8F0', lightColor: '#F8FAFC', nameMr: 'कापूस', nameHi: 'कपास' },
    { id: 'rice', name: 'Rice', icon: '🍚', color: '#93C5FD', lightColor: '#EFF6FF', nameMr: 'तांदूळ', nameHi: 'चावल' },
    { id: 'pomegranate', name: 'Pomegranate', icon: '🍎', color: '#DC2626', lightColor: '#FEF2F2', nameMr: 'डाळिंब', nameHi: 'अनार' },
    { id: 'bajra', name: 'Bajra', icon: '🌾', color: '#D97706', lightColor: '#FEF3C7', nameMr: 'बाजरी', nameHi: 'बाजरा' },
    { id: 'groundnut', name: 'Groundnut', icon: '🥜', color: '#B45309', lightColor: '#FEF3C7', nameMr: 'भुईमूग', nameHi: 'मूंगफली' }
  ];

  // Irrigation data for different crops
  const irrigationData = {
    grapes: {
      rainProbability: 40,
      soilMoisture: 55,
      optimalMoisture: 75,
      moistureStatus: 'warning',
      temperature: 28,
      warnings: [
        { severity: 'safe', time: 'Now', temp: 24, message: 'Normal range for grapes' },
        { severity: 'warning', time: '2 PM', temp: 32, message: 'High temperature expected' },
        { severity: 'critical', time: 'Friday', temp: 38, message: 'Heat wave alert!' }
      ],
      recommendation: {
        shouldIrrigate: true,
        duration: 30,
        currentMoisture: 55,
        requiredMoisture: 70,
        evapotranspiration: 5,
        windSpeed: 12,
        bestTime: '6-8 AM or 5-7 PM'
      },
      schedule: [
        { crop: 'Grapes', frequency: 'Every 3 days', next: 'Tomorrow 6 AM', icon: '🍇' },
        { crop: 'Onions', frequency: 'Every 2 days', next: 'Today 5 PM', icon: '🧅' },
        { crop: 'Tomatoes', frequency: 'Daily', next: 'Today 7 AM', icon: '🍅' }
      ],
      moistureForecast: [
        { day: 'Mon', moisture: 55 },
        { day: 'Tue', moisture: 52 },
        { day: 'Wed', moisture: 48 },
        { day: 'Thu', moisture: 45 },
        { day: 'Fri', moisture: 50 },
        { day: 'Sat', moisture: 55 },
        { day: 'Sun', moisture: 60 }
      ],
      systemStatus: {
        drip: 'active',
        sprinklers: 'standby',
        waterLevel: 75,
        pressure: 2.5
      }
    },
    onions: {
      rainProbability: 30,
      soilMoisture: 65,
      optimalMoisture: 70,
      moistureStatus: 'good',
      temperature: 26,
      warnings: [
        { severity: 'safe', time: 'Now', temp: 26, message: 'Normal range for onions' },
        { severity: 'warning', time: '3 PM', temp: 34, message: 'High temperature expected' }
      ],
      recommendation: {
        shouldIrrigate: false,
        duration: 0,
        currentMoisture: 65,
        requiredMoisture: 70,
        evapotranspiration: 3,
        windSpeed: 8,
        bestTime: 'Not needed today'
      },
      schedule: [
        { crop: 'Grapes', frequency: 'Every 3 days', next: 'Tomorrow 6 AM', icon: '🍇' },
        { crop: 'Onions', frequency: 'Every 2 days', next: 'Tomorrow 8 AM', icon: '🧅' },
        { crop: 'Tomatoes', frequency: 'Daily', next: 'Today 7 AM', icon: '🍅' }
      ],
      moistureForecast: [
        { day: 'Mon', moisture: 65 },
        { day: 'Tue', moisture: 63 },
        { day: 'Wed', moisture: 60 },
        { day: 'Thu', moisture: 58 },
        { day: 'Fri', moisture: 62 },
        { day: 'Sat', moisture: 65 },
        { day: 'Sun', moisture: 68 }
      ],
      systemStatus: {
        drip: 'active',
        sprinklers: 'active',
        waterLevel: 82,
        pressure: 2.8
      }
    },
    tomatoes: {
      rainProbability: 50,
      soilMoisture: 45,
      optimalMoisture: 80,
      moistureStatus: 'critical',
      temperature: 30,
      warnings: [
        { severity: 'warning', time: 'Now', temp: 30, message: 'High temperature for tomatoes' },
        { severity: 'critical', time: 'Thursday', temp: 40, message: 'Extreme heat expected' }
      ],
      recommendation: {
        shouldIrrigate: true,
        duration: 45,
        currentMoisture: 45,
        requiredMoisture: 80,
        evapotranspiration: 7,
        windSpeed: 15,
        bestTime: 'Immediately'
      },
      schedule: [
        { crop: 'Grapes', frequency: 'Every 3 days', next: 'Tomorrow 6 AM', icon: '🍇' },
        { crop: 'Onions', frequency: 'Every 2 days', next: 'Today 5 PM', icon: '🧅' },
        { crop: 'Tomatoes', frequency: 'Daily', next: 'Now', icon: '🍅' }
      ],
      moistureForecast: [
        { day: 'Mon', moisture: 45 },
        { day: 'Tue', moisture: 42 },
        { day: 'Wed', moisture: 40 },
        { day: 'Thu', moisture: 38 },
        { day: 'Fri', moisture: 45 },
        { day: 'Sat', moisture: 50 },
        { day: 'Sun', moisture: 55 }
      ],
      systemStatus: {
        drip: 'active',
        sprinklers: 'standby',
        waterLevel: 60,
        pressure: 2.2
      }
    },
    corn: {
      rainProbability: 20,
      soilMoisture: 60,
      optimalMoisture: 75,
      moistureStatus: 'warning',
      temperature: 32,
      warnings: [
        { severity: 'warning', time: 'Now', temp: 32, message: 'Temperature rising' }
      ],
      recommendation: {
        shouldIrrigate: true, duration: 40, currentMoisture: 60, requiredMoisture: 75,
        evapotranspiration: 6, windSpeed: 10, bestTime: '5-7 AM'
      },
      schedule: [
        { crop: 'Corn', frequency: 'Every 3 days', next: 'Tomorrow 5 AM', icon: '🌽' }
      ],
      moistureForecast: [
        { day: 'Mon', moisture: 60 }, { day: 'Tue', moisture: 55 }, { day: 'Wed', moisture: 50 },
        { day: 'Thu', moisture: 45 }, { day: 'Fri', moisture: 65 }, { day: 'Sat', moisture: 70 }, { day: 'Sun', moisture: 75 }
      ],
      systemStatus: { drip: 'standby', sprinklers: 'active', waterLevel: 80, pressure: 2.5 }
    },
    wheat: {
      rainProbability: 10,
      soilMoisture: 50,
      optimalMoisture: 60,
      moistureStatus: 'warning',
      temperature: 20,
      warnings: [
        { severity: 'safe', time: 'Now', temp: 20, message: 'Normal temperature' }
      ],
      recommendation: {
        shouldIrrigate: true, duration: 20, currentMoisture: 50, requiredMoisture: 60,
        evapotranspiration: 4, windSpeed: 8, bestTime: '8-10 AM'
      },
      schedule: [
        { crop: 'Wheat', frequency: 'Every 7 days', next: 'Today 8 AM', icon: '🌾' }
      ],
      moistureForecast: [
        { day: 'Mon', moisture: 50 }, { day: 'Tue', moisture: 48 }, { day: 'Wed', moisture: 45 },
        { day: 'Thu', moisture: 42 }, { day: 'Fri', moisture: 60 }, { day: 'Sat', moisture: 62 }, { day: 'Sun', moisture: 65 }
      ],
      systemStatus: { drip: 'standby', sprinklers: 'active', waterLevel: 70, pressure: 2.0 }
    },
    soybeans: {
      rainProbability: 35,
      soilMoisture: 65,
      optimalMoisture: 70,
      moistureStatus: 'good',
      temperature: 28,
      warnings: [
        { severity: 'safe', time: 'Now', temp: 28, message: 'Normal range' }
      ],
      recommendation: {
        shouldIrrigate: false, duration: 0, currentMoisture: 65, requiredMoisture: 70,
        evapotranspiration: 5, windSpeed: 12, bestTime: 'Not needed today'
      },
      schedule: [
        { crop: 'Soybeans', frequency: 'Every 4 days', next: 'Day after tomorrow', icon: '🌱' }
      ],
      moistureForecast: [
        { day: 'Mon', moisture: 65 }, { day: 'Tue', moisture: 62 }, { day: 'Wed', moisture: 58 },
        { day: 'Thu', moisture: 55 }, { day: 'Fri', moisture: 52 }, { day: 'Sat', moisture: 48 }, { day: 'Sun', moisture: 70 }
      ],
      systemStatus: { drip: 'active', sprinklers: 'standby', waterLevel: 85, pressure: 2.4 }
    },
    sugarcane: {
      rainProbability: 25,
      soilMoisture: 70,
      optimalMoisture: 80,
      moistureStatus: 'warning',
      temperature: 30,
      warnings: [{ severity: 'warning', time: 'Now', temp: 30, message: 'High water requirement' }],
      recommendation: { shouldIrrigate: true, duration: 60, currentMoisture: 70, requiredMoisture: 80, evapotranspiration: 8, windSpeed: 5, bestTime: 'Morning' },
      schedule: [{ crop: 'Sugarcane', frequency: 'Every 5 days', next: 'Today 8 AM', icon: '🎋' }],
      moistureForecast: [{ day: 'Mon', moisture: 70 }, { day: 'Tue', moisture: 68 }, { day: 'Wed', moisture: 65 }, { day: 'Thu', moisture: 60 }, { day: 'Fri', moisture: 85 }, { day: 'Sat', moisture: 88 }, { day: 'Sun', moisture: 85 }],
      systemStatus: { drip: 'standby', sprinklers: 'active', waterLevel: 60, pressure: 2.5 }
    },
    cotton: {
      rainProbability: 10,
      soilMoisture: 55,
      optimalMoisture: 60,
      moistureStatus: 'good',
      temperature: 35,
      warnings: [{ severity: 'safe', time: 'Now', temp: 35, message: 'Normal for cotton' }],
      recommendation: { shouldIrrigate: false, duration: 0, currentMoisture: 55, requiredMoisture: 60, evapotranspiration: 6, windSpeed: 8, bestTime: 'Not needed' },
      schedule: [{ crop: 'Cotton', frequency: 'Every 8 days', next: 'In 3 days', icon: '☁️' }],
      moistureForecast: [{ day: 'Mon', moisture: 55 }, { day: 'Tue', moisture: 54 }, { day: 'Wed', moisture: 52 }, { day: 'Thu', moisture: 50 }, { day: 'Fri', moisture: 48 }, { day: 'Sat', moisture: 65 }, { day: 'Sun', moisture: 62 }],
      systemStatus: { drip: 'active', sprinklers: 'standby', waterLevel: 75, pressure: 2.2 }
    },
    rice: {
      rainProbability: 60,
      soilMoisture: 95,
      optimalMoisture: 100,
      moistureStatus: 'good',
      temperature: 28,
      warnings: [{ severity: 'safe', time: 'Now', temp: 28, message: 'Keep water standing' }],
      recommendation: { shouldIrrigate: true, duration: 120, currentMoisture: 95, requiredMoisture: 100, evapotranspiration: 4, windSpeed: 3, bestTime: 'Anytime' },
      schedule: [{ crop: 'Rice', frequency: 'Daily', next: 'Now', icon: '🍚' }],
      moistureForecast: [{ day: 'Mon', moisture: 95 }, { day: 'Tue', moisture: 90 }, { day: 'Wed', moisture: 85 }, { day: 'Thu', moisture: 100 }, { day: 'Fri', moisture: 100 }, { day: 'Sat', moisture: 95 }, { day: 'Sun', moisture: 90 }],
      systemStatus: { drip: 'standby', sprinklers: 'active', waterLevel: 40, pressure: 2.8 }
    },
    pomegranate: {
      rainProbability: 5,
      soilMoisture: 50,
      optimalMoisture: 65,
      moistureStatus: 'warning',
      temperature: 32,
      warnings: [{ severity: 'warning', time: 'Now', temp: 32, message: 'Fruit size affected if dry' }],
      recommendation: { shouldIrrigate: true, duration: 45, currentMoisture: 50, requiredMoisture: 65, evapotranspiration: 5, windSpeed: 10, bestTime: '6 AM' },
      schedule: [{ crop: 'Pomegranate', frequency: 'Every 2 days', next: 'Tomorrow', icon: '🍎' }],
      moistureForecast: [{ day: 'Mon', moisture: 50 }, { day: 'Tue', moisture: 68 }, { day: 'Wed', moisture: 65 }, { day: 'Thu', moisture: 60 }, { day: 'Fri', moisture: 55 }, { day: 'Sat', moisture: 50 }, { day: 'Sun', moisture: 65 }],
      systemStatus: { drip: 'active', sprinklers: 'standby', waterLevel: 90, pressure: 2.5 }
    },
    bajra: {
      rainProbability: 15,
      soilMoisture: 45,
      optimalMoisture: 50,
      moistureStatus: 'good',
      temperature: 34,
      warnings: [{ severity: 'safe', time: 'Now', temp: 34, message: 'Drought tolerant' }],
      recommendation: { shouldIrrigate: false, duration: 0, currentMoisture: 45, requiredMoisture: 50, evapotranspiration: 7, windSpeed: 12, bestTime: 'Not needed' },
      schedule: [{ crop: 'Bajra', frequency: 'As needed', next: 'Unknown', icon: '🌾' }],
      moistureForecast: [{ day: 'Mon', moisture: 45 }, { day: 'Tue', moisture: 43 }, { day: 'Wed', moisture: 40 }, { day: 'Thu', moisture: 38 }, { day: 'Fri', moisture: 35 }, { day: 'Sat', moisture: 32 }, { day: 'Sun', moisture: 50 }],
      systemStatus: { drip: 'standby', sprinklers: 'standby', waterLevel: 80, pressure: 2.0 }
    },
    groundnut: {
      rainProbability: 20,
      soilMoisture: 55,
      optimalMoisture: 60,
      moistureStatus: 'good',
      temperature: 29,
      warnings: [{ severity: 'safe', time: 'Now', temp: 29, message: 'Ideal conditions' }],
      recommendation: { shouldIrrigate: false, duration: 0, currentMoisture: 55, requiredMoisture: 60, evapotranspiration: 4, windSpeed: 8, bestTime: 'Not needed' },
      schedule: [{ crop: 'Groundnut', frequency: 'Every 6 days', next: 'In 2 days', icon: '🥜' }],
      moistureForecast: [{ day: 'Mon', moisture: 55 }, { day: 'Tue', moisture: 52 }, { day: 'Wed', moisture: 50 }, { day: 'Thu', moisture: 62 }, { day: 'Fri', moisture: 60 }, { day: 'Sat', moisture: 58 }, { day: 'Sun', moisture: 55 }],
      systemStatus: { drip: 'active', sprinklers: 'standby', waterLevel: 85, pressure: 2.3 }
    }
  };

  const getLocationName = (id) => {
    const loc = locations.find(l => l.id === id);
    if (!loc) return id;
    if (language === 'mr') return loc.nameMr;
    if (language === 'hi') return loc.nameHi;
    return loc.name;
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

  const getStatusColor = (status) => {
    switch(status) {
      case 'safe': return 'text-green-600 bg-green-50 border-green-500';
      case 'good': return 'text-green-600 bg-green-50 border-green-500';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-500';
      case 'critical': return 'text-red-600 bg-red-50 border-red-500';
      default: return 'text-gray-600 bg-gray-50 border-gray-500';
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'safe': return 'bg-green-500 text-white';
      case 'good': return 'bg-green-500 text-white';
      case 'warning': return 'bg-yellow-500 text-white';
      case 'critical': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const currentData = irrigationData[selectedCrop];

  // Calculate rotation for gauge (0-180 degrees for half circle)
  const gaugeRotation = (currentData.rainProbability / 100) * 180;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F9F6] to-white">
      {/* Top Navbar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div onClick={goToHome} className="flex items-center gap-2 cursor-pointer">
              <div className="bg-[#1B5E20] p-2 rounded-xl shadow-lg">
                <FaLeaf className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold text-[#263238]">{t('agriSmart')}</span>
            </div>

            {/* Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#" onClick={(e) => { e.preventDefault(); goToHome(); }} className="text-[#546E7A] hover:text-[#1B5E20] transition-colors flex items-center gap-1"><FaHome /> {t('home')}</a>
              <a href="#" onClick={(e) => { e.preventDefault(); goToPlanting(); }} className="text-[#546E7A] hover:text-[#1B5E20] transition-colors flex items-center gap-1"><FaSeedling /> {t('plantingInsights')}</a>
              <a href="#" onClick={(e) => { e.preventDefault(); goToIrrigation(); }} className="text-[#263238] font-medium hover:text-[#1B5E20] transition-colors border-b-2 border-[#1B5E20] pb-1 flex items-center gap-1"><FaWater /> {t('irrigationControl')}</a>
              <a href="#" onClick={(e) => { e.preventDefault(); goToHarvest(); }} className="text-[#546E7A] hover:text-[#1B5E20] transition-colors flex items-center gap-1"><FaShoppingCart /> {t('harvestingUpdates')}</a>

            </div>

            {/* Right Icons */}
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
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={goToHome} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <FaArrowLeft className="text-[#546E7A] text-xl" />
          </button>
          <h1 className="text-2xl font-bold text-[#263238] flex items-center gap-2">
            <FaWater className="text-[#1B5E20]" />
            {getText('Irrigation Advisor', 'सिंचन सल्लागार', 'सिंचाई सलाहकार')}
          </h1>
        </div>

        {/* Crop Selector */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4">
            <label className="text-sm text-[#546E7A] flex items-center gap-2 mb-2">
              <FaSeedling className="text-[#1B5E20]" />
              {getText('Crop', 'पीक', 'फसल')}
            </label>
            <select 
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1B5E20] text-[#263238] font-medium"
            >
              {crops.map(crop => (
                <option key={crop.id} value={crop.id}>
                  {crop.icon} {getText(crop.name, crop.nameMr, crop.nameHi)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* FEATURE 1: Rain Probability Gauge */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <h2 className="text-lg font-bold text-[#263238] mb-4 flex items-center gap-2">
            <FaCloudRain className="text-[#1B5E20]" />
            {getText('Rain Probability', 'पावसाची शक्यता', 'बारिश की संभावना')} - {getText('Next 24 Hours', 'पुढील २४ तास', 'अगले २४ घंटे')}
          </h2>
          
          <div className="flex flex-col items-center">
            {/* Circular Gauge */}
            <div className="relative w-48 h-48 mb-4">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="10"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#1B5E20"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - currentData.rainProbability / 100)}`}
                  transform="rotate(-90 50 50)"
                />
                {/* Text in center */}
                <text
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-2xl font-bold fill-[#263238]"
                >
                  {currentData.rainProbability}%
                </text>
              </svg>
            </div>
            <p className="text-lg font-semibold text-[#263238] flex items-center gap-2">
              <FaCloudRain className="text-[#1B5E20]" />
              {currentData.rainProbability}% {getText('Chance of Rain', 'पावसाची शक्यता', 'बारिश की संभावना')}
            </p>
          </div>
        </div>

        {/* FEATURE 2: Soil Moisture Indicator */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <h2 className="text-lg font-bold text-[#263238] mb-4 flex items-center gap-2">
            <FaTint className="text-[#1B5E20]" />
            {getText('Soil Moisture', 'माती ओलावा', 'मिट्टी की नमी')} - {getCropName(selectedCrop)}
          </h2>
          
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-[#546E7A]">{getText('Current Level', 'सध्याची पातळी', 'वर्तमान स्तर')}</span>
              <span className={`text-sm font-bold px-2 py-1 rounded-full ${getStatusBadge(currentData.moistureStatus)}`}>
                {currentData.moistureStatus === 'good' ? getText('Good', 'चांगले', 'अच्छा') :
                 currentData.moistureStatus === 'warning' ? getText('Warning', 'सावधान', 'चेतावनी') :
                 getText('Critical', 'गंभीर', 'गंभीर')}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className={`h-4 rounded-full transition-all ${
                  currentData.moistureStatus === 'good' ? 'bg-green-500' :
                  currentData.moistureStatus === 'warning' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${(currentData.soilMoisture / currentData.optimalMoisture) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-[#546E7A]">{getText('Current', 'सध्याचे', 'वर्तमान')}: {currentData.soilMoisture}%</span>
              <span className="text-[#546E7A]">{getText('Optimal', 'आदर्श', 'आदर्श')}: {currentData.optimalMoisture}%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F5F9F6] rounded-lg p-3">
              <p className="text-xs text-[#546E7A]">{getText('Deficit', 'उणीव', 'कमी')}</p>
              <p className="text-lg font-semibold text-[#263238]">{currentData.optimalMoisture - currentData.soilMoisture}%</p>
            </div>
            <div className="bg-[#F5F9F6] rounded-lg p-3">
              <p className="text-xs text-[#546E7A]">{getText('Status', 'स्थिती', 'स्थिति')}</p>
              <p className={`text-lg font-semibold ${
                currentData.moistureStatus === 'good' ? 'text-green-600' :
                currentData.moistureStatus === 'warning' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {currentData.moistureStatus === 'good' ? getText('Good', 'चांगले', 'अच्छा') :
                 currentData.moistureStatus === 'warning' ? getText('Warning', 'सावधान', 'चेतावनी') :
                 getText('Critical', 'गंभीर', 'गंभीर')}
              </p>
            </div>
          </div>
        </div>

        {/* FEATURE 3: Heat/Temperature Warnings */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <h2 className="text-lg font-bold text-[#263238] mb-4 flex items-center gap-2">
            <FaThermometerHalf className="text-[#1B5E20]" />
            {getText('Temperature Warnings', 'तापमान इशारे', 'तापमान चेतावनी')}
          </h2>

          <div className="space-y-3">
            {currentData.warnings.map((warning, idx) => (
              <div key={idx} className={`p-4 rounded-lg border-l-4 ${
                warning.severity === 'safe' ? 'border-green-500 bg-green-50' :
                warning.severity === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                'border-red-500 bg-red-50'
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${
                    warning.severity === 'safe' ? 'bg-green-100 text-green-600' :
                    warning.severity === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    <FaThermometerHalf />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className={`font-semibold ${
                        warning.severity === 'safe' ? 'text-green-700' :
                        warning.severity === 'warning' ? 'text-yellow-700' :
                        'text-red-700'
                      }`}>
                        {warning.time}: {warning.temp}°C
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        warning.severity === 'safe' ? 'bg-green-500 text-white' :
                        warning.severity === 'warning' ? 'bg-yellow-500 text-white' :
                        'bg-red-500 text-white'
                      }`}>
                        {warning.severity === 'safe' ? getText('SAFE', 'सुरक्षित', 'सुरक्षित') :
                         warning.severity === 'warning' ? getText('WARNING', 'सावधान', 'चेतावनी') :
                         getText('CRITICAL', 'गंभीर', 'गंभीर')}
                      </span>
                    </div>
                    <p className="text-sm text-[#263238] mt-1">{warning.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURE 4: Daily Irrigation Recommendation */}
        <div className="bg-gradient-to-r from-[#1B5E20] to-[#4CAF50] rounded-2xl shadow-xl p-6 mb-6 text-white">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FaCheckCircle className="text-[#FBC02D]" />
            {getText('Daily Irrigation Recommendation', 'दैनिक सिंचन शिफारस', 'दैनिक सिंचाई सिफारिश')}
          </h2>

          <div className="bg-white/10 rounded-xl p-5">
            <div className="text-center mb-4">
              <p className="text-2xl font-bold mb-2">
                {getText('Should I irrigate today?', 'आज सिंचन करावे का?', 'क्या आज सिंचाई करें?')}
              </p>
              <p className="text-4xl font-bold mb-2">
                {currentData.recommendation.shouldIrrigate 
                  ? `✅ ${getText('YES', 'होय', 'हाँ')} - ${currentData.recommendation.duration} ${getText('minutes', 'मिनिटे', 'मिनट')}`
                  : `❌ ${getText('NO', 'नाही', 'नहीं')}`}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-xs opacity-80">{getText('Current Moisture', 'सध्याचा ओलावा', 'वर्तमान नमी')}</p>
                <p className="text-lg font-semibold">{currentData.recommendation.currentMoisture}%</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-xs opacity-80">{getText('Required', 'आवश्यक', 'आवश्यक')}</p>
                <p className="text-lg font-semibold">{currentData.recommendation.requiredMoisture}%</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-xs opacity-80">{getText('Evapotranspiration', 'बाष्पीभवन', 'वाष्पीकरण')}</p>
                <p className="text-lg font-semibold">{currentData.recommendation.evapotranspiration}mm</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-xs opacity-80">{getText('Wind Speed', 'वाऱ्याचा वेग', 'हवा की गति')}</p>
                <p className="text-lg font-semibold">{currentData.recommendation.windSpeed} km/h</p>
              </div>
            </div>

            <p className="text-sm text-white/80 mb-4">
              <FaClock className="inline mr-2" />
              {getText('Best time', 'सर्वोत्तम वेळ', 'सर्वोत्तम समय')}: {currentData.recommendation.bestTime}
            </p>

            <button className="w-full bg-[#FBC02D] text-[#263238] py-3 rounded-lg font-semibold hover:bg-[#F9A825] transition-colors flex items-center justify-center gap-2">
              <FaWater />
              {getText('Start Irrigation Now', 'आता सिंचन सुरू करा', 'अभी सिंचाई शुरू करें')}
            </button>
          </div>
        </div>

        {/* Crop-wise Irrigation Schedule */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <h2 className="text-lg font-bold text-[#263238] mb-4 flex items-center gap-2">
            <FaClock className="text-[#1B5E20]" />
            {getText('Irrigation Schedule', 'सिंचन वेळापत्रक', 'सिंचाई अनुसूची')}
          </h2>

          <div className="space-y-3">
            {currentData.schedule.filter(item => item.crop.toLowerCase() === selectedCrop).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-[#F5F9F6] rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-medium text-[#263238]">
                      {getText(item.crop, 
                        item.crop === 'Grapes' ? 'द्राक्षे' : item.crop === 'Onions' ? 'कांदे' : 'टोमॅटो',
                        item.crop === 'Grapes' ? 'अंगूर' : item.crop === 'Onions' ? 'प्याज' : 'टमाटर'
                      )}
                    </p>
                    <p className="text-xs text-[#546E7A]">{item.frequency}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#1B5E20] text-sm">{item.next}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day Soil Moisture Forecast */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <h2 className="text-lg font-bold text-[#263238] mb-4 flex items-center gap-2">
            <FaChartLine className="text-[#1B5E20]" />
            {getText('7-Day Moisture Forecast', '७ दिवसांचा ओलावा अंदाज', '७ दिन का नमी पूर्वानुमान')}
          </h2>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentData.moistureForecast}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="day" tick={{ fill: '#546E7A', fontSize: 12 }} />
                <YAxis tick={{ fill: '#546E7A', fontSize: 12 }} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="moisture" 
                  stroke="#1B5E20" 
                  strokeWidth={3}
                  dot={{ fill: '#1B5E20', r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Irrigation System Status */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <h2 className="text-lg font-bold text-[#263238] mb-4 flex items-center gap-2">
            <FaTachometerAlt className="text-[#1B5E20]" />
            {getText('System Status', 'प्रणाली स्थिती', 'सिस्टम स्थिति')}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#F5F9F6] rounded-xl p-4">
              <p className="text-sm text-[#546E7A] mb-2">{getText('Drip Irrigation', 'ठिबक सिंचन', 'ड्रिप सिंचाई')}</p>
              <p className={`font-semibold ${currentData.systemStatus.drip === 'active' ? 'text-green-600' : 'text-yellow-600'}`}>
                {currentData.systemStatus.drip === 'active' 
                  ? getText('✅ Active', '✅ सक्रिय', '✅ सक्रिय')
                  : getText('⏸️ Standby', '⏸️ स्टँडबाय', '⏸️ स्टैंडबाय')}
              </p>
            </div>
            <div className="bg-[#F5F9F6] rounded-xl p-4">
              <p className="text-sm text-[#546E7A] mb-2">{getText('Sprinklers', 'फवारणी', 'स्प्रिंकलर')}</p>
              <p className={`font-semibold ${currentData.systemStatus.sprinklers === 'active' ? 'text-green-600' : 'text-yellow-600'}`}>
                {currentData.systemStatus.sprinklers === 'active' 
                  ? getText('✅ Active', '✅ सक्रिय', '✅ सक्रिय')
                  : getText('⏸️ Standby', '⏸️ स्टँडबाय', '⏸️ स्टैंडबाय')}
              </p>
            </div>
            <div className="bg-[#F5F9F6] rounded-xl p-4">
              <p className="text-sm text-[#546E7A] mb-2">{getText('Water Level', 'पाणी पातळी', 'जल स्तर')}</p>
              <p className="font-semibold text-[#263238]">{currentData.systemStatus.waterLevel}%</p>
            </div>
            <div className="bg-[#F5F9F6] rounded-xl p-4">
              <p className="text-sm text-[#546E7A] mb-2">{getText('Pressure', 'दाब', 'दबाव')}</p>
              <p className="font-semibold text-[#263238]">{currentData.systemStatus.pressure} bar</p>
            </div>
          </div>
        </div>

        {/* Today's Irrigation Decision Card */}
        <div className="bg-[#FFF9E7] rounded-2xl shadow-xl p-6 mb-6 border border-[#FBC02D]/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#FBC02D] p-3 rounded-lg">
              <FaWater className="text-white text-xl" />
            </div>
            <h2 className="text-xl font-semibold text-[#263238]">
              {getText('Today\'s Irrigation Decision', 'आजचा सिंचन निर्णय', 'आज का सिंचाई निर्णय')}
            </h2>
          </div>
          
          <div className="bg-white rounded-lg p-5">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">
                {currentData.recommendation.shouldIrrigate ? '💧' : '✅'}
              </span>
              <div>
                <p className="text-2xl font-bold text-[#1B5E20]">
                  {currentData.recommendation.shouldIrrigate 
                    ? getText('IRRIGATE TODAY', 'आज सिंचन करा', 'आज सिंचाई करें')
                    : getText('NO IRRIGATION NEEDED', 'सिंचन आवश्यक नाही', 'सिंचाई आवश्यक नहीं')}
                </p>
                {currentData.recommendation.shouldIrrigate && (
                  <p className="text-sm text-gray-500 mt-1">
                    {getText('30 minutes recommended', '३० मिनिटे शिफारस', '३० मिनट सिफारिश')}
                  </p>
                )}
              </div>
            </div>
            
            <p className="text-[#546E7A] mb-4">
              {currentData.recommendation.shouldIrrigate
                ? getText(
                    `Best time: ${currentData.recommendation.bestTime}`,
                    `सर्वोत्तम वेळ: ${currentData.recommendation.bestTime}`,
                    `सर्वोत्तम समय: ${currentData.recommendation.bestTime}`
                  )
                : getText(
                    'Soil moisture is adequate. Check again tomorrow.',
                    'मातीतील ओलावा पुरेसा आहे. उद्या पुन्हा तपासा.',
                    'मिट्टी की नमी पर्याप्त है। कल फिर जांच करें।'
                  )}
            </p>
            
            <button className="w-full bg-[#1B5E20] text-white py-3 rounded-lg font-medium hover:bg-[#2E7D32] transition-colors flex items-center justify-center gap-2">
              <FaBell />
              {getText('Set Reminder', 'स्मरणपत्र सेट करा', 'रिमाइंडर सेट करें')}
            </button>
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
            <button onClick={goToIrrigation} className="flex flex-col items-center text-[#1B5E20]">
              <FaWater className="text-2xl" />
              <span className="text-xs mt-1 font-medium">{t('irrigationControl')}</span>
            </button>
            <button onClick={goToHarvest} className="flex flex-col items-center text-[#546E7A] hover:text-[#1B5E20] transition-colors">
              <FaShoppingCart className="text-2xl" />
              <span className="text-xs mt-1">{t('harvestingUpdates')}</span>
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

export default Irrigation;