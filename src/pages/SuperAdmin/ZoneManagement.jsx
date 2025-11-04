import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import UserList from './users/UserList';
import AddZoneModal from './zones/AddZoneModal';
import ViewZoneDetailsModal from './zones/ViewZoneDetailsModal';
import EditZoneModal from './zones/EditZoneModal';
import ToggleZoneStatusModal from './zones/ToggleZoneStatusModal';

const initialZones = [
    { id: 'Z001', name: 'North Zone', region: 'Riyadh', admin: 'Ahmed Ali', adminId: 'U001', drivers: '24', incharges: '3', orders: '342', status: 'Active', clusters: ['Cluster A', 'Cluster B'], createdAt: '2025-07-15T10:30:00Z' },
    { id: 'Z002', name: 'South Zone', region: 'Jeddah', admin: 'Fatima Hassan', adminId: 'U002', drivers: '18', incharges: '2', orders: '289', status: 'Active', clusters: ['Cluster C'], createdAt: '2025-07-18T11:00:00Z' },
    { id: 'Z003', name: 'East Zone', region: 'Dammam', admin: 'Mohammed Khan', adminId: 'U003', drivers: '21', incharges: '3', orders: '315', status: 'Active', clusters: ['Cluster D', 'Cluster E', 'Cluster F'], createdAt: '2025-06-20T14:00:00Z' },
    { id: 'Z004', name: 'West Zone', region: 'Mecca', admin: 'Sara Abdullah', adminId: 'U004', drivers: '15', incharges: '2', orders: '178', status: 'Inactive', clusters: [], createdAt: '2025-05-10T09:00:00Z' },
    { id: 'Z005', name: 'Central Zone', region: 'Riyadh', admin: 'Omar Rashid', adminId: 'U005', drivers: '28', incharges: '4', orders: '425', status: 'Active', clusters: ['Cluster G', 'Cluster H', 'Cluster I'], createdAt: '2025-07-22T18:30:00Z' },
];

const deliveryAdmins = [
    { id: 'U001', name: 'Ahmed Ali' },
    { id: 'U004', name: 'Sara Abdullah' },
    { id: 'U006', name: 'Yusuf Ahmed' },
];


function ZoneManagement() {
  const [zones, setZones] = useState(initialZones);
  const [selectedZone, setSelectedZone] = useState(null);
  const [modalState, setModalState] = useState({
    add: false,
    view: false,
    edit: false,
    toggleStatus: false,
  });

  const openModal = (modal, zone = null) => {
    setSelectedZone(zone);
    setModalState(prev => ({ ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}), [modal]: true }));
  };

  const closeModal = () => {
    setModalState(prev => ({ ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}), }));
    setSelectedZone(null);
  };

  const handleZoneCreate = (newZone) => {
    setZones(prev => [newZone, ...prev]);
    closeModal();
  };
  
  const handleSaveZone = (updatedZone) => {
    setZones(prev => prev.map(z => z.id === updatedZone.id ? updatedZone : z));
    closeModal();
  };

  const handleConfirmToggleStatus = () => {
    if (!selectedZone) return;
    const updatedZone = { ...selectedZone, status: selectedZone.status === 'Active' ? 'Inactive' : 'Active' };
    handleSaveZone(updatedZone);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h2 className="text-xl font-bold text-taiba-gray mb-1">Zone & Cluster Management</h2>
            <p className="text-sm text-taiba-gray">Define geographic delivery zones and manage their operations.</p>
          </div>
          <button
            onClick={() => openModal('add')}
            className="flex items-center space-x-2 bg-taiba-blue text-white px-6 py-2.5 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-lg"
          >
            <MapPin className="w-5 h-5" />
            <span>Add New Zone</span>
          </button>
        </div>

        <UserList users={zones} onOpenModal={openModal} isZoneList={true} />
      </div>

      <AddZoneModal
        isOpen={modalState.add}
        onClose={closeModal}
        onZoneCreate={handleZoneCreate}
        admins={deliveryAdmins}
      />
      
      <ViewZoneDetailsModal
        isOpen={modalState.view}
        onClose={closeModal}
        zone={selectedZone}
      />

      <EditZoneModal
        isOpen={modalState.edit}
        onClose={closeModal}
        zone={selectedZone}
        onSave={handleSaveZone}
        admins={deliveryAdmins}
      />
      
      <ToggleZoneStatusModal
        isOpen={modalState.toggleStatus}
        onClose={closeModal}
        zone={selectedZone}
        onConfirm={handleConfirmToggleStatus}
      />
    </>
  );
}

export default ZoneManagement;
