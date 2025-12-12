import React, { useState, useEffect, useRef } from 'react';
import DataTable from '../../../components/Tables/DataTable';
import { MoreVertical, Edit, KeyRound, ToggleLeft, ToggleRight, Eye, MapPin } from 'lucide-react';

const userTabs = [
  { id: 'all', name: 'All Users' },
  { id: 'admins', name: 'Delivery Admins' },
  { id: 'incharges', name: 'Incharges' },
  { id: 'drivers', name: 'Drivers' },
];

const clusterTabs = [
  { id: 'all', name: 'All Clusters' },
  { id: 'active', name: 'Active' },
  { id: 'inactive', name: 'Inactive' },
];

function UserList({ users, onOpenModal, isClusterList = false }) {
  const tabs = isClusterList ? clusterTabs : userTabs;
  const [activeTab, setActiveTab] = useState('all');
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const actionMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
        setOpenActionMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const userColumns = [
    { header: 'User ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Role', accessor: 'role' },
    { header: 'Assigned Cluster(s)', accessor: 'cluster' },
    {
      header: 'Status', accessor: 'status',
      render: (row) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {row.status}
        </span>
      ),
    },
  ];
  
  const clusterColumns = [
    { header: 'Cluster ID', accessor: 'id' },
    { header: 'Cluster Name', accessor: 'name' },
    { header: 'Assigned Admin', accessor: 'admin' },
    { header: 'Active Drivers', accessor: 'drivers' },
    { header: 'Orders Today', accessor: 'orders' },
    {
      header: 'Status', accessor: 'status',
      render: (row) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
          {row.status}
        </span>
      ),
    },
  ];

  const actionColumn = {
    header: 'Actions',
    accessor: 'actions',
    render: (row) => (
      <div className="relative">
        <button onClick={() => setOpenActionMenu(openActionMenu === row.id ? null : row.id)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
        {openActionMenu === row.id && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-10" ref={actionMenuRef}>
            <button onClick={() => { onOpenModal('view', row); setOpenActionMenu(null); }} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-taiba-gray hover:bg-gray-50">
              <Eye className="w-4 h-4" />
              <span>View Details</span>
            </button>
            <button onClick={() => { onOpenModal('edit', row); setOpenActionMenu(null); }} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-taiba-gray hover:bg-gray-50">
              <Edit className="w-4 h-4" />
              <span>Edit {isClusterList ? 'Cluster' : 'User'}</span>
            </button>
            {!isClusterList && (
              <button onClick={() => { onOpenModal('reset', row); setOpenActionMenu(null); }} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-taiba-gray hover:bg-gray-50">
                <KeyRound className="w-4 h-4" />
                <span>Reset Password</span>
              </button>
            )}
            <button onClick={() => { onOpenModal('toggleStatus', row); setOpenActionMenu(null); }} className={`w-full text-left flex items-center space-x-2 px-4 py-2 text-sm ${row.status === 'Active' ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`}>
              {row.status === 'Active' ? <ToggleLeft className="w-4 h-4" /> : <ToggleRight className="w-4 h-4" />}
              <span>{row.status === 'Active' ? 'Deactivate' : 'Activate'}</span>
            </button>
          </div>
        )}
      </div>
    ),
  };

  const columns = isClusterList ? [...clusterColumns, actionColumn] : [...userColumns, actionColumn];

  const filteredData = users.filter(item => {
    if (activeTab === 'all') return true;
    if (isClusterList) {
      return item.status.toLowerCase() === activeTab;
    } else {
      if (activeTab === 'admins') return item.role === 'Delivery Admin';
      if (activeTab === 'incharges') return item.role.includes('Incharge');
      if (activeTab === 'drivers') return item.role === 'Driver';
    }
    return false;
  });

  return (
    <div className="bg-white rounded-xl shadow-md">
      <div className="border-b border-gray-200">
        <div className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-taiba-blue text-taiba-blue'
                  : 'border-transparent text-taiba-gray hover:text-taiba-blue'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
      <DataTable columns={columns} data={filteredData} />
    </div>
  );
}

export default UserList;
