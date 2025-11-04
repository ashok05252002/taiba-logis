import React from 'react';
import Modal from '../../../components/common/Modal';

function CreateTicketModal({ isOpen, onClose, onCreate, incharges }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newTicket = {
            id: `TKT${Math.floor(Math.random() * 900) + 100}`,
            orderId: formData.get('orderId') || 'N/A',
            issue: formData.get('issue'),
            raisedBy: 'Delivery Admin',
            assignedTo: formData.get('assignedTo'),
            status: 'Pending',
            timestamp: 'Just now',
        };
        onCreate(newTicket);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Escalation Ticket">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Related Order ID (Optional)</label>
                    <input name="orderId" type="text" className="input-field" placeholder="e.g., ORD12345" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Issue Description</label>
                    <textarea name="issue" className="input-field" rows="4" placeholder="Describe the issue in detail" required></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Assign to Zone Incharge</label>
                    <select name="assignedTo" className="input-field" required>
                        <option value="">Select an Incharge</option>
                        {incharges.map(incharge => (
                            <option key={incharge} value={incharge}>{incharge}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-taiba-gray font-medium hover:bg-gray-50">
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary px-6 py-2">
                        Create Ticket
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default CreateTicketModal;
