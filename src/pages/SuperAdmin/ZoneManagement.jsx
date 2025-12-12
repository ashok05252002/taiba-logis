import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import UserList from './users/UserList';
import AddZoneModal from './zones/AddZoneModal';
import ViewZoneDetailsModal from './zones/ViewZoneDetailsModal';
import EditZoneModal from './zones/EditZoneModal';
import ToggleZoneStatusModal from './zones/ToggleZoneStatusModal';

const initialClusters = [
    { id: 'Z001', name: 'North Cluster', region: 'Riyadh', admin: 'Ahmed Ali', adminId: 'U001', drivers: '24', incharges: '3', orders: '342', status: 'Active', subClusters: ['Area A', 'Area B'], createdAt: '2025-07-15T10:30:00Z' },
    { id: 'Z002', name: 'South Cluster', region: 'Jeddah', admin: 'Fatima Hassan', adminId: 'U002', drivers: '18', incharges: '2', orders: '289', status: 'Active', subClusters: ['Area C'], createdAt: '2025-07-18T11:00:00Z' },
    { id: 'Z003', name: 'East Cluster', region: 'Dammam', admin: 'Mohammed Khan', adminId: 'U003', drivers: '21', incharges: '3', orders: '315', status: 'Active', subClusters: ['Area D', 'Area E', 'Area F'], createdAt: '2025-06-20T14:00:00Z' },
    { id: 'Z004', name: 'West Cluster', region: 'Mecca', admin: 'Sara Abdullah', adminId: 'U004', drivers: '15', incharges: '2', orders: '178', status: 'Inactive', subClusters: [], createdAt: '2025-05-10T09:00:00Z' },
    { id: 'Z005', name: 'Central Cluster', region: 'Riyadh', admin: 'Omar Rashid', adminId: 'U005', drivers: '28', incharges: '4', orders: '425', status: 'Active', subClusters: ['Area G', 'Area H', 'Area I'], createdAt: '2025-07-22T18:30:00Z' },
];

const deliveryAdmins = [
    { id: 'U001', name: 'Ahmed Ali' },
    { id: 'U004', name: 'Sara Abdullah' },
    { id: 'U006', name: 'Yusuf Ahmed' },
];


function ZoneManagement() {
  const [clusters, setClusters] = useState(initialClusters);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [modalState, setModalState] = useState({
    add: false,
    view: false,
    edit: false,
    toggleStatus: false,
  });

  const openModal = (modal, cluster = null) => {
    setSelectedCluster(cluster);
    setModalState(prev => ({ ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}), [modal]: true }));
  };

  const closeModal = () => {
    setModalState(prev => ({ ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}), }));
    setSelectedCluster(null);
  };

  const handleClusterCreate = (newCluster) => {
    setClusters(prev => [newCluster, ...prev]);
    closeModal();
  };
  
  const handleSaveCluster = (updatedCluster) => {
    setClusters(prev => prev.map(z => z.id === updatedCluster.id ? updatedCluster : z));
    closeModal();
  };

  const handleConfirmToggleStatus = () => {
    if (!selectedCluster) return;
    const updatedCluster = { ...selectedCluster, status: selectedCluster.status === 'Active' ? 'Inactive' : 'Active' };
    handleSaveCluster(updatedCluster);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h2 className="text-xl font-bold text-taiba-gray mb-1">Cluster Management</h2>
            <p className="text-sm text-taiba-gray">Define geographic delivery clusters and manage their operations.</p>
          </div>
          <button
            onClick={() => openModal('add')}
            className="flex items-center space-x-2 bg-taiba-blue text-white px-6 py-2.5 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-lg"
          >
            <MapPin className="w-5 h-5" />
            <span>Add New Cluster</span>
          </button>
        </div>

        <UserList users={clusters} onOpenModal={openModal} isZoneList={true} />
      </div>

      <AddZoneModal
        isOpen={modalState.add}
        onClose={closeModal}
        onZoneCreate={handleClusterCreate}
        admins={deliveryAdmins}
      />
      
      <ViewZoneDetailsModal
        isOpen={modalState.view}
        onClose={closeModal}
        zone={selectedCluster}
      />

      <EditZoneModal
        isOpen={modalState.edit}
        onClose={closeModal}
        zone={selectedCluster}
        onSave={handleSaveCluster}
        admins={deliveryAdmins}
      />
      
      <ToggleZoneStatusModal
        isOpen={modalState.toggleStatus}
        onClose={closeModal}
        zone={selectedCluster}
        onConfirm={handleConfirmToggleStatus}
      />
    </>
  );
}

export default ZoneManagement;
