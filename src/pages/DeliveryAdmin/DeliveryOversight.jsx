import React, { useState, useEffect, useRef } from 'react';
import DataTable from '../../components/Tables/DataTable';
import { MoreVertical, List, Map, Calendar, SlidersHorizontal } from 'lucide-react';
import ReassignDriverModal from './oversight/ReassignDriverModal';
import OrderTimelineModal from './oversight/OrderTimelineModal';

const initialDeliveries = [
    { id: 'ORD551', customer: 'Hassan Ali', zone: 'North Zone', driver: 'Driver #12', eta: '15 min', status: 'In Transit', delivery_time_min: null, reason_code: null, date: '2025-08-01', auditTrail: [{ action: 'Created', timestamp: '10:30 AM' }, { action: 'Assigned to Driver #12', timestamp: '10:32 AM' }, { action: 'Picked Up', timestamp: '10:45 AM' }] },
    { id: 'ORD552', customer: 'Aisha Bakr', zone: 'Central Zone', driver: 'Driver #07', eta: '28 min', status: 'Delayed', delivery_time_min: null, reason_code: 'TRAFFIC', date: '2025-08-01', auditTrail: [{ action: 'Created', timestamp: '11:00 AM' }, { action: 'Assigned to Driver #07', timestamp: '11:05 AM' }, { action: 'Marked as Delayed', timestamp: '11:40 AM' }] },
    { id: 'ORD553', customer: 'Omar Farooq', zone: 'North Zone', driver: 'Driver #21', eta: 'N/A', status: 'Delivered', delivery_time_min: 25, reason_code: null, date: '2025-08-01', auditTrail: [{ action: 'Created', timestamp: '11:15 AM' }, { action: 'Assigned to Driver #21', timestamp: '11:18 AM' }, { action: 'Delivered', timestamp: '11:43 AM' }] },
    { id: 'ORD554', customer: 'Fatima Zahra', zone: 'Central Zone', driver: 'Unassigned', eta: 'N/A', status: 'Pending', delivery_time_min: null, reason_code: null, date: '2025-08-01', auditTrail: [{ action: 'Created', timestamp: '11:30 AM' }] },
    { id: 'ORD555', customer: 'Ibrahim Said', zone: 'North Zone', driver: 'Driver #12', eta: 'N/A', status: 'Failed', delivery_time_min: null, reason_code: 'CUSTOMER_UNAVAILABLE', date: '2025-07-31', auditTrail: [{ action: 'Created', timestamp: '12:00 PM' }, { action: 'Assigned to Driver #12', timestamp: '12:05 PM' }, { action: 'Delivery Failed', timestamp: '12:35 PM' }] },
];

const availableDrivers = ['Driver #12', 'Driver #07', 'Driver #21', 'Driver #03', 'Driver #33', 'Driver #45'];
const zones = ['North Zone', 'Central Zone'];
const statuses = ['Pending', 'In Transit', 'Delayed', 'Delivered', 'Failed'];

