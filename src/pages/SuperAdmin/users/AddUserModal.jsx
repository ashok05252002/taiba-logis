import React from 'react';
import Modal from '../../../components/common/Modal';

function AddUserModal({ isOpen, onClose, onUserCreate }) {
  const handleUserCreation = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const role = formData.get('role');
    const temporaryPassword = Math.random().toString(36).slice(-8);

    const createdUser = {
      id: `U${Math.floor(Math.random() * 900) + 100}`,
      name,
      email,
      phone,
      role,
      zone: 'Unassigned',
      status: 'Active',
      temporaryPassword,
    };
    
    onUserCreate(createdUser);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New User">
      <form className="space-y-6" onSubmit={handleUserCreation}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-taiba-gray mb-2">Full Name</label>
            <input name="name" type="text" className="input-field" placeholder="Enter user's full name" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-taiba-gray mb-2">Email Address</label>
            <input name="email" type="email" className="input-field" placeholder="Enter user's email" required />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-taiba-gray mb-2">Phone Number</label>
            <input name="phone" type="tel" className="input-field" placeholder="e.g., 966501234567" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-taiba-gray mb-2">Assign Role</label>
            <select name="role" className="input-field" required>
              <option value="">Select a role</option>
              <option value="Delivery Admin">Delivery Admin</option>
              <option value="Zone Incharge">Zone Incharge</option>
              <option value="Store Incharge">Store Incharge</option>
              <option value="Driver">Driver</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-taiba-gray mb-2">Assign Zones of Responsibility</label>
          <select multiple className="input-field h-32">
            <option>North Zone</option>
            <option>South Zone</option>
            <option>East Zone</option>
            <option>West Zone</option>
            <option>Central Zone</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple zones.</p>
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-taiba-gray font-medium hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" className="btn-primary px-6 py-2">
            Create User & Generate Credentials
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddUserModal;
