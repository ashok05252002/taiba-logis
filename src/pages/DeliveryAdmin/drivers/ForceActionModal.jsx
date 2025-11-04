import React from 'react';
import Modal from '../../../components/common/Modal';
import { AlertTriangle } from 'lucide-react';

function ForceActionModal({ isOpen, onClose, driver, action, onConfirm }) {
    if (!driver || !action) return null;

    const config = {
        logout: {
            title: 'Force Logout Driver',
            message: `Are you sure you want to force logout ${driver.name}? This will end their current shift immediately.`,
            buttonText: 'Confirm Logout',
            buttonClass: 'bg-orange-500 hover:bg-orange-600',
        },
        suspend: {
            title: 'Suspend Driver Account',
            message: `Are you sure you want to suspend the account for ${driver.name}? They will not be able to log in until their account is reactivated.`,
            buttonText: 'Confirm Suspension',
            buttonClass: 'bg-red-500 hover:bg-red-600',
        }
    };

    const currentConfig = config[action];

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={currentConfig.title}>
            <div className="text-center">
                <AlertTriangle className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-taiba-gray">Are you sure?</h3>
                <p className="text-taiba-gray my-4">{currentConfig.message}</p>

                <div className="flex justify-center space-x-4 pt-4">
                    <button onClick={onClose} className="px-8 py-2 border border-gray-300 rounded-lg text-taiba-gray font-medium hover:bg-gray-50">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className={`px-8 py-2 text-white rounded-lg font-medium transition-colors ${currentConfig.buttonClass}`}>
                        {currentConfig.buttonText}
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default ForceActionModal;
