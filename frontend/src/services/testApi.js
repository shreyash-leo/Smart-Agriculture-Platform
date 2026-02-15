
import api from './services/api';

const testConnection = async () => {
  try {
    console.log('Testing API connection...');
    const crops = await api.crops.getCrops();
    console.log('✅ Crops API working:', crops);
    
    const weather = await api.weather.getWeather('niphad');
    console.log('✅ Weather API working:', weather);
    
    const prices = await api.mandi.getAllPrices();
    console.log('✅ Mandi API working:', prices);
    
    return true;
  } catch (error) {
    console.error('❌ API Connection Failed:', error.message);
    return false;
  }
};

export default testConnection;