import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, Inbox, AlertCircle, FileText, User, ChevronRight, UserPlus } from 'lucide-react';
import HandoverModal from './components/HandoverModal';
import PrescriptionVerificationModal from './components/PrescriptionVerificationModal';
import StoreRejectModal from './components/StoreRejectModal';
import ViewOrderModal from './components/ViewOrderModal';

const tabs = [
  { id: 'pending', label: 'Pending', icon: Inbox, color: 'text-blue-600' },
  { id: 'processing', label: 'Processing', icon: Clock, color: 'text-orange-600' },
  { id: 'history', label: 'History', icon: CheckCircle, color: 'text-gray-600' },
];

function OrderManagement({ orders, onAccept, onReject, onMarkAsReady, onHandoverConfirm }) {
  const [activeTab, setActiveTab] = useState('pending');
  
  // Modal States
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isHandoverModalOpen, setIsHandoverModalOpen] = useState(false);
  const [isViewOrderModalOpen, setIsViewOrderModalOpen] = useState(false);

  // Handlers
  const handleOrderClick = (order) => {
    // Allow viewing details for Pending and History tabs
    if (activeTab === 'pending' || activeTab === 'history') {
        setSelectedOrder(order);
        setIsViewOrderModalOpen(true);
    }
  };

  const handleVerifyClick = (e, order) => {
    e.stopPropagation();
    setSelectedOrder(order);
    setIsPrescriptionModalOpen(true);
  };

  const handleRejectClick = (e, order) => {
    e.stopPropagation();
    setSelectedOrder(order);
    setIsPrescriptionModalOpen(false); // Close prescription modal if open
    setIsRejectModalOpen(true);
  };

  const handleAcceptClick = (e, orderId) => {
    e.stopPropagation();
    onAccept(orderId);
  };

  const handleMarkAsReadyClick = (e, orderId) => {
    e.stopPropagation();
    onMarkAsReady(orderId);
  };

  const handleConfirmReject = (reason, notes) => {
    onReject(selectedOrder.id, reason, notes);
    setIsRejectModalOpen(false);
    setSelectedOrder(null);
  };

  const handleConfirmVerify = () => {
    onAccept(selectedOrder.id);
    setIsPrescriptionModalOpen(false);
    setSelectedOrder(null);
  };

  const currentOrders = orders[activeTab] || [];

  const OrderCard = ({ order }) => (
    <div 
        onClick={() => handleOrderClick(order)}
        className={`bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all ${activeTab !== 'processing' ? 'cursor-pointer hover:border-taiba-blue' : ''}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left: Order Info */}
        <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
                <span className="text-lg font-bold text-gray-800">{order.id}</span>
                {order.requiresPrescription && (
                    <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center">
                        <FileText className="w-3 h-3 mr-1" /> Prescription
                    </span>
                )}
                <span className="text-xs text-gray-500">{order.timestamp}</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>{order.customer}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span>{order.items} Items</span>
                </div>
                {activeTab !== 'pending' && order.driver && (
                    <div className="flex items-center space-x-2 sm:col-span-2 mt-1">
                        <Truck className="w-4 h-4 text-taiba-blue" />
                        <span className={order.driver === 'Unassigned' ? 'text-orange-500 font-medium' : 'text-gray-800 font-medium'}>
                            Driver: {order.driver}
                        </span>
                    </div>
                )}
            </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end space-x-3">
            
            {/* PENDING ACTIONS */}
            {activeTab === 'pending' && (
                <>
                    {order.requiresPrescription ? (
                        <button 
                            onClick={(e) => handleVerifyClick(e, order)}
                            className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 shadow-sm flex items-center"
                        >
                            <FileText className="w-4 h-4 mr-2" /> Verify Prescription
                        </button>
                    ) : (
                        <button 
                            onClick={(e) => handleAcceptClick(e, order.id)}
                            className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-green-700 shadow-sm"
                        >
                            Accept Order
                        </button>
                    )}
                    <button 
                        onClick={(e) => handleRejectClick(e, order)}
                        className="border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50"
                    >
                        Reject
                    </button>
                </>
            )}

            {/* PROCESSING ACTIONS */}
            {activeTab === 'processing' && (
                <button 
                    onClick={(e) => handleMarkAsReadyClick(e, order.id)}
                    className="bg-taiba-blue text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 shadow-sm flex items-center"
                >
                    Mark as Ready <ChevronRight className="w-4 h-4 ml-1" />
                </button>
            )}

            {/* HISTORY STATUS */}
            {activeTab === 'history' && (
                <div className="text-right">
                    {order.status === 'Refunded' ? (
                        <div>
                            <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">Refund Processed</span>
                            <p className="text-xs text-red-600 mt-1">{order.rejectionReason}</p>
                        </div>
                    ) : (
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">Delivered</span>
                    )}
                </div>
            )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-taiba-gray mb-1">Order Management</h2>
          <p className="text-sm text-taiba-gray">Manage pending orders and processing.</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex overflow-x-auto no-scrollbar border-b border-gray-200">
            {tabs.map((tab) => {
                const count = orders[tab.id]?.length || 0;
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 min-w-[140px] py-4 px-4 text-sm font-medium transition-all relative flex flex-col items-center justify-center gap-1 ${
                        activeTab === tab.id
                            ? 'bg-blue-50 text-taiba-blue'
                            : 'text-gray-500 hover:bg-gray-50'
                        }`}
                    >
                        <div className="flex items-center space-x-2">
                            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? tab.color : 'text-gray-400'}`} />
                            <span>{tab.label}</span>
                        </div>
                        {count > 0 && (
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white text-taiba-blue shadow-sm' : 'bg-gray-100 text-gray-600'}`}>
                                {count}
                            </span>
                        )}
                        {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-taiba-blue"></div>}
                    </button>
                );
            })}
          </div>

          <div className="p-6 bg-gray-50 min-h-[400px]">
            {currentOrders.length > 0 ? (
              <div className="space-y-4">
                {currentOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <Inbox className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-sm font-medium">No orders in {tabs.find(t => t.id === activeTab)?.label}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <PrescriptionVerificationModal 
        isOpen={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
        order={selectedOrder}
        onVerify={handleConfirmVerify}
        onReject={() => handleRejectClick(null, selectedOrder)} // Pass null event since it's called from modal
      />

      <StoreRejectModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={handleConfirmReject}
      />

      <HandoverModal
        isOpen={isHandoverModalOpen}
        onClose={() => setIsHandoverModalOpen(false)}
        onConfirm={() => {}} // Not used in this simplified flow but kept for component integrity
        order={selectedOrder}
      />

      <ViewOrderModal
        isOpen={isViewOrderModalOpen}
        onClose={() => setIsViewOrderModalOpen(false)}
        order={selectedOrder}
      />
    </>
  );
}

export default OrderManagement;
