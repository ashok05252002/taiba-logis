import React from 'react';
import Modal from '../../../components/common/Modal';

const issueTypes = ['Driver Issue', 'Customer Complaint', 'System Error'];
const recipients = ['Cluster Incharge', 'Delivery Admin'];

function RaiseIssueModal({ isOpen, onClose, onCreate }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newTicket = {
            id: `ES-${Math.floor(Math.random() * 900) + 100}`,
            orderId: formData.get('orderId') || 'N/A',
            issue: `(${formData.get('issueType')}) ${formData.get('description')}`,
            raisedTo: formData.get('recipient'),
            status: 'Pending',
            timestamp: new Date().toLocaleString('en-CA').replace(',', ''),
        };
        onCreate(newTicket);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Raise New Issue / Escalation">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-taiba-gray mb-2">Related Order ID (Optional)</label>
                        <input name="orderId" type="text" className="input-field" placeholder="e.g., ORD123" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-taiba-gray mb-2">Issue Type</label>
                        <select name="issueType" className="input-field" required>
                            {issueTypes.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Escalate To</label>
                    <select name="recipient" className="input-field" required>
                        {recipients.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Issue Description</label>
                    <textarea
                        name="description"
                        className="input-field"
                        rows="4"
                        placeholder="Provide a detailed description of the issue..."
                        required
                    ></textarea>
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-taiba-gray font-medium hover:bg-gray-50">
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary px-6 py-2">
                        Raise Issue
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default RaiseIssueModal;
