import React from 'react';
import Modal from '../../../components/common/Modal';
import { CheckCircle } from 'lucide-react';

function CredentialSuccessModal({ isOpen, onClose, userData }) {
  if (!userData) return null;

  const loginUrl = typeof window !== 'undefined' ? window.location.origin : 'https://alpha.dualite.dev';
  const credentialsText = `Hi ${userData.name},

Here are your credentials for the Taiba Pharmacy Logistics System:

Username: ${userData.email}
Password: ${userData.temporaryPassword}

Please login at: ${loginUrl}

Thank you,
Taiba Pharmacy Administration`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="User Created Successfully">
      <div className="text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-taiba-gray">Credentials for {userData.name}</h3>
        <p className="text-taiba-gray mb-6">Please manually copy and share these credentials with the user securely.</p>

        <div className="text-left">
          <label className="block text-sm font-medium text-taiba-gray mb-2">
            Credentials to Share:
          </label>
          <textarea
            readOnly
            className="w-full h-48 p-3 font-mono text-sm bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-taiba-blue"
            value={credentialsText}
          />
        </div>

        <button onClick={onClose} className="mt-8 btn-primary px-8 py-2">
          Done
        </button>
      </div>
    </Modal>
  );
}

export default CredentialSuccessModal;
