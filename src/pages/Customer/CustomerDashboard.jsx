import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, RefreshCcw, Clock } from 'lucide-react';

// This file is DEPRECATED and replaced by HomePage.jsx.
// It is kept here to avoid breaking changes in the file system but is no longer used in the main app flow.

// Mock active order
const activeOrder = {
  id: 'ORD12345',
  status: 'In Transit',
  eta: '12 min',
};

function CustomerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Active Order Card */}
      {activeOrder && (
        <div 
          className="bg-gradient-to-r from-taiba-blue to-taiba-purple rounded-xl shadow-lg p-6 text-white cursor-pointer hover:scale-105 transition-transform"
          onClick={() => navigate(`/customer/tracking/${activeOrder.id}`)}
        >
          <h2 className="text-xl font-bold mb-4">Track Your Active Order</h2>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold">{activeOrder.id}</p>
              <span className="px-3 py-1 bg-white text-taiba-blue rounded-full text-xs font-bold">
                {activeOrder.status}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="text-sm opacity-90">Estimated Arrival</p>
                <p className="font-bold">{activeOrder.eta}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center space-y-2">
            <RefreshCcw className="w-8 h-8 text-taiba-blue" />
            <p className="text-sm font-semibold text-taiba-gray text-center">Request Refund</p>
          </div>
        </button>
        <button className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center space-y-2">
            <Package className="w-8 h-8 text-taiba-purple" />
            <p className="text-sm font-semibold text-taiba-gray text-center">Replacement</p>
          </div>
        </button>
      </div>

      {/* Support Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold text-taiba-gray mb-4">Need Help?</h3>
        <div className="space-y-3">
          <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <p className="text-sm font-medium text-taiba-gray">Contact Support</p>
          </button>
          <button onClick={() => navigate('/customer/orders')} className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <p className="text-sm font-medium text-taiba-gray">View Order History</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
