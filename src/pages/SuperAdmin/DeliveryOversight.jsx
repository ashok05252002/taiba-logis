import React, { useState, useRef, useEffect } from 'react';
import { Search, RefreshCw, FileText, ChevronDown, Filter, UserPlus, X } from 'lucide-react';
import DeliveryListItem from '../shared/DeliveryListItem';
import OrderDetailsPanel from './components/OrderDetailsPanel';
import CreateOrderModal from '../shared/CreateOrderModal';
import AddUserModal from './users/AddUserModal';
import CredentialSuccessModal from './users/CredentialSuccessModal';
import PinModal from './components/PinModal';
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

const clusters = ['North', 'South', 'East', 'West', 'Central'];

function DeliveryOversight() {
    const [activeTab, setActiveTab] = useState('all');
    const [deliveries, setDeliveries] = useState(allDeliveries);
    const [drivers, setDrivers] = useState(allDrivers);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
    
    // Filter State
    const [showFilters, setShowFilters] = useState(false);
    const [activeFilters, setActiveFilters] = useState({
        cluster: '',
        driver: ''
    });
    const filterRef = useRef(null);

    // Modal States
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isAddDriverModalOpen, setIsAddDriverModalOpen] = useState(false);
    const [newDriverData, setNewDriverData] = useState(null);
    const [isCredentialModalOpen, setIsCredentialModalOpen] = useState(false);
    const [isPinModalOpen, setIsPinModalOpen] = useState(false);
    const [pinData, setPinData] = useState(null);
    
    const [searchTerm, setSearchTerm] = useState('');

    // Close filters when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilters(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
    };

    const handleClosePanel = () => {
        setSelectedOrder(null);
    };

    const handleOrderUpdate = (updatedOrder) => {
        setDeliveries(prev => prev.map(o => o.id === updatedOrder.id ? updatedOrder : o));
        if (selectedOrder && selectedOrder.id === updatedOrder.id) {
            setSelectedOrder(updatedOrder);
        }
    };

    const handleSelectOrder = (id) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleCreateOrder = (newOrder) => {
        setDeliveries(prev => [newOrder, ...prev]);
        setIsCreateModalOpen(false);
    };

    const handleDriverCreate = (newDriver) => {
        setDrivers(prev => [...prev, { 
            id: newDriver.id, 
            name: newDriver.name, 
            cluster: 'Unassigned', 
            status: 'Available' 
        }]);
        
        setNewDriverData(newDriver);
        setIsAddDriverModalOpen(false);
        setIsCredentialModalOpen(true);
    };

    const handleViewPin = (order) => {
        setPinData(order.arrivalPin || '8821'); // Fallback mock PIN if not in data
        setIsPinModalOpen(true);
    };

    const handleFilterChange = (key, value) => {
        setActiveFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setActiveFilters({ cluster: '', driver: '' });
        setShowFilters(false);
    };

    // Filter Logic
    const filteredDeliveries = deliveries.filter(d => {
        // 1. Search
        const matchesSearch = d.title.toLowerCase().includes(searchTerm.toLowerCase()) || d.id.includes(searchTerm);
        if (!matchesSearch) return false;

        // 2. Tab Status
        let matchesTab = true;
        switch (activeTab) {
            case 'confirm': matchesTab = d.status === 'To Confirm'; break;
            case 'unassigned': matchesTab = d.driver === 'Unassigned'; break;
            case 'assigned': matchesTab = d.status === 'Assigned'; break;
            case 'progress': matchesTab = ['In Transit', 'In Progress'].includes(d.status); break;
            case 'done': matchesTab = ['Delivered', 'Done'].includes(d.status); break;
            case 'cancelled': matchesTab = d.status === 'Cancelled'; break;
            default: matchesTab = true;
        }
        if (!matchesTab) return false;

        // 3. Advanced Filters
        if (activeFilters.cluster && d.cluster !== activeFilters.cluster) return false;
        if (activeFilters.driver) {
            if (activeFilters.driver === 'Unassigned') {
                if (d.driver !== 'Unassigned') return false;
            } else if (d.driver !== activeFilters.driver) {
                return false;
            }
        }

        return true;
    });

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(filteredDeliveries.map(d => d.id));
        } else {
            setSelectedIds([]);
        }
    };

    const activeFilterCount = Object.values(activeFilters).filter(Boolean).length;

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
                        
                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                            <button 
                                onClick={() => setIsAddDriverModalOpen(true)} 
                                className="flex items-center space-x-1 px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded-md hover:bg-green-700 shadow-sm"
                            >
                                <UserPlus className="w-3.5 h-3.5" />
                                <span>New Driver</span>
                            </button>
                            
                            <div className="flex rounded-md shadow-sm">
                                <button onClick={() => setIsCreateModalOpen(true)} className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-l-md hover:bg-blue-700">New Order</button>
                                <button className="px-2 py-1.5 bg-blue-600 text-white border-l border-blue-500 rounded-r-md hover:bg-blue-700"><ChevronDown className="w-3.5 h-3.5" /></button>
                            </div>
                        </div>

                        <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full border border-gray-200"><RefreshCw className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full border border-gray-200"><FileText className="w-3.5 h-3.5" /></button>
                    </div>
                </div>

                {/* Secondary Toolbar */}
                <div className="bg-[#F8F9FA] border-b border-gray-200 px-4 py-2 flex items-center justify-between text-[11px] text-gray-600 font-medium relative">
                    <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2 cursor-pointer hover:text-gray-900">
                            <input 
                                type="checkbox" 
                                onChange={handleSelectAll} 
                                checked={selectedIds.length === filteredDeliveries.length && filteredDeliveries.length > 0} 
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5" 
                            />
                            <span>Select All ({filteredDeliveries.length})</span>
                        </label>
                        
                        {/* More Filters Dropdown */}
                        <div className="relative" ref={filterRef}>
                            <button 
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center space-x-1 hover:text-gray-900 px-2 py-1 rounded ${showFilters || activeFilterCount > 0 ? 'bg-blue-50 text-blue-600' : ''}`}
                            >
                                <Filter className="w-3 h-3" />
                                <span>More Filters</span>
                                {activeFilterCount > 0 && (
                                    <span className="bg-blue-600 text-white text-[9px] px-1.5 rounded-full ml-1">{activeFilterCount}</span>
                                )}
                            </button>

                            {showFilters && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-30 p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="font-bold text-gray-700">Filters</h4>
                                        {activeFilterCount > 0 && (
                                            <button onClick={clearFilters} className="text-xs text-blue-500 hover:underline">Clear all</button>
                                        )}
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 mb-1">Cluster</label>
                                            <select 
                                                value={activeFilters.cluster}
                                                onChange={(e) => handleFilterChange('cluster', e.target.value)}
                                                className="w-full text-xs border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">All Clusters</option>
                                                {clusters.map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 mb-1">Driver</label>
                                            <select 
                                                value={activeFilters.driver}
                                                onChange={(e) => handleFilterChange('driver', e.target.value)}
                                                className="w-full text-xs border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">All Drivers</option>
                                                <option value="Unassigned">Unassigned</option>
                                                {drivers.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <span className="text-gray-300">|</span>
                        <span>Today 00:37 - 23:59</span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
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
                                onViewPin={handleViewPin}
                            />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <Filter className="w-8 h-8 text-gray-300" />
                            </div>
                            <p className="text-sm font-medium text-gray-500">No orders found</p>
                            <p className="text-xs text-gray-400 mt-1">Try adjusting your filters or search terms</p>
                            {(activeFilterCount > 0 || searchTerm) && (
                                <button 
                                    onClick={() => { setSearchTerm(''); clearFilters(); }}
                                    className="mt-4 text-blue-600 hover:underline text-xs font-medium"
                                >
                                    Clear all filters
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Slide-out Panel */}
            {selectedOrder && (
                <OrderDetailsPanel 
                    order={selectedOrder} 
                    onClose={handleClosePanel} 
                    drivers={drivers}
                    onSave={handleOrderUpdate}
                />
            )}

            {/* Modals */}
            <CreateOrderModal 
                isOpen={isCreateModalOpen} 
                onClose={() => setIsCreateModalOpen(false)} 
                onCreateOrder={handleCreateOrder} 
            />

            <AddUserModal
                isOpen={isAddDriverModalOpen}
                onClose={() => setIsAddDriverModalOpen(false)}
                onUserCreate={handleDriverCreate}
                defaultRole="Driver"
                lockedRole={true}
            />

            <CredentialSuccessModal
                isOpen={isCredentialModalOpen}
                onClose={() => setIsCredentialModalOpen(false)}
                userData={newDriverData}
            />

            <PinModal
                isOpen={isPinModalOpen}
                onClose={() => setIsPinModalOpen(false)}
                pin={pinData}
            />
        </div>
    );
}

export default DeliveryOversight;
