import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, User, Phone, Truck, Package, History, UserPlus, ExternalLink, KeyRound, CheckCircle, UserCheck, MessageSquare, Ban } from 'lucide-react';
import ProgressBar from '../../components/common/ProgressBar';
import OverrideAssignmentModal from '../SuperAdmin/oversight/OverrideAssignmentModal';
import ReassignDriverModal from '../DeliveryAdmin/oversight/ReassignDriverModal';
import CancelOrderModal from './CancelOrderModal';
import { allDeliveries, allDrivers } from '../../data/mockData';

const progressSteps = ['Confirmed', 'Assigned', 'In Progress', 'Delivered'];

const getLogIcon = (action) => {
    if (action.includes('Created')) return { icon: Package, color: 'text-blue-500' };
    if (action.includes('Assigned')) return { icon: UserCheck, color: 'text-purple-500' };
    if (action.includes('Pickup') || action.includes('Out for Delivery')) return { icon: Truck, color: 'text-orange-500' };
    if (action.includes('Arrived')) return { icon: MapPin, color: 'text-indigo-500' };
    if (action.includes('PIN Generated')) return { icon: KeyRound, color: 'text-teal-500' };
    if (action.includes('Delivered')) return { icon: CheckCircle, color: 'text-green-500' };
    if (action.includes('Cancelled')) return { icon: Ban, color: 'text-red-500' };
    return { icon: History, color: 'text-gray-500' };
};

