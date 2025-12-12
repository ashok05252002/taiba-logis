import React, { useState, useEffect } from 'react';
import { X, ChevronDown, Phone, MessageSquare, MapPin, Send, User, Package, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import Modal from '../../../components/common/Modal';

function OrderDetailsPanel({ order, onClose, drivers, onSave }) {
    const [activeTab, setActiveTab] = useState('ORDER DETAILS');
    const [status, setStatus] = useState(order?.status.toUpperCase() || 'ASSIGNED');
    const [selectedDriver, setSelectedDriver] = useState(order?.driver || '');
    const [newMessage, setNewMessage] = useState('');
    const [comments, setComments] = useState([
        { id: 1, user: 'System', text: 'Order created via Manual Entry', time: '10:30 AM' },
        { id: 2, user: 'Ahmed Ali', text: 'Customer requested delivery after 2 PM', time: '10:35 AM' }
    ]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // Update local state when order prop changes
    useEffect(() => {
        if (order) {
            setStatus(order.status.toUpperCase());
            setSelectedDriver(order.driver);
        }
    }, [order]);

    // Parse payment info from order data
    const paymentString = order?.paymentInfo || '';
    const isCOD = paymentString.toLowerCase().includes('cod');
    const defaultPaymentType = isCOD ? 'COD' : 'PAID';
    const amountMatch = paymentString.match(/[\d.]+/);
    const defaultAmount = amountMatch ? amountMatch[0] : '0';

    if (!order) return null;

    const tabs = ['ORDER DETAILS', 'TRACE LOG', 'DISCUSSION', 'ITEMS'];

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        setComments([...comments, {
            id: comments.length + 1,
            user: 'You',
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        setNewMessage('');
    };

    const handleSaveClick = () => {
        setShowConfirmModal(true);
    };

    const confirmSave = () => {
        // Prepare the updated order object
        // If driver changed from Unassigned to something else, status might need to change to Assigned if not already
        let newStatus = status;
        if (selectedDriver !== 'Unassigned' && selectedDriver !== '' && status === 'UNASSIGNED') {
            newStatus = 'ASSIGNED';
        }

        // Convert status to Title Case for consistency with mock data if needed, or keep uppercase
        // The mock data uses Title Case (e.g., "Assigned", "In Progress")
        const formatStatus = (s) => {
            if (s === 'IN PROGRESS') return 'In Progress';
            if (s === 'TO CONFIRM') return 'To Confirm';
            return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
        };

        const updatedOrder = {
            ...order,
            status: formatStatus(newStatus),
            driver: selectedDriver || 'Unassigned',
            // Add audit log entry
            auditTrail: [
                { 
                    action: `Order updated: Status ${formatStatus(newStatus)}, Driver ${selectedDriver || 'Unassigned'}`, 
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                },
                ...order.auditTrail
            ]
        };

        onSave(updatedOrder);
        setShowConfirmModal(false);
    };

    const renderOrderDetails = () => (
        <div className="space-y-6">
            {/* ID & Save */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">ID</p>
                    <h2 className="text-lg font-bold text-gray-800">{order.id}</h2>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="relative">
                        <select 
                            value={status} 
                            onChange={(e) => setStatus(e.target.value)}
                            className="appearance-none bg-[#E5904D] text-white text-[11px] font-bold px-4 py-1.5 rounded pr-8 cursor-pointer focus:outline-none shadow-sm border border-transparent hover:bg-[#d48342]"
                        >
                            <option>ASSIGNED</option>
                            <option>IN PROGRESS</option>
                            <option>DONE</option>
                            <option>CANCELLED</option>
                            <option>UNASSIGNED</option>
                        </select>
                        <ChevronDown className="w-3 h-3 text-white absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    </div>
                    <div className="flex rounded bg-[#1a73e8] text-white overflow-hidden shadow-sm">
                        <button 
                            onClick={handleSaveClick}
                            className="px-4 py-1.5 text-[11px] font-bold hover:bg-blue-600 transition-colors"
                        >
                            Save
                        </button>
                        <div className="w-px bg-blue-400"></div>
                        <button className="px-2 py-1.5 hover:bg-blue-600 transition-colors"><ChevronDown className="w-3 h-3" /></button>
                    </div>
                </div>
            </div>

            {/* Status Label */}
            <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Status</label>
                <div className="bg-[#E5904D] text-white text-[10px] font-bold px-3 py-1 rounded inline-block shadow-sm">
                    {status}
                </div>
            </div>

            {/* Order & Client */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Order #</label>
                    <input type="text" value={order.title} readOnly className="w-full bg-white border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm" />
                </div>
                <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Client</label>
                    <div className="relative">
                        <select className="w-full bg-white border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 appearance-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm">
                            <option>{order.customer}</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Driver */}
            <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Driver</label>
                <div className="relative">
                    <select 
                        value={selectedDriver}
                        onChange={(e) => setSelectedDriver(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 appearance-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm"
                    >
                        <option value="">Select Driver...</option>
                        <option value="Unassigned">Unassigned</option>
                        {drivers.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                    </select>
                    {selectedDriver && (
                        <X className="w-4 h-4 text-gray-400 absolute right-8 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-red-500" onClick={() => setSelectedDriver('')} />
                    )}
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
            </div>

            {/* ETA */}
            <div className="text-center">
                <p className="text-xs text-gray-500 font-medium">ETA: {order.eta || 'N/A'} <span className="text-blue-500 cursor-pointer hover:underline ml-1">ℹ</span></p>
            </div>

            {/* Payment */}
            <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Payment type</label>
                    <div className="relative">
                        <select 
                            defaultValue={defaultPaymentType}
                            className="w-full bg-white border border-gray-200 rounded px-2 py-2 text-xs text-gray-700 appearance-none focus:ring-1 focus:ring-blue-500 outline-none shadow-sm"
                        >
                            <option>PAID</option>
                            <option>COD</option>
                        </select>
                        <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    </div>
                </div>
                <div className="col-span-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Amount</label>
                    <div className="relative">
                        <input type="number" defaultValue={defaultAmount} className="w-full bg-white border border-gray-200 rounded px-2 py-2 text-xs text-gray-700 focus:ring-1 focus:ring-blue-500 outline-none shadow-sm" />
                    </div>
                </div>
                <div className="col-span-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Currency</label>
                    <div className="w-full bg-gray-100 border border-gray-200 rounded px-2 py-2 text-xs text-gray-600 flex items-center justify-center font-bold">
                        OMR
                    </div>
                </div>
            </div>

            {/* Timeline */}
            <div className="relative pl-6 border-l-2 border-dashed border-gray-300 ml-3 space-y-10 py-2 mt-4">
                {/* Pickup */}
                <div className="relative">
                    <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full border-4 border-blue-500 bg-white flex items-center justify-center shadow-sm">
                    </div>
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="text-sm font-bold text-gray-800">{order.pickupLocation}</h4>
                            <p className="text-xs text-gray-500 mt-0.5">Muscat, Oman</p>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] text-red-500 font-bold bg-red-50 px-1.5 py-0.5 rounded">0h 41min</span>
                            <p className="text-xs text-gray-800 font-bold mt-1">{new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                            <button className="text-[10px] font-bold text-blue-600 hover:underline mt-1">Get Arrival PIN</button>
                        </div>
                    </div>
                </div>

                {/* Dropoff */}
                <div className="relative">
                    <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-blue-500 border-4 border-white shadow-sm flex items-center justify-center">
                    </div>
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="text-sm font-bold text-gray-800">{order.title}</h4>
                            <p className="text-xs text-gray-500 flex items-center mt-0.5"><span className="mr-1">📄</span> {order.destination}</p>
                            <div className="flex items-center mt-2 text-gray-600 text-sm">
                                <Phone className="w-3 h-3 mr-2" />
                                <span>{order.phone}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-800 font-bold">13:58</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
                <button className="flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm">
                    <MessageSquare className="w-4 h-4 text-green-500" />
                    <span>WhatsApp Chat</span>
                </button>
            </div>

            {/* Map Link */}
            <div className="flex items-center justify-center space-x-2 text-blue-600 cursor-pointer hover:underline py-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-bold">View Route on Map</span>
            </div>
        </div>
    );

    const renderTraceLog = () => (
        <div className="space-y-6">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Audit Trail</h3>
            <div className="relative pl-4 border-l-2 border-gray-200 space-y-8">
                {order.auditTrail?.map((log, index) => (
                    <div key={index} className="relative">
                        <div className="absolute -left-[21px] top-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-sm"></div>
                        <div>
                            <p className="text-sm font-semibold text-gray-800">{log.action}</p>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                                <Clock className="w-3 h-3 mr-1" />
                                <span>{log.timestamp}</span>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="relative">
                    <div className="absolute -left-[21px] top-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                    <div>
                        <p className="text-sm font-semibold text-gray-800">Order Created</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{new Date(order.createdAt).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderDiscussion = () => (
        <div className="flex flex-col h-full">
            <div className="flex-1 space-y-4 overflow-y-auto mb-4">
                {comments.map(comment => (
                    <div key={comment.id} className={`flex flex-col ${comment.user === 'You' ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-[80%] rounded-lg p-3 ${comment.user === 'You' ? 'bg-blue-100 text-blue-900' : 'bg-white border border-gray-200'}`}>
                            <p className="text-xs font-bold mb-1">{comment.user}</p>
                            <p className="text-sm">{comment.text}</p>
                        </div>
                        <span className="text-[10px] text-gray-400 mt-1">{comment.time}</span>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage} className="relative mt-auto">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a comment..."
                    className="w-full border border-gray-300 rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none focus:border-blue-500"
                />
                <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700">
                    <Send className="w-4 h-4" />
                </button>
            </form>
        </div>
    );

    const renderItems = () => (
        <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Order Items</h3>
            {order.items && order.items.length > 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-2">Item</th>
                                <th className="px-4 py-2 text-center">Qty</th>
                                <th className="px-4 py-2 text-right">Price</th>
                                <th className="px-4 py-2 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {order.items.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="px-4 py-3 font-medium text-gray-800">{item.name}</td>
                                    <td className="px-4 py-3 text-center">{item.qty}</td>
                                    <td className="px-4 py-3 text-right">OMR {item.price.toFixed(2)}</td>
                                    <td className="px-4 py-3 text-right font-bold">OMR {(item.price * item.qty).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-gray-50 font-bold text-gray-800">
                            <tr>
                                <td colSpan="3" className="px-4 py-3 text-right">Grand Total</td>
                                <td className="px-4 py-3 text-right">
                                    OMR {order.items.reduce((acc, item) => acc + (item.price * item.qty), 0).toFixed(2)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            ) : (
                <div className="text-center py-8 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-2 opacity-20" />
                    <p>No items details available.</p>
                </div>
            )}
        </div>
    );

    return (
        <>
            <div className="fixed inset-y-0 right-0 w-[450px] bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out border-l border-gray-200">
                {/* Header */}
                <div className="bg-[#1a73e8] text-white flex items-center justify-between px-4 h-12 flex-shrink-0">
                    <div className="flex space-x-6 h-full">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`text-[11px] font-bold h-full border-b-4 transition-colors tracking-wide ${activeTab === tab ? 'border-white text-white' : 'border-transparent text-blue-200 hover:text-white'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-blue-600 rounded transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto bg-[#F8F9FA] p-5">
                    {activeTab === 'ORDER DETAILS' && renderOrderDetails()}
                    {activeTab === 'TRACE LOG' && renderTraceLog()}
                    {activeTab === 'DISCUSSION' && renderDiscussion()}
                    {activeTab === 'ITEMS' && renderItems()}
                </div>
            </div>

            {/* Confirmation Modal */}
            <Modal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)} title="Confirm Update">
                <div className="text-center">
                    <AlertTriangle className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-800">Update Order?</h3>
                    <p className="text-gray-600 my-4 text-sm">
                        Are you sure you want to update the status to <strong>{status}</strong> and assign driver <strong>{selectedDriver || 'Unassigned'}</strong>?
                    </p>
                    <div className="flex justify-center space-x-4 pt-4">
                        <button 
                            onClick={() => setShowConfirmModal(false)} 
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={confirmSave} 
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                        >
                            Confirm Update
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default OrderDetailsPanel;
