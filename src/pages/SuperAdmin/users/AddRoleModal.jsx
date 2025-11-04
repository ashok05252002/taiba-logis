import React, { useState } from 'react';
import Modal from '../../../components/common/Modal';
import { ShieldCheck, UserCog } from 'lucide-react';

const allPermissions = [
  'Manage All Users & Roles',
  'Manage All Zones & Clusters',
  'Configure System Settings',
  'View Global Reports & Audit Logs',
  'Manage Zone Incharges',
  'Manage Drivers in Zone',
  'View Zone-specific Reports',
  'Handle Escalations',
  'Assign Orders to Drivers',
  'Track Live Deliveries',
  'Manage Driver Availability',
  'View Incoming Orders',
  'Mark Orders as Ready',
  'Handover Orders to Drivers',
];

function AddRoleModal({ isOpen, onClose, onRoleCreate }) {
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const handlePermissionToggle = (permission) => {
    setSelectedPermissions(prev => 
      prev.includes(permission) 
        ? prev.filter(p => p !== permission) 
        : [...prev, permission]
    );
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const description = formData.get('description');
    
    onRoleCreate({
      name,
      description,
      permissions: selectedPermissions,
      icon: UserCog, // Default icon
      color: 'taiba-gray', // Default color
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Role">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-taiba-gray mb-2">Role Name</label>
          <input name="name" type="text" className="input-field" placeholder="e.g., Regional Manager" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-taiba-gray mb-2">Description</label>
          <textarea name="description" className="input-field" rows="3" placeholder="A brief description of the role's responsibilities" required></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-taiba-gray mb-2">Assign Permissions</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto p-4 border rounded-lg">
            {allPermissions.map(permission => (
              <label key={permission} className="flex items-center space-x-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 text-taiba-blue rounded border-gray-300 focus:ring-taiba-blue"
                  checked={selectedPermissions.includes(permission)}
                  onChange={() => handlePermissionToggle(permission)}
                />
                <span className="text-sm text-taiba-gray">{permission}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-taiba-gray font-medium hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" className="btn-primary px-6 py-2">
            Create Role
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddRoleModal;
