import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Planting from './pages/Planting';
import Irrigation from './pages/Irrigation'; // ADD THIS
import Harvest from './pages/Harvest';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/planting" element={<Planting />} />
          <Route path="/irrigation" element={<Irrigation />} /> {/* ADD THIS */}
          <Route path="/harvest" element={<Harvest />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;