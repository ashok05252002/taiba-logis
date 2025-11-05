import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import MobileLayout from '../../components/Layout/MobileLayout';
import { Home, Search, Package, User } from 'lucide-react';
import HomePage from './HomePage';
import OrderTrackingPage from './OrderTrackingPage';
import OrdersPage from './OrdersPage';
import SearchPage from './SearchPage';
import ProfilePage from './ProfilePage';
import ProductListPage from './ProductListPage';
import ProductDetailPage from './ProductDetailPage';
import EditProfilePage from './profile/EditProfilePage';
import AddressesPage from './profile/AddressesPage';
import PaymentsPage from './profile/PaymentsPage';
import NotificationSettingsPage from './profile/NotificationSettingsPage';
import LanguagePage from './profile/LanguagePage';
import SupportPage from './profile/SupportPage';
import TermsPage from './profile/TermsPage';
import CartPage from './CartPage';
import PrescriptionUploadModal from './components/PrescriptionUploadModal';

const initialActiveOrder = {
  id: 'ORD12345',
  status: 'Out for Delivery',
  driver: { name: 'Khalid Ibrahim', rating: 4.8 },
  eta: '12 min',
  arrivalPin: '1984',
  date: new Date().toISOString(),
  items: 2,
  total: '16.05'
};

const initialPastOrders = [
    { id: 'ORD9981', date: 'Yesterday', items: 3, total: '12.55', status: 'Delivered' },
    { id: 'ORD9975', date: '2 days ago', items: 1, total: '4.50', status: 'Delivered' },
    { id: 'ORD9964', date: 'Last week', reason: 'Canceled by user', status: 'Canceled' },
];

function CustomerApp() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [activeOrder, setActiveOrder] = useState(initialActiveOrder);
  const [pastOrders, setPastOrders] = useState(initialPastOrders);
  const [cart, setCart] = useState([]);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [productToAdd, setProductToAdd] = useState(null);

  const addToCart = (product, quantity = 1) => {
    if (product.requiresPrescription) {
      setProductToAdd({ product, quantity });
      setIsPrescriptionModalOpen(true);
      return;
    }
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const handlePrescriptionSubmit = () => {
    if (productToAdd) {
      addToCart(productToAdd.product, productToAdd.quantity); // This time it will skip the prescription check
      setProductToAdd({ ...productToAdd.product, requiresPrescription: false }); // Mark as checked
    }
    setIsPrescriptionModalOpen(false);
    setProductToAdd(null);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      setCart(prevCart => prevCart.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item));
    }
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const handleCompleteOrder = (orderId) => {
    if (activeOrder && activeOrder.id === orderId) {
      const completedOrder = { ...activeOrder, status: 'Delivered', date: new Date().toLocaleDateString() };
      setPastOrders(prev => [completedOrder, ...prev]);
      setActiveOrder(null);
    }
  };

  const handleLogout = () => {
    // Reset all state
    setActiveOrder(initialActiveOrder);
    setPastOrders(initialPastOrders);
    setCart([]);
    navigate('/');
  };

  const bottomNavItems = [
    { icon: Home, label: 'Home', path: '/customer' },
    { icon: Search, label: 'Search', path: '/customer/search' },
    { icon: Package, label: 'Orders', path: '/customer/orders' },
    { icon: User, label: 'Profile', path: '/customer/profile' },
  ];

  const bottomNav = bottomNavItems.map((item) => (
    <button
      key={item.label}
      onClick={() => navigate(item.path)}
      className={`flex flex-col items-center space-y-1 py-2 px-4 transition-colors w-1/4 rounded-full ${
        location.pathname.startsWith(item.path) && (item.path !== '/customer' || location.pathname === '/customer')
          ? 'text-white' 
          : 'text-gray-400 hover:text-white'
      }`}
    >
      <item.icon className="w-6 h-6" />
      <span className="text-xs font-medium">{item.label}</span>
    </button>
  ));

  return (
    <>
      <MobileLayout bottomNav={bottomNav} cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}>
        <Routes>
          <Route path="/" element={<HomePage onAddToCart={addToCart} />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/orders" element={<OrdersPage activeOrder={activeOrder} pastOrders={pastOrders} />} />
          <Route path="/orders/:orderId" element={<OrderTrackingPage order={activeOrder} onCompleteOrder={handleCompleteOrder} />} />
          <Route path="/profile" element={<ProfilePage onLogout={handleLogout} />} />
          <Route path="/products" element={<ProductListPage onAddToCart={addToCart} />} />
          <Route path="/products/:categoryName" element={<ProductListPage onAddToCart={addToCart} />} />
          <Route path="/product/:productId" element={<ProductDetailPage onAddToCart={addToCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} onUpdateQuantity={updateQuantity} onRemoveFromCart={removeFromCart} />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route path="/profile/addresses" element={<AddressesPage />} />
          <Route path="/profile/payments" element={<PaymentsPage />} />
          <Route path="/profile/notifications" element={<NotificationSettingsPage />} />
          <Route path="/profile/language" element={<LanguagePage />} />
          <Route path="/profile/support" element={<SupportPage />} />
          <Route path="/profile/terms" element={<TermsPage />} />
        </Routes>
      </MobileLayout>
      <PrescriptionUploadModal
        isOpen={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
        onSubmit={handlePrescriptionSubmit}
        productName={productToAdd?.product.name}
      />
    </>
  );
}

export default CustomerApp;
