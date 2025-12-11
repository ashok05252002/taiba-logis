import React, { useState } from 'react';
import { Search, RefreshCw, FileText, ChevronDown, Filter, Volume2, Layout } from 'lucide-react';
import DeliveryListItem from '../shared/DeliveryListItem';
import OrderDetailsPanel from './components/OrderDetailsPanel';
import CreateOrderModal from '../shared/CreateOrderModal';
import { allDeliveries, allDrivers } from '../../data/mockData';

const tabs = [
    { id: 'all', name: 'ALL', count: allDeliveries.length, color: 'bg-gray-700' },
    { id: 'confirm', name: 'TO CONFIRM', count: 0, color: 'bg-purple-500' },
    { id: 'unassigned', name: 'UNASSIGNED', count: 1, color: 'bg-blue-500' },
    { id: 'assigned', name: 'ASSIGNED', count: 4, color: 'bg-[#E5904D]' },
    { id: 'progress', name: 'IN PROGRESS', count: 1, color: 'bg-[#5CB8A7]' },
    { id: 'done', name: 'DONE', count: 2, color: 'bg-[#8F95A3]' },
    { id: 'cancelled', name: 'CANCELLED', count: 0, color: 'bg-red-500' },
];

function DeliveryOversight() {
    const [activeTab, setActiveTab] = useState('all');
    const [deliveries, setDeliveries] = useState(allDeliveries);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
    };

    const handleClosePanel = () => {
        setSelectedOrder(null);
    };

    const handleSelectOrder = (id) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(deliveries.map(d => d.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleCreateOrder = (newOrder) => {
        setDeliveries(prev => [newOrder, ...prev]);
        setIsCreateModalOpen(false);
    };

    const filteredDeliveries = deliveries.filter(d => {
        const matchesSearch = d.title.toLowerCase().includes(searchTerm.toLowerCase()) || d.id.includes(searchTerm);
        if (!matchesSearch) return false;

        switch (activeTab) {
            case 'confirm': return d.status === 'To Confirm';
            case 'unassigned': return d.driver === 'Unassigned';
            case 'assigned': return d.status === 'Assigned';
            case 'progress': return ['In Transit', 'In Progress'].includes(d.status);
            case 'done': return ['Delivered', 'Done'].includes(d.status);
            case 'cancelled': return d.status === 'Cancelled';
            default: return true;
        }
    });

    return (
        <div className="flex h-[calc(100vh-64px)] bg-gray-50 overflow-hidden font-sans">
            <div className={`flex-1 flex flex-col transition-all duration-300 ${selectedOrder ? 'mr-[450px]' : ''}`}>
                
                {/* Top Filter Bar */}
                <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm z-20">
                    <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all whitespace-nowrap ${
                                    activeTab === tab.id 
                                        ? `${tab.color} text-white shadow-md` 
                                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                }`}
                            >
                                <div className={`w-2 h-2 rounded-full ${activeTab === tab.id ? 'bg-white' : tab.color}`}></div>
                                <span>{tab.name}</span>
                                {tab.count > 0 && activeTab !== tab.id && <span className="ml-1 opacity-75">({tab.count})</span>}
                            </button>
                        ))}
                    </div>
                    
                    <div className="flex items-center space-x-3 ml-4 flex-shrink-0">
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Check Count</span>
                        <div className="relative">
                            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input 
                                type="text" 
                                placeholder="Search" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 pr-4 py-1.5 bg-gray-100 border-none rounded-full text-xs focus:ring-2 focus:ring-blue-500 w-40 transition-all"
                            />
                        </div>
                        <div className="flex rounded-md shadow-sm">
                            <button onClick={() => setIsCreateModalOpen(true)} className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-l-md hover:bg-blue-700">New Order</button>
                            <button className="px-2 py-1.5 bg-blue-600 text-white border-l border-blue-500 rounded-r-md hover:bg-blue-700"><ChevronDown className="w-3.5 h-3.5" /></button>
                        </div>
                        <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full border border-gray-200"><RefreshCw className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full border border-gray-200"><FileText className="w-3.5 h-3.5" /></button>
                    </div>
                </div>

                {/* Secondary Toolbar */}
                <div className="bg-[#F8F9FA] border-b border-gray-200 px-4 py-2 flex items-center justify-between text-[11px] text-gray-600 font-medium">
                    <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2 cursor-pointer hover:text-gray-900">
                            <input type="checkbox" onChange={handleSelectAll} checked={selectedIds.length === deliveries.length && deliveries.length > 0} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5" />
                            <span>Select All</span>
                        </label>
                        <button className="flex items-center space-x-1 hover:text-gray-900"><Filter className="w-3 h-3" /><span>More Filters</span></button>
                        <span className="text-gray-300">|</span>
                        <span>Today 00:37 - 23:59</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 hover:text-blue-600"><span>What's New</span><ExternalLink className="w-3 h-3" /></button>
                        <div className="flex items-center space-x-2">
                            <span>New View</span>
                            <div className="w-7 h-3.5 bg-gray-300 rounded-full relative cursor-pointer"><div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm absolute left-0"></div></div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span>Ondemand</span>
                            <div className="w-7 h-3.5 bg-gray-300 rounded-full relative cursor-pointer"><div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm absolute left-0"></div></div>
                        </div>
                        <button className="hover:text-gray-900"><Volume2 className="w-3.5 h-3.5" /></button>
                        <button className="flex items-center space-x-1 hover:text-gray-900"><span>Sort by ID 9-1</span><ChevronDown className="w-3 h-3" /></button>
                    </div>
                </div>

                {/* List Content */}
                <div className="flex-1 overflow-y-auto bg-white">
                    {filteredDeliveries.length > 0 ? (
                        filteredDeliveries.map(delivery => (
                            <DeliveryListItem 
                                key={delivery.id} 
                                delivery={delivery} 
                                isSelected={selectedIds.includes(delivery.id) || (selectedOrder?.id === delivery.id) || false}
                                onSelect={handleSelectOrder}
                                onClick={() => handleOrderClick(delivery)}
                            />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <Layout className="w-12 h-12 mb-3 opacity-20" />
                            <p className="text-sm">No orders found for this filter.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Slide-out Panel */}
            {selectedOrder && (
                <OrderDetailsPanel 
                    order={selectedOrder} 
                    onClose={handleClosePanel} 
                    drivers={allDrivers}
                />
            )}

            <CreateOrderModal 
                isOpen={isCreateModalOpen} 
                onClose={() => setIsCreateModalOpen(false)} 
                onCreateOrder={handleCreateOrder} 
            />
        </div>
    );
}

function ExternalLink({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
    );
}

export default DeliveryOversight;
