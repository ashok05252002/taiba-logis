import React, { useState } from 'react';
import { X, ChevronDown, Phone, MessageSquare, MapPin } from 'lucide-react';

function OrderDetailsPanel({ order, onClose, drivers }) {
    const [activeTab, setActiveTab] = useState('ORDER DETAILS');
    const [status, setStatus] = useState(order?.status.toUpperCase() || 'ASSIGNED');
    const [selectedDriver, setSelectedDriver] = useState(order?.driver || '');

    if (!order) return null;

    const tabs = ['ORDER DETAILS', 'TRACE LOG', 'DISCUSSION', 'ITEMS'];

    return (
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
            <div className="flex-1 overflow-y-auto bg-[#F8F9FA] p-5 space-y-6">
                
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
                            </select>
                            <ChevronDown className="w-3 h-3 text-white absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                        </div>
                        <div className="flex rounded bg-[#1a73e8] text-white overflow-hidden shadow-sm">
                            <button className="px-4 py-1.5 text-[11px] font-bold hover:bg-blue-600 transition-colors">Save</button>
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
                                <option>Select...</option>
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
                            {drivers.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                        </select>
                        <X className="w-4 h-4 text-gray-400 absolute right-8 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-red-500" onClick={() => setSelectedDriver('')} />
                        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    </div>
                </div>

                {/* DOD Tag */}
                <div className="flex justify-center">
                    <span className="bg-red-50 text-red-600 text-[10px] font-bold px-4 py-1.5 rounded-full border border-red-100 uppercase tracking-wide">DOD Assigned</span>
                </div>

                {/* ETA */}
                <div className="text-center">
                    <p className="text-xs text-gray-500 font-medium">ETA: N/A <span className="text-blue-500 cursor-pointer hover:underline ml-1">ℹ</span></p>
                </div>

                {/* Payment */}
                <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Payment type</label>
                        <div className="relative">
                            <select className="w-full bg-white border border-gray-200 rounded px-2 py-2 text-xs text-gray-700 appearance-none focus:ring-1 focus:ring-blue-500 outline-none shadow-sm">
                                <option>PAID</option>
                                <option>COD</option>
                            </select>
                            <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>
                    <div className="col-span-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Amount</label>
                        <div className="relative">
                            <input type="number" defaultValue="0" className="w-full bg-white border border-gray-200 rounded px-2 py-2 text-xs text-gray-700 focus:ring-1 focus:ring-blue-500 outline-none shadow-sm" />
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
        </div>
    );
}

export default OrderDetailsPanel;
