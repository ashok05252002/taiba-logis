import React from 'react';
import { MapPin, Package, Clock, Star, RefreshCcw } from 'lucide-react';

function CustomerDashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-taiba-blue to-taiba-purple rounded-xl shadow-lg p-6 text-white">
        <h2 className="text-xl font-bold mb-4">Track Your Order</h2>
        <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold">Order #12345</p>
            <span className="px-3 py-1 bg-white text-taiba-blue rounded-full text-xs font-bold">
              In Transit
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm opacity-90">Current Location</p>
                <p className="text-xs opacity-75">2.5 km away</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm opacity-90">Estimated Arrival</p>
                <p className="text-xs opacity-75">15-20 minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-taiba-blue bg-opacity-10 rounded-full flex items-center justify-center">
              <RefreshCcw className="w-6 h-6 text-taiba-blue" />
            </div>
            <p className="text-sm font-semibold text-taiba-gray text-center">Request Refund</p>
          </div>
        </button>

        <button className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-taiba-purple bg-opacity-10 rounded-full flex items-center justify-center">
              <Package className="w-6 h-6 text-taiba-purple" />
            </div>
            <p className="text-sm font-semibold text-taiba-gray text-center">Replacement</p>
          </div>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-taiba-blue bg-opacity-10 px-6 py-4 border-b border-gray-200">
          <h3 className="font-bold text-taiba-gray">Recent Orders</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-taiba-gray">Order #{12345 - i}</p>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Delivered
                </span>
              </div>
              <p className="text-sm text-taiba-gray mb-3">3 items • SAR 125.50</p>
              <button className="flex items-center space-x-2 text-sm text-taiba-blue hover:underline font-medium">
                <Star className="w-4 h-4" />
                <span>Rate Your Experience</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold text-taiba-gray mb-4">Need Help?</h3>
        <div className="space-y-3">
          <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <p className="text-sm font-medium text-taiba-gray">Contact Support</p>
            <p className="text-xs text-taiba-gray opacity-75">Get help with your order</p>
          </button>
          <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <p className="text-sm font-medium text-taiba-gray">Track Order Status</p>
            <p className="text-xs text-taiba-gray opacity-75">View delivery progress</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
