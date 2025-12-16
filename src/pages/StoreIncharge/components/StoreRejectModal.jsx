import React, { useState } from 'react';
import Modal from '../../../components/common/Modal';
import { AlertTriangle } from 'lucide-react';

const rejectionReasons = [
    'Item Out of Stock',
    'Prescription Invalid/Unclear',
    'Store Closed / Busy',
    'Duplicate Order',
    'Other'
];

function StoreRejectModal({ isOpen, onClose, onConfirm }) {
    const [reason, setReason] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(reason, notes);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Reject Order">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-red-50 p-4 rounded-lg flex items-start space-x-3 border border-red-100">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-bold text-red-800">Warning</h4>
                        <p className="text-xs text-red-700">Rejecting this order will automatically initiate a refund to the customer.</p>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Reason for Rejection</label>
                    <select 
                        className="input-field" 
                        value={reason} 
                        onChange={(e) => setReason(e.target.value)}
                        required
                    >
                        <option value="">Select a reason...</option>
                        {rejectionReasons.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Additional Notes (Optional)</label>
                    <textarea 
                        className="input-field" 
                        rows="3" 
                        placeholder="Add details for the customer/admin..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">Confirm Rejection</button>
                </div>
            </form>
        </Modal>
    );
}

export default StoreRejectModal;
