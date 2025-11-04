import React from 'react';
import Modal from '../../../components/common/Modal';
import { AlertTriangle, Package, User } from 'lucide-react';

function HandoverModal({ isOpen, onClose, onConfirm, order }) {
  if (!order) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Order Handover">
      <div className="text-center">
        <AlertTriangle className="w-16 h-16 text-orange-400 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-taiba-gray">Verify & Confirm Handover</h3>
        <p className="text-taiba-gray my-4">
          Please verify the details below before handing over the order to the driver.
        </p>
        
        <div className="text-left bg-gray-50 p-4 rounded-lg space-y-3 border border-gray-200">
            <div className="flex items-center space-x-3">
                <Package className="w-5 h-5 text-taiba-purple flex-shrink-0" />
                <p className="text-sm text-taiba-gray">Order ID: <span className="font-bold text-base">{order.id}</span></p>
            </div>
            <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-taiba-purple flex-shrink-0" />
                <p className="text-sm text-taiba-gray">Driver: <span className="font-bold text-base">{order.driver}</span></p>
            </div>
        </div>

        <div className="flex justify-center space-x-4 pt-8">
          <button onClick={onClose} className="px-8 py-2 border border-gray-300 rounded-lg text-taiba-gray font-medium hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn-primary px-8 py-2">
            Confirm Handover
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default HandoverModal;
