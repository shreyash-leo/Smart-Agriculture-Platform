import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaLeaf, FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      // Simulate successful login routing back to dashboard
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F9F6] to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden mt-10 md:mt-0">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-[#1B5E20] to-[#4CAF50] p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-8 -mb-8 blur-lg"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-white p-3 rounded-2xl shadow-lg mb-4 inline-block transform hover:scale-105 transition-transform duration-300">
              <FaLeaf className="text-[#1B5E20] text-3xl" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Welcome Back</h1>
            <p className="text-white/90 text-sm">Sign in to your AgriSmart dashboard</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-medium text-[#546E7A] ml-1 flex items-center gap-2 mb-2">
                <FaEnvelope className="text-[#1B5E20]" /> Email Address
              </label>
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/20 focus:border-[#1B5E20] transition-colors text-[#263238] font-medium"
                placeholder="farmer@agrismart.com"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-[#546E7A] ml-1 flex items-center gap-2 mt-4 mb-2">
                <FaLock className="text-[#1B5E20]" /> Password
              </label>
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/20 focus:border-[#1B5E20] transition-colors text-[#263238] font-medium"
                placeholder="••••••••"
              />
            </div>

            <div className="flex justify-end mt-2">
              <a href="#" className="text-sm text-[#1B5E20] font-medium hover:underline">Forgot password?</a>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#1B5E20] to-[#4CAF50] hover:scale-[1.02] text-white rounded-xl font-bold shadow-md transition-transform mt-6"
            >
              Sign In
            </button>
            
          </form>

          <p className="text-center text-[#546E7A] text-sm mt-8 pb-2">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#1B5E20] font-bold hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
