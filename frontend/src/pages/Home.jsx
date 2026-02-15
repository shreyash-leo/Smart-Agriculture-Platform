import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  FaBell, 
  FaSeedling, 
  FaChartLine,
  FaWater,
  FaLeaf,
  FaCalendarAlt,
  FaPercentage,
  FaChevronRight,
  FaUserCircle,
  FaTint,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaMapMarkerAlt,
  FaHome,
  FaShoppingCart
} from 'react-icons/fa';
import { WiDaySunny } from 'react-icons/wi';
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Home = () => {
  const [notifications] = useState(3);
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate('/profile');
  };

  const goToPlanting = () => {
    navigate('/planting');
  };

  const goToIrrigation = () => {
    navigate('/irrigation');
  };

  const goToHarvest = () => {
    navigate('/harvest');
  };

  const goToHome = () => {
    navigate('/');
  };

  // Weather data with translations
  const weatherData = {
    current: {
      temp: 28,
      condition: t('sunny'),
      icon: <WiDaySunny className="text-5xl text-[#FBC02D]" />,
      humidity: 65,
      windSpeed: 12,
      rainChance: 20,
      location: t('location'),
      date: language === 'en' ? 'Tuesday, 12 March' : 
             language === 'hi' ? 'मंगलवार, 12 मार्च' : 
             'मंगळवार, 12 मार्च'
    },
    forecast: [
      { day: t('mon'), temp: 28, icon: '☀️' },
      { day: t('tue'), temp: 27, icon: '⛅' },
      { day: t('wed'), temp: 26, icon: '☁️' },
      { day: t('thu'), temp: 25, icon: '🌧️' },
      { day: t('fri'), temp: 27, icon: '☀️' }
    ]
  };

  // Crop distribution data with translated names
  const cropDistributionData = [
    { name: t('corn'), value: 45, color: '#4CAF50' },
    { name: t('wheat'), value: 30, color: '#FBC02D' },
    { name: t('soybeans'), value: 25, color: '#1B5E20' }
  ];

  // Price trend data with translated months
  const priceTrendData = [
    { month: t('jan'), corn: 40, wheat: 30, soybeans: 25 },
    { month: t('feb'), corn: 45, wheat: 32, soybeans: 28 },
    { month: t('mar'), corn: 48, wheat: 35, soybeans: 30 },
    { month: t('apr'), corn: 52, wheat: 38, soybeans: 32 },
    { month: t('may'), corn: 55, wheat: 40, soybeans: 35 },
    { month: t('jun'), corn: 58, wheat: 42, soybeans: 38 }
  ];

  // Yield comparison data with translated crop names
  const yieldData = [
    { crop: t('corn'), current: 85, projected: 92 },
    { crop: t('wheat'), current: 78, projected: 88 },
    { crop: t('soybeans'), current: 72, projected: 84 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F9F6] to-white">
      {/* Top Navbar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              onClick={goToHome}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="bg-[#1B5E20] p-2 rounded-xl shadow-lg">
                <FaLeaf className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold text-[#263238]">{t('agriSmart')}</span>
            </div>

            {/* Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); goToHome(); }}
                className="text-[#263238] font-medium hover:text-[#1B5E20] transition-colors border-b-2 border-[#1B5E20] pb-1"
              >
                <FaHome className="inline mr-1" /> {t('home')}
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); goToPlanting(); }}
                className="text-[#546E7A] hover:text-[#1B5E20] transition-colors flex items-center gap-1"
              >
                <FaSeedling /> {t('plantingInsights')}
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); goToIrrigation(); }}
                className="text-[#546E7A] hover:text-[#1B5E20] transition-colors flex items-center gap-1"
              >
                <FaWater /> {t('irrigationControl')}
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); goToHarvest(); }}
                className="text-[#546E7A] hover:text-[#1B5E20] transition-colors flex items-center gap-1"
              >
                <FaShoppingCart /> {t('harvestingUpdates')}
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); goToProfile(); }}
                className="text-[#546E7A] hover:text-[#1B5E20] transition-colors flex items-center gap-1"
              >
                <FaUserCircle /> {t('profile')}
              </a>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                <FaBell className="text-[#546E7A] text-xl" />
                {notifications > 0 && (
                  <span className="absolute top-1 right-1 bg-[#FBC02D] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <div 
                onClick={goToProfile}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-[#1B5E20] to-[#4CAF50] p-0.5 cursor-pointer hover:scale-105 transition-transform duration-200"
              >
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <FaUserCircle className="text-[#1B5E20] text-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#263238]">{t('welcomeBack')} John</h1>
          <p className="text-[#546E7A] text-sm mt-1">
            {t('farmHealthy')} <span className="text-[#FBC02D] font-semibold">{notifications}</span> {t('notifications')}
          </p>
        </div>

        {/* Weather Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#263238] mb-4">{t('weatherForecast')}</h2>
          
          {/* Main Weather Card */}
          <div className="bg-[#1B5E20] rounded-xl shadow-xl p-5 mb-4 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm opacity-90 font-medium flex items-center gap-1">
                  <FaMapMarkerAlt className="text-xs" /> {weatherData.current.location}
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-bold">{weatherData.current.temp}°C</span>
                  <span className="text-base flex items-center gap-1">
                    {weatherData.current.icon} {weatherData.current.condition}
                  </span>
                </div>
                <p className="text-xs opacity-80 mt-1">{weatherData.current.date}</p>
              </div>
              
              <div className="flex gap-4">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="text-center">
                    <p className="text-xs opacity-80">{day.day}</p>
                    <p className="font-semibold text-sm">{day.temp}°</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5-Day Forecast */}
          <div className="grid grid-cols-5 gap-3">
            {weatherData.forecast.map((day, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-3 text-center hover:shadow-lg transition-all">
                <p className="text-[#546E7A] text-sm font-medium">{day.day}</p>
                <p className="text-2xl my-1">{day.icon}</p>
                <p className="font-semibold text-[#263238]">{day.temp}°C</p>
              </div>
            ))}
          </div>
        </div>

        {/* Three Main Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Planting Card */}
          <div className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
            <div className="bg-[#1B5E20]/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#1B5E20] transition-colors">
              <FaSeedling className="text-[#1B5E20] text-2xl group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#263238] mb-2">{t('plantingInsights')}</h3>
            <p className="text-[#546E7A] text-sm mb-4">{t('bestCrops')}</p>
            <button 
              onClick={goToPlanting}
              className="text-[#1B5E20] font-medium flex items-center gap-2 hover:gap-3 transition-all"
            >
              {t('viewRecommendations')} <FaChevronRight className="text-xs" />
            </button>
          </div>

          {/* Harvesting Card */}
          <div className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
            <div className="bg-[#1B5E20]/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#1B5E20] transition-colors">
              <FaLeaf className="text-[#1B5E20] text-2xl group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#263238] mb-2">{t('harvestingUpdates')}</h3>
            <p className="text-[#546E7A] text-sm mb-4">{t('cropMaturity')}</p>
            <button 
              onClick={goToHarvest}
              className="text-[#1B5E20] font-medium flex items-center gap-2 hover:gap-3 transition-all"
            >
              {t('checkYield')} <FaChevronRight className="text-xs" />
            </button>
          </div>

          {/* Irrigation Card */}
          <div className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
            <div className="bg-[#1B5E20]/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#1B5E20] transition-colors">
              <FaWater className="text-[#1B5E20] text-2xl group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#263238] mb-2">{t('irrigationControl')}</h3>
            <p className="text-[#546E7A] text-sm mb-4">{t('soilMoisture')}</p>
            <button 
              onClick={goToIrrigation}
              className="text-[#1B5E20] font-medium flex items-center gap-2 hover:gap-3 transition-all"
            >
              {t('manageWatering')} <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>

        {/* Market Analytics Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#263238] mb-6">{t('marketInsights')}</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart - Crop Distribution */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-[#263238] mb-4">{t('cropDistribution')}</h3>
              <p className="text-[#546E7A] text-sm mb-4">{t('acresTotal')}</p>
              <div className="flex items-center gap-8">
                <div className="w-48 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={cropDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {cropDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-3">
                  {cropDistributionData.map((crop, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: crop.color }}></div>
                        <span className="text-[#263238]">{crop.name}</span>
                      </div>
                      <span className="text-[#1B5E20] font-semibold">{crop.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Line Chart - Price Trends */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-[#263238] mb-4">{t('priceTrends')}</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                    <XAxis dataKey="month" tick={{ fill: '#546E7A', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#546E7A', fontSize: 12 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="corn" stroke="#4CAF50" strokeWidth={2} dot={{ fill: '#4CAF50' }} />
                    <Line type="monotone" dataKey="wheat" stroke="#FBC02D" strokeWidth={2} dot={{ fill: '#FBC02D' }} />
                    <Line type="monotone" dataKey="soybeans" stroke="#1B5E20" strokeWidth={2} dot={{ fill: '#1B5E20' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart - Yield Comparison */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-[#263238] mb-4">{t('yieldComparison')}</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yieldData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                    <XAxis dataKey="crop" tick={{ fill: '#546E7A', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#546E7A', fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="current" fill="#4CAF50" radius={[4, 4, 0, 0]} barSize={40} />
                    <Bar dataKey="projected" fill="#FBC02D" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="relative bg-gradient-to-r from-[#1B5E20] to-[#4CAF50] rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="grid" patternUnits="userSpaceOnUse" width="20" height="20">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
          
          <div className="relative flex flex-col md:flex-row items-center justify-between p-8 text-white">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{t('aiTitle')}</h2>
              <p className="text-white/90">{t('aiDescription')}</p>
            </div>
            <button className="bg-[#FBC02D] text-[#263238] px-8 py-3 rounded-xl font-semibold hover:bg-[#F9A825] transform hover:scale-105 transition-all shadow-lg flex items-center gap-2">
              {t('exploreDashboard')} <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Footer - UPDATED with working links and removed Market */}
        <footer className="border-t border-gray-200 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <h3 className="font-bold text-[#263238] mb-3">{t('about')}</h3>
              <p className="text-sm text-[#546E7A] leading-relaxed">
                {t('aboutText')}
              </p>
            </div>

            {/* Quick Links - UPDATED with working navigation */}
            <div>
              <h3 className="font-bold text-[#263238] mb-3">{t('quickLinks')}</h3>
              <ul className="space-y-2 text-sm text-[#546E7A]">
                <li 
                  onClick={goToHome}
                  className="hover:text-[#1B5E20] cursor-pointer transition-colors"
                >
                  {t('home')}
                </li>
                <li 
                  onClick={goToPlanting}
                  className="hover:text-[#1B5E20] cursor-pointer transition-colors"
                >
                  {t('plantingInsights')}
                </li>
                <li 
                  onClick={goToIrrigation}
                  className="hover:text-[#1B5E20] cursor-pointer transition-colors"
                >
                  {t('irrigationControl')}
                </li>
                <li 
                  onClick={goToHarvest}
                  className="hover:text-[#1B5E20] cursor-pointer transition-colors"
                >
                  {t('harvestingUpdates')}
                </li>
                <li 
                  onClick={goToProfile}
                  className="hover:text-[#1B5E20] cursor-pointer transition-colors"
                >
                  {t('profile')}
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-bold text-[#263238] mb-3">{t('support')}</h3>
              <ul className="space-y-2 text-sm text-[#546E7A]">
                <li className="hover:text-[#1B5E20] cursor-pointer transition-colors">{t('contactUs')}</li>
                <li className="hover:text-[#1B5E20] cursor-pointer transition-colors">{t('faq')}</li>
                <li className="hover:text-[#1B5E20] cursor-pointer transition-colors">{t('privacyPolicy')}</li>
                <li className="hover:text-[#1B5E20] cursor-pointer transition-colors">{t('termsOfService')}</li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-bold text-[#263238] mb-3">{t('connect')}</h3>
              <div className="flex gap-3 mb-3">
                <div className="w-10 h-10 bg-[#1B5E20]/10 rounded-full flex items-center justify-center hover:bg-[#1B5E20] hover:text-white transition-colors cursor-pointer">
                  <FaFacebookF />
                </div>
                <div className="w-10 h-10 bg-[#1B5E20]/10 rounded-full flex items-center justify-center hover:bg-[#1B5E20] hover:text-white transition-colors cursor-pointer">
                  <FaTwitter />
                </div>
                <div className="w-10 h-10 bg-[#1B5E20]/10 rounded-full flex items-center justify-center hover:bg-[#1B5E20] hover:text-white transition-colors cursor-pointer">
                  <FaLinkedinIn />
                </div>
                <div className="w-10 h-10 bg-[#1B5E20]/10 rounded-full flex items-center justify-center hover:bg-[#1B5E20] hover:text-white transition-colors cursor-pointer">
                  <FaInstagram />
                </div>
              </div>
              <p className="text-sm text-[#546E7A]">© 2024 {t('agriSmart')}. {t('allRightsReserved')}</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;