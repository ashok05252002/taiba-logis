import React, { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { UserPlus, Users, Shield } from 'lucide-react';

import UserList from './users/UserList';
import RolesAndPermissions from './users/RolesAndPermissions';
import AddUserModal from './users/AddUserModal';
import CredentialSuccessModal from './users/CredentialSuccessModal';
import ViewUserDetailsModal from './users/ViewUserDetailsModal';
import EditUserModal from './users/EditUserModal';
import ResetPasswordModal from './users/ResetPasswordModal';
import DeactivateUserModal from './users/DeactivateUserModal';

const subNavigation = [
  { name: 'Users List', path: '/super-admin/users', icon: Users },
  { name: 'Roles & Permissions', path: '/super-admin/users/roles', icon: Shield },
];

const initialUsers = [
  { id: 'U001', name: 'Ahmed Ali', role: 'Delivery Admin', email: 'ahmed@taiba.com', zone: 'North Zone', status: 'Active', phone: '966501234567' },
  { id: 'U002', name: 'Fatima Hassan', role: 'Zone Incharge', email: 'fatima@taiba.com', zone: 'South Zone', status: 'Active', phone: '966502345678' },
  { id: 'U003', name: 'Mohammed Khan', role: 'Store Incharge', email: 'mohammed@taiba.com', zone: 'East Zone', status: 'Active', phone: '966503456789' },
  { id: 'U004', name: 'Sara Abdullah', role: 'Delivery Admin', email: 'sara@taiba.com', zone: 'West Zone', status: 'Inactive', phone: '966504567890' },
  { id: 'U005', name: 'Omar Rashid', role: 'Zone Incharge', email: 'omar@taiba.com', zone: 'Central Zone', status: 'Active', phone: '966505678901' },
  { id: 'D001', name: 'Khalid Ibrahim', role: 'Driver', email: 'khalid@driver.com', zone: 'North Zone', status: 'Active', phone: '966506789012' },
  { id: 'D002', name: 'Noura Saad', role: 'Driver', email: 'noura@driver.com', zone: 'South Zone', status: 'Inactive', phone: '966507890123' },
  { id: 'U006', name: 'Yusuf Ahmed', role: 'Delivery Admin', email: 'yusuf@taiba.com', zone: 'Central Zone', status: 'Active', phone: '966508901234' },
];


function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalState, setModalState] = useState({
    add: false,
    success: false,
    view: false,
    edit: false,
    reset: false,
    toggleStatus: false,
  });
  const [newUserData, setNewUserData] = useState(null);

  const openModal = (modal, user = null) => {
    setSelectedUser(user);
    setModalState(prev => ({ ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}), [modal]: true }));
  };

  const closeModal = () => {
    setModalState(prev => ({ ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}), }));
    setSelectedUser(null);
  };

  const handleUserCreation = (createdUser) => {
    setUsers(prev => [createdUser, ...prev]);
    setNewUserData(createdUser);
    closeModal();
    openModal('success', createdUser);
  };

  const handleSaveUser = (updatedUser) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    closeModal();
  };

  const handleConfirmToggleStatus = () => {
    if (!selectedUser) return;
    const updatedUser = { ...selectedUser, status: selectedUser.status === 'Active' ? 'Inactive' : 'Active' };
    handleSaveUser(updatedUser);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
        <div>
          <h2 className="text-xl font-bold text-taiba-gray mb-1">User Management</h2>
          <p className="text-sm text-taiba-gray">Manage all system users, roles, and their permissions.</p>
        </div>
        <button
          onClick={() => openModal('add')}
          className="flex items-center space-x-2 bg-taiba-blue text-white px-6 py-2.5 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-lg"
        >
          <UserPlus className="w-5 h-5" />
          <span>Add New User</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <aside className="lg:w-1/4 xl:w-1/5 mb-6 lg:mb-0">
          <nav className="space-y-2">
            {subNavigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/super-admin/users'}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                    isActive
                      ? 'bg-taiba-purple text-white'
                      : 'text-taiba-gray hover:bg-gray-100'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<UserList users={users} onOpenModal={openModal} />} />
            <Route path="/roles" element={<RolesAndPermissions />} />
          </Routes>
        </main>
      </div>

      <AddUserModal
        isOpen={modalState.add}
        onClose={closeModal}
        onUserCreate={handleUserCreation}
      />

      {newUserData && (
        <CredentialSuccessModal
          isOpen={modalState.success}
          onClose={closeModal}
          userData={newUserData}
        />
      )}
      
      <ViewUserDetailsModal
        isOpen={modalState.view}
        onClose={closeModal}
        user={selectedUser}
      />
      
      <EditUserModal
        isOpen={modalState.edit}
        onClose={closeModal}
        user={selectedUser}
        onSave={handleSaveUser}
      />
      
      <ResetPasswordModal
        isOpen={modalState.reset}
        onClose={closeModal}
        user={selectedUser}
      />
      
      <DeactivateUserModal
        isOpen={modalState.toggleStatus}
        onClose={closeModal}
        user={selectedUser}
        onConfirm={handleConfirmToggleStatus}
      />
    </>
  );
}

export default UserManagement;
