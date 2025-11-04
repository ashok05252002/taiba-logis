import React, { useState } from 'react';
import { Plus, ShieldAlert } from 'lucide-react';
import DataTable from '../../components/Tables/DataTable';
import RaiseIssueModal from './components/RaiseIssueModal';

const initialTickets = [
    { id: 'ES-001', orderId: 'ORD103', issue: 'Driver has not arrived for pickup.', raisedTo: 'Zone Incharge - North', status: 'Pending', timestamp: '2025-08-02 14:30' },
    { id: 'ES-002', orderId: 'ORD109', issue: 'Customer complaint about delivery.', raisedTo: 'Delivery Admin', status: 'Resolved', timestamp: '2025-08-01 11:00' },
];

function EscalationManagement() {
    const [tickets, setTickets] = useState(initialTickets);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateTicket = (newTicket) => {
        setTickets(prev => [newTicket, ...prev]);
        setIsModalOpen(false);
    };

    const columns = [
        { header: 'Ticket ID', accessor: 'id' },
        { header: 'Order ID', accessor: 'orderId' },
        { header: 'Issue', accessor: 'issue', render: (row) => <p className="max-w-md whitespace-normal">{row.issue}</p> },
        { header: 'Raised To', accessor: 'raisedTo' },
        { header: 'Timestamp', accessor: 'timestamp' },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${row.status === 'Pending' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                    {row.status}
                </span>
            ),
        },
    ];

    return (
        <>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div>
                        <h2 className="text-xl font-bold text-taiba-gray mb-1">Escalation Management</h2>
                        <p className="text-sm text-taiba-gray">Raise and track delivery-related issues.</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center space-x-2 btn-primary px-6 py-2.5"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Raise New Issue</span>
                    </button>
                </div>
                <DataTable columns={columns} data={tickets} />
            </div>
            <RaiseIssueModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleCreateTicket}
            />
        </>
    );
}

export default EscalationManagement;
