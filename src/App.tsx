import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Markets from './pages/Markets';
import Portfolio from './pages/Portfolio';
import Strategies from './pages/Strategies';
import About from './pages/About';
import Profile from './pages/Profile';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import WalletOperations from './components/wallet/WalletOperations';
import Performance from './pages/Performance';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/strategies" element={<Strategies />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wallet" element={<WalletOperations />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/performance" element={<Performance />} />
      </Routes>
    </Router>
  );
}

export default App;