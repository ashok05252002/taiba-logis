import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderHistory from './OrderHistory';
import { Clock, Package } from 'lucide-react';

function OrdersPage({ activeOrder, pastOrders }) {
  const [activeTab, setActiveTab] = useState('active');
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex space-x-4 px-4">
            <button
              onClick={() => setActiveTab('active')}
              className={`py-4 px-2 font-medium border-b-2 transition-colors ${activeTab === 'active' ? 'border-taiba-blue text-taiba-blue' : 'border-transparent text-taiba-gray'}`}
            >
              Active Order
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`py-4 px-2 font-medium border-b-2 transition-colors ${activeTab === 'past' ? 'border-taiba-blue text-taiba-blue' : 'border-transparent text-taiba-gray'}`}
            >
              Past Orders
            </button>
          </div>
        </div>

        <div className="p-4">
          {activeTab === 'active' && (
            <div>
              {activeOrder ? (
                <div 
                  className="bg-gradient-to-r from-taiba-blue to-taiba-purple rounded-xl shadow-lg p-4 text-white cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => navigate(`/customer/orders/${activeOrder.id}`)}
                >
                  <h3 className="text-lg font-bold mb-3">Track Your Order</h3>
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold">{activeOrder.id}</p>
                      <span className="px-2 py-0.5 bg-white text-taiba-blue rounded-full text-xs font-bold">
                        {activeOrder.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <div>
                        <p className="text-xs opacity-90">Estimated Arrival</p>
                        <p className="font-bold text-sm">{activeOrder.eta}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-taiba-gray font-medium">You have no active orders.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'past' && (
            <OrderHistory pastOrders={pastOrders} />
          )}
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
