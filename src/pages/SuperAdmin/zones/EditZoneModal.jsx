import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Modal';

function EditZoneModal({ isOpen, onClose, zone, onSave, admins }) {
  const [formData, setFormData] = useState({ name: '', region: '', adminId: '', subClusters: '' });

  useEffect(() => {
    if (zone) {
      setFormData({
        name: zone.name,
        region: zone.region,
        adminId: zone.adminId,
        subClusters: zone.subClusters ? zone.subClusters.join(', ') : '',
      });
    }
  }, [zone]);

  if (!zone) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedAdmin = admins.find(a => a.id === formData.adminId);
    onSave({ 
      ...zone, 
      ...formData,
      admin: selectedAdmin ? selectedAdmin.name : 'Unassigned',
      subClusters: formData.subClusters.split(',').map(c => c.trim()).filter(Boolean),
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Cluster">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-taiba-gray mb-2">Cluster Name</label>
            <input name="name" type="text" className="input-field" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-taiba-gray mb-2">Region</label>
            <input name="region" type="text" className="input-field" value={formData.region} onChange={handleChange} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-taiba-gray mb-2">Assign to Delivery Admin</label>
          <select name="adminId" className="input-field" value={formData.adminId} onChange={handleChange} required>
            {admins.map(admin => (
              <option key={admin.id} value={admin.id}>{admin.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-taiba-gray mb-2">Define Areas/Sub-clusters</label>
          <textarea name="subClusters" className="input-field" rows="3" value={formData.subClusters} onChange={handleChange}></textarea>
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-taiba-gray font-medium hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" className="btn-primary px-6 py-2">
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default EditZoneModal;
