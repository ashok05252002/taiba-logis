import React from 'react';
import { MoreVertical, User, Truck, MapPin, Circle, Eye, UserPlus, Edit, History, Briefcase } from 'lucide-react';

// Status Badge Component
const StatusBadge = ({ status }) => {
    const statusConfig = {
        'To Confirm': 'bg-yellow-100 text-yellow-800',
        'Pending': 'bg-orange-100 text-orange-800',
        'Unassigned': 'bg-orange-100 text-orange-800',
        'Assigned': 'bg-blue-100 text-blue-800',
        'In Progress': 'bg-indigo-100 text-indigo-800',
        'In Transit': 'bg-indigo-100 text-indigo-800',
        'Delayed': 'bg-red-100 text-red-800',
        'Done': 'bg-green-100 text-green-800',
        'Delivered': 'bg-green-100 text-green-800',
        'Cancelled': 'bg-gray-200 text-gray-800',
        'Failed': 'bg-red-100 text-red-800',
    };

    const className = statusConfig[status] || 'bg-gray-100 text-gray-800';
    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${className}`}>
            {status}
        </span>
    );
};

const DeliveryListItem = ({ delivery, onMenuToggle, isMenuOpen, menuRef, onActionClick, onNavigate }) => {
    
    const getDurationColor = (duration) => {
        if (duration.includes('h')) return 'text-red-500';
        return 'text-green-500';
    };

    return (
        // Added relative and conditional z-index to fix menu visibility
        <div className={`p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors relative ${isMenuOpen ? 'z-10' : ''}`}>
            {/* Top section with time and location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                {/* Left Column */}
                <div className="flex items-center space-x-4">
                    <div className="flex-1 space-y-1">
                        <div className="flex items-center flex-wrap space-x-2 text-sm text-taiba-gray">
                            <span>Today | {delivery.timeRange} |</span>
                            <span className={`font-bold ${getDurationColor(delivery.duration)}`}>{delivery.duration}</span>
                            <Truck className="w-5 h-5 text-taiba-blue" />
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-taiba-gray">
                            <Briefcase className="w-4 h-4" />
                            <span>{delivery.deliveryType}</span>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="flex items-center space-x-4">
                     <div className="flex-1 space-y-1 text-sm text-taiba-gray">
                        <div className="flex items-center space-x-2">
                            <Circle className="w-2 h-2 fill-current text-gray-400" />
                            <span className="font-semibold">{delivery.source}</span>
                        </div>
                        <div className="flex items-start space-x-2">
                            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>{delivery.destination}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom section with customer, driver, status, and actions */}
            <div className="pt-3 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
                <div className="flex items-center flex-wrap gap-x-6 gap-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-taiba-purple" />
                        <span className="text-taiba-gray">Customer: <span className="font-semibold">{delivery.customer}</span></span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Truck className="w-4 h-4 text-taiba-purple" />
                        <span className="text-taiba-gray">Driver: <span className="font-semibold">{delivery.driver}</span></span>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <StatusBadge status={delivery.status} />
                    <div className="relative">
                        <button onClick={() => onMenuToggle(isMenuOpen ? null : delivery.id)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <MoreVertical className="w-5 h-5" />
                        </button>
                        {isMenuOpen && (
                            <div ref={menuRef} className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-50">
                                <button onClick={() => { onNavigate(delivery.id); onMenuToggle(null); }} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-taiba-gray hover:bg-gray-50">
                                    <Eye className="w-4 h-4" />
                                    <span>View Details</span>
                                </button>
                                {delivery.driver === 'Unassigned' ? (
                                    <button onClick={() => { onActionClick('override', delivery); onMenuToggle(null); }} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-taiba-gray hover:bg-gray-50">
                                        <UserPlus className="w-4 h-4" />
                                        <span>Assign Driver</span>
                                    </button>
                                ) : (
                                    <button onClick={() => { onActionClick('override', delivery); onMenuToggle(null); }} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-taiba-gray hover:bg-gray-50">
                                        <Edit className="w-4 h-4" />
                                        <span>Reassign/Override</span>
                                    </button>
                                )}
                                <button onClick={() => { onActionClick('audit', delivery); onMenuToggle(null); }} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-taiba-gray hover:bg-gray-50">
                                    <History className="w-4 h-4" />
                                    <span>View Audit Trail</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryListItem;
