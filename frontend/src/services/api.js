// frontend/src/services/api.js
const API_BASE_URL = 'http://localhost:5001/api';

// Helper function to handle responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Something went wrong');
  }
  return response.json();
};

// Profile API
export const profileAPI = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Profile API Error:', error);
      throw error;
    }
  },
  
  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData)
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Profile Update API Error:', error);
      throw error;
    }
  }
};

// Weather API
export const weatherAPI = {
  // Get weather for a taluka
  getWeather: async (taluka = 'nashik') => {
    try {
      const response = await fetch(`${API_BASE_URL}/weather/${taluka}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Weather API Error:', error);
      throw error;
    }
  }
};

// Mandi (Market) API
export const mandiAPI = {
  // Get prices for all crops
  getAllPrices: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/mandi`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Mandi API Error:', error);
      throw error;
    }
  },
  
  // Get prices for specific crop
  getCropPrice: async (crop) => {
    try {
      const response = await fetch(`${API_BASE_URL}/mandi/${crop}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Mandi API Error:', error);
      throw error;
    }
  }
};

// Crops API
export const cropsAPI = {
  // Get list of crops and talukas
  getCrops: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/crops`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Crops API Error:', error);
      throw error;
    }
  },
  
  // Get planting calendar for a crop
  getPlantingCalendar: async (crop) => {
    try {
      const response = await fetch(`${API_BASE_URL}/crops/${crop}/calendar`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Calendar API Error:', error);
      throw error;
    }
  },
  
  // Get crop tips
  getCropTips: async (crop) => {
    try {
      const response = await fetch(`${API_BASE_URL}/crops/${crop}/tips`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Tips API Error:', error);
      throw error;
    }
  }
};

// Recommendations API (POST requests)
export const recommendationsAPI = {
  // Get planting advice
  getPlantingAdvice: async (crop, taluka) => {
    try {
      const response = await fetch(`${API_BASE_URL}/recommendations/planting`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ crop, taluka })
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Planting Advice API Error:', error);
      throw error;
    }
  },
  
  // Get irrigation advice
  getIrrigationAdvice: async (crop, taluka, soilMoisture = 50) => {
    try {
      const response = await fetch(`${API_BASE_URL}/recommendations/irrigation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ crop, taluka, soilMoisture })
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Irrigation Advice API Error:', error);
      throw error;
    }
  },
  
  // Get harvest advice
  getHarvestAdvice: async (crop) => {
    try {
      const response = await fetch(`${API_BASE_URL}/recommendations/harvest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ crop })
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Harvest Advice API Error:', error);
      throw error;
    }
  }
};

// Export all APIs together
const api = {
  profile: profileAPI,
  weather: weatherAPI,
  mandi: mandiAPI,
  crops: cropsAPI,
  recommendations: recommendationsAPI
};

export default api;