import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaLock, FaKey, FaCheckCircle } from 'react-icons/fa';

const EditPassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError(language === 'hi' ? 'सभी फ़ील्ड भरें' : language === 'mr' ? 'सर्व फील्ड भरा' : 'Please fill all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError(language === 'hi' ? 'नये पासवर्ड मेल नहीं खाते' : language === 'mr' ? 'नवीन पासवर्ड जुळत नाहीत' : 'New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setError(language === 'hi' ? 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए' : language === 'mr' ? 'पासवर्ड कमीतकमी 6 अक्षरांचा असावा' : 'Password must be at least 6 characters long');
      return;
    }
    
    // Simulate API call for password update securely
    setError('');
    setSuccess(true);
    setTimeout(() => {
      navigate('/profile');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F9F6] to-white flex md:items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden mt-10 md:mt-0">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1B5E20] to-[#4CAF50] p-6 text-white relative flex items-center justify-center">
          <button 
            onClick={() => navigate('/profile')}
            className="absolute left-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <FaArrowLeft />
          </button>
          <div className="flex items-center gap-2">
            <FaLock className="text-xl" />
            <h1 className="text-xl font-bold">
              {t('changePassword')}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {success ? (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-pulse">
              <FaCheckCircle className="text-6xl text-[#4CAF50] mb-4" />
              <h2 className="text-2xl font-bold text-[#263238] mb-2">
                {language === 'hi' ? 'सफलतापूर्ण बदला गया!' : language === 'mr' ? 'यशस्वीरित्या बदलले!' : 'Password Updated!'}
              </h2>
              <p className="text-[#546E7A]">
                {language === 'hi' ? 'प्रोफ़ाइल पर वापस ले जाया जा रहा है...' : language === 'mr' ? 'प्रोफाइलवर परत नेत आहे...' : 'Redirecting to profile...'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-5">
              
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-medium border border-red-100">
                  {error}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-sm font-medium text-[#546E7A] flex items-center gap-2 mb-2">
                  <FaKey className="text-[#1B5E20]" />
                  {language === 'hi' ? 'वर्तमान पासवर्ड' : language === 'mr' ? 'सध्याचा पासवर्ड' : 'Current Password'}
                </label>
                <input 
                  type="password" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/20 focus:border-[#1B5E20] transition-colors text-[#263238] font-medium"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-[#546E7A] flex items-center gap-2 mb-2 mt-4">
                  <FaLock className="text-[#1B5E20]" />
                  {language === 'hi' ? 'नया पासवर्ड' : language === 'mr' ? 'नवीन पासवर्ड' : 'New Password'}
                </label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/20 focus:border-[#1B5E20] transition-colors text-[#263238] font-medium"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-[#546E7A] flex items-center gap-2 mb-2 mt-4">
                  <FaCheckCircle className="text-[#1B5E20]" />
                  {language === 'hi' ? 'नये पासवर्ड की पुष्टि करें' : language === 'mr' ? 'नवीन पासवर्डची पुष्टी करा' : 'Confirm New Password'}
                </label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/20 focus:border-[#1B5E20] transition-colors text-[#263238] font-medium"
                  placeholder="••••••••"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#1B5E20] to-[#4CAF50] hover:scale-[1.02] text-white rounded-xl font-bold shadow-md transition-transform mt-6"
              >
                {t('saveChanges')}
              </button>
              
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPassword;
