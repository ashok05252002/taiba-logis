import React from 'react';
import Modal from '../../../components/common/Modal';

function AddZoneModal({ isOpen, onClose, onZoneCreate, admins }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const region = formData.get('region');
    const adminId = formData.get('adminId');
    const clusters = formData.get('clusters').split(',').map(c => c.trim()).filter(Boolean);
    const selectedAdmin = admins.find(a => a.id === adminId);

    const newZone = {
      id: `Z${Math.floor(Math.random() * 900) + 100}`,
      name,
      region,
      admin: selectedAdmin ? selectedAdmin.name : 'Unassigned',
      adminId,
      drivers: '0',
      incharges: '0',
      orders: '0',
      status: 'Active',
      clusters,
      createdAt: new Date().toISOString(),
    };
    
    onZoneCreate(newZone);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Zone">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-taiba-gray mb-2">Zone Name</label>
            <input name="name" type="text" className="input-field" placeholder="e.g., North-East Sector" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-taiba-gray mb-2">Region</label>
            <input name="region" type="text" className="input-field" placeholder="e.g., Riyadh" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-taiba-gray mb-2">Assign to Delivery Admin</label>
          <select name="adminId" className="input-field" required>
            <option value="">Select an Admin</option>
            {admins.map(admin => (
              <option key={admin.id} value={admin.id}>{admin.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-taiba-gray mb-2">Define Clusters</label>
          <textarea name="clusters" className="input-field" rows="3" placeholder="Enter cluster names, separated by commas (e.g., Cluster A, Cluster B)"></textarea>
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-taiba-gray font-medium hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" className="btn-primary px-6 py-2">
            Create Zone
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddZoneModal;