function DeliveryOversight() {
    const [deliveries, setDeliveries] = useState(initialDeliveries);
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [modalState, setModalState] = useState({ reassign: false, timeline: false });
    const [openActionMenu, setOpenActionMenu] = useState(null);
    const [viewMode, setViewMode] = useState('table');
    const actionMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
                setOpenActionMenu(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const openModal = (modal, delivery) => {
        setSelectedDelivery(delivery);
        setModalState(prev => ({ ...prev, [modal]: true }));
        setOpenActionMenu(null);
    };

    const closeModal = () => {
        setModalState({ reassign: false, timeline: false });
        setSelectedDelivery(null);
    };
    
    const handleReassignment = (deliveryId, newDriver) => {
        setDeliveries(prev => prev.map(d => 
            d.id === deliveryId 
            ? { ...d, driver: newDriver, status: newDriver ? 'In Transit' : 'Pending' } 
            : d
        ));
        closeModal();
    };

    const columns = [
        { header: 'Order ID', accessor: 'id' },
        { header: 'Customer', accessor: 'customer' },
        { header: 'Zone', accessor: 'zone' },
        { header: 'Driver', accessor: 'driver' },
        {
            header: 'Status', accessor: 'status',
            render: (row) => (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    row.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                    row.status === 'Delayed' ? 'bg-orange-100 text-orange-800' :
                    row.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    row.status === 'Failed' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                }`}>
                    {row.status}
                </span>
            ),
        },
        { header: 'Delivery Time (min)', accessor: 'delivery_time_min', render: (row) => row.delivery_time_min || 'N/A' },
        { header: 'Reason Code', accessor: 'reason_code', render: (row) => row.reason_code || 'N/A' },
        {
            header: 'Actions', accessor: 'actions',
            render: (row) => (
                <div className="relative">
                    <button onClick={() => setOpenActionMenu(openActionMenu === row.id ? null : row.id)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                    {openActionMenu === row.id && (
                        <div ref={actionMenuRef} className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-20">
                            <button onClick={() => openModal('timeline', row)} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-taiba-gray hover:bg-gray-50">
                                <span>View Timeline</span>
                            </button>
                            <button onClick={() => openModal('reassign', row)} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-taiba-gray hover:bg-gray-50">
                                <span>Reassign Driver</span>
                            </button>
                        </div>
                    )}
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div>
                        <h2 className="text-xl font-bold text-taiba-gray mb-1">Order & Delivery Monitoring</h2>
                        <p className="text-sm text-taiba-gray">Monitor and manage deliveries within your assigned zones.</p>
                    </div>
                     <div className="flex items-center space-x-2">
                        <button onClick={() => setViewMode('table')} className={`p-2 rounded-lg ${viewMode === 'table' ? 'bg-taiba-blue text-white' : 'bg-gray-200 text-taiba-gray'}`}>
                            <List className="w-5 h-5" />
                        </button>
                        <button onClick={() => setViewMode('map')} className={`p-2 rounded-lg ${viewMode === 'map' ? 'bg-taiba-blue text-white' : 'bg-gray-200 text-taiba-gray'}`}>
                            <Map className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                        <div>
                            <label className="text-sm font-medium text-taiba-gray">Filter by Zone</label>
                            <select className="input-field mt-1"><option value="">All Zones</option>{zones.map(z => <option key={z}>{z}</option>)}</select>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-taiba-gray">Filter by Status</label>
                            <select className="input-field mt-1"><option value="">All Statuses</option>{statuses.map(s => <option key={s}>{s}</option>)}</select>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-taiba-gray">Date Range</label>
                            <div className="relative mt-1">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-taiba-gray w-4 h-4" />
                                <input type="date" className="input-field pl-9" />
                            </div>
                        </div>
                        <button className="btn-primary py-2 flex items-center justify-center space-x-2">
                            <SlidersHorizontal className="w-4 h-4" />
                            <span>Apply Filters</span>
                        </button>
                    </div>
                </div>

                {viewMode === 'table' ? (
                    <DataTable columns={columns} data={deliveries} />
                ) : (
                    <div className="bg-white rounded-xl shadow-md p-6 h-[720px] flex items-center justify-center">
                        <div className="text-center">
                            <Map className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-taiba-gray">Map View</h3>
                            <p className="text-sm text-taiba-gray">Live delivery tracking map coming soon.</p>
                        </div>
                    </div>
                )}
            </div>

            <ReassignDriverModal
                isOpen={modalState.reassign}
                onClose={closeModal}
                delivery={selectedDelivery}
                drivers={availableDrivers}
                onConfirm={handleReassignment}
            />
            
            <OrderTimelineModal
                isOpen={modalState.timeline}
                onClose={closeModal}
                delivery={selectedDelivery}
            />
        </>
    );
}

export default DeliveryOversight;
