import React from 'react';
import Modal from '../../../components/common/Modal';
import { LogIn, LogOut, Package, CheckCircle, Coffee } from 'lucide-react';

const iconMap = {
    'Checked In': { icon: LogIn, color: 'text-green-500' },
    'Checked Out': { icon: LogOut, color: 'text-red-500' },
    'Order': { icon: Package, color: 'text-blue-500' },
    'Started Break': { icon: Coffee, color: 'text-orange-500' },
    'Account Suspended': { icon: CheckCircle, color: 'text-zinc-500' },
};

function DriverActivityLogModal({ isOpen, onClose, driver }) {
    if (!driver) return null;

    const getActivityIcon = (action) => {
        for (const key in iconMap) {
            if (action.startsWith(key)) {
                return iconMap[key];
            }
        }
        return { icon: Package, color: 'text-gray-500' };
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Activity Log for ${driver.name}`}>
            <div className="max-h-96 overflow-y-auto pr-4">
                <div className="space-y-4">
                    {driver.activityLog.map((event, index) => {
                        const { icon: Icon, color } = getActivityIcon(event.action);
                        return (
                            <div key={index} className="flex items-start space-x-4">
                                <div className="flex flex-col items-center">
                                    <div className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center`}>
                                        <Icon className={`w-5 h-5 ${color}`} />
                                    </div>
                                    {index < driver.activityLog.length - 1 && (
                                        <div className="w-px h-8 bg-gray-300"></div>
                                    )}
                                </div>
                                <div>
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

export default DriverActivityLogModal;
