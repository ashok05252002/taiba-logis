import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MobileLayout from '../../components/Layout/MobileLayout';
import { Home, Package, MessageSquare, User } from 'lucide-react';
import CustomerDashboard from './CustomerDashboard';

function CustomerApp() {
  const navigate = useNavigate();

  const bottomNav = [
    { icon: Home, label: 'Home', path: '/customer' },
    { icon: Package, label: 'Orders', path: '/customer/orders' },
    { icon: MessageSquare, label: 'Support', path: '/customer/support' },
    { icon: User, label: 'Profile', path: '/customer/profile' },
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
    <MobileLayout title="Customer Portal" bottomNav={bottomNav}>
      <Routes>
        <Route path="/" element={<CustomerDashboard />} />
        <Route path="/orders" element={<div className="card"><p className="text-taiba-gray text-center">Order history coming soon...</p></div>} />
        <Route path="/support" element={<div className="card"><p className="text-taiba-gray text-center">Support chat coming soon...</p></div>} />
        <Route path="/profile" element={<div className="card"><p className="text-taiba-gray text-center">Profile settings coming soon...</p></div>} />
      </Routes>
    </MobileLayout>
  );
}

export default CustomerApp;
