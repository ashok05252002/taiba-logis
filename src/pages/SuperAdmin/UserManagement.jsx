import React from 'react';
import DataTable from '../../components/Tables/DataTable';
import { UserPlus, MoreVertical } from 'lucide-react';

function UserManagement() {
  const columns = [
    { header: 'User ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Role', accessor: 'role' },
    { header: 'Email', accessor: 'email' },
    { header: 'Zone', accessor: 'zone' },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            row.status === 'Active'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: () => (
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      ),
    },
  ];

  const data = [
    { id: 'U001', name: 'Ahmed Ali', role: 'Delivery Admin', email: 'ahmed@taiba.com', zone: 'North Zone', status: 'Active' },
    { id: 'U002', name: 'Fatima Hassan', role: 'Zone Incharge', email: 'fatima@taiba.com', zone: 'South Zone', status: 'Active' },
    { id: 'U003', name: 'Mohammed Khan', role: 'Store Incharge', email: 'mohammed@taiba.com', zone: 'East Zone', status: 'Active' },
    { id: 'U004', name: 'Sara Abdullah', role: 'Delivery Admin', email: 'sara@taiba.com', zone: 'West Zone', status: 'Inactive' },
    { id: 'U005', name: 'Omar Rashid', role: 'Zone Incharge', email: 'omar@taiba.com', zone: 'Central Zone', status: 'Active' },
    { id: 'U006', name: 'Aisha Mohamed', role: 'Store Incharge', email: 'aisha@taiba.com', zone: 'North Zone', status: 'Active' },
    { id: 'U007', name: 'Yusuf Ibrahim', role: 'Delivery Admin', email: 'yusuf@taiba.com', zone: 'South Zone', status: 'Active' },
    { id: 'U008', name: 'Mariam Saleh', role: 'Zone Incharge', email: 'mariam@taiba.com', zone: 'East Zone', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-taiba-gray mb-2">User Management</h2>
          <p className="text-taiba-gray">Manage all system users and their permissions</p>
        </div>
        <button className="flex items-center space-x-2 bg-taiba-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-lg">
          <UserPlus className="w-5 h-5" />
          <span>Add New User</span>
        </button>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default UserManagement;
