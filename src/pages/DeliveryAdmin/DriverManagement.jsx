import React, { useState, useEffect, useRef } from 'react';
import DataTable from '../../components/Tables/DataTable';
import { MoreVertical, History, LogOut, ShieldOff } from 'lucide-react';
import DriverActivityLogModal from './drivers/DriverActivityLogModal';
import ForceActionModal from './drivers/ForceActionModal';

const initialDrivers = [
    { id: 'D001', name: 'Khalid Ibrahim', zone: 'North Zone', incharge: 'Fatima Hassan', vehicle: 'Bike', status: 'Online', activityLog: [{ action: 'Checked In', timestamp: '09:00 AM' }, { action: 'Order ORD551 Accepted', timestamp: '10:32 AM' }] },
    { id: 'D002', name: 'Noura Saad', zone: 'Central Zone', incharge: 'Omar Rashid', vehicle: 'Car', status: 'On Break', activityLog: [{ action: 'Checked In', timestamp: '09:15 AM' }, { action: 'Started Break', timestamp: '11:00 AM' }] },
    { id: 'D003', name: 'Fahad Al-Mutairi', zone: 'North Zone', incharge: 'Fatima Hassan', vehicle: 'Bike', status: 'Offline', activityLog: [{ action: 'Checked Out', timestamp: 'Yesterday 06:00 PM' }] },
    { id: 'D004', name: 'Aisha Al-Ghamdi', zone: 'Central Zone', incharge: 'Omar Rashid', vehicle: 'Car', status: 'Online', activityLog: [{ action: 'Checked In', timestamp: '08:45 AM' }] },
    { id: 'D005', name: 'Sultan Al-Otaibi', zone: 'North Zone', incharge: 'Fatima Hassan', vehicle: 'Bike', status: 'Suspended', activityLog: [{ action: 'Account Suspended by Admin', timestamp: '10:00 AM' }] },
];

function DriverManagement() {
    const [drivers, setDrivers] = useState(initialDrivers);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [modalState, setModalState] = useState({ activityLog: false, forceAction: false });
    const [actionType, setActionType] = useState(null);
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

    const openModal = (modal, driver, action = null) => {
        setSelectedDriver(driver);
        setActionType(action);
        setModalState(prev => ({ ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}), [modal]: true }));
        setOpenActionMenu(null);
    };


    const closeModal = () => {
        setModalState({ activityLog: false, forceAction: false });
        setSelectedDriver(null);
        setActionType(null);
    };

    const handleForceAction = () => {
        if (!selectedDriver || !actionType) return;
        const newStatus = actionType === 'suspend' ? 'Suspended' : 'Offline';
        setDrivers(prev => prev.map(d => d.id === selectedDriver.id ? { ...d, status: newStatus } : d));
        closeModal();
    };

    const columns = [
        { header: 'Driver ID', accessor: 'id' },
        { header: 'Name', accessor: 'name' },
        { header: 'Assigned Zone', accessor: 'zone' },
        { header: 'Zone Incharge', accessor: 'incharge' },
        { header: 'Vehicle', accessor: 'vehicle' },
        {
            header: 'Status', accessor: 'status',
            render: (row) => (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    row.status === 'Online' ? 'bg-green-100 text-green-800' :
                    row.status === 'On Break' ? 'bg-orange-100 text-orange-800' :
                    row.status === 'Suspended' ? 'bg-zinc-200 text-zinc-800' :
                    'bg-red-100 text-red-800'
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
                        <div ref={actionMenuRef} className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-20">
                            <button onClick={() => openModal('activityLog', row)} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-taiba-gray hover:bg-gray-50">
                                <History className="w-4 h-4" />
                                <span>Activity Log</span>
                            </button>
                            <button onClick={() => openModal('forceAction', row, 'logout')} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-taiba-gray hover:bg-gray-50">
                                <LogOut className="w-4 h-4" />
                                <span>Force Logout</span>
                            </button>
                            <button onClick={() => openModal('forceAction', row, 'suspend')} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                <ShieldOff className="w-4 h-4" />
                                <span>Suspend Account</span>
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
                    <h2 className="text-xl font-bold text-taiba-gray mb-1">Driver Management</h2>
                    <p className="text-sm text-taiba-gray">Monitor driver status and manage accounts within your zones.</p>
                </div>
                <DataTable columns={columns} data={drivers} />
            </div>

            <DriverActivityLogModal
                isOpen={modalState.activityLog}
                onClose={closeModal}
                driver={selectedDriver}
            />
            
            <ForceActionModal
                isOpen={modalState.forceAction}
                onClose={closeModal}
                driver={selectedDriver}
                action={actionType}
                onConfirm={handleForceAction}
            />
        </>
    );
}

export default DriverManagement;
