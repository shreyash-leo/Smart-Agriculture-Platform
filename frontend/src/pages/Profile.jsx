// frontend/src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { 
  FaBell, 
  FaLeaf,
  FaUserCircle,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLanguage,
  FaTractor,
  FaLock,
  FaSignOutAlt,
  FaEdit,
  FaCamera,
  FaChevronRight,
  FaHome,
  FaSeedling,
  FaWater,
  FaShoppingCart,
  FaSpinner
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { profileAPI } from '../services/api';

const Profile = () => {
  const [notifications] = useState(2);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const { t, language, changeLanguage } = useLanguage();
  const navigate = useNavigate();

  // User data state
  const [userData, setUserData] = useState({
    photo: null,
    name: '',
    mobile: '',
    email: '',
    location: '',
    farmSize: '',
    language: 'en',
    memberSince: ''
  });

  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  // Update display language when userData.language changes
  useEffect(() => {
    if (userData.language && userData.language !== language) {
      changeLanguage(userData.language);
    }
  }, [userData.language, changeLanguage, language]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await profileAPI.getProfile();
      setUserData(data);
    } catch (err) {
      setError('Failed to load profile. Please try again.');
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    try {
      setSaving(true);
      setError(null);
      const updatedProfile = await profileAPI.updateProfile(userData);
      setUserData(updatedProfile.profile);
      setIsEditing(false);
      // Show success message (you can add a toast notification here)
      alert('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error('Error updating profile:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset to original data by refetching
    fetchProfile();
    setIsEditing(false);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleChangePassword = () => {
    alert(t('changePassword'));
  };

  // Get display language text
  const getDisplayLanguage = (langCode) => {
    if (langCode === 'en') return 'English (EN)';
    if (langCode === 'hi') return 'हिन्दी (HI)';
    if (langCode === 'mr') return 'मराठी (MR)';
    return 'English (EN)';
  };

  // Handle language change in edit mode
  const handleLanguageChange = (e) => {
    const selectedValue = e.target.value;
    let langCode = 'en';
    if (selectedValue === 'English (EN)') langCode = 'en';
    else if (selectedValue === 'हिन्दी (HI)') langCode = 'hi';
    else if (selectedValue === 'मराठी (MR)') langCode = 'mr';
    
    setUserData({...userData, language: langCode});
  };

  // Navigation functions
  const goToHome = () => navigate('/');
  const goToPlanting = () => navigate('/planting');
  const goToIrrigation = () => navigate('/irrigation');
  const goToHarvest = () => navigate('/harvest');
  const goToProfile = () => navigate('/profile');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F5F9F6] to-white flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-[#1B5E20] mx-auto mb-4" />
          <p className="text-[#263238]">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F9F6] to-white">
      {/* Top Navbar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Clickable to Home */}
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
                className="text-[#546E7A] hover:text-[#1B5E20] transition-colors flex items-center gap-1"
              >
                <FaHome /> {t('home')}
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
                className="text-[#263238] font-medium hover:text-[#1B5E20] transition-colors border-b-2 border-[#1B5E20] pb-1 flex items-center gap-1"
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
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#1B5E20] to-[#4CAF50] p-0.5">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <FaUserCircle className="text-[#1B5E20] text-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Profile Header */}
        <div className="relative bg-gradient-to-r from-[#1B5E20] to-[#4CAF50] rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="profile-farm" patternUnits="userSpaceOnUse" width="40" height="40">
                <path d="M20 10 L30 20 L10 20 Z" fill="white" />
                <circle cx="15" cy="25" r="3" fill="white" />
                <circle cx="25" cy="25" r="3" fill="white" />
              </pattern>
              <rect width="100" height="100" fill="url(#profile-farm)" />
            </svg>
          </div>
          
          <div className="relative flex items-center gap-6 p-6 text-white">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-white p-1">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-[#FBC02D] to-[#FFD54F] flex items-center justify-center">
                  {userData.photo ? (
                    <img src={userData.photo} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <FaUserCircle className="text-[#1B5E20] text-5xl" />
                  )}
                </div>
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-[#FBC02D] p-2 rounded-full text-[#263238] shadow-lg">
                  <FaCamera className="text-sm" />
                </button>
              )}
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-1">{userData.name || 'John Farmer'}</h1>
              <p className="text-white/90 text-sm flex items-center gap-2">
                <FaLeaf className="text-[#FBC02D]" />
                {t('memberSince')} {userData.memberSince || 'January 2026'}
              </p>
            </div>

            <button 
              onClick={() => setIsEditing(!isEditing)}
              disabled={saving}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaEdit />
              {isEditing ? t('cancel') : t('editProfile')}
            </button>
          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Personal Information Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-[#263238] mb-4 flex items-center gap-2">
              <FaUserCircle className="text-[#1B5E20]" />
              {t('personalInformation')}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaLeaf className="text-[#1B5E20] text-xl mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-[#546E7A]">{t('fullName')}</p>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={userData.name || ''}
                      onChange={(e) => setUserData({...userData, name: e.target.value})}
                      className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1B5E20]"
                      placeholder="Enter your name"
                    />
                  ) : (
                    <p className="font-medium text-[#263238]">{userData.name || 'Not provided'}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaPhoneAlt className="text-[#1B5E20] text-xl mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-[#546E7A]">{t('mobileNumber')}</p>
                  {isEditing ? (
                    <input 
                      type="tel" 
                      value={userData.mobile || ''}
                      onChange={(e) => setUserData({...userData, mobile: e.target.value})}
                      className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1B5E20]"
                      placeholder="Enter mobile number"
                    />
                  ) : (
                    <p className="font-medium text-[#263238]">{userData.mobile || 'Not provided'}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaEnvelope className="text-[#1B5E20] text-xl mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-[#546E7A]">{t('emailAddress')}</p>
                  {isEditing ? (
                    <input 
                      type="email" 
                      value={userData.email || ''}
                      onChange={(e) => setUserData({...userData, email: e.target.value})}
                      className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1B5E20]"
                      placeholder="Enter email address"
                    />
                  ) : (
                    <p className="font-medium text-[#263238]">{userData.email || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Farm Details Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-[#263238] mb-4 flex items-center gap-2">
              <FaTractor className="text-[#1B5E20]" />
              {t('farmDetails')}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#1B5E20] text-xl mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-[#546E7A]">{t('location')}</p>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={userData.location || ''}
                      onChange={(e) => setUserData({...userData, location: e.target.value})}
                      className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1B5E20]"
                      placeholder="Enter location"
                    />
                  ) : (
                    <p className="font-medium text-[#263238]">{userData.location || 'Not provided'}</p>
                  )}
                </div>
              </div>

              {/* Language Selector */}
              <div className="flex items-start gap-3">
                <FaLanguage className="text-[#1B5E20] text-xl mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-[#546E7A]">{t('preferredLanguage')}</p>
                  {isEditing ? (
                    <select 
                      value={getDisplayLanguage(userData.language)}
                      onChange={handleLanguageChange}
                      className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1B5E20]"
                    >
                      <option value="English (EN)">English (EN)</option>
                      <option value="मराठी (MR)">मराठी (MR)</option>
                      <option value="हिन्दी (HI)">हिन्दी (HI)</option>
                    </select>
                  ) : (
                    <p className="font-medium text-[#263238]">{getDisplayLanguage(userData.language)}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaLeaf className="text-[#1B5E20] text-xl mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-[#546E7A]">{t('farmSize')}</p>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={userData.farmSize || ''}
                      onChange={(e) => setUserData({...userData, farmSize: e.target.value})}
                      className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1B5E20]"
                      placeholder="Enter farm size"
                    />
                  ) : (
                    <p className="font-medium text-[#263238]">{userData.farmSize || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-[#263238] mb-4 flex items-center gap-2">
            <FaLock className="text-[#1B5E20]" />
            {t('accountSettings')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={handleChangePassword}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-[#1B5E20] hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#1B5E20]/10 p-3 rounded-xl group-hover:bg-[#1B5E20] transition-colors">
                  <FaLock className="text-[#1B5E20] text-xl group-hover:text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-[#263238]">{t('changePassword')}</p>
                  <p className="text-xs text-[#546E7A]">{t('updatePassword')}</p>
                </div>
              </div>
              <FaChevronRight className="text-[#546E7A] group-hover:text-[#1B5E20] group-hover:translate-x-1 transition-all" />
            </button>

            <button 
              onClick={handleLogout}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-red-500 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="bg-red-50 p-3 rounded-xl group-hover:bg-red-500 transition-colors">
                  <FaSignOutAlt className="text-red-500 text-xl group-hover:text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-[#263238]">{t('logout')}</p>
                  <p className="text-xs text-[#546E7A]">{t('signOut')}</p>
                </div>
              </div>
              <FaChevronRight className="text-[#546E7A] group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </div>

        {/* Save Button (when editing) */}
        {isEditing && (
          <div className="flex justify-end gap-4 mt-6">
            <button 
              onClick={handleCancel}
              disabled={saving}
              className="px-6 py-3 border border-gray-200 rounded-xl font-medium text-[#546E7A] hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {t('cancel')}
            </button>
            <button 
              onClick={handleSaveChanges}
              disabled={saving}
              className="px-6 py-3 bg-[#1B5E20] text-white rounded-xl font-medium hover:bg-[#2E7D32] transition-colors shadow-lg flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? <FaSpinner className="animate-spin" /> : <FaEdit />}
              {saving ? 'Saving...' : t('saveChanges')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;