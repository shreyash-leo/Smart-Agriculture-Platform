// frontend/src/services/testApi.js
import { api } from './api';

export const testConnection = async () => {
  console.log('🔍 Testing API Connection...');
  
  try {
    // Test 1: Profile
    console.log('📡 Testing Profile API...');
    const profile = await api.profile.getProfile();
    console.log('✅ Profile API working:', profile);
    
    // Test 2: Weather
    console.log('📡 Testing Weather API...');
    const weather = await api.weather.getWeather('nashik');
    console.log('✅ Weather API working:', weather);
    
    // Test 3: Market
    console.log('📡 Testing Market API...');
    const market = await api.mandi.getCropPrice('grapes');
    console.log('✅ Market API working:', market);
    
    console.log('🎉 All APIs connected successfully!');
    return true;
  } catch (error) {
    console.error('❌ Connection failed:', error);
    return false;
  }
};