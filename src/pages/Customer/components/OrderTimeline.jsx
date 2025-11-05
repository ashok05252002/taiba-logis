import React from 'react';
import { CheckCircle, Truck, Package, Home } from 'lucide-react';

const timelineSteps = [
    { status: 'Order Confirmed', icon: Package },
    { status: 'Picked Up by Driver', icon: Truck },
    { status: 'Out for Delivery', icon: Truck },
    { status: 'Arrived at Destination', icon: Home },
    { status: 'Delivered', icon: CheckCircle },
];

function OrderTimeline({ currentStatus }) {
    const currentIndex = timelineSteps.findIndex(step => step.status === currentStatus);

    return (
        <div className="space-y-0">
            {timelineSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= currentIndex ? 'bg-green-500' : 'bg-gray-300'}`}>
                            <step.icon className="w-5 h-5 text-white" />
                        </div>
                        {index < timelineSteps.length - 1 && (
                            <div className={`w-px h-12 ${index < currentIndex ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        )}
                    </div>
                    <div className="pt-1">
                        <p className={`font-semibold ${index <= currentIndex ? 'text-taiba-gray' : 'text-gray-500'}`}>{step.status}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default OrderTimeline;
