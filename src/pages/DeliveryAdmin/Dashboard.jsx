import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WebLayout from '../../components/Layout/WebLayout';
import { LayoutDashboard, MapPin, FileText, Users, Truck, ShieldAlert, Bell, History } from 'lucide-react';
import Overview from './Overview';
import ZoneManagement from './ZoneManagement';
import DeliveryOversight from './DeliveryOversight';
import DriverManagement from './DriverManagement';
import EscalationManagement from './EscalationManagement';
import Reports from './Reports';
import Notifications from './Notifications';
import AuditLogs from './AuditLogs';
import OrderDetailPage from '../shared/OrderDetailPage';

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '' },
  { name: 'Order & Delivery Monitoring', icon: Truck, path: 'oversight' },
  { name: 'Zone Management', icon: MapPin, path: 'zones' },
  { name: 'Driver Management', icon: Users, path: 'drivers' },
  { name: 'Escalations', icon: ShieldAlert, path: 'escalations' },
  { name: 'Reports', icon: FileText, path: 'reports' },
  { name: 'Notifications', icon: Bell, path: 'notifications' },
  { name: 'Audit Logs', icon: History, path: 'audit-logs' },
];

function DeliveryAdminDashboard() {
  // This is a placeholder for a real state management solution
  const handleAssignment = (orderId, driver) => {
    console.log(`Assignment for ${orderId} confirmed with Driver: ${driver}. State update would happen here.`);
  };

  const dummyDrivers = ['Driver #12', 'Driver #07', 'Driver #21', 'Driver #03', 'Driver #33', 'Driver #45'];

  return (
    <WebLayout
      title="Delivery Admin"
      userRole="Admin - Operations"
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
            />
          } 
        />
        <Route path="/zones" element={<ZoneManagement />} />
        <Route path="/drivers" element={<DriverManagement />} />
        <Route path="/escalations" element={<EscalationManagement />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/audit-logs" element={<AuditLogs />} />
      </Routes>
    </WebLayout>
  );
}

export default DeliveryAdminDashboard;
