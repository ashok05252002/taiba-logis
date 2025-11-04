import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Modal';
import { KeyRound } from 'lucide-react';

function ResetPasswordModal({ isOpen, onClose, user }) {
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (isOpen) {
      setNewPassword(Math.random().toString(36).slice(-8));
    }
  }, [isOpen]);

  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reset User Password">
      <div className="text-center">
        <KeyRound className="w-16 h-16 text-taiba-purple mx-auto mb-4" />
        <h3 className="text-lg font-bold text-taiba-gray">New Password for {user.name}</h3>
        <p className="text-taiba-gray mb-6">Please manually copy and share the new temporary password securely.</p>

        <div className="text-left">
            <label className="block text-sm font-medium text-taiba-gray mb-2">
              New Temporary Password:
            </label>
            <input
              type="text"
              readOnly
              value={newPassword}
              className="w-full p-3 font-mono text-sm bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-taiba-blue"
            />
        </div>
        
        <button onClick={onClose} className="mt-8 btn-primary px-8 py-2">
          Done
        </button>
      </div>
    </Modal>
  );
}

export default ResetPasswordModal;
