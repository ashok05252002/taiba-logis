import React from 'react';
import Modal from '../../../components/common/Modal';
import { History } from 'lucide-react';

// This file is DEPRECATED and replaced by OrderTimelineModal.jsx
// It is kept here to avoid breaking changes in the file system but is no longer used.

function AuditTrailModal({ isOpen, onClose, delivery }) {
  if (!delivery) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Audit Trail for ${delivery.id}`}>
      <div className="space-y-4">
        {delivery.auditTrail.map((event, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-taiba-blue bg-opacity-10 rounded-full flex items-center justify-center">
                <History className="w-5 h-5 text-taiba-blue" />
              </div>
              {index < delivery.auditTrail.length - 1 && (
                <div className="w-px h-8 bg-gray-300"></div>
              )}
            </div>
            <div>
              <p className="font-semibold text-taiba-gray">{event.action}</p>
              <p className="text-sm text-gray-500">{event.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
       <div className="flex justify-end pt-6">
          <button onClick={onClose} className="btn-primary px-8 py-2">
            Close
          </button>
        </div>
    </Modal>
  );
}

export default AuditTrailModal;
