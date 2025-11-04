import React, { useState } from 'react';
import HandoverModal from './components/HandoverModal';
import { Package, Truck, CheckCircle, ArchiveX, Bell } from 'lucide-react';

const tabs = [
  { id: 'pending', label: 'Pending', icon: Bell },
  { id: 'ready', label: 'Ready for Pickup', icon: Package },
  { id: 'outForDelivery', label: 'Out for Delivery', icon: Truck },
  { id: 'delivered', label: 'Delivered', icon: CheckCircle },
  { id: 'canceled', label: 'Canceled', icon: ArchiveX },
];

function OrderManagement({ orders, onMarkAsReady, onHandoverConfirm }) {
  const [activeTab, setActiveTab] = useState('pending');
  const [isHandoverModalOpen, setIsHandoverModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOpenHandoverModal = (order) => {
    setSelectedOrder(order);
    setIsHandoverModalOpen(true);
  };

  const handleConfirm = () => {
    onHandoverConfirm(selectedOrder.id);
    setIsHandoverModalOpen(false);
  };

  const currentOrders = orders[activeTab] || [];

  const OrderCard = ({ order }) => (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white">
      <div>
        <p className="font-semibold text-taiba-gray">{order.id}</p>
        <p className="text-sm text-taiba-gray opacity-75">{order.items} items • Driver: {order.driver}</p>
      </div>
      <div className="flex items-center space-x-4">
        {activeTab === 'pending' && (
          <button onClick={() => onMarkAsReady(order.id)} className="btn-secondary text-sm px-4 py-2">
            Mark as Ready
          </button>
        )}
        {activeTab === 'ready' && (
          <button onClick={() => handleOpenHandoverModal(order)} className="btn-primary text-sm px-4 py-2">
            Handover
          </button>
        )}
        {activeTab === 'outForDelivery' && (
          <span className="text-sm font-medium text-blue-600">In Transit</span>
        )}
        {activeTab === 'delivered' && (
          <span className="text-sm font-medium text-green-600">Completed</span>
        )}
        {activeTab === 'canceled' && (
          <span className="text-sm font-medium text-red-600">Canceled</span>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-taiba-gray mb-1">Order Management</h2>
          <p className="text-sm text-taiba-gray">Prepare, verify, and hand over orders to delivery partners.</p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex space-x-1 sm:space-x-4 px-2 sm:px-4 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-3 font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-taiba-blue text-taiba-blue'
                      : 'border-transparent text-taiba-gray hover:text-taiba-blue'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label} ({orders[tab.id]?.length || 0})</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 bg-gray-50">
            {currentOrders.length > 0 ? (
              <div className="space-y-4">
                {currentOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-taiba-gray">No orders in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <HandoverModal
        isOpen={isHandoverModalOpen}
        onClose={() => setIsHandoverModalOpen(false)}
        onConfirm={handleConfirm}
        order={selectedOrder}
      />
    </>
  );
}

export default OrderManagement;
