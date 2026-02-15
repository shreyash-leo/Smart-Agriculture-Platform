import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Planting from './pages/Planting'; // ADD THIS

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/planting" element={<Planting />} /> {/* ADD THIS */}
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;