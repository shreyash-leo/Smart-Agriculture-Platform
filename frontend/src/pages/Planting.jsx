import React, { useState } from 'react';
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
  FaFlask
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Planting = () => {
  const [notifications] = useState(2);
  const [selectedCrop, setSelectedCrop] = useState('grapes');
  const [selectedLocation, setSelectedLocation] = useState('dindori');
  const [selectedSeason, setSelectedSeason] = useState('kharif');
  const [selectedYear, setSelectedYear] = useState(2024);
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const locations = [
    { id: 'dindori', name: 'Dindori', nameMr: 'दिंडोरी', nameHi: 'दिंडोरी' },
    { id: 'niphad', name: 'Niphad', nameMr: 'निफाड', nameHi: 'निफाड' },
    { id: 'sinnar', name: 'Sinnar', nameMr: 'सिन्नर', nameHi: 'सिन्नर' },
    { id: 'igatpuri', name: 'Igatpuri', nameMr: 'इगतपुरी', nameHi: 'इगतपुरी' },
    { id: 'nashik', name: 'Nashik', nameMr: 'नाशिक', nameHi: 'नाशिक' }
  ];

  const seasons = [
    { id: 'kharif', name: 'Kharif', nameMr: 'खरीप', nameHi: 'खरीफ' },
    { id: 'rabi', name: 'Rabi', nameMr: 'रब्बी', nameHi: 'रबी' },
    { id: 'zaid', name: 'Zaid', nameMr: 'उन्हाळी', nameHi: 'ज़ैद' }
  ];

  const years = [2024, 2025, 2026, 2027];

  const crops = [
    { id: 'grapes', name: 'Grapes', icon: '🍇', nameMr: 'द्राक्षे', nameHi: 'अंगूर' },
    { id: 'onions', name: 'Onions', icon: '🧅', nameMr: 'कांदे', nameHi: 'प्याज' },
    { id: 'tomatoes', name: 'Tomatoes', icon: '🍅', nameMr: 'टोमॅटो', nameHi: 'टमाटर' }
  ];

  // Navigation functions
  const goToHome = () => {
    navigate('/');
  };

  const goToPlanting = () => {
    navigate('/planting');
  };

  const goToIrrigation = () => {
    navigate('/irrigation');
  };

  const goToHarvesting = () => {
    navigate('/harvesting');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  // Dynamic calendar data based on selected year
  const getCropData = (year) => {
    // This would come from API in real app
    if (year === 2024) {
      return {
        grapes: {
          plantingWindow: {
            start: '15 March',
            end: '30 April',
            startMr: '१५ मार्च',
            endMr: '३० एप्रिल',
            startHi: '१५ मार्च',
            endHi: '३० अप्रैल',
            successRate: 85,
            idealTemp: '20-28°C',
            soilMoisture: 'Optimal',
            daysRemaining: 12
          },
          timeline: {
            jan: 'best', feb: 'best', mar: 'best', apr: 'best', may: 'okay',
            jun: 'not', jul: 'not', aug: 'not', sep: 'not', oct: 'not', nov: 'not', dec: 'not'
          },
          tips: [
            'Use disease-resistant varieties',
            'Maintain 6-8ft plant spacing',
            'Apply organic mulch',
            'Install drip irrigation',
            'Prune regularly for better yield'
          ],
          soilRequirements: {
            ph: '6.0-7.0',
            nitrogen: 'Medium',
            phosphorus: 'High',
            potassium: 'High'
          }
        },
        onions: {
          plantingWindow: {
            start: '1 January',
            end: '31 July',
            startMr: '१ जानेवारी',
            endMr: '३१ जुलै',
            startHi: '१ जनवरी',
            endHi: '३१ जुलाई',
            successRate: 80,
            idealTemp: '15-25°C',
            soilMoisture: 'Moderate',
            daysRemaining: 45
          },
          timeline: {
            jan: 'best', feb: 'best', mar: 'best', apr: 'best', may: 'best', jun: 'best', jul: 'best',
            aug: 'not', sep: 'not', oct: 'not', nov: 'not', dec: 'not'
          },
          tips: [
            'Plant in well-drained soil',
            'Add nitrogen-rich fertilizer',
            'Water regularly',
            'Remove weeds early',
            'Harvest when tops fall over'
          ],
          soilRequirements: {
            ph: '6.2-6.8',
            nitrogen: 'High',
            phosphorus: 'Medium',
            potassium: 'Medium'
          }
        },
        tomatoes: {
          plantingWindow: {
            start: '1 March',
            end: '31 July',
            startMr: '१ मार्च',
            endMr: '३१ जुलै',
            startHi: '१ मार्च',
            endHi: '३१ जुलाई',
            successRate: 82,
            idealTemp: '18-27°C',
            soilMoisture: 'Optimal',
            daysRemaining: 25
          },
          timeline: {
            jan: 'not', feb: 'not', mar: 'best', apr: 'best', may: 'best', jun: 'best', jul: 'best',
            aug: 'okay', sep: 'okay', oct: 'not', nov: 'not', dec: 'not'
          },
          tips: [
            'Stake plants for support',
            'Water at base not leaves',
            'Mulch to retain moisture',
            'Rotate crops yearly',
            'Remove suckers for better growth'
          ],
          soilRequirements: {
            ph: '6.0-6.8',
            nitrogen: 'Medium',
            phosphorus: 'High',
            potassium: 'High'
          }
        }
      };
    } else if (year === 2025) {
      // 2025 data - shifted windows
      return {
        grapes: {
          plantingWindow: {
            start: '10 March',
            end: '25 April',
            startMr: '१० मार्च',
            endMr: '२५ एप्रिल',
            startHi: '१० मार्च',
            endHi: '२५ अप्रैल',
            successRate: 88,
            idealTemp: '21-29°C',
            soilMoisture: 'Optimal',
            daysRemaining: 8
          },
          timeline: {
            jan: 'best', feb: 'best', mar: 'best', apr: 'best', may: 'best', jun: 'okay',
            jul: 'not', aug: 'not', sep: 'not', oct: 'not', nov: 'not', dec: 'not'
          },
          tips: [
            'Use disease-resistant varieties',
            'Maintain 6-8ft plant spacing',
            'Apply organic mulch',
            'Install drip irrigation',
            'Prune regularly for better yield'
          ],
          soilRequirements: {
            ph: '6.0-7.0',
            nitrogen: 'Medium',
            phosphorus: 'High',
            potassium: 'High'
          }
        },
        onions: {
          plantingWindow: {
            start: '5 January',
            end: '25 July',
            startMr: '५ जानेवारी',
            endMr: '२५ जुलै',
            startHi: '५ जनवरी',
            endHi: '२५ जुलाई',
            successRate: 83,
            idealTemp: '16-26°C',
            soilMoisture: 'Moderate',
            daysRemaining: 38
          },
          timeline: {
            jan: 'best', feb: 'best', mar: 'best', apr: 'best', may: 'best', jun: 'best', jul: 'best', aug: 'okay',
            sep: 'not', oct: 'not', nov: 'not', dec: 'not'
          },
          tips: [
            'Plant in well-drained soil',
            'Add nitrogen-rich fertilizer',
            'Water regularly',
            'Remove weeds early',
            'Harvest when tops fall over'
          ],
          soilRequirements: {
            ph: '6.2-6.8',
            nitrogen: 'High',
            phosphorus: 'Medium',
            potassium: 'Medium'
          }
        },
        tomatoes: {
          plantingWindow: {
            start: '5 March',
            end: '25 July',
            startMr: '५ मार्च',
            endMr: '२५ जुलै',
            startHi: '५ मार्च',
            endHi: '२५ जुलाई',
            successRate: 85,
            idealTemp: '19-28°C',
            soilMoisture: 'Optimal',
            daysRemaining: 20
          },
          timeline: {
            jan: 'not', feb: 'okay', mar: 'best', apr: 'best', may: 'best', jun: 'best', jul: 'best', aug: 'best',
            sep: 'okay', oct: 'not', nov: 'not', dec: 'not'
          },
          tips: [
            'Stake plants for support',
            'Water at base not leaves',
            'Mulch to retain moisture',
            'Rotate crops yearly',
            'Remove suckers for better growth'
          ],
          soilRequirements: {
            ph: '6.0-6.8',
            nitrogen: 'Medium',
            phosphorus: 'High',
            potassium: 'High'
          }
        }
      };
    } else {
      // Default for other years
      return {
        grapes: {
          plantingWindow: {
            start: '15 March',
            end: '30 April',
            startMr: '१५ मार्च',
            endMr: '३० एप्रिल',
            startHi: '१५ मार्च',
            endHi: '३० अप्रैल',
            successRate: 85,
            idealTemp: '20-28°C',
            soilMoisture: 'Optimal',
            daysRemaining: 15
          },
          timeline: {
            jan: 'best', feb: 'best', mar: 'best', apr: 'best', may: 'okay',
            jun: 'not', jul: 'not', aug: 'not', sep: 'not', oct: 'not', nov: 'not', dec: 'not'
          },
          tips: [
            'Use disease-resistant varieties',
            'Maintain 6-8ft plant spacing',
            'Apply organic mulch',
            'Install drip irrigation',
            'Prune regularly for better yield'
          ],
          soilRequirements: {
            ph: '6.0-7.0',
            nitrogen: 'Medium',
            phosphorus: 'High',
            potassium: 'High'
          }
        },
        onions: {
          plantingWindow: {
            start: '1 January',
            end: '31 July',
            startMr: '१ जानेवारी',
            endMr: '३१ जुलै',
            startHi: '१ जनवरी',
            endHi: '३१ जुलाई',
            successRate: 80,
            idealTemp: '15-25°C',
            soilMoisture: 'Moderate',
            daysRemaining: 50
          },
          timeline: {
            jan: 'best', feb: 'best', mar: 'best', apr: 'best', may: 'best', jun: 'best', jul: 'best',
            aug: 'not', sep: 'not', oct: 'not', nov: 'not', dec: 'not'
          },
          tips: [
            'Plant in well-drained soil',
            'Add nitrogen-rich fertilizer',
            'Water regularly',
            'Remove weeds early',
            'Harvest when tops fall over'
          ],
          soilRequirements: {
            ph: '6.2-6.8',
            nitrogen: 'High',
            phosphorus: 'Medium',
            potassium: 'Medium'
          }
        },
        tomatoes: {
          plantingWindow: {
            start: '1 March',
            end: '31 July',
            startMr: '१ मार्च',
            endMr: '३१ जुलै',
            startHi: '१ मार्च',
            endHi: '३१ जुलाई',
            successRate: 82,
            idealTemp: '18-27°C',
            soilMoisture: 'Optimal',
            daysRemaining: 28
          },
          timeline: {
            jan: 'not', feb: 'not', mar: 'best', apr: 'best', may: 'best', jun: 'best', jul: 'best',
            aug: 'okay', sep: 'okay', oct: 'not', nov: 'not', dec: 'not'
          },
          tips: [
            'Stake plants for support',
            'Water at base not leaves',
            'Mulch to retain moisture',
            'Rotate crops yearly',
            'Remove suckers for better growth'
          ],
          soilRequirements: {
            ph: '6.0-6.8',
            nitrogen: 'Medium',
            phosphorus: 'High',
            potassium: 'High'
          }
        }
      };
    }
  };

  const cropData = getCropData(selectedYear);

  // Dynamic weather risks based on year
  const getWeatherRisks = (year) => {
    if (year === 2024) {
      return [
        { 
          period: 'Next 7 Days', 
          periodMr: 'पुढील ७ दिवस',
          periodHi: 'अगले ७ दिन',
          risk: 'high', 
          message: 'Heavy rain expected (40mm)', 
          messageMr: 'जोरदार पाऊस अपेक्षित (४० मिमी)',
          messageHi: 'भारी बारिश की संभावना (४० मिमी)',
          action: 'Delay planting by 5 days',
          actionMr: 'लागवड ५ दिवस लांबणीवर टाका',
          actionHi: 'रोपण ५ दिन विलंबित करें'
        },
        { 
          period: 'Week 2', 
          periodMr: 'दुसरा आठवडा',
          periodHi: 'दूसरा सप्ताह',
          risk: 'moderate', 
          message: 'Temperature fluctuation', 
          messageMr: 'तापमानात चढउतार',
          messageHi: 'तापमान में उतार-चढ़ाव',
          action: 'Monitor soil conditions',
          actionMr: 'मातीची स्थिती तपासा',
          actionHi: 'मिट्टी की स्थिति की निगरानी करें'
        },
        { 
          period: 'Week 3-4', 
          periodMr: 'तिसरा-चौथा आठवडा',
          periodHi: 'तीसरा-चौथा सप्ताह',
          risk: 'low', 
          message: 'Ideal conditions', 
          messageMr: 'आदर्श परिस्थिती',
          messageHi: 'आदर्श स्थितियाँ',
          action: 'Best time to start planting',
          actionMr: 'लागवड सुरू करण्यासाठी सर्वोत्तम वेळ',
          actionHi: 'रोपण शुरू करने का सबसे अच्छा समय'
        }
      ];
    } else if (year === 2025) {
      return [
        { 
          period: 'Next 7 Days', 
          periodMr: 'पुढील ७ दिवस',
          periodHi: 'अगले ७ दिन',
          risk: 'moderate', 
          message: 'Light rain expected (20mm)', 
          messageMr: 'हलका पाऊस अपेक्षित (२० मिमी)',
          messageHi: 'हल्की बारिश की संभावना (२० मिमी)',
          action: 'Good time for planting',
          actionMr: 'लागवडीसाठी चांगला वेळ',
          actionHi: 'रोपण के लिए अच्छा समय'
        },
        { 
          period: 'Week 2', 
          periodMr: 'दुसरा आठवडा',
          periodHi: 'दूसरा सप्ताह',
          risk: 'low', 
          message: 'Stable temperatures', 
          messageMr: 'स्थिर तापमान',
          messageHi: 'स्थिर तापमान',
          action: 'Ideal for planting',
          actionMr: 'लागवडीसाठी आदर्श',
          actionHi: 'रोपण के लिए आदर्श'
        }
      ];
    } else {
      return [
        { 
          period: 'Next 7 Days', 
          periodMr: 'पुढील ७ दिवस',
          periodHi: 'अगले ७ दिन',
          risk: 'low', 
          message: 'Favorable conditions', 
          messageMr: 'अनुकूल परिस्थिती',
          messageHi: 'अनुकूल स्थितियाँ',
          action: 'Good time to plant',
          actionMr: 'लागवडीसाठी चांगला वेळ',
          actionHi: 'रोपण के लिए अच्छा समय'
        }
      ];
    }
  };

  const weatherRisks = getWeatherRisks(selectedYear);

  const getLocationName = (id) => {
    const loc = locations.find(l => l.id === id);
    if (!loc) return id;
    if (language === 'mr') return loc.nameMr;
    if (language === 'hi') return loc.nameHi;
    return loc.name;
  };

  const getSeasonName = (id) => {
    const season = seasons.find(s => s.id === id);
    if (!season) return id;
    if (language === 'mr') return season.nameMr;
    if (language === 'hi') return season.nameHi;
    return season.name;
  };

  const getCropName = (id) => {
    const crop = crops.find(c => c.id === id);
    if (!crop) return id;
    if (language === 'mr') return crop.nameMr;
    if (language === 'hi') return crop.nameHi;
    return crop.name;
  };

  const getMonthName = (month) => {
    const months = {
      en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      mr: ['जाने', 'फेब्रु', 'मार्च', 'एप्रि', 'मे', 'जून', 'जुलै', 'ऑग', 'सप्टें', 'ऑक्टो', 'नोव्हें', 'डिसें'],
      hi: ['जन', 'फर', 'मार्च', 'अप्रै', 'मई', 'जून', 'जुला', 'अग', 'सितं', 'अक्तू', 'नवं', 'दिसं']
    };
    const monthIndex = { jan:0, feb:1, mar:2, apr:3, may:4, jun:5, jul:6, aug:7, sep:8, oct:9, nov:10, dec:11 };
    return months[language]?.[monthIndex[month]] || months.en[monthIndex[month]];
  };

  const currentCropData = cropData[selectedCrop];

  const getText = (en, mr, hi) => {
    if (language === 'mr') return mr;
    if (language === 'hi') return hi;
    return en;
  };

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

            {/* Navigation - Updated with Planting, Irrigation, Harvesting */}
            <div className="hidden md:flex items-center gap-8">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); goToHome(); }}
                className="text-[#546E7A] hover:text-[#1B5E20] transition-colors flex items-center gap-1"
              >
                <FaHome /> {t('home')}
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); goToPlanting(); }}
                className="text-[#263238] font-medium hover:text-[#1B5E20] transition-colors border-b-2 border-[#1B5E20] pb-1 flex items-center gap-1"
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
                onClick={(e) => { e.preventDefault(); goToHarvesting(); }}
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
                className="w-10 h-10 rounded-full bg-gradient-to-r from-[#1B5E20] to-[#4CAF50] p-0.5 cursor-pointer hover:scale-105 transition-transform"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={goToHome}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaArrowLeft className="text-[#546E7A] text-xl" />
          </button>
          <h1 className="text-2xl font-bold text-[#263238] flex items-center gap-2">
            <FaSeedling className="text-[#1B5E20]" />
            {language === 'mr' ? 'लागवड सल्लागार' : language === 'hi' ? 'रोपण सलाहकार' : 'Planting Advisor'}
          </h1>
        </div>

        {/* Location, Season & Year Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4">
            <label className="text-sm text-[#546E7A] flex items-center gap-2 mb-2">
              <FaMapMarkerAlt className="text-[#1B5E20]" />
              {language === 'mr' ? 'तालुका' : language === 'hi' ? 'तालुका' : 'Taluka'}
            </label>
            <select 
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1B5E20] text-[#263238] font-medium"
            >
              {locations.map(loc => (
                <option key={loc.id} value={loc.id}>
                  {language === 'mr' ? loc.nameMr : language === 'hi' ? loc.nameHi : loc.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4">
            <label className="text-sm text-[#546E7A] flex items-center gap-2 mb-2">
              <FaCalendarAlt className="text-[#1B5E20]" />
              {language === 'mr' ? 'हंगाम' : language === 'hi' ? 'मौसम' : 'Season'}
            </label>
            <select 
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1B5E20] text-[#263238] font-medium"
            >
              {seasons.map(season => (
                <option key={season.id} value={season.id}>
                  {language === 'mr' ? season.nameMr : language === 'hi' ? season.nameHi : season.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4">
            <label className="text-sm text-[#546E7A] flex items-center gap-2 mb-2">
              <FaCalendarAlt className="text-[#1B5E20]" />
              {language === 'mr' ? 'वर्ष' : language === 'hi' ? 'वर्ष' : 'Year'}
            </label>
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1B5E20] text-[#263238] font-medium"
            >
              {years.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Crop Selector */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#263238] mb-3">
            {language === 'mr' ? 'पीक निवडा' : language === 'hi' ? 'फसल चुनें' : 'Select Crop'}
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {crops.map(crop => (
              <button
                key={crop.id}
                onClick={() => setSelectedCrop(crop.id)}
                className={`bg-white p-4 rounded-xl shadow-md flex flex-col items-center gap-2 transition-all
                  ${selectedCrop === crop.id 
                    ? 'border-2 border-[#1B5E20] ring-2 ring-[#1B5E20]/20' 
                    : 'border border-gray-200 hover:border-[#1B5E20]'}`}
              >
                <span className="text-3xl">{crop.icon}</span>
                <span className="font-medium text-[#263238]">
                  {language === 'mr' ? crop.nameMr : language === 'hi' ? crop.nameHi : crop.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Seasonal Calendar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-[#263238] flex items-center gap-2">
              <FaCalendarAlt className="text-[#1B5E20]" />
              {language === 'mr' ? 'हंगामी कॅलेंडर' : language === 'hi' ? 'मौसमी कैलेंडर' : 'Seasonal Calendar'} {selectedYear}
            </h2>
            <span className="text-sm text-[#546E7A] bg-gray-100 px-3 py-1 rounded-full">
              {getText('Planting Season', 'लागवड हंगाम', 'रोपण मौसम')}
            </span>
          </div>
          
          {/* Month Labels */}
          <div className="grid grid-cols-12 gap-1 mb-4">
            {['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'].map((month, idx) => (
              <div key={idx} className="text-center">
                <span className="text-xs font-medium text-[#546E7A]">{getMonthName(month)}</span>
              </div>
            ))}
          </div>

          {/* Timeline Bars */}
          <div className="space-y-3">
            {crops.map(crop => {
              const data = cropData[crop.id];
              return (
                <div key={crop.id} className="flex items-center gap-2">
                  <span className="w-16 text-sm font-medium text-[#263238]">
                    {language === 'mr' ? crop.nameMr : language === 'hi' ? crop.nameHi : crop.name}
                  </span>
                  <div className="flex-1 grid grid-cols-12 gap-1">
                    {Object.entries(data.timeline).map(([month, status], idx) => (
                      <div
                        key={idx}
                        className={`h-8 rounded ${
                          status === 'best' ? 'bg-[#1B5E20]' :
                          status === 'okay' ? 'bg-[#FBC02D]' :
                          'bg-gray-200'
                        } ${selectedCrop === crop.id ? 'ring-2 ring-[#1B5E20]' : ''}`}
                        title={`${month}: ${status}`}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#1B5E20] rounded"></div>
              <span className="text-[#263238]">{language === 'mr' ? 'सर्वोत्तम' : language === 'hi' ? 'सर्वोत्तम' : 'Best Window'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#FBC02D] rounded"></div>
              <span className="text-[#263238]">{language === 'mr' ? 'ठीक आहे' : language === 'hi' ? 'ठीक है' : 'Okay Window'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <span className="text-[#263238]">{language === 'mr' ? 'शिफारस नाही' : language === 'hi' ? 'अनुशंसित नहीं' : 'Not Recommended'}</span>
            </div>
          </div>
        </div>

        {/* Best Planting Window Card */}
        <div className="bg-gradient-to-r from-[#1B5E20] to-[#4CAF50] rounded-2xl shadow-xl p-6 mb-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FaSeedling />
              {language === 'mr' 
                ? `सर्वोत्तम लागवड कालावधी - ${getCropName(selectedCrop)}` 
                : language === 'hi'
                ? `सर्वोत्तम रोपण अवधि - ${getCropName(selectedCrop)}`
                : `Best Planting Window - ${getCropName(selectedCrop)}`}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-white/80 text-sm mb-1">
                {language === 'mr' ? 'सर्वोत्तम कालावधी' : language === 'hi' ? 'सर्वोत्तम अवधि' : 'Optimal Period'}
              </p>
              <p className="text-2xl font-bold mb-2">
                {language === 'mr' 
                  ? `${currentCropData.plantingWindow.startMr} - ${currentCropData.plantingWindow.endMr}`
                  : language === 'hi'
                  ? `${currentCropData.plantingWindow.startHi} - ${currentCropData.plantingWindow.endHi}`
                  : `${currentCropData.plantingWindow.start} - ${currentCropData.plantingWindow.end}`}
              </p>
              <p className="text-white/90 flex items-center gap-2">
                <FaCheckCircle className="text-[#FBC02D]" />
                {currentCropData.plantingWindow.successRate}% {language === 'mr' ? 'यश दर' : language === 'hi' ? 'सफलता दर' : 'Success Rate'}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 rounded-xl p-3">
                <FaThermometerHalf className="text-2xl mb-2" />
                <p className="text-xs opacity-80">{language === 'mr' ? 'आदर्श तापमान' : language === 'hi' ? 'आदर्श तापमान' : 'Ideal Temp'}</p>
                <p className="font-semibold">{currentCropData.plantingWindow.idealTemp}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <FaTint className="text-2xl mb-2" />
                <p className="text-xs opacity-80">{language === 'mr' ? 'माती ओलावा' : language === 'hi' ? 'मिट्टी नमी' : 'Soil Moisture'}</p>
                <p className="font-semibold">{currentCropData.plantingWindow.soilMoisture}</p>
              </div>
            </div>
          </div>

          {currentCropData.plantingWindow.daysRemaining > 0 && (
            <div className="mt-4 bg-white/20 rounded-xl p-3">
              <p className="text-sm">
                {language === 'mr' 
                  ? `लागवडीसाठी ${currentCropData.plantingWindow.daysRemaining} दिवस शिल्लक`
                  : language === 'hi'
                  ? `रोपण के लिए ${currentCropData.plantingWindow.daysRemaining} दिन शेष`
                  : `${currentCropData.plantingWindow.daysRemaining} days remaining for planting`}
              </p>
            </div>
          )}
        </div>

        {/* Weather Risk Alerts */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <h2 className="text-lg font-bold text-[#263238] mb-4 flex items-center gap-2">
            <FaExclamationTriangle className="text-[#FBC02D]" />
            {language === 'mr' ? 'हवामान जोखीम सूचना' : language === 'hi' ? 'मौसम जोखिम चेतावनी' : 'Weather Risk Alerts'}
          </h2>

          <div className="space-y-3">
            {weatherRisks.map((risk, idx) => (
              <div key={idx} className={`p-4 rounded-xl border-l-4 ${
                risk.risk === 'high' ? 'border-red-500 bg-red-50' :
                risk.risk === 'moderate' ? 'border-yellow-500 bg-yellow-50' :
                'border-green-500 bg-green-50'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`font-semibold ${
                      risk.risk === 'high' ? 'text-red-700' :
                      risk.risk === 'moderate' ? 'text-yellow-700' :
                      'text-green-700'
                    }`}>
                      {language === 'mr' ? risk.periodMr : language === 'hi' ? risk.periodHi : risk.period}
                    </p>
                    <p className="text-sm text-[#263238] mt-1">
                      {language === 'mr' ? risk.messageMr : language === 'hi' ? risk.messageHi : risk.message}
                    </p>
                    <p className="text-xs text-[#546E7A] mt-1">
                      {language === 'mr' ? risk.actionMr : language === 'hi' ? risk.actionHi : risk.action}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    risk.risk === 'high' ? 'bg-red-500 text-white' :
                    risk.risk === 'moderate' ? 'bg-yellow-500 text-white' :
                    'bg-green-500 text-white'
                  }`}>
                    {risk.risk === 'high' 
                      ? (language === 'mr' ? 'उच्च' : language === 'hi' ? 'उच्च' : 'HIGH')
                      : risk.risk === 'moderate'
                      ? (language === 'mr' ? 'मध्यम' : language === 'hi' ? 'मध्यम' : 'MODERATE')
                      : (language === 'mr' ? 'कमी' : language === 'hi' ? 'कम' : 'LOW')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Crop Tips & Soil Requirements - Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Crop Tips */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-[#263238] mb-4 flex items-center gap-2">
              <FaInfoCircle className="text-[#1B5E20]" />
              {language === 'mr' ? 'पीक टिप्स' : language === 'hi' ? 'फसल टिप्स' : 'Crop Tips'} - {getCropName(selectedCrop)}
            </h2>
            <ul className="space-y-3">
              {currentCropData.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-[#1B5E20] font-bold text-lg">•</span>
                  <span className="text-[#263238] text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Soil Health Metrics */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-[#263238] mb-4 flex items-center gap-2">
              <FaFlask className="text-[#1B5E20]" />
              {language === 'mr' ? 'माती आरोग्य मेट्रिक्स' : language === 'hi' ? 'मिट्टी स्वास्थ्य मेट्रिक्स' : 'Soil Health Metrics'}
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#F5F9F6] rounded-xl p-4">
                <p className="text-sm text-[#546E7A] mb-1">pH Level</p>
                <p className="text-2xl font-bold text-[#263238]">{currentCropData.soilRequirements.ph}</p>
                <p className="text-xs text-green-600 mt-1">{language === 'mr' ? 'आदर्श' : language === 'hi' ? 'आदर्श' : 'Optimal'}</p>
              </div>
              <div className="bg-[#F5F9F6] rounded-xl p-4">
                <p className="text-sm text-[#546E7A] mb-1">{language === 'mr' ? 'नायट्रोजन' : language === 'hi' ? 'नाइट्रोजन' : 'Nitrogen'}</p>
                <p className="text-2xl font-bold text-[#263238]">{currentCropData.soilRequirements.nitrogen}</p>
              </div>
              <div className="bg-[#F5F9F6] rounded-xl p-4">
                <p className="text-sm text-[#546E7A] mb-1">{language === 'mr' ? 'फॉस्फरस' : language === 'hi' ? 'फास्फोरस' : 'Phosphorus'}</p>
                <p className="text-2xl font-bold text-[#263238]">{currentCropData.soilRequirements.phosphorus}</p>
              </div>
              <div className="bg-[#F5F9F6] rounded-xl p-4">
                <p className="text-sm text-[#546E7A] mb-1">{language === 'mr' ? 'पोटॅशियम' : language === 'hi' ? 'पोटैशियम' : 'Potassium'}</p>
                <p className="text-2xl font-bold text-[#263238]">{currentCropData.soilRequirements.potassium}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Planting Decision Card */}
        <div className="bg-[#FBC02D] rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-[#263238] mb-4 flex items-center gap-2">
            <FaLeaf className="text-[#1B5E20]" />
            {language === 'mr' ? 'आजचा लागवड निर्णय' : language === 'hi' ? 'आज का रोपण निर्णय' : 'Today\'s Planting Decision'}
          </h2>
          
          <div className="bg-white rounded-xl p-6">
            <p className="text-lg font-medium text-[#263238] mb-3">
              {language === 'mr' ? 'आता लागवड करावी का?' : language === 'hi' ? 'क्या अब रोपण करें?' : 'Should I plant now?'}
            </p>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-red-100 text-red-600 px-6 py-3 rounded-xl font-bold text-xl">
                ⚠️ {language === 'mr' ? 'प्रतीक्षा करा' : language === 'hi' ? 'प्रतीक्षा करें' : 'WAIT'} 5 {language === 'mr' ? 'दिवस' : language === 'hi' ? 'दिन' : 'days'}
              </div>
            </div>
            
            <p className="text-[#546E7A] mb-4">
              {language === 'mr' 
                ? 'जोरदार पावसाची शक्यता आहे. सर्वोत्तम कालावधी: २०-३० मार्च'
                : language === 'hi'
                ? 'भारी बारिश की संभावना है। सर्वोत्तम अवधि: २०-३० मार्च'
                : 'Heavy rain expected. Best window: 20-30 March'}
            </p>
            
            <button className="bg-[#1B5E20] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2E7D32] transition-colors flex items-center gap-2">
              <FaBell />
              {language === 'mr' ? 'स्मरणपत्र सेट करा' : language === 'hi' ? 'रिमाइंडर सेट करें' : 'Set Reminder'}
            </button>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <h2 className="text-lg font-bold text-[#263238] mb-4 flex items-center gap-2">
            <FaChartLine className="text-[#1B5E20]" />
            {language === 'mr' ? 'अलीकडील लागवड क्रियाकलाप' : language === 'hi' ? 'हाल की रोपण गतिविधियाँ' : 'Recent Planting Activities'}
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#F5F9F6] rounded-xl">
              <span className="text-[#263238]">🍅 {language === 'mr' ? 'टोमॅटो' : language === 'hi' ? 'टमाटर' : 'Tomatoes'}</span>
              <span className="font-semibold text-[#1B5E20]">120 {language === 'mr' ? 'शेतकरी' : language === 'hi' ? 'किसान' : 'farmers'}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#F5F9F6] rounded-xl">
              <span className="text-[#263238]">🧅 {language === 'mr' ? 'कांदे' : language === 'hi' ? 'प्याज' : 'Onions'}</span>
              <span className="font-semibold text-[#1B5E20]">85 {language === 'mr' ? 'शेतकरी' : language === 'hi' ? 'किसान' : 'farmers'}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#F5F9F6] rounded-xl">
              <span className="text-[#263238]">🍇 {language === 'mr' ? 'द्राक्षे' : language === 'hi' ? 'अंगूर' : 'Grapes'}</span>
              <span className="font-semibold text-[#1B5E20]">200 {language === 'mr' ? 'एकर' : language === 'hi' ? 'एकड़' : 'acres'}</span>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <nav className="bg-white/80 backdrop-blur-md shadow-lg rounded-full px-6 py-2 mb-4">
          <div className="flex justify-around items-center">
            <button 
              onClick={goToHome}
              className="flex flex-col items-center text-[#546E7A] hover:text-[#1B5E20] transition-colors"
            >
              <FaHome className="text-2xl" />
              <span className="text-xs mt-1">{t('home')}</span>
            </button>
            <button 
              onClick={goToPlanting}
              className="flex flex-col items-center text-[#1B5E20]"
            >
              <FaSeedling className="text-2xl" />
              <span className="text-xs mt-1">{t('plantingInsights')}</span>
            </button>
            <button 
              onClick={goToIrrigation}
              className="flex flex-col items-center text-[#546E7A] hover:text-[#1B5E20] transition-colors"
            >
              <FaWater className="text-2xl" />
              <span className="text-xs mt-1">{t('irrigationControl')}</span>
            </button>
            <button 
              onClick={goToHarvesting}
              className="flex flex-col items-center text-[#546E7A] hover:text-[#1B5E20] transition-colors"
            >
              <FaShoppingCart className="text-2xl" />
              <span className="text-xs mt-1">{t('harvestingUpdates')}</span>
            </button>
            <button 
              onClick={goToProfile}
              className="flex flex-col items-center text-[#546E7A] hover:text-[#1B5E20] transition-colors"
            >
              <FaUserCircle className="text-2xl" />
              <span className="text-xs mt-1">{t('profile')}</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Planting;