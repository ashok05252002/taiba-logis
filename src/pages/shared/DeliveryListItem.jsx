import React from 'react';
import { Ban } from 'lucide-react';

const StatusBadge = ({ status }) => {
    const statusConfig = {
        'Assigned': 'bg-[#E5904D] text-white', // Orange-ish
        'Done': 'bg-[#8F95A3] text-white', // Grey
        'In Progress': 'bg-[#5CB8A7] text-white', // Teal/Green
        'To Confirm': 'bg-purple-500 text-white',
        'Unassigned': 'bg-blue-500 text-white',
        'Cancelled': 'bg-red-500 text-white',
    };

    const className = statusConfig[status] || 'bg-gray-400 text-white';
    
    return (
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${className}`}>
            {status}
        </span>
    );
};

const DeliveryListItem = ({ delivery, isSelected, onSelect, onClick, onViewPin }) => {
    
    const getDurationColor = (duration) => {
        if (duration.includes('h')) return 'text-red-500';
        return 'text-green-600';
    };

    return (
        <div 
            className={`flex items-center p-3 border-b border-gray-100 hover:bg-blue-50 transition-colors cursor-pointer group ${isSelected ? 'bg-blue-50' : 'bg-white'}`}
            onClick={onClick}
        >
            {/* Column 1: Checkbox & Icon */}
            <div className="flex items-center space-x-3 w-14 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                <input 
                    type="checkbox" 
                    checked={!!isSelected}
                    onChange={() => onSelect(delivery.id)}
                    className="w-4 h-4 rounded border-gray-300 text-taiba-blue focus:ring-taiba-blue cursor-pointer" 
                />
                <div className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-300">
                    <Ban className="w-4 h-4" />
                </div>
            </div>

            {/* Column 2: ID & Title - Reduced width slightly */}
            <div className="w-48 flex-shrink-0 pr-4">
                <h4 className="font-bold text-gray-800 text-sm truncate" title={delivery.title}>{delivery.title}</h4>
                <p className="text-xs text-gray-500 flex items-center mt-0.5">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-1.5"></span>
                    ID {delivery.id}
                </p>
            </div>

            {/* Column 3: Status */}
            <div className="w-28 flex-shrink-0">
                <StatusBadge status={delivery.status} />
            </div>

            {/* Column 4: Time - Delivery Type Removed */}
            <div className="w-48 flex-shrink-0 pr-4">
                <div className="text-xs text-gray-700 font-medium">
                    Today | {delivery.timeRange} | <span className={getDurationColor(delivery.duration)}>{delivery.duration}</span>
                </div>
            </div>

            {/* Column 5: Locations (Visual Connector) */}
            <div className="flex-1 min-w-0 pr-4 flex items-start">
                <div className="flex flex-col items-center mr-3 pt-1 self-stretch">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-0.5 flex-grow bg-gray-200 my-0.5 min-h-[16px]"></div>
                    <div className="w-2 h-2 border-2 border-gray-400 rounded-full bg-white"></div>
                </div>
                <div className="flex flex-col justify-between h-full space-y-1 w-full">
                    <span className="text-xs font-semibold text-gray-800 truncate block" title={delivery.pickupLocation}>{delivery.pickupLocation}</span>
                    <span className="text-xs text-gray-600 truncate block" title={delivery.destination}>{delivery.destination}</span>
                </div>
            </div>

            {/* Column 6: Payment & Actions - Increased width */}
            <div className="w-52 flex-shrink-0 text-right flex flex-col items-end justify-center space-y-1.5 pl-2">
                <div className="text-xs text-gray-600 font-medium">
                    {delivery.source} | {delivery.paymentInfo}
                </div>
                <div className="flex items-center justify-end space-x-3 w-full">
                    {delivery.waitTime && (
                        <span className="text-[10px] text-red-500 font-bold whitespace-nowrap bg-red-50 px-2 py-0.5 rounded">
                            Wait: {delivery.waitTime}
                        </span>
                    )}
                    {delivery.hasArrivalPin && (
                        <button 
                            className="text-[10px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1 rounded transition-colors whitespace-nowrap"
                            onClick={(e) => { 
                                e.stopPropagation(); 
                                onViewPin(delivery);
                            }}
                        >
                            Arrival PIN
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeliveryListItem;
