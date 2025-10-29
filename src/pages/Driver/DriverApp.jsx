import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MobileLayout from '../../components/Layout/MobileLayout';
import { Home, Package, User, Clock } from 'lucide-react';
import DriverDashboard from './DriverDashboard';
import DriverLogin from './DriverLogin';

function DriverApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return <DriverLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  const bottomNav = [
    { icon: Home, label: 'Home', path: '/driver' },
    { icon: Package, label: 'Orders', path: '/driver/orders' },
    { icon: Clock, label: 'Shift', path: '/driver/shift' },
    { icon: User, label: 'Profile', path: '/driver/profile' },
  ].map((item) => (
    <button
      key={item.label}
      onClick={() => navigate(item.path)}
      className="flex flex-col items-center space-y-1 py-2 px-4 text-taiba-gray hover:text-taiba-blue transition-colors"
    >
      <item.icon className="w-6 h-6" />
      <span className="text-xs font-medium">{item.label}</span>
    </button>
  ));

  return (
    <MobileLayout title="Driver App" bottomNav={bottomNav}>
      <Routes>
        <Route path="/" element={<DriverDashboard />} />
        <Route path="/orders" element={<div className="card"><p className="text-taiba-gray text-center">Orders view coming soon...</p></div>} />
        <Route path="/shift" element={<div className="card"><p className="text-taiba-gray text-center">Shift management coming soon...</p></div>} />
        <Route path="/profile" element={<div className="card"><p className="text-taiba-gray text-center">Profile view coming soon...</p></div>} />
      </Routes>
    </MobileLayout>
  );
}

export default DriverApp;
