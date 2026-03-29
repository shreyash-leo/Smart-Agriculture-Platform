// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Planting from './pages/Planting';
import Irrigation from './pages/Irrigation';
import Harvest from './pages/Harvest';
import EditPassword from './pages/EditPassword';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/planting" element={<Planting />} />
          <Route path="/irrigation" element={<Irrigation />} />
          <Route path="/harvest" element={<Harvest />} />
          <Route path="/edit-password" element={<EditPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;