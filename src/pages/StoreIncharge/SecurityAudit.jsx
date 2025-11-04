import React, { useState } from 'react';
import DataTable from '../../components/Tables/DataTable';
import { History, CheckCheck } from 'lucide-react';

const handoverLogs = [
    { id: 1, orderId: 'ORD107', driver: 'Khalid Ibrahim', storeInchargeId: 'SI001', timestamp: '2025-08-02 14:05:12' },
    { id: 2, orderId: 'ORD106', driver: 'Noura Saad', storeInchargeId: 'SI001', timestamp: '2025-08-02 13:45:30' },
    { id: 3, orderId: 'ORD104', driver: 'Sami Al-Johani', storeInchargeId: 'SI001', timestamp: '2025-08-02 12:10:05' },
];

const orderAuditLogs = [
    { id: 1, orderId: 'ORD107', action: 'Handover Confirmed', timestamp: '2025-08-02 14:05:12', performedBy: 'Store Incharge' },
    { id: 2, orderId: 'ORD107', action: 'Marked as Ready for Pickup', timestamp: '2025-08-02 13:30:00', performedBy: 'Store Incharge' },
    { id: 3, orderId: 'ORD103', action: 'Marked as Ready for Pickup', timestamp: '2025-08-02 13:25:00', performedBy: 'Store Incharge' },
    { id: 4, orderId: 'ORD106', action: 'Handover Confirmed', timestamp: '2025-08-02 13:45:30', performedBy: 'Store Incharge' },
];

function SecurityAudit() {
    const [activeTab, setActiveTab] = useState('handover');

    const handoverColumns = [
        { header: 'Order ID', accessor: 'orderId' },
        { header: 'Driver', accessor: 'driver' },
        { header: 'Verified By (Incharge ID)', accessor: 'storeInchargeId' },
        { header: 'Timestamp', accessor: 'timestamp' },
    ];

    const auditColumns = [
        { header: 'Order ID', accessor: 'orderId' },
        { header: 'Action', accessor: 'action' },
        { header: 'Performed By', accessor: 'performedBy' },
        { header: 'Timestamp', accessor: 'timestamp' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-taiba-gray mb-1">Security & Audit</h2>
                <p className="text-sm text-taiba-gray">Review handover logs and order audit trails for compliance.</p>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="border-b border-gray-200">
                    <div className="flex space-x-8 px-6">
                        <button
                            onClick={() => setActiveTab('handover')}
                            className={`flex items-center space-x-2 py-4 px-2 font-medium border-b-2 transition-colors ${activeTab === 'handover' ? 'border-taiba-blue text-taiba-blue' : 'border-transparent text-taiba-gray'}`}
                        >
                            <CheckCheck className="w-5 h-5" />
                            <span>Handover Logs</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('audit')}
                            className={`flex items-center space-x-2 py-4 px-2 font-medium border-b-2 transition-colors ${activeTab === 'audit' ? 'border-taiba-blue text-taiba-blue' : 'border-transparent text-taiba-gray'}`}
                        >
                            <History className="w-5 h-5" />
                            <span>Order Audit Trail</span>
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {activeTab === 'handover' ? (
                        <DataTable columns={handoverColumns} data={handoverLogs} />
                    ) : (
                        <DataTable columns={auditColumns} data={orderAuditLogs} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default SecurityAudit;
