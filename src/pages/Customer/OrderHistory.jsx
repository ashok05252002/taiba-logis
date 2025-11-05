import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

function OrderHistory({ pastOrders }) {
    if (!pastOrders || pastOrders.length === 0) {
        return <p className="text-sm text-taiba-gray text-center py-8">No past orders found.</p>;
    }

    const deliveredOrders = pastOrders.filter(o => o.status === 'Delivered');
    const canceledOrders = pastOrders.filter(o => o.status === 'Canceled');

    return (
        <div className="space-y-6">
            <h3 className="font-semibold text-taiba-gray text-base">Delivered Orders</h3>
            {deliveredOrders.length > 0 ? (
                <div className="divide-y divide-gray-200">
                    {deliveredOrders.map(order => (
                        <div key={order.id} className="py-3">
                            <div className="flex items-center justify-between mb-2">
                                <p className="font-semibold text-taiba-gray text-sm">{order.id}</p>
                                <span className="flex items-center space-x-1 px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                    <CheckCircle className="w-3 h-3" />
                                    <span>Delivered</span>
                                </span>
                            </div>
                            <p className="text-xs text-taiba-gray">{order.items} items • OMR {order.total}</p>
                            <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-taiba-gray">No delivered orders yet.</p>
            )}

            <h3 className="font-semibold text-taiba-gray text-base mt-6">Canceled/Returned Orders</h3>
            {canceledOrders.length > 0 ? (
                <div className="divide-y divide-gray-200">
                    {canceledOrders.map(order => (
                        <div key={order.id} className="py-3">
                            <div className="flex items-center justify-between mb-2">
                                <p className="font-semibold text-taiba-gray text-sm">{order.id}</p>
                                <span className="flex items-center space-x-1 px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                                    <XCircle className="w-3 h-3" />
                                    <span>Canceled</span>
                                </span>
                            </div>
                            <p className="text-xs text-taiba-gray">{order.reason}</p>
                            <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-taiba-gray">No canceled orders.</p>
            )}
        </div>
    );
}

export default OrderHistory;
