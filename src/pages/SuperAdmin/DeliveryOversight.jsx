import React, { useState, useEffect, useRef } from 'react';
import DataTable from '../../components/Tables/DataTable';
import { MoreVertical, AlertTriangle } from 'lucide-react';
import OverrideAssignmentModal from './oversight/OverrideAssignmentModal';
import AuditTrailModal from './oversight/AuditTrailModal';

const initialDeliveries = [
    { id: 'ORD551', customer: 'Hassan Ali', zone: 'North', admin: 'Ahmed Ali', driver: 'Driver #12', eta: '15 min', status: 'In Transit', auditTrail: [{ action: 'Created', timestamp: '10:30 AM' }, { action: 'Assigned to Driver #12', timestamp: '10:32 AM' }] },
    { id: 'ORD552', customer: 'Aisha Bakr', zone: 'Central', admin: 'Yusuf Ahmed', driver: 'Driver #07', eta: '28 min', status: 'Delayed', auditTrail: [{ action: 'Created', timestamp: '11:00 AM' }] },
    { id: 'ORD553', customer: 'Omar Farooq', zone: 'South', admin: 'Sara Abdullah', driver: 'Driver #21', eta: '5 min', status: 'In Transit', auditTrail: [{ action: 'Created', timestamp: '11:15 AM' }] },
    { id: 'ORD554', customer: 'Fatima Zahra', zone: 'East', admin: 'Mohammed Khan', driver: 'Unassigned', eta: 'N/A', status: 'Pending', auditTrail: [{ action: 'Created', timestamp: '11:30 AM' }] },
    { id: 'ORD555', customer: 'Ali Murtaza', zone: 'West', admin: 'Sara Abdullah', driver: 'Driver #03', eta: 'N/A', status: 'Delivered', auditTrail: [{ action: 'Created', timestamp: '09:00 AM' }, { action: 'Delivered', timestamp: '09:45 AM' }] },
];

const escalations = [
    { id: 'ESC001', zone: 'North Zone', issue: 'High delay rate (25%)', reportedBy: 'Ahmed Ali', timestamp: '45m ago', status: 'Pending' },
    { id: 'ESC002', zone: 'Central Zone', issue: 'Driver shortage reported', reportedBy: 'Yusuf Ahmed', timestamp: '2h ago', status: 'Pending' },
    { id: 'ESC003', zone: 'API Failure', issue: 'Google Maps API not responding', reportedBy: 'System', timestamp: '3h ago', status: 'Investigating' },
];

const zones = ['North', 'South', 'East', 'West', 'Central'];
const admins = ['Ahmed Ali', 'Sara Abdullah', 'Yusuf Ahmed', 'Mohammed Khan'];
const drivers = ['Driver #12', 'Driver #07', 'Driver #21', 'Driver #03', 'Driver #33', 'Driver #45'];

function DeliveryOversight() {
    const [activeTab, setActiveTab] = useState('deliveries');
    const [deliveries, setDeliveries] = useState(initialDeliveries);
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [modalState, setModalState] = useState({ override: false, audit: false });
    const [openActionMenu, setOpenActionMenu] = useState(null);
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
        setModalState({ override: false, audit: false });
        setSelectedDelivery(null);
    };
    
    const handleReassignment = (deliveryId, newZone, newDriver) => {
        setDeliveries(prev => prev.map(d => 
            d.id === deliveryId 
            ? { ...d, zone: newZone, driver: newDriver, status: 'In Transit' } 
            : d
        ));
        closeModal();
    };

    const columns = [
        { header: 'Order ID', accessor: 'id' },
        { header: 'Customer', accessor: 'customer' },
        { header: 'Zone', accessor: 'zone' },
        { header: 'Driver', accessor: 'driver' },
        { header: 'ETA', accessor: 'eta' },
        {
            header: 'Status', accessor: 'status',
            render: (row) => (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    row.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                    row.status === 'Delayed' ? 'bg-red-100 text-red-800' :
                    row.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                }`}>
                    {row.status}
                </span>
            ),
        },
        {
            header: 'Actions', accessor: 'actions',
            render: (row) => (
                <div className="relative">
                    <button onClick={() => setOpenActionMenu(openActionMenu === row.id ? null : row.id)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                    {openActionMenu === row.id && (
                        <div ref={actionMenuRef} className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-10">
                            <button onClick={() => openModal('override', row)} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-taiba-gray hover:bg-gray-50">
                                <span>Override Assignment</span>
                            </button>
                            <button onClick={() => openModal('audit', row)} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-taiba-gray hover:bg-gray-50">
                                <span>View Audit Trail</span>
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
                <div>
                    <h2 className="text-xl font-bold text-taiba-gray mb-1">Delivery Operations Oversight</h2>
                    <p className="text-sm text-taiba-gray">Monitor all deliveries and handle escalations across the network.</p>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="border-b border-gray-200">
                        <div className="flex space-x-8 px-6">
                            <button onClick={() => setActiveTab('deliveries')} className={`py-4 px-2 font-medium border-b-2 transition-colors ${activeTab === 'deliveries' ? 'border-taiba-blue text-taiba-blue' : 'border-transparent text-taiba-gray'}`}>
                                Live Deliveries
                            </button>
                            <button onClick={() => setActiveTab('escalations')} className={`py-4 px-2 font-medium border-b-2 transition-colors relative ${activeTab === 'escalations' ? 'border-taiba-blue text-taiba-blue' : 'border-transparent text-taiba-gray'}`}>
                                Escalations
                                <span className="absolute top-3 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{escalations.length}</span>
                            </button>
                        </div>
                    </div>

                    {activeTab === 'deliveries' && (
                        <>
                            <div className="p-4 border-b">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <input type="text" placeholder="Search by Order ID or Customer" className="input-field" />
                                    <select className="input-field"><option value="">All Zones</option>{zones.map(z => <option key={z}>{z}</option>)}</select>
                                    <select className="input-field"><option value="">All Admins</option>{admins.map(a => <option key={a}>{a}</option>)}</select>
                                    <select className="input-field"><option value="">All Statuses</option><option>Pending</option><option>In Transit</option><option>Delayed</option><option>Delivered</option></select>
                                </div>
                            </div>
                            <DataTable columns={columns} data={deliveries} />
                        </>
                    )}

                    {activeTab === 'escalations' && (
                        <div className="p-6 space-y-4">
                            {escalations.map(e => (
                                <div key={e.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-orange-200 bg-orange-50 rounded-lg">
                                    <div className="flex items-start space-x-4">
                                        <AlertTriangle className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="font-bold text-taiba-gray">{e.issue}</p>
                                            <p className="text-sm text-taiba-gray">Zone: {e.zone} | Reported by: {e.reportedBy}</p>
                                            <p className="text-xs text-gray-500">{e.timestamp}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-4 md:mt-0">
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">{e.status}</span>
                                        <button className="btn-primary text-sm">Resolve</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <OverrideAssignmentModal
                isOpen={modalState.override}
                onClose={closeModal}
                delivery={selectedDelivery}
                zones={zones}
                drivers={drivers}
                onConfirm={handleReassignment}
            />
            
            <AuditTrailModal
                isOpen={modalState.audit}
                onClose={closeModal}
                delivery={selectedDelivery}
            />
        </>
    );
}

export default DeliveryOversight;
