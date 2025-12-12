import React, { useState, useEffect, useRef } from 'react';
import DataTable from '../../components/Tables/DataTable';
import { ShieldAlert, MessageSquare, Plus, MoreVertical, Eye, CheckCircle, UserPlus } from 'lucide-react';
import CreateTicketModal from './escalations/CreateTicketModal';
import ViewTicketModal from './escalations/ViewTicketModal';
import ResolveTicketModal from './escalations/ResolveTicketModal';
import ChatInterface from './escalations/ChatInterface';

const initialTickets = [
    { id: 'TKT001', orderId: 'ORD552', issue: 'Driver reported customer unavailable at the location. Waited for 15 minutes.', raisedBy: 'Driver #07', assignedTo: 'Fatima Hassan', status: 'Pending', timestamp: '2025-08-01T14:30:00Z', history: [{ user: 'Driver #07', action: 'Created Ticket', timestamp: '2025-08-01T14:30:00Z' }] },
    { id: 'TKT002', orderId: 'ORD555', issue: 'Customer reported receiving wrong items. Order contains medication for a different patient.', raisedBy: 'Customer Support', assignedTo: 'Omar Rashid', status: 'In Progress', timestamp: '2025-08-01T11:00:00Z', history: [{ user: 'Customer Support', action: 'Created Ticket', timestamp: '2025-08-01T11:00:00Z' }, { user: 'Delivery Admin', action: 'Assigned to Omar Rashid', timestamp: '2025-08-01T11:05:00Z' }] },
    { id: 'TKT003', orderId: 'N/A', issue: 'Driver shortage in Area C during peak hours.', raisedBy: 'System Alert', assignedTo: 'Fatima Hassan', status: 'Resolved', timestamp: '2025-07-31T16:00:00Z', resolution: 'Manually assigned two drivers from Area B to cover the shortage.', history: [{ user: 'System', action: 'Created Ticket', timestamp: '2025-07-31T16:00:00Z' }, { user: 'Delivery Admin', action: 'Resolved Ticket', timestamp: '2025-07-31T16:45:00Z' }] },
];

const incharges = ['Fatima Hassan', 'Omar Rashid', 'Aisha Ibrahim'];

function EscalationManagement() {
    const [activeTab, setActiveTab] = useState('workflow');
    const [tickets, setTickets] = useState(initialTickets);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [modalState, setModalState] = useState({ create: false, view: false, resolve: false });
    const [openActionMenu, setOpenActionMenu] = useState(null);
    const actionMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
                setOpenActionMenu(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const openModal = (modal, ticket = null) => {
        setSelectedTicket(ticket);
        setModalState(prev => ({ ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}), [modal]: true }));
        setOpenActionMenu(null);
    };

    const closeModal = () => {
        setModalState(prev => ({ ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}) }));
        setSelectedTicket(null);
    };

    const handleCreateTicket = (newTicket) => {
        setTickets(prev => [newTicket, ...prev]);
        closeModal();
    };

    const handleResolveTicket = (ticketId, resolutionNotes) => {
        setTickets(prev => prev.map(t => t.id === ticketId ? { 
            ...t, 
            status: 'Resolved', 
            resolution: resolutionNotes, 
            history: [...t.history, { user: 'Delivery Admin', action: 'Resolved Ticket', timestamp: new Date().toISOString() }] 
        } : t));
        closeModal();
    };

    const columns = [
        { header: 'Ticket ID', accessor: 'id' },
        { header: 'Order ID', accessor: 'orderId' },
        { header: 'Issue', accessor: 'issue', render: (row) => <p className="max-w-xs whitespace-normal">{row.issue}</p> },
        { header: 'Assigned To', accessor: 'assignedTo' },
        {
            header: 'Status', accessor: 'status',
            render: (row) => (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    row.status === 'Pending' ? 'bg-orange-100 text-orange-800' :
                    row.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                }`}>
                    {row.status}
                </span>
            ),
        },
        {
            header: 'Actions', accessor: 'actions',
            render: (row) => (
                <div className="relative">
                    <button onClick={() => setOpenActionMenu(openActionMenu === row.id ? null : row.id)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                    {openActionMenu === row.id && (
                        <div ref={actionMenuRef} className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-20">
                            <button onClick={() => openModal('view', row)} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-taiba-gray hover:bg-gray-50">
                                <Eye className="w-4 h-4" />
                                <span>View Details</span>
                            </button>
                            {row.status !== 'Resolved' && (
                                <>
                                    <button onClick={() => openModal('resolve', row)} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-taiba-gray hover:bg-gray-50">
                                        <CheckCircle className="w-4 h-4" />
                                        <span>Resolve Ticket</span>
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div>
                        <h2 className="text-xl font-bold text-taiba-gray mb-1">Communication & Escalation</h2>
                        <p className="text-sm text-taiba-gray">Manage communication and resolve delivery issues.</p>
                    </div>
                    {activeTab === 'workflow' && (
                        <button
                            onClick={() => openModal('create')}
                            className="flex items-center space-x-2 btn-primary px-6 py-2.5"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Create New Ticket</span>
                        </button>
                    )}
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="border-b border-gray-200">
                        <div className="flex space-x-8 px-6">
                            <button onClick={() => setActiveTab('workflow')} className={`flex items-center space-x-2 py-4 px-2 font-medium border-b-2 transition-colors ${activeTab === 'workflow' ? 'border-taiba-blue text-taiba-blue' : 'border-transparent text-taiba-gray'}`}>
                                <ShieldAlert className="w-5 h-5" />
                                <span>Escalation Workflow</span>
                            </button>
                            <button onClick={() => setActiveTab('chat')} className={`flex items-center space-x-2 py-4 px-2 font-medium border-b-2 transition-colors ${activeTab === 'chat' ? 'border-taiba-blue text-taiba-blue' : 'border-transparent text-taiba-gray'}`}>
                                <MessageSquare className="w-5 h-5" />
                                <span>In-App Chat</span>
                            </button>
                        </div>
                    </div>
                    {activeTab === 'workflow' ? (
                        <DataTable columns={columns} data={tickets} />
                    ) : (
                        <ChatInterface />
                    )}
                </div>
            </div>
            <CreateTicketModal
                isOpen={modalState.create}
                onClose={closeModal}
                onCreate={handleCreateTicket}
                incharges={incharges}
            />
            <ViewTicketModal
                isOpen={modalState.view}
                onClose={closeModal}
                ticket={selectedTicket}
            />
            <ResolveTicketModal
                isOpen={modalState.resolve}
                onClose={closeModal}
                ticket={selectedTicket}
                onResolve={handleResolveTicket}
            />
        </>
    );
}

export default EscalationManagement;
