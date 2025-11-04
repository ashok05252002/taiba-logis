import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
      navItems={navigation}
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
