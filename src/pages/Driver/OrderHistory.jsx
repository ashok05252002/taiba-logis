import React from 'react';
import { Package, CheckCircle } from 'lucide-react';

function OrderHistory({ orders }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-taiba-gray mb-4">Completed Orders</h2>
        {orders.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {orders.map((order) => (
              <div key={order.id} className="py-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-taiba-gray">{order.id}</p>
                  <span className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    <CheckCircle className="w-3 h-3" />
                    <span>Delivered</span>
                  </span>
                </div>
                <p className="text-sm text-taiba-gray">To: {order.delivery}</p>
                <p className="text-xs text-gray-500 mt-1">Payment: {order.payment}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-taiba-gray">You haven't completed any orders yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;
