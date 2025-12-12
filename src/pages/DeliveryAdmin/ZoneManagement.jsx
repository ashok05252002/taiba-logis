import React, { useState, useEffect, useRef } from 'react';
import DataTable from '../../components/Tables/DataTable';
import { MoreVertical, UserPlus, Puzzle, Eye, ToggleLeft, ToggleRight } from 'lucide-react';
import AssignInchargeModal from './zones/AssignInchargeModal';
import ManageClustersModal from './zones/ManageClustersModal';
import ToggleZoneStatusModal from './zones/ToggleZoneStatusModal';
import ViewZoneDetailsModal from './zones/ViewZoneDetailsModal';

const initialClusters = [
    { id: 'Z001', name: 'North Cluster', incharge: 'Fatima Hassan', inchargeId: 'U002', subClusters: ['Area A', 'Area B'], drivers: 24, status: 'Active', assigned_by: 'Ahmed Ali (DA001)', assigned_at: '2025-07-28T10:00:00Z' },
    { id: 'Z005', name: 'Central Cluster', incharge: 'Omar Rashid', inchargeId: 'U005', subClusters: ['Area G', 'Area H', 'Area I'], drivers: 28, status: 'Active', assigned_by: 'Ahmed Ali (DA001)', assigned_at: '2025-07-29T11:30:00Z' },
    { id: 'Z006', name: 'Capital City Cluster', incharge: 'Unassigned', inchargeId: null, subClusters: [], drivers: 0, status: 'Inactive', assigned_by: null, assigned_at: null },
];

const availableIncharges = [
    { id: 'U002', name: 'Fatima Hassan' },
    { id: 'U005', name: 'Omar Rashid' },
    { id: 'U007', name: 'Aisha Ibrahim' },
    { id: 'U008', name: 'Khalid Abdullah' },
];

function ZoneManagement() {
    const [clusters, setClusters] = useState(initialClusters);
    const [selectedCluster, setSelectedCluster] = useState(null);
    const [modalState, setModalState] = useState({
        assignIncharge: false,
        manageClusters: false,
        toggleStatus: false,
        viewDetails: false,
    });
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

    const openModal = (modal, cluster) => {
        setSelectedCluster(cluster);
        setModalState(prev => ({ ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}), [modal]: true }));
        setOpenActionMenu(null);
    };

    const closeModal = () => {
        setModalState(prev => ({ ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}) }));
        setSelectedCluster(null);
    };

    const handleAssignIncharge = (clusterId, inchargeId) => {
        const incharge = availableIncharges.find(i => i.id === inchargeId);
        setClusters(prev => prev.map(z => z.id === clusterId ? { 
            ...z, 
            incharge: incharge.name, 
            inchargeId,
            assigned_by: 'Delivery Admin (DA001)',
            assigned_at: new Date().toISOString(),
        } : z));
        closeModal();
    };

    const handleSaveSubClusters = (clusterId, newSubClusters) => {
        setClusters(prev => prev.map(z => z.id === clusterId ? { ...z, subClusters: newSubClusters } : z));
        closeModal();
    };

    const handleConfirmToggleStatus = () => {
        if (!selectedCluster) return;
        setClusters(prev => prev.map(z => z.id === selectedCluster.id ? { ...z, status: z.status === 'Active' ? 'Inactive' : 'Active' } : z));
        closeModal();
    };

    const columns = [
        { header: 'Cluster Name', accessor: 'name' },
        { header: 'Assigned Incharge', accessor: 'incharge' },
        { header: 'Areas', render: (row) => row.subClusters ? row.subClusters.length : 0 },
        { header: 'Active Drivers', accessor: 'drivers' },
        {
            header: 'Status', accessor: 'status',
            render: (row) => (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
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
                        <div ref={actionMenuRef} className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border z-20">
                            <button onClick={() => openModal('viewDetails', row)} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-taiba-gray hover:bg-gray-50">
                                <Eye className="w-4 h-4" />
                                <span>View Details</span>
                            </button>
                            <button onClick={() => openModal('assignIncharge', row)} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-taiba-gray hover:bg-gray-50">
                                <UserPlus className="w-4 h-4" />
                                <span>Assign/Reassign Incharge</span>
                            </button>
                            <button onClick={() => openModal('manageClusters', row)} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-taiba-gray hover:bg-gray-50">
                                <Puzzle className="w-4 h-4" />
                                <span>Manage Areas</span>
                            </button>
                            <button onClick={() => openModal('toggleStatus', row)} className={`w-full text-left flex items-center space-x-2 px-4 py-2 text-sm ${row.status === 'Active' ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`}>
                                {row.status === 'Active' ? <ToggleLeft className="w-4 h-4" /> : <ToggleRight className="w-4 h-4" />}
                                <span>{row.status === 'Active' ? 'Deactivate Cluster' : 'Activate Cluster'}</span>
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
                    <h2 className="text-xl font-bold text-taiba-gray mb-1">Cluster Management</h2>
                    <p className="text-sm text-taiba-gray">Manage clusters, assign incharges, and define areas.</p>
                </div>
                <DataTable columns={columns} data={clusters} />
            </div>

            <AssignInchargeModal
                isOpen={modalState.assignIncharge}
                onClose={closeModal}
                zone={selectedCluster}
                incharges={availableIncharges}
                onAssign={handleAssignIncharge}
            />

            <ManageClustersModal
                isOpen={modalState.manageClusters}
                onClose={closeModal}
                zone={selectedCluster}
                onSave={handleSaveSubClusters}
            />

            <ToggleZoneStatusModal
                isOpen={modalState.toggleStatus}
                onClose={closeModal}
                zone={selectedCluster}
                onConfirm={handleConfirmToggleStatus}
            />
            
            <ViewZoneDetailsModal
                isOpen={modalState.viewDetails}
                onClose={closeModal}
                zone={selectedCluster}
            />
        </>
    );
}

export default ZoneManagement;
