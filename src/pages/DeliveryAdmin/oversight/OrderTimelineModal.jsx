import React from 'react';
import Modal from '../../../components/common/Modal';
import { Package, UserCheck, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';

const iconMap = {
  'Created': { icon: Package, color: 'text-blue-500' },
  'Assigned': { icon: UserCheck, color: 'text-purple-500' },
  'Picked Up': { icon: Truck, color: 'text-orange-500' },
  'Delivered': { icon: CheckCircle, color: 'text-green-500' },
  'Failed': { icon: XCircle, color: 'text-red-500' },
  'Delayed': { icon: Clock, color: 'text-red-500' },
};

function getEventInfo(action) {
  for (const key in iconMap) {
    if (action.startsWith(key)) {
      return iconMap[key];
    }
  }
  return { icon: Package, color: 'text-gray-500' };
}

function OrderTimelineModal({ isOpen, onClose, delivery }) {
  if (!delivery) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Order Timeline for ${delivery.id}`}>
      <div className="max-h-96 overflow-y-auto pr-4">
        <div className="space-y-0">
          {delivery.auditTrail.map((event, index) => {
            const { icon: Icon, color } = getEventInfo(event.action);
            return (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  {index < delivery.auditTrail.length - 1 && (
                    <div className="w-px h-12 bg-gray-300"></div>
                  )}
                </div>
                <div className="pt-2">
                  <p className="font-semibold text-taiba-gray">{event.action}</p>
                  <p className="text-sm text-gray-500">{event.timestamp}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
       <div className="flex justify-end pt-6">
          <button onClick={onClose} className="btn-primary px-8 py-2">
            Close
          </button>
        </div>
    </Modal>
  );
}

export default OrderTimelineModal;
