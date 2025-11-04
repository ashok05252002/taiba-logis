import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WebLayout from '../../components/Layout/WebLayout';
import { LayoutDashboard, Users, UserCheck, Map, FileText, AlertTriangle } from 'lucide-react';
import Overview from './Overview';
import DriverManagement from './DriverManagement';
import AvailabilityBoard from './AvailabilityBoard';
import TrackingMap from './TrackingMap';
import Reports from './Reports';
import ExceptionHandling from './ExceptionHandling';

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '' },
  { name: 'Driver Management', icon: Users, path: 'drivers' },
  { name: 'Availability Board', icon: UserCheck, path: 'availability' },
  { name: 'Tracking Map', icon: Map, path: 'map' },
  { name: 'Exception Handling', icon: AlertTriangle, path: 'exceptions' },
  { name: 'Audit & Reporting', icon: FileText, path: 'reports' },
];

function ZoneInchargeDashboard() {
  return (
    <WebLayout
      title="Zone Incharge"
      userRole="Zone Operations Manager - North Zone"
      navItems={navigation}
    >
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/drivers" element={<DriverManagement />} />
        <Route path="/availability" element={<AvailabilityBoard />} />
        <Route path="/map" element={<TrackingMap />} />
        <Route path="/exceptions" element={<ExceptionHandling />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </WebLayout>
  );
}

export default ZoneInchargeDashboard;
