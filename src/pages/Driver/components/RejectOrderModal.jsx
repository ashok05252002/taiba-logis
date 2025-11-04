import React, { useState } from 'react';
import Modal from '../../../components/common/Modal';

const rejectionReasons = [
  'Too far',
  'Vehicle issue',
  'Personal emergency',
  'End of shift',
  'Other',
];

function RejectOrderModal({ isOpen, onClose, onConfirm }) {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    if (reason) {
      onConfirm(reason);
    } else {
      alert('Please select a reason for rejection.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reject Delivery">
      <div className="space-y-6">
        <p className="text-taiba-gray">Please select a reason for rejecting this delivery assignment. This information will be sent to the Zone Incharge.</p>
        <div>
          <label className="block text-sm font-medium text-taiba-gray mb-2">Reason for Rejection</label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="input-field"
            required
          >
            <option value="" disabled>Select a reason...</option>
            {rejectionReasons.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-taiba-gray font-medium hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={handleConfirm} className="bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600">
            Confirm Rejection
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default RejectOrderModal;
