import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, CreditCard, Phone, AlertTriangle } from 'lucide-react';

function NewOrderCard({ order, onAccept, onReject }) {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft === 0) {
      onReject(); // Auto-reject if timer runs out
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onReject]);

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-taiba-blue animate-pulse-border">
      <div className="bg-taiba-blue bg-opacity-10 px-6 py-4 border-b border-gray-200">
        <h3 className="font-bold text-taiba-gray flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          <span>New Delivery Assignment</span>
        </h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="text-center mb-4">
          <p className="text-sm text-red-600 font-medium">Please respond within</p>
          <p className="text-4xl font-bold text-red-600">{timeLeft}s</p>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-3">
            <MapPin className="w-4 h-4 text-taiba-purple mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-taiba-gray">Pickup:</p>
              <p className="text-taiba-gray">{order.pickup}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Navigation className="w-4 h-4 text-taiba-purple mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-taiba-gray">Deliver To:</p>
              <p className="text-taiba-gray">{order.delivery}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-2 border-t mt-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <p className="text-sm text-taiba-gray">ETA: <span className="font-semibold">{order.eta}</span></p>
          </div>
          <div className="flex items-center space-x-2">
            <CreditCard className="w-4 h-4 text-gray-500" />
            <p className="text-sm text-taiba-gray">Payment: <span className="font-semibold">{order.payment}</span></p>
          </div>
           <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-gray-500" />
            <p className="text-sm text-taiba-gray">Contact: <span className="font-semibold">{order.customerContact}</span></p>
          </div>
        </div>
      </div>
      <div className="p-4 flex space-x-4 bg-gray-50">
        <button onClick={onAccept} className="flex-1 bg-taiba-blue text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
          Accept
        </button>
        <button onClick={onReject} className="flex-1 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
          Reject
        </button>
      </div>
    </div>
  );
}

export default NewOrderCard;
