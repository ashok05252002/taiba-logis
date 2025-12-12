import React, { useState } from 'react';
import { ShieldCheck, UserCog, Package, Map, Plus } from 'lucide-react';
import AddRoleModal from './AddRoleModal';

const initialRoles = [
  {
    name: 'Delivery Super Admin',
    description: 'Has full system access and can configure everything.',
    permissions: [
      'Manage All Users & Roles',
      'Manage All Clusters & Areas',
      'Configure System Settings',
      'View Global Reports & Audit Logs',
    ],
    icon: ShieldCheck,
    color: 'taiba-blue',
  },
  {
    name: 'Delivery Admin',
    description: 'Manages operations within their assigned clusters.',
    permissions: [
      'Manage Cluster Incharges',
      'Manage Drivers in Cluster',
      'View Cluster-specific Reports',
      'Handle Escalations',
    ],
    icon: UserCog,
    color: 'taiba-purple',
  },
  {
    name: 'Cluster Incharge',
    description: 'Oversees daily deliveries and drivers in a specific cluster.',
    permissions: [
      'Assign Orders to Drivers',
      'Track Live Deliveries',
      'Manage Driver Availability',
    ],
    icon: Map,
    color: 'green-500',
  },
  {
    name: 'Store Incharge',
    description: 'Manages order preparation and handover at the store.',
    permissions: [
      'View Incoming Orders',
      'Mark Orders as Ready',
      'Handover Orders to Drivers',
    ],
    icon: Package,
    color: 'orange-500',
  },
];

function RolesAndPermissions() {
  const [roles, setRoles] = useState(initialRoles);
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);

  const handleRoleCreate = (newRole) => {
    setRoles(prev => [...prev, newRole]);
    setIsAddRoleModalOpen(false);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h3 className="text-xl font-bold text-taiba-gray mb-1">Roles & Permissions</h3>
            <p className="text-taiba-gray">Define what users can see and do within the system.</p>
          </div>
          <button 
            onClick={() => setIsAddRoleModalOpen(true)}
            className="flex items-center space-x-2 bg-taiba-purple text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-md"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Role</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => (
            <div key={role.name} className="bg-white rounded-xl shadow-md p-6 border-l-4" style={{ borderColor: role.color ? `var(--color-${role.color})` : '#696969' }}>
              <div className="flex items-center space-x-4 mb-4">
                <role.icon className={`w-8 h-8 text-${role.color || 'taiba-gray'}`} />
                <div>
                  <h4 className="text-lg font-bold text-taiba-gray">{role.name}</h4>
                  <p className="text-sm text-taiba-gray">{role.description}</p>
                </div>
              </div>
              <div>
                <h5 className="font-semibold text-taiba-gray mb-2">Permissions:</h5>
                <ul className="space-y-2">
                  {role.permissions.map((permission) => (
                    <li key={permission} className="flex items-start space-x-2">
                      <ShieldCheck className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-sm text-taiba-gray">{permission}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddRoleModal 
        isOpen={isAddRoleModalOpen}
        onClose={() => setIsAddRoleModalOpen(false)}
        onRoleCreate={handleRoleCreate}
      />
    </>
  );
}

export default RolesAndPermissions;
