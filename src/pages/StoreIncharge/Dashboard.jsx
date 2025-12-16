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
  incoming: [
    { 
        id: 'ORD100', 
        items: 2, 
        status: 'Incoming', 
        customer: 'Zainab Ali', 
        address: '123 Palm St', 
        requiresPrescription: true, 
        prescriptionUrl: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x300/e2e8f0/94a3b8?text=Rx+Image',
        orderItems: [{name: 'Antibiotic X', qty: 1}, {name: 'Painkiller Y', qty: 1}],
        timestamp: 'Just now'
    },
    { 
        id: 'ORD101', 
        items: 5, 
        status: 'Incoming', 
        customer: 'Ali Ahmed', 
        address: '123 Main St', 
        requiresPrescription: false,
        orderItems: [{name: 'Shampoo', qty: 2}, {name: 'Soap', qty: 3}],
        timestamp: '5 mins ago'
    },
  ],
  processing: [
    { id: 'ORD102', items: 3, status: 'Processing', customer: 'Fatima Khan', address: '456 Park Ave', orderItems: [{name: 'Vitamin C', qty: 3}] },
  ],
  ready: [
    { id: 'ORD103', items: 8, driver: 'Aisha Al-Ghamdi', driverId: 'D004', status: 'Ready for Pickup', customer: 'Yusuf Ibrahim', address: '789 Oak Rd', orderItems: [{name: 'Bandages', qty: 8}] },
    { id: 'ORD105', items: 2, driver: 'Unassigned', driverId: null, status: 'Ready for Pickup', customer: 'Layla Faisal', address: '101 Pine Ln', orderItems: [{name: 'Cream', qty: 2}] },
  ],
  outForDelivery: [
    { id: 'ORD107', items: 1, driver: 'Khalid Ibrahim', driverId: 'D001', status: 'Out for Delivery', handoverTime: new Date(Date.now() - 3600000).toISOString(), handoverVerifiedBy: 'SI001', eta: '15 min', customer: 'Hassan Ali', address: '212 Maple Dr', phone: '966501112233', orderItems: [{name: 'Panadol Extra', qty: 1}] },
  ],
  history: [ // Combined Delivered and Cancelled/Refunded
    { id: 'ORD109', items: 4, driver: 'Noura Saad', driverId: 'D002', status: 'Delivered', customer: 'Sara Abdullah', address: '333 Elm St' },
    { id: 'ORD110', items: 1, driver: 'N/A', driverId: null, status: 'Refunded', customer: 'Omar Rashid', address: '444 Birch Ave', refundStatus: 'Processed', rejectionReason: 'Item Out of Stock' },
  ]
};

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
  const [arrivalAlerts, setArrivalAlerts] = useState([]);

  // 1. Accept Order (Incoming -> Processing)
  const handleAcceptOrder = (orderId) => {
    const order = orders.incoming.find(o => o.id === orderId);
    if (order) {
        setOrders(prev => ({
            ...prev,
            incoming: prev.incoming.filter(o => o.id !== orderId),
            processing: [{ ...order, status: 'Processing' }, ...prev.processing]
        }));
    }
  };

  // 2. Reject Order (Incoming -> History/Refunded)
  const handleRejectOrder = (orderId, reason, notes) => {
    const order = orders.incoming.find(o => o.id === orderId);
    if (order) {
        setOrders(prev => ({
            ...prev,
            incoming: prev.incoming.filter(o => o.id !== orderId),
            history: [{ 
                ...order, 
                status: 'Refunded', 
                refundStatus: 'Processed', 
                rejectionReason: reason,
                notes 
            }, ...prev.history]
        }));
    }
  };

  // 3. Mark as Ready (Processing -> Ready)
  const handleMarkAsReady = (orderId) => {
    const order = orders.processing.find(o => o.id === orderId);
    if (order) {
      setOrders(prev => ({
        ...prev,
        processing: prev.processing.filter(o => o.id !== orderId),
        ready: [{ ...order, status: 'Ready for Pickup', driver: 'Unassigned' }, ...prev.ready],
      }));
    }
  };

  // 4. Handover (Ready -> Out for Delivery)
  const handleHandoverConfirm = (orderId) => {
    const order = orders.ready.find(o => o.id === orderId);
    if (order) {
      const handoverTime = new Date().toISOString();
      setOrders(prev => ({
        ...prev,
        ready: prev.ready.filter(o => o.id !== orderId),
        outForDelivery: [{
          ...order,
          status: 'Out for Delivery',
          handoverTime,
          handoverVerifiedBy: 'SI001',
          eta: '20 min',
        }, ...prev.outForDelivery],
      }));
    }
  };

  // Stats for Overview
  const stats = {
    pending: orders.incoming.length + orders.processing.length,
    ongoing: orders.outForDelivery.length,
    delivered: orders.history.filter(o => o.status === 'Delivered').length,
    cancelled: orders.history.filter(o => o.status === 'Refunded' || o.status === 'Canceled').length,
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
              onAccept={handleAcceptOrder}
              onReject={handleRejectOrder}
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
