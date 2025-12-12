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
import { allUsers, allDrivers } from '../../data/mockData';

const subNavigation = [
  { name: 'Users List', path: '/super-admin/users', icon: Users },
  { name: 'Roles & Permissions', path: '/super-admin/users/roles', icon: Shield },
];

// Combine users and drivers for the management list
const initialUsers = [
    ...allUsers,
    ...allDrivers.map(d => ({ ...d, role: 'Driver' }))
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
