import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import MobileLayout from '../../components/Layout/MobileLayout';
import { Home, Package, User, Clock } from 'lucide-react';
import DriverDashboard from './DriverDashboard';
import DriverLogin from './DriverLogin';
import ShiftPage from './ShiftPage';
import OrderHistory from './OrderHistory';
import ProfilePage from './ProfilePage';

// Generates a new order with a unique ID to prevent key collisions
const generateNewOrder = () => {
    const orderId = `ORD${Math.floor(Math.random() * 9000) + 1000}`;
    return { id: orderId, pickup: 'Taiba Pharmacy - Main Branch', delivery: '123 King Fahd Rd, Riyadh', distance: '3.2 km', eta: '12 min', payment: 'Prepaid', customerContact: '966501112233' };
};

const initialProfile = {
  name: 'Khalid Ibrahim',
  mobile: '966501234567',
  email: 'khalid@driver.com',
  vehicleType: 'Bike',
  vehicleNumber: '1234 ABC',
};

function DriverApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [driverStatus, setDriverStatus] = useState('Offline'); // 'Offline', 'Available', 'On Break', 'On Delivery'
  const [shiftHistory, setShiftHistory] = useState([]);
  
  const [availableOrders, setAvailableOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [completedOrders, setCompletedOrders] = useState([]);
  
  const [driverProfile, setDriverProfile] = useState(initialProfile);
  const [appWarning, setAppWarning] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Simulate a warning message
  useEffect(() => {
    if (isLoggedIn) {
      const timer = setTimeout(() => {
        setAppWarning('GPS signal is weak. Please move to an open area.');
        const clearTimer = setTimeout(() => setAppWarning(null), 5000);
        return () => clearTimeout(clearTimer);
      }, 15000); // Show warning 15 seconds after login
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/driver');
  };
  
  const handleUpdateProfile = (updatedProfile) => {
    setDriverProfile(updatedProfile);
  };

  const addHistoryEvent = (action) => {
    setShiftHistory(prev => [{ action, timestamp: new Date() }, ...prev]);
  };

  const handleCheckIn = () => {
    if (driverStatus !== 'Offline') return;
    setDriverStatus('Available');
    addHistoryEvent('Checked In');
    // Simulate receiving an order after check-in
    setTimeout(() => {
      setAvailableOrders([generateNewOrder()]);
    }, 5000);
  };

  const handleCheckOut = () => {
    setDriverStatus('Offline');
    addHistoryEvent('Checked Out');
  };

  const handleBreakToggle = () => {
    if (driverStatus === 'Available') {
      setDriverStatus('On Break');
      addHistoryEvent('Started Break');
    } else if (driverStatus === 'On Break') {
      setDriverStatus('Available');
      addHistoryEvent('Ended Break');
    }
  };

  const handleAcceptOrder = (order) => {
    setAvailableOrders(prev => prev.filter(o => o.id !== order.id));
    setCurrentOrder(order);
    setDriverStatus('On Delivery');
    addHistoryEvent(`Accepted Order ${order.id}`);
  };

  const handleRejectOrder = (order, reason) => {
    setAvailableOrders(prev => prev.filter(o => o.id !== order.id));
    addHistoryEvent(`Rejected Order ${order.id} (Reason: ${reason})`);
    console.log(`Zone Incharge notified of rejection for Order ${order.id}`);
    // Simulate receiving a new order after rejection
    setTimeout(() => {
        setAvailableOrders([generateNewOrder()]);
    }, 10000);
  };

  const handleCompleteDelivery = (order) => {
    setCompletedOrders(prev => [order, ...prev]);
    setCurrentOrder(null);
    setDriverStatus('Available');
    addHistoryEvent(`Completed Delivery for ${order.id}`);
    // Simulate receiving a new order after completion for a better UX
    setTimeout(() => {
        setAvailableOrders([generateNewOrder()]);
    }, 10000);
  };

  if (!isLoggedIn) {
    return <DriverLogin onLogin={handleLogin} />;
  }

  const bottomNavItems = [
    { icon: Home, label: 'Home', path: '/driver' },
    { icon: Package, label: 'Orders', path: '/driver/orders' },
    { icon: Clock, label: 'Shift', path: '/driver/shift' },
    { icon: User, label: 'Profile', path: '/driver/profile' },
  ];

  const bottomNav = bottomNavItems.map((item) => (
    <button
      key={item.label}
      onClick={() => navigate(item.path)}
      className={`flex flex-col items-center space-y-1 py-2 px-4 transition-colors w-1/4 ${
        location.pathname === item.path ? 'text-taiba-blue' : 'text-taiba-gray hover:text-taiba-blue'
      }`}
    >
      <item.icon className="w-6 h-6" />
      <span className="text-xs font-medium">{item.label}</span>
    </button>
  ));

  return (
    <MobileLayout title="Driver App" bottomNav={bottomNav} warningMessage={appWarning}>
      <Routes>
        <Route 
          path="/" 
          element={
            <DriverDashboard 
              status={driverStatus}
              onCheckIn={handleCheckIn}
              onCheckOut={handleCheckOut}
              onBreakToggle={handleBreakToggle}
              availableOrder={availableOrders.length > 0 ? availableOrders[0] : null}
              currentOrder={currentOrder}
              onAcceptOrder={handleAcceptOrder}
              onRejectOrder={handleRejectOrder}
              onCompleteDelivery={handleCompleteDelivery}
            />
          } 
        />
        <Route path="/orders" element={<OrderHistory orders={completedOrders} />} />
        <Route path="/shift" element={<ShiftPage history={shiftHistory} />} />
        <Route path="/profile" element={<ProfilePage profile={driverProfile} onUpdateProfile={handleUpdateProfile} />} />
      </Routes>
    </MobileLayout>
  );
}

export default DriverApp;
