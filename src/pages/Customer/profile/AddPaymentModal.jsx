import React from 'react';
import Modal from '../../../components/common/Modal';

function AddPaymentModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Card">
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-taiba-gray mb-1">Card Number</label>
          <input type="text" className="input-field" placeholder="**** **** **** ****" />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-taiba-gray mb-1">Expiry Date</label>
                <input type="text" className="input-field" placeholder="MM/YY" />
            </div>
            <div>
                <label className="block text-sm font-medium text-taiba-gray mb-1">CVV</label>
                <input type="text" className="input-field" placeholder="***" />
            </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-taiba-gray mb-1">Name on Card</label>
          <input type="text" className="input-field" placeholder="Enter name as it appears on card" />
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-taiba-gray font-medium hover:bg-gray-50">Cancel</button>
          <button type="submit" className="btn-primary px-6 py-2">Save Card</button>
        </div>
      </form>
    </Modal>
  );
}
export default AddPaymentModal;
