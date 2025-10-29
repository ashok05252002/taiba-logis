import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SuperAdminDashboard from './pages/SuperAdmin/Dashboard';
import DeliveryAdminDashboard from './pages/DeliveryAdmin/Dashboard';
import ZoneInchargeDashboard from './pages/ZoneIncharge/Dashboard';
import StoreInchargeDashboard from './pages/StoreIncharge/Dashboard';
import DriverApp from './pages/Driver/DriverApp';
import CustomerApp from './pages/Customer/CustomerApp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/super-admin/*" element={<SuperAdminDashboard />} />
        <Route path="/delivery-admin/*" element={<DeliveryAdminDashboard />} />
        <Route path="/zone-incharge/*" element={<ZoneInchargeDashboard />} />
        <Route path="/store-incharge/*" element={<StoreInchargeDashboard />} />
        <Route path="/driver/*" element={<DriverApp />} />
        <Route path="/customer/*" element={<CustomerApp />} />
      </Routes>
    </Router>
  );
}

export default App;
