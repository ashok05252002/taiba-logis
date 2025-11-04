import React from 'react';
import Modal from '../../../components/common/Modal';
import { AlertTriangle } from 'lucide-react';

function DeactivateUserModal({ isOpen, onClose, user, onConfirm }) {
  if (!user) return null;

  const actionText = user.status === 'Active' ? 'deactivate' : 'activate';
  const buttonClass = user.status === 'Active' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Action">
      <div className="text-center">
        <AlertTriangle className="w-16 h-16 text-orange-400 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-taiba-gray">Are you sure?</h3>
        <p className="text-taiba-gray my-4">
          Do you really want to <span className="font-bold">{actionText}</span> the user account for <span className="font-bold">{user.name}</span>?
        </p>

        <div className="flex justify-center space-x-4 pt-4">
          <button onClick={onClose} className="px-8 py-2 border border-gray-300 rounded-lg text-taiba-gray font-medium hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={onConfirm} className={`px-8 py-2 text-white rounded-lg font-medium transition-colors ${buttonClass}`}>
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeactivateUserModal;
