import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Map, KeyRound, Star, CheckCircle } from 'lucide-react';
import OrderTimeline from './components/OrderTimeline';

const timelineStatuses = ['Order Confirmed', 'Picked Up by Driver', 'Out for Delivery', 'Arrived at Destination', 'Delivered'];

function OrderTrackingPage({ order, onCompleteOrder }) {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [currentStatusIndex, setCurrentStatusIndex] = useState(2);
    const [isDelivered, setIsDelivered] = useState(false);
    const [rating, setRating] = useState(0);

    // Simulate order progress
    useEffect(() => {
        if (!order) return;
        if (currentStatusIndex < timelineStatuses.length - 2) { // Stop before 'Delivered'
            const timer = setTimeout(() => {
                setCurrentStatusIndex(prev => prev + 1);
            }, 8000); // Move to next status every 8 seconds
            return () => clearTimeout(timer);
        } else if (currentStatusIndex === timelineStatuses.length - 2) { // 'Arrived'
            // Simulate driver entering PIN after a delay
            const pinTimer = setTimeout(() => {
                onCompleteOrder(order.id);
                setIsDelivered(true);
            }, 5000);
            return () => clearTimeout(pinTimer);
        }
    }, [currentStatusIndex, order, onCompleteOrder]);
    
    if (!order && !isDelivered) {
        return (
            <div className="text-center p-8">
                <h2 className="text-xl font-bold text-red-500">Order Not Found</h2>
                <p className="text-taiba-gray mt-2">The requested order could not be found or has been completed.</p>
                <Link to="/customer/orders" className="mt-4 inline-block btn-primary">
                    Back to Orders
                </Link>
            </div>
        );
    }
    
    const currentOrder = order || { id: orderId };
    const currentStatus = timelineStatuses[currentStatusIndex];

    if (isDelivered) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6 text-center animate-fade-in">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-taiba-gray">Order Delivered!</h2>
                <p className="text-taiba-gray mt-2 mb-6">Thank you for your order. We hope you enjoy your products!</p>
                
                <div className="mb-6">
                    <h3 className="font-semibold text-taiba-gray mb-2">Rate your delivery experience</h3>
                    <div className="flex justify-center space-x-2">
                        {[1, 2, 3, 4, 5].map(star => (
                            <button key={star} onClick={() => setRating(star)}>
                                <Star className={`w-8 h-8 transition-colors ${rating >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            </button>
                        ))}
                    </div>
                </div>

                <button onClick={() => navigate('/customer/orders')} className="btn-primary w-full py-3">
                    Back to Orders
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Link to="/customer/orders" className="flex items-center space-x-2 text-taiba-blue hover:underline font-medium">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Orders</span>
            </Link>

            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between border-b pb-4 mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-taiba-gray">Order #{currentOrder.id}</h2>
                        <p className="text-sm text-taiba-gray">Status: <span className="font-semibold text-blue-600">{currentStatus}</span></p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-taiba-gray">ETA</p>
                        <p className="text-lg font-bold text-taiba-blue">{currentOrder.eta}</p>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="space-y-6">
                        <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                                <Map className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-taiba-gray">Live map will render here</p>
                            </div>
                        </div>
                        {currentStatus === 'Arrived at Destination' && (
                            <div className="bg-taiba-blue bg-opacity-10 p-4 rounded-lg text-center animate-fade-in">
                                <KeyRound className="w-8 h-8 text-taiba-blue mx-auto mb-2" />
                                <h3 className="font-bold text-taiba-gray">Your Arrival PIN</h3>
                                <p className="text-sm text-taiba-gray mb-2">Share this PIN with the driver to confirm delivery.</p>
                                <p className="text-4xl font-bold text-taiba-blue tracking-widest">{currentOrder.arrivalPin}</p>
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold text-taiba-gray mb-4">Delivery Timeline</h3>
                        <OrderTimeline currentStatus={currentStatus} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderTrackingPage;
