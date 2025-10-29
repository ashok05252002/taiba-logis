import React from 'react';
import DataTable from '../../components/Tables/DataTable';
import { MapPin, MoreVertical } from 'lucide-react';

function ZoneManagement() {
  const columns = [
    { header: 'Zone ID', accessor: 'id' },
    { header: 'Zone Name', accessor: 'name' },
    { header: 'Zone Incharge', accessor: 'incharge' },
    { header: 'Active Drivers', accessor: 'drivers' },
    { header: 'Orders Today', accessor: 'orders' },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            row.status === 'Active'
              ? 'bg-green-100 text-green-800'
              : 'bg-orange-100 text-orange-800'
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
    { id: 'Z001', name: 'North Zone', incharge: 'Ahmed Ali', drivers: '24', orders: '342', status: 'Active' },
    { id: 'Z002', name: 'South Zone', incharge: 'Fatima Hassan', drivers: '18', orders: '289', status: 'Active' },
    { id: 'Z003', name: 'East Zone', incharge: 'Mohammed Khan', drivers: '21', orders: '315', status: 'Active' },
    { id: 'Z004', name: 'West Zone', incharge: 'Sara Abdullah', drivers: '15', orders: '178', status: 'Maintenance' },
    { id: 'Z005', name: 'Central Zone', incharge: 'Omar Rashid', drivers: '28', orders: '425', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-taiba-gray mb-2">Zone Management</h2>
          <p className="text-taiba-gray">Manage delivery zones and cluster assignments</p>
        </div>
        <button className="flex items-center space-x-2 bg-taiba-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-lg">
          <MapPin className="w-5 h-5" />
          <span>Add New Zone</span>
        </button>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default ZoneManagement;
