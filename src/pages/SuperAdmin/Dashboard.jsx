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
  return (
    <WebLayout
      title="Delivery Super Admin"
      userRole="Super Administrator"
      navItems={navigation}
    >
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/oversight" element={<DeliveryOversight />} />
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
