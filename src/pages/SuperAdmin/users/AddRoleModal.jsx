import React, { useState } from 'react';
import Modal from '../../../components/common/Modal';
import { UserCog } from 'lucide-react';

const modules = [
  'Dashboard',
  'Delivery Oversight',
  'User Management',
  'Cluster Management',
  'Driver Management',
  'Reports & Analytics',
  'Audit Logs',
  'Notifications',
  'System Settings'
];

const actions = ['View', 'Create', 'Edit', 'Delete'];

function AddRoleModal({ isOpen, onClose, onRoleCreate }) {
  const [permissions, setPermissions] = useState({});

  const handlePermissionToggle = (module, action) => {
    setPermissions(prev => {
      const modulePerms = prev[module] || [];
      if (modulePerms.includes(action)) {
        return { ...prev, [module]: modulePerms.filter(a => a !== action) };
      } else {
        return { ...prev, [module]: [...modulePerms, action] };
      }
    });
  };

  const handleSelectAllForModule = (module) => {
    setPermissions(prev => {
      const modulePerms = prev[module] || [];
      if (modulePerms.length === actions.length) {
        const newPerms = { ...prev };
        delete newPerms[module];
        return newPerms;
      } else {
        return { ...prev, [module]: [...actions] };
      }
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const description = formData.get('description');
    
    // Format permissions for display (e.g., "User Management: View, Create")
    const formattedPermissions = Object.entries(permissions)
      .filter(([_, perms]) => perms.length > 0)
      .map(([module, perms]) => `${module}: ${perms.join(', ')}`);

    onRoleCreate({
      name,
      description,
      permissions: formattedPermissions,
      icon: UserCog,
      color: 'taiba-gray',
    });
    setPermissions({});
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
          <textarea name="description" className="input-field" rows="2" placeholder="A brief description of the role's responsibilities" required></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-taiba-gray mb-3">Access Permissions</label>
          <div className="border rounded-lg overflow-hidden">
            <div className="max-h-80 overflow-y-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 border-b">Module</th>
                    {actions.map(action => (
                      <th key={action} className="px-4 py-3 text-center border-b">{action}</th>
                    ))}
                    <th className="px-4 py-3 text-center border-b">All</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {modules.map(module => (
                    <tr key={module} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-taiba-gray">{module}</td>
                      {actions.map(action => (
                        <td key={action} className="px-4 py-3 text-center">
                          <input 
                            type="checkbox" 
                            checked={permissions[module]?.includes(action) || false}
                            onChange={() => handlePermissionToggle(module, action)}
                            className="w-4 h-4 text-taiba-blue rounded border-gray-300 focus:ring-taiba-blue cursor-pointer"
                          />
                        </td>
                      ))}
                      <td className="px-4 py-3 text-center">
                        <input 
                          type="checkbox"
                          checked={permissions[module]?.length === actions.length}
                          onChange={() => handleSelectAllForModule(module)}
                          className="w-4 h-4 text-taiba-blue rounded border-gray-300 focus:ring-taiba-blue cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Select specific actions for each module to define the role's capabilities.</p>
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
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
