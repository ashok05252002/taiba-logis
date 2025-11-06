import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WebLayout from '../../components/Layout/WebLayout';
import { LayoutDashboard, Users, MapPin, Settings, FileText, Truck, History, Bell } from 'lucide-react';
import Overview from './Overview';
import UserManagement from './UserManagement';
import ZoneManagement from './ZoneManagement';
import DeliveryOversight from './DeliveryOversight';
import Reports from './Reports';
import AuditLogs from './AuditLogs';
import Notifications from './Notifications';
import SystemSettings from './Settings';
import OrderDetailPage from '../shared/OrderDetailPage';

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '' },
  { name: 'Delivery Oversight', icon: Truck, path: 'oversight' },
  { name: 'User Management', icon: Users, path: 'users' },
  { name: 'Zone Management', icon: MapPin, path: 'zones' },
  { name: 'Reports', icon: FileText, path: 'reports' },
  { name: 'Audit Logs', icon: History, path: 'audit-logs' },
  { name: 'Notifications', icon: Bell, path: 'notifications' },
  { name: 'Settings', icon: Settings, path: 'settings' },
];

function SuperAdminDashboard() {
  // This is a placeholder for a real state management solution
  // For now, we pass a dummy function to satisfy the prop requirement
  const handleAssignment = (orderId, zone, driver) => {
    console.log(`Assignment for ${orderId} confirmed with Zone: ${zone}, Driver: ${driver}. State update would happen here.`);
  };

  const dummyDrivers = ['Driver #12', 'Driver #07', 'Driver #21', 'Driver #03', 'Driver #33', 'Driver #45'];
  const dummyZones = ['North', 'South', 'East', 'West', 'Central'];

  return (
    <WebLayout
      title="Delivery Super Admin"
      userRole="Super Administrator"
      navItems={navigation}
    >
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/oversight" element={<DeliveryOversight />} />
        <Route 
          path="/oversight/:orderId" 
          element={
            <OrderDetailPage 
              onConfirmAssignment={handleAssignment} 
              drivers={dummyDrivers} 
              zones={dummyZones} 
            />
          } 
        />
        <Route path="/users/*" element={<UserManagement />} />
        <Route path="/zones" element={<ZoneManagement />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/audit-logs" element={<AuditLogs />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<SystemSettings />} />
      </Routes>
    </WebLayout>
  );
}

export default SuperAdminDashboard;
