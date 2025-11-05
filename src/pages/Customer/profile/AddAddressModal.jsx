import React from 'react';
import Modal from '../../../components/common/Modal';

function AddAddressModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Address">
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-taiba-gray mb-1">Address Label</label>
          <input type="text" className="input-field" placeholder="e.g., Home, Office" />
        </div>
        <div>
          <label className="block text-sm font-medium text-taiba-gray mb-1">Full Address</label>
          <textarea className="input-field" rows="3" placeholder="Enter your full address"></textarea>
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-taiba-gray font-medium hover:bg-gray-50">Cancel</button>
          <button type="submit" className="btn-primary px-6 py-2">Save Address</button>
        </div>
      </form>
    </Modal>
  );
}
export default AddAddressModal;
