import React, { useState } from 'react';
import Modal from '../../../components/common/Modal';

function ResolveTicketModal({ isOpen, onClose, ticket, onResolve }) {
    const [resolutionNotes, setResolutionNotes] = useState('');

    if (!ticket) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onResolve(ticket.id, resolutionNotes);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Resolve Ticket: ${ticket.id}`}>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-bold text-taiba-gray mb-2">Issue</h4>
                    <p className="text-taiba-gray">{ticket.issue}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Resolution Notes</label>
                    <textarea
                        value={resolutionNotes}
                        onChange={(e) => setResolutionNotes(e.target.value)}
                        className="input-field"
                        rows="4"
                        placeholder="Describe how the issue was resolved..."
                        required
                    ></textarea>
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-taiba-gray font-medium hover:bg-gray-50">
                        Cancel
                    </button>
                    <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600">
                        Mark as Resolved
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default ResolveTicketModal;
