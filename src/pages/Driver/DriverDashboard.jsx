import React, { useState } from 'react';
import { LogIn, LogOut, Coffee, Package, CheckCircle } from 'lucide-react';
import NewOrderCard from './components/NewOrderCard';
import CurrentDeliveryCard from './components/CurrentDeliveryCard';
import RejectOrderModal from './components/RejectOrderModal';

// ShiftControl component to manage shift buttons
const ShiftControl = ({ status, onCheckIn, onCheckOut, onBreakToggle, isDeliveryActive }) => {
  const statusConfig = {
    Offline: { text: 'Offline', color: 'text-red-300' },
    Available: { text: 'Available', color: 'text-green-300' },
    'On Break': { text: 'On Break', color: 'text-orange-300' },
    'On Delivery': { text: 'On Delivery', color: 'text-blue-300' },
  };

  const currentStatus = statusConfig[status] || statusConfig.Offline;
  const buttonsDisabled = isDeliveryActive;

  return (
    <div className="bg-gradient-to-r from-taiba-blue to-taiba-purple rounded-xl shadow-lg p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm opacity-90 mb-1">Current Status</p>
          <p className={`text-2xl font-bold ${currentStatus.color}`}>{currentStatus.text}</p>
        </div>
        <div className="text-right">
          <p className="text-sm opacity-90 mb-1">Time</p>
          <p className="text-xl font-bold">3h 24m</p>
        </div>
      </div>
      
      {status === 'Offline' && (
        <button onClick={onCheckIn} className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-all flex items-center justify-center space-x-2">
          <LogIn className="w-5 h-5" />
          <span>Check In</span>
        </button>
      )}

      {status === 'Available' && (
        <div className="flex space-x-4">
          <button onClick={onBreakToggle} disabled={buttonsDisabled} className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed">
            <Coffee className="w-5 h-5" />
            <span>Start Break</span>
          </button>
          <button onClick={onCheckOut} disabled={buttonsDisabled} className="flex-1 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed">
            <LogOut className="w-5 h-5" />
            <span>Check Out</span>
          </button>
        </div>
      )}

      {status === 'On Break' && (
        <button onClick={onBreakToggle} disabled={buttonsDisabled} className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
          End Break
        </button>
      )}
    </div>
  );
};

function DriverDashboard({
  status,
  onCheckIn,
  onCheckOut,
  onBreakToggle,
  availableOrder,
  currentOrder,
  onAcceptOrder,
  onRejectOrder,
  onCompleteDelivery
}) {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const handleOpenRejectModal = () => {
    setIsRejectModalOpen(true);
  };

  const handleConfirmReject = (reason) => {
    onRejectOrder(availableOrder, reason);
    setIsRejectModalOpen(false);
  };

  const renderContent = () => {
    if (availableOrder) {
      return <NewOrderCard order={availableOrder} onAccept={() => onAcceptOrder(availableOrder)} onReject={handleOpenRejectModal} />;
    }
    if (currentOrder) {
      return <CurrentDeliveryCard order={currentOrder} onComplete={() => onCompleteDelivery(currentOrder)} />;
    }
    return (
      <>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center justify-between mb-2">
              <Package className="w-8 h-8 text-taiba-blue" />
            </div>
            <p className="text-2xl font-bold text-taiba-gray">12</p>
            <p className="text-sm text-taiba-gray">Today's Deliveries</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-taiba-gray">8</p>
            <p className="text-sm text-taiba-gray">Completed</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <h3 className="font-bold text-taiba-gray">No new orders</h3>
            <p className="text-sm text-taiba-gray mt-1">You will be notified when a new order is assigned to you.</p>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="space-y-6">
        <ShiftControl
          status={status}
          onCheckIn={onCheckIn}
          onCheckOut={onCheckOut}
          onBreakToggle={onBreakToggle}
          isDeliveryActive={status === 'On Delivery'}
        />
        {renderContent()}
      </div>
      <RejectOrderModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={handleConfirmReject}
      />
    </>
  );
}

export default DriverDashboard;
