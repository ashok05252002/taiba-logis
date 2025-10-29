import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import WebLayout from '../../components/Layout/WebLayout';
import { LayoutDashboard, MapPin, FileText, Users } from 'lucide-react';
import Overview from './Overview';

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '' },
  { name: 'Zone Management', icon: MapPin, path: 'zones' },
  { name: 'Driver Management', icon: Users, path: 'drivers' },
  { name: 'Reports', icon: FileText, path: 'reports' },
];

function DeliveryAdminDashboard() {
  return (
    <WebLayout
      title="Delivery Admin"
      userRole="Admin - Operations"
      navigation={
        <>
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={`/delivery-admin/${item.path}`}
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
        <Route path="/zones" element={<div className="card"><p className="text-taiba-gray">Zone management section under development...</p></div>} />
        <Route path="/drivers" element={<div className="card"><p className="text-taiba-gray">Driver management section under development...</p></div>} />
        <Route path="/reports" element={<div className="card"><p className="text-taiba-gray">Reports section under development...</p></div>} />
      </Routes>
    </WebLayout>
  );
}

export default DeliveryAdminDashboard;
