import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/Tables/DataTable';
import { MoreVertical, User, Truck, Eye, UserPlus, Edit, Plus } from 'lucide-react';
import ReassignDriverModal from './oversight/ReassignDriverModal';
import CreateOrderModal from '../shared/CreateOrderModal';
import { allDeliveries, allDrivers } from '../../data/mockData';

const tabs = [
    { id: 'all', name: 'All' },
    { id: 'confirm', name: 'To Confirm' },
    { id: 'unassigned', name: 'Unassigned' },
    { id: 'assigned', name: 'Assigned' },
    { id: 'progress', name: 'In Progress' },
    { id: 'done', name: 'Done' },
    { id: 'cancelled', name: 'Cancelled' },
];

const StatusBadge = ({ status }) => {
    const statusConfig = {
        'To Confirm': 'bg-yellow-100 text-yellow-800', 'Pending': 'bg-orange-100 text-orange-800',
        'Unassigned': 'bg-orange-100 text-orange-800', 'Assigned': 'bg-blue-100 text-blue-800',
        'In Progress': 'bg-indigo-100 text-indigo-800', 'In Transit': 'bg-indigo-100 text-indigo-800',
        'Delayed': 'bg-red-100 text-red-800', 'Done': 'bg-green-100 text-green-800',
        'Delivered': 'bg-green-100 text-green-800', 'Cancelled': 'bg-gray-200 text-gray-800',
        'Failed': 'bg-red-100 text-red-800',
    };
    const className = statusConfig[status] || 'bg-gray-100 text-gray-800';
    return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${className}`}>{status}</span>;
};

function DeliveryOversight() {
    const [deliveries, setDeliveries] = useState(allDeliveries);
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [openActionMenu, setOpenActionMenu] = useState(null);
    const [activeTab, setActiveTab] = useState('all');
    const actionMenuRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) setOpenActionMenu(null);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const openAssignModal = (delivery) => {
        setSelectedDelivery(delivery);
        setIsAssignModalOpen(true);
        setOpenActionMenu(null);
    };
    
    const handleCreateOrder = (newOrder) => {
        setDeliveries(prev => [newOrder, ...prev]);
        setIsCreateModalOpen(false);
    };

    const handleReassignment = (deliveryId, newDriver) => {
        setDeliveries(prev => prev.map(d => 
            d.id === deliveryId 
            ? { ...d, driver: newDriver, status: newDriver ? 'Assigned' : 'Pending' } 
            : d
        ));
        setIsAssignModalOpen(false);
    };
    
    const getFilteredDeliveries = () => {
        switch (activeTab) {
            case 'confirm': return deliveries.filter(d => d.status === 'To Confirm');
            case 'unassigned': return deliveries.filter(d => d.driver === 'Unassigned');
            case 'assigned': return deliveries.filter(d => d.status === 'Assigned');
            case 'progress': return deliveries.filter(d => ['In Transit', 'Delayed', 'In Progress'].includes(d.status));
            case 'done': return deliveries.filter(d => d.status === 'Delivered');
            case 'cancelled': return deliveries.filter(d => ['Failed', 'Cancelled'].includes(d.status));
            default: return deliveries;
        }
    };
    
    const columns = [
        {
            header: 'Order',
            render: (row) => (
                <div>
                    <p className="font-bold">{row.id}</p>
                    <p className="text-xs text-gray-500">{row.zone}</p>
                    {row.status === 'Cancelled' && row.cancellationReason && (
                        <div className="mt-1">
                            <p className="text-xs font-semibold text-red-600">Reason: {row.cancellationReason}</p>
                            <p className="text-xs text-red-500 max-w-[200px] whitespace-normal">"{row.cancellationComments}"</p>
                        </div>
                    )}
                </div>
            )
        },
        { header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
        {
            header: 'Source',
            render: (row) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.source === 'Manual' ? 'bg-purple-100 text-purple-800' : 'bg-sky-100 text-sky-800'}`}>
                    {row.source}
                </span>
            )
        },
        {
            header: 'Customer & Driver',
            render: (row) => (
                <div>
                    <p className="flex items-center space-x-1"><User className="w-3 h-3 text-gray-400"/><span>{row.customer}</span></p>
                    <p className="flex items-center space-x-1 text-xs text-gray-500"><Truck className="w-3 h-3 text-gray-400"/><span>{row.driver}</span></p>
                </div>
            )
        },
        {
            header: 'Order Date',
            render: (row) => (
                <div>
                    <p>{new Date(row.createdAt).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-500">{new Date(row.createdAt).toLocaleTimeString()}</p>
                </div>
            )
        },
        {
            header: 'Timings',
            render: (row) => {
                const durationMinutes = parseInt(row.duration.match(/\d+/)?.[0] || 0);
                const isHours = row.duration.includes('h');
                const isOvertime = isHours || durationMinutes > 30;
                const durationColor = isOvertime ? 'text-red-500' : 'text-green-500';
                return (
                    <div>
                        <p>{row.timeRange}</p>
                        <p className={`text-xs font-bold ${durationColor}`}>Duration: {row.duration}</p>
                    </div>
                );
            }
        },
        {
            header: 'Actions',
            render: (row) => (
                <div className="relative">
                    <button onClick={() => setOpenActionMenu(openActionMenu === row.id ? null : row.id)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                    {openActionMenu === row.id && (
                        <div ref={actionMenuRef} className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-30">
                            <button onClick={() => navigate(`/delivery-admin/oversight/${row.id}`)} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-taiba-gray hover:bg-gray-50">
                                <Eye className="w-4 h-4" /><span>View Details</span>
                            </button>
                            {row.driver === 'Unassigned' ? (
                                <button onClick={() => openAssignModal(row)} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-taiba-gray hover:bg-gray-50">
                                    <UserPlus className="w-4 h-4" /><span>Assign Driver</span>
                                </button>
                            ) : (
                                <button onClick={() => openAssignModal(row)} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-taiba-gray hover:bg-gray-50">
                                    <Edit className="w-4 h-4" /><span>Reassign/Override</span>
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )
        }
    ];

    return (
        <>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div>
                        <h2 className="text-xl font-bold text-taiba-gray mb-1">Order & Delivery Monitoring</h2>
                        <p className="text-sm text-taiba-gray">Monitor and manage deliveries within your assigned zones.</p>
                    </div>
                    <button onClick={() => setIsCreateModalOpen(true)} className="flex items-center space-x-2 btn-primary px-6 py-2.5">
                        <Plus className="w-5 h-5" />
                        <span>New Manual Order</span>
                    </button>
                </div>
                 <div className="bg-white rounded-xl shadow-md">
                    <div className="border-b border-gray-200">
                        <div className="flex space-x-1 sm:space-x-4 px-2 sm:px-4 overflow-x-auto no-scrollbar">
                            {tabs.map((tab) => (
                                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-4 px-3 font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id ? 'border-taiba-blue text-taiba-blue' : 'border-transparent text-taiba-gray hover:text-taiba-blue'}`}>
                                    {tab.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    <DataTable columns={columns} data={getFilteredDeliveries()} />
                </div>
            </div>
            <ReassignDriverModal isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} delivery={selectedDelivery} drivers={allDrivers} onConfirm={handleReassignment} />
            <CreateOrderModal 
                isOpen={isCreateModalOpen} 
                onClose={() => setIsCreateModalOpen(false)} 
                onCreateOrder={handleCreateOrder} 
            />
        </>
    );
}

export default DeliveryOversight;
