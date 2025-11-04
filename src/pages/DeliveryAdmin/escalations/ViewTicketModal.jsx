import React from 'react';
import Modal from '../../../components/common/Modal';
import { Tag, FileText, User, Clock, CheckCircle } from 'lucide-react';

function ViewTicketModal({ isOpen, onClose, ticket }) {
    if (!ticket) return null;

    const formattedDate = (dateString) => new Date(dateString).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Ticket Details: ${ticket.id}`}>
            <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-bold text-taiba-gray mb-2">Issue Description</h4>
                    <p className="text-taiba-gray">{ticket.issue}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                        <Tag className="w-5 h-5 text-taiba-purple" />
                        <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <p className="font-medium text-taiba-gray">{ticket.status}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-taiba-purple" />
                        <div>
                            <p className="text-sm text-gray-500">Order ID</p>
                            <p className="font-medium text-taiba-gray">{ticket.orderId}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <User className="w-5 h-5 text-taiba-purple" />
                        <div>
                            <p className="text-sm text-gray-500">Raised By</p>
                            <p className="font-medium text-taiba-gray">{ticket.raisedBy}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <User className="w-5 h-5 text-taiba-purple" />
                        <div>
                            <p className="text-sm text-gray-500">Assigned To</p>
                            <p className="font-medium text-taiba-gray">{ticket.assignedTo}</p>
                        </div>
                    </div>
                </div>

                {ticket.status === 'Resolved' && ticket.resolution && (
                    <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-bold text-green-800 mb-2 flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5" />
                            <span>Resolution</span>
                        </h4>
                        <p className="text-green-700">{ticket.resolution}</p>
                    </div>
                )}

                <div>
                    <h4 className="font-bold text-taiba-gray mb-3">History</h4>
                    <div className="space-y-4">
                        {ticket.history.map((event, index) => (
                            <div key={index} className="flex items-start space-x-3">
                                <Clock className="w-4 h-4 text-gray-400 mt-1" />
                                <div>
                                    <p className="text-sm font-medium text-taiba-gray">{event.action} by <span className="font-bold">{event.user}</span></p>
                                    <p className="text-xs text-gray-500">{formattedDate(event.timestamp)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button onClick={onClose} className="btn-primary px-8 py-2">
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default ViewTicketModal;
