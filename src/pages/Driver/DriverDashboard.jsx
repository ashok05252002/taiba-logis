import React from 'react';
import { Clock, Package, MapPin, CheckCircle } from 'lucide-react';

function DriverDashboard() {
  const orders = [
    { id: 'ORD001', customer: 'Ali Ahmed', address: '123 Main St, Zone A', time: '11:30 AM', status: 'new' },
    { id: 'ORD002', customer: 'Fatima Khan', address: '456 Park Ave, Zone A', time: '12:00 PM', status: 'new' },
    { id: 'ORD003', customer: 'Mohammed Ali', address: '789 Oak Rd, Zone B', time: '12:15 PM', status: 'accepted' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-taiba-blue to-taiba-purple rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm opacity-90 mb-1">Current Shift</p>
            <p className="text-2xl font-bold">On Duty</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90 mb-1">Time</p>
            <p className="text-xl font-bold">3h 24m</p>
          </div>
        </div>
        <button className="w-full bg-white text-taiba-blue py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
          Check Out
        </button>
      </div>

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

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-taiba-blue bg-opacity-10 px-6 py-4 border-b border-gray-200">
          <h3 className="font-bold text-taiba-gray">Available Orders</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {orders.map((order) => (
            <div key={order.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="font-semibold text-taiba-gray mb-1">{order.id}</p>
                  <p className="text-sm text-taiba-gray mb-1">{order.customer}</p>
                  <div className="flex items-start space-x-2 text-xs text-taiba-gray opacity-75">
                    <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{order.address}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-taiba-gray">
                  <Clock className="w-4 h-4" />
                  <span>{order.time}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                {order.status === 'new' ? (
                  <>
                    <button className="flex-1 bg-taiba-blue text-white py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all text-sm">
                      Accept
                    </button>
                    <button className="flex-1 bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all text-sm">
                      Reject
                    </button>
                  </>
                ) : (
                  <button className="w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all text-sm">
                    Start Delivery
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DriverDashboard;