function OrderDetailPage({ onConfirmAssignment, zones = [] }) {
    const { orderId } = useParams();
    const initialOrder = allDeliveries.find(o => o.id === orderId);
    
    const [order, setOrder] = useState(initialOrder);
    const [activeTab, setActiveTab] = useState('progress');
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    
    const isSuperAdmin = window.location.pathname.includes('super-admin');

    if (!order) {
        return (
            <div className="text-center p-8">
                <h2 className="text-xl font-bold text-red-500">Order Not Found</h2>
                <p className="text-taiba-gray mt-2">The requested order could not be found.</p>
                <Link to={-1} className="mt-4 inline-block btn-primary">
                    Back to Oversight
                </Link>
            </div>
        );
    }
    
    const getStatusIndex = (status) => {
        switch (status) {
            case 'To Confirm': case 'Pending': case 'Unassigned': return 0;
            case 'Assigned': return 1;
            case 'In Transit': case 'In Progress': case 'Arrived at Destination': return 2;
            case 'Delivered': case 'Done': return 3;
            case 'Cancelled': return -1;
            default: return -1;
        }
    };
    
    const currentStepIndex = getStatusIndex(order.status);
    
    const handleAssignmentConfirm = (deliveryId, newDriverOrZone, newDriver) => {
        const driverName = isSuperAdmin ? newDriver : newDriverOrZone;
        const updatedOrder = {
            ...order,
            driver: driverName,
            status: 'Assigned',
            zone: isSuperAdmin ? newDriverOrZone : order.zone,
            auditTrail: [...order.auditTrail, { action: `Assigned to ${driverName}`, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]
        };
        setOrder(updatedOrder);
        console.log(`Order ${deliveryId} assigned to ${driverName}`);
        setIsAssignModalOpen(false);
    };

    const handleCancelConfirm = (orderId, reason, comments) => {
        const now = new Date();
        const updatedOrder = {
            ...order,
            status: 'Cancelled',
            cancellationReason: reason,
            cancellationComments: comments,
            auditTrail: [
                ...order.auditTrail,
                { action: `Order Cancelled by Admin: ${reason}`, timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
            ]
        };
        setOrder(updatedOrder);
        console.log(`Order ${orderId} cancelled. Reason: ${reason}, Comments: ${comments}`);
        setIsCancelModalOpen(false);
    };

    const handleGetDirections = (address) => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
        window.open(url, '_blank');
    };

    const renderTabs = () => (
        <div className="border-b border-gray-200">
            <div className="flex space-x-1 sm:space-x-4 px-2 sm:px-4">
                <button onClick={() => setActiveTab('progress')} className={`py-4 px-3 font-medium border-b-2 ${activeTab === 'progress' ? 'border-taiba-blue text-taiba-blue' : 'border-transparent text-taiba-gray'}`}>Progress</button>
                <button onClick={() => setActiveTab('items')} className={`py-4 px-3 font-medium border-b-2 ${activeTab === 'items' ? 'border-taiba-blue text-taiba-blue' : 'border-transparent text-taiba-gray'}`}>Items</button>
                <button onClick={() => setActiveTab('partner')} className={`py-4 px-3 font-medium border-b-2 ${activeTab === 'partner' ? 'border-taiba-blue text-taiba-blue' : 'border-transparent text-taiba-gray'}`}>Delivery Partner</button>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'items':
                const subtotal = order.items.reduce((acc, item) => acc + (item.price * item.qty), 0);
                const deliveryFee = 1.50;
                const total = subtotal + deliveryFee;
                return (
                    <div className="space-y-4">
                        <div className="divide-y divide-gray-200 border rounded-lg">
                            {order.items.map(item => (
                                <div key={item.name} className="flex justify-between p-3">
                                    <div>
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-xs text-gray-500">OMR {item.price.toFixed(2)} x {item.qty}</p>
                                    </div>
                                    <p className="font-semibold">OMR {(item.price * item.qty).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-2 border-t pt-4">
                            <div className="flex justify-between text-sm"><span className="text-gray-600">Subtotal</span><span>OMR {subtotal.toFixed(2)}</span></div>
                            <div className="flex justify-between text-sm"><span className="text-gray-600">Delivery Fee</span><span>OMR {deliveryFee.toFixed(2)}</span></div>
                            <div className="flex justify-between font-bold text-base"><span >Total</span><span>OMR {total.toFixed(2)}</span></div>
                        </div>
                    </div>
                );
            case 'partner':
                return (
                    order.driver !== 'Unassigned' ? (
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center space-x-3"><Truck className="w-4 h-4 text-taiba-purple" /><span>{order.driver}</span></div>
                            <div className="flex items-center space-x-3"><Phone className="w-4 h-4 text-taiba-purple" /><span>+966 50 XXX XXXX</span></div>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <UserPlus className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h4 className="font-bold text-taiba-gray">No Driver Assigned</h4>
                            <p className="text-sm text-taiba-gray mt-2 mb-4">This order is pending driver assignment.</p>
                            <button onClick={() => setIsAssignModalOpen(true)} className="btn-primary">Assign Driver</button>
                        </div>
                    )
                );
            case 'progress':
            default:
                return (
                    <div className="space-y-6">
                        {order.status !== 'Cancelled' && <ProgressBar steps={progressSteps} currentStepIndex={currentStepIndex} />}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <div className="text-center">
                                        <MapPin className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-taiba-gray">Map placeholder</p>
                                    </div>
                                </div>
                                <button onClick={() => handleGetDirections(order.address)} className="w-full flex items-center justify-center space-x-2 btn-secondary py-2.5">
                                    <ExternalLink className="w-4 h-4" />
                                    <span>Get Directions</span>
                                </button>
                                <div className="space-y-3 text-sm pt-2">
                                    <div className="flex items-start space-x-3"><MapPin className="w-4 h-4 text-taiba-purple mt-0.5" /><span>{order.address} ({order.zone})</span></div>
                                    <div className="flex items-center space-x-3"><User className="w-4 h-4 text-taiba-purple" /><span>{order.customer}</span></div>
                                    <div className="flex items-center space-x-3">
                                        <Phone className="w-4 h-4 text-taiba-purple" />
                                        <span>{order.phone}</span>
                                        <a href={`https://wa.me/${order.phone}`} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-600">
                                            <MessageSquare className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="font-bold text-taiba-gray">Delivery Log</h4>
                                <div className="space-y-0 max-h-80 overflow-y-auto pr-2">
                                    {order.auditTrail.map((event, index) => {
                                        const { icon: Icon, color } = getLogIcon(event.action);
                                        return (
                                            <div key={index} className="flex items-start space-x-4">
                                                <div className="flex flex-col items-center">
                                                    <div className={`w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center`}>
                                                        <Icon className={`w-5 h-5 ${color}`} />
                                                    </div>
                                                    {index < order.auditTrail.length - 1 && (
                                                        <div className="w-px h-10 bg-gray-300"></div>
                                                    )}
                                                </div>
                                                <div className="pt-1">
                                                    <p className="font-semibold text-taiba-gray text-sm">{event.action}</p>
                                                    <p className="text-xs text-gray-500">{event.timestamp}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Link to={-1} className="flex items-center space-x-2 text-taiba-blue hover:underline font-medium">
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Delivery Oversight</span>
                    </Link>
                    {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                        <button onClick={() => setIsCancelModalOpen(true)} className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-all">
                            <Ban className="w-4 h-4" />
                            <span>Cancel Order</span>
                        </button>
                    )}
                </div>

                <div className="bg-white rounded-xl shadow-md">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-taiba-gray">Order #{order.id}</h2>
                        <p className="text-sm text-taiba-gray">Customer: <span className="font-semibold">{order.customer}</span></p>
                        {order.status === 'Cancelled' && (
                            <div className="mt-2 p-3 bg-red-50 rounded-lg border border-red-200">
                                <p className="font-bold text-red-700">Cancelled: {order.cancellationReason}</p>
                                <p className="text-sm text-red-600">"{order.cancellationComments}"</p>
                            </div>
                        )}
                    </div>
                    {renderTabs()}
                    <div className="p-6">
                        {renderContent()}
                    </div>
                </div>
            </div>
            
            {isSuperAdmin ? (
                <OverrideAssignmentModal isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} delivery={order} zones={zones} drivers={allDrivers} onConfirm={handleAssignmentConfirm} />
            ) : (
                <ReassignDriverModal isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} delivery={order} drivers={allDrivers} onConfirm={handleAssignmentConfirm} />
            )}

            <CancelOrderModal
                isOpen={isCancelModalOpen}
                onClose={() => setIsCancelModalOpen(false)}
                orderId={order.id}
                onConfirm={handleCancelConfirm}
            />
        </>
    );
}

export default OrderDetailPage;
