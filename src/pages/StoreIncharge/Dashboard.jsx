import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import WebLayout from '../../components/Layout/WebLayout';
import { LayoutDashboard, Package, Truck, Bell, FileText, ShieldAlert, History } from 'lucide-react';
import Overview from './Overview';
import OrderManagement from './OrderManagement';
import DeliveryStatus from './DeliveryStatus';
import Notifications from './Notifications';
import Reports from './Reports';
import EscalationManagement from './EscalationManagement';
import SecurityAudit from './SecurityAudit';
import OrderDetailPage from './components/OrderDetailPage';

const initialOrdersData = {
  pending: [
    { id: 'ORD101', items: 5, driver: 'Khalid Ibrahim', driverId: 'D001', status: 'Pending', customer: 'Ali Ahmed', address: '123 Main St' },
    { id: 'ORD102', items: 3, driver: 'Noura Saad', driverId: 'D002', status: 'Pending', customer: 'Fatima Khan', address: '456 Park Ave' },
  ],
  ready: [
    { id: 'ORD103', items: 8, driver: 'Aisha Al-Ghamdi', driverId: 'D004', status: 'Ready for Pickup', customer: 'Yusuf Ibrahim', address: '789 Oak Rd' },
    { id: 'ORD105', items: 2, driver: 'Sami Al-Johani', driverId: 'D008', status: 'Ready for Pickup', customer: 'Layla Faisal', address: '101 Pine Ln' },
  ],
  outForDelivery: [
    { id: 'ORD107', items: 1, driver: 'Khalid Ibrahim', driverId: 'D001', status: 'Out for Delivery', handoverTime: new Date(Date.now() - 3600000).toISOString(), handoverVerifiedBy: 'SI001', eta: '15 min', customer: 'Hassan Ali', address: '212 Maple Dr', phone: '966501112233', orderItems: [{name: 'Panadol Extra', qty: 1}, {name: 'Vitamin C', qty: 1}] },
  ],
  delivered: [
    { id: 'ORD109', items: 4, driver: 'Noura Saad', driverId: 'D002', status: 'Delivered', customer: 'Sara Abdullah', address: '333 Elm St' },
  ],
  canceled: [
    { id: 'ORD110', items: 1, driver: 'N/A', driverId: null, status: 'Canceled', customer: 'Omar Rashid', address: '444 Birch Ave' },
  ]
};


const initialArrivalAlerts = [
  { driver: 'Aisha Al-Ghamdi', orderId: 'ORD103', time: 'Just now' },
  { driver: 'Sami Al-Johani', orderId: 'ORD105', time: '2m ago' },
];

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '' },
  { name: 'Order Management', icon: Package, path: 'orders' },
  { name: 'Tracking & Monitoring', icon: Truck, path: 'status' },
  { name: 'Escalations', icon: ShieldAlert, path: 'escalations' },
  { name: 'Notifications', icon: Bell, path: 'notifications' },
  { name: 'Reports & Analytics', icon: FileText, path: 'reports' },
  { name: 'Security & Audit', icon: History, path: 'audit' },
];

function StoreInchargeDashboard() {
  const [orders, setOrders] = useState(initialOrdersData);
  const [arrivalAlerts, setArrivalAlerts] = useState(initialArrivalAlerts);

  const handleMarkAsReady = (orderId) => {
    const orderToMove = orders.pending.find(o => o.id === orderId);
    if (orderToMove) {
      setOrders(prev => ({
        ...prev,
        pending: prev.pending.filter(o => o.id !== orderId),
        ready: [{ ...orderToMove, status: 'Ready for Pickup' }, ...prev.ready],
      }));
    }
  };

  const handleHandoverConfirm = (orderId) => {
    const orderToMove = orders.ready.find(o => o.id === orderId);
    if (orderToMove) {
      const handoverTime = new Date().toISOString();
      const handoverVerifiedBy = 'SI001'; // Hardcoded Store Incharge ID

      setOrders(prev => ({
        ...prev,
        ready: prev.ready.filter(o => o.id !== orderId),
        outForDelivery: [{
          ...orderToMove,
          status: 'Out for Delivery',
          handoverTime,
          handoverVerifiedBy,
          eta: `${Math.floor(Math.random() * 20) + 10} min`,
          orderItems: [{name: 'Panadol Extra', qty: 1}, {name: 'Vitamin C', qty: 1}, {name: 'Aspirin', qty: 2}], // Add more mock items
        }, ...prev.outForDelivery],
      }));

      setArrivalAlerts(prev => prev.filter(alert => alert.orderId !== orderId));
      console.log(`AUDIT: Order ${orderId} handed over. Time: ${handoverTime}, Verified by: ${handoverVerifiedBy}`);
    }
  };

  const stats = {
    pending: orders.pending.length,
    ongoing: orders.outForDelivery.length,
    delivered: orders.delivered.length,
    cancelled: orders.canceled.length,
  };

  return (
    <WebLayout
      title="Store Incharge"
      userRole="Store Operations"
      navItems={navigation}
    >
      <Routes>
        <Route path="/" element={<Overview stats={stats} arrivalAlerts={arrivalAlerts} />} />
        <Route
          path="/orders"
          element={
            <OrderManagement
              orders={orders}
              onMarkAsReady={handleMarkAsReady}
              onHandoverConfirm={handleHandoverConfirm}
            />
          }
        />
        <Route path="/status" element={<DeliveryStatus ongoingDeliveries={orders.outForDelivery} />} />
        <Route path="/status/:orderId" element={<OrderDetailPage orders={orders.outForDelivery} />} />
        <Route path="/escalations" element={<EscalationManagement />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/audit" element={<SecurityAudit />} />
      </Routes>
    </WebLayout>
  );
}

export default StoreInchargeDashboard;
