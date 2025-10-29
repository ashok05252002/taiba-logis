import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import WebLayout from '../../components/Layout/WebLayout';
import { LayoutDashboard, Package, Users, MapPin } from 'lucide-react';
import Overview from './Overview';

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '' },
  { name: 'Order Tracking', icon: Package, path: 'orders' },
  { name: 'Driver Availability', icon: Users, path: 'drivers' },
  { name: 'Manual Assignment', icon: MapPin, path: 'assignment' },
];

function ZoneInchargeDashboard() {
  return (
    <WebLayout
      title="Zone Incharge"
      userRole="Zone Operations Manager"
      navigation={
        <>
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={`/zone-incharge/${item.path}`}
              end={item.path === ''}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-taiba-blue text-white'
                    : 'text-taiba-gray hover:bg-gray-100'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </>
      }
    >
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/orders" element={<div className="card"><p className="text-taiba-gray">Order tracking section under development...</p></div>} />
        <Route path="/drivers" element={<div className="card"><p className="text-taiba-gray">Driver availability section under development...</p></div>} />
        <Route path="/assignment" element={<div className="card"><p className="text-taiba-gray">Manual assignment section under development...</p></div>} />
      </Routes>
    </WebLayout>
  );
}

export default ZoneInchargeDashboard;
