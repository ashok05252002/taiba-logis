import React, { useState } from 'react';
import Modal from '../../components/common/Modal';

const cancellationReasons = [
  'Customer Request',
  'Item Out of Stock',
  'Wrong Address Information',
  'Admin Decision',
  'Payment Issue',
  'Technical Glitch',
];

function CancelOrderModal({ isOpen, onClose, onConfirm, orderId }) {
  const [reason, setReason] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason) {
      alert('Please select a reason for cancellation.');
      return;
    }
    onConfirm(orderId, reason, comments);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Cancel Order ${orderId}`}>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-taiba-gray mb-2">Reason for Cancellation</label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="input-field"
            required
          >
            <option value="" disabled>Select a reason</option>
            {cancellationReasons.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-taiba-gray mb-2">Comments (Optional)</label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="input-field"
            rows="4"
            placeholder="Provide additional details about the cancellation..."
          ></textarea>
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-taiba-gray font-medium hover:bg-gray-50">
            Back
          </button>
          <button type="submit" className="bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600">
            Confirm Cancellation
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default CancelOrderModal;
