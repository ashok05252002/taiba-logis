import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Modal';

function EditUserModal({ isOpen, onClose, user, onSave }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', role: '', zone: '' });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        zone: user.zone,
      });
    }
  }, [user]);

  if (!user) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...user, ...formData });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit User">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-taiba-gray mb-2">Full Name</label>
            <input name="name" type="text" className="input-field" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-taiba-gray mb-2">Email Address</label>
            <input name="email" type="email" className="input-field" value={formData.email} onChange={handleChange} required />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-taiba-gray mb-2">Phone Number</label>
            <input name="phone" type="tel" className="input-field" value={formData.phone} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-taiba-gray mb-2">Assign Role</label>
            <select name="role" className="input-field" value={formData.role} onChange={handleChange} required>
              <option value="Delivery Admin">Delivery Admin</option>
              <option value="Zone Incharge">Zone Incharge</option>
              <option value="Store Incharge">Store Incharge</option>
              <option value="Driver">Driver</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-taiba-gray mb-2">Assign Zone</label>
          <select name="zone" className="input-field" value={formData.zone} onChange={handleChange}>
            <option>North Zone</option>
            <option>South Zone</option>
            <option>East Zone</option>
            <option>West Zone</option>
            <option>Central Zone</option>
          </select>
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

export default EditUserModal;
