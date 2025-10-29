import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import WebLayout from '../../components/Layout/WebLayout';
import { LayoutDashboard, Package, Truck } from 'lucide-react';
import Overview from './Overview';

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '' },
  { name: 'Order Handover', icon: Package, path: 'handover' },
  { name: 'Delivery Status', icon: Truck, path: 'status' },
];

function StoreInchargeDashboard() {
  return (
    <WebLayout
      title="Store Incharge"
      userRole="Store Operations"
      navigation={
        <>
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={`/store-incharge/${item.path}`}
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
        <Route path="/handover" element={<div className="card"><p className="text-taiba-gray">Order handover section under development...</p></div>} />
        <Route path="/status" element={<div className="card"><p className="text-taiba-gray">Delivery status section under development...</p></div>} />
      </Routes>
    </WebLayout>
  );
}

export default StoreInchargeDashboard;
