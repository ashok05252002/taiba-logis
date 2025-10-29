import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import WebLayout from '../../components/Layout/WebLayout';
import { LayoutDashboard, Users, MapPin, Settings, FileText } from 'lucide-react';
import Overview from './Overview';
import UserManagement from './UserManagement';
import ZoneManagement from './ZoneManagement';

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '' },
  { name: 'User Management', icon: Users, path: 'users' },
  { name: 'Zone Management', icon: MapPin, path: 'zones' },
  { name: 'Reports', icon: FileText, path: 'reports' },
  { name: 'Settings', icon: Settings, path: 'settings' },
];

function SuperAdminDashboard() {
  return (
    <WebLayout
      title="Delivery Super Admin"
      userRole="Super Administrator"
      navigation={
        <>
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={`/super-admin/${item.path}`}
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
        <Route path="/users" element={<UserManagement />} />
        <Route path="/zones" element={<ZoneManagement />} />
        <Route path="/reports" element={<div className="card"><p className="text-taiba-gray">Reports section under development...</p></div>} />
        <Route path="/settings" element={<div className="card"><p className="text-taiba-gray">Settings section under development...</p></div>} />
      </Routes>
    </WebLayout>
  );
}

export default SuperAdminDashboard;
