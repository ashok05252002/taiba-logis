import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, User, Phone, Package, Clock, Truck, CheckCircle } from 'lucide-react';

function OrderDetailPage({ orders }) {
    const { orderId } = useParams();
    const order = orders.find(o => o.id === orderId);

    if (!order) {
        return (
            <div className="text-center p-8">
                <h2 className="text-xl font-bold text-red-500">Order Not Found</h2>
                <p className="text-taiba-gray mt-2">The requested order could not be found.</p>
                <Link to="/store-incharge/status" className="mt-4 inline-block btn-primary">
                    Back to Tracking
                </Link>
            </div>
        );
    }

    const timeline = [
        { status: 'Order Placed', time: '10:30 AM', completed: true },
        { status: 'Ready for Pickup', time: '11:15 AM', completed: true },
        { status: 'Handed Over to Driver', time: '11:30 AM', completed: true },
        { status: 'In Transit', time: '11:32 AM', completed: true },
        { status: 'Delivered', time: 'Est. 12:00 PM', completed: false },
    ];

    return (
        <div className="space-y-6">
            <Link to="/store-incharge/status" className="flex items-center space-x-2 text-taiba-blue hover:underline font-medium">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Tracking List</span>
            </Link>

            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4 mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-taiba-gray">Order #{order.id}</h2>
                        <p className="text-sm text-taiba-gray">Status: <span className="font-semibold text-blue-600">{order.status}</span></p>
                    </div>
                    <div className="text-left md:text-right mt-4 md:mt-0">
                        <p className="text-sm text-taiba-gray">ETA</p>
                        <p className="text-xl font-bold text-taiba-blue">{order.eta}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column: Details */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-bold text-taiba-gray mb-3">Customer & Delivery Details</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center space-x-3"><User className="w-4 h-4 text-taiba-purple" /><span>{order.customer}</span></div>
                                <div className="flex items-center space-x-3"><Phone className="w-4 h-4 text-taiba-purple" /><span>{order.phone}</span></div>
                                <div className="flex items-start space-x-3"><MapPin className="w-4 h-4 text-taiba-purple mt-0.5" /><span>{order.address}</span></div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-taiba-gray mb-3">Driver Details</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center space-x-3"><Truck className="w-4 h-4 text-taiba-purple" /><span>{order.driver} (ID: {order.driverId})</span></div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-taiba-gray mb-3">Order Items</h3>
                            <div className="space-y-2 text-sm border-t pt-3">
                                {order.orderItems.map(item => (
                                    <div key={item.name} className="flex justify-between">
                                        <span>{item.name}</span>
                                        <span className="font-semibold">x{item.qty}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Timeline & Map */}
                    <div className="space-y-6">
                         <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                            <p className="text-taiba-gray">Map placeholder for order {order.id}</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-taiba-gray mb-4">Delivery Timeline</h3>
                            <div className="space-y-0">
                                {timeline.map((item, index) => (
                                    <div key={index} className="flex items-start space-x-4">
                                        <div className="flex flex-col items-center">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.completed ? 'bg-green-500' : 'bg-gray-300'}`}>
                                                <CheckCircle className="w-5 h-5 text-white" />
                                            </div>
                                            {index < timeline.length - 1 && <div className="w-px h-12 bg-gray-300"></div>}
                                        </div>
                                        <div className="pt-1">
                                            <p className={`font-semibold ${item.completed ? 'text-taiba-gray' : 'text-gray-500'}`}>{item.status}</p>
                                            <p className="text-sm text-gray-500">{item.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetailPage;
