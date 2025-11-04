import React, { useState } from 'react';
import { Download } from 'lucide-react';
import DataTable from '../../components/Tables/DataTable';

const dailySummaryData = [
    { date: '2025-08-01', totalDeliveries: 234, avgTime: '38 min', cancelPercent: '1.2%' },
    { date: '2025-07-31', totalDeliveries: 256, avgTime: '41 min', cancelPercent: '0.8%' },
    { date: '2025-07-30', totalDeliveries: 245, avgTime: '39 min', cancelPercent: '1.5%' },
];

const manualAssignmentLogData = [
    { timestamp: '2025-08-01 14:30:15', orderId: 'ORD771', driverId: 'D001', clusterId: 'Cluster A', remarks: 'High priority customer', assignedBy: 'ZI001' },
    { timestamp: '2025-08-01 11:15:00', orderId: 'ORD772', driverId: 'D010', clusterId: 'Cluster B', remarks: '', assignedBy: 'ZI001' },
    { timestamp: '2025-07-31 18:00:00', orderId: 'ORD765', driverId: 'D009', clusterId: 'Cluster A', remarks: 'REASSIGN: Original driver had vehicle issue.', assignedBy: 'ZI001' },
];

function Reports() {
    const [activeTab, setActiveTab] = useState('summary');

    const dailySummaryColumns = [
        { header: 'Date', accessor: 'date' },
        { header: 'Total Deliveries', accessor: 'totalDeliveries' },
        { header: 'Avg. Delivery Time', accessor: 'avgTime' },
        { header: 'Cancellation %', accessor: 'cancelPercent' },
    ];

    const assignmentLogColumns = [
        { header: 'Timestamp', accessor: 'timestamp' },
        { header: 'Order ID', accessor: 'orderId' },
        { header: 'Driver ID', accessor: 'driverId' },
        { header: 'Cluster ID', accessor: 'clusterId' },
        { header: 'Assigned By (Incharge ID)', accessor: 'assignedBy' },
        { header: 'Remarks', accessor: 'remarks' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-taiba-gray mb-1">Audit & Reporting</h2>
                <p className="text-sm text-taiba-gray">Review performance reports and audit logs for your zone.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="border-b border-gray-200">
                    <div className="flex space-x-8 px-6">
                        <button 
                            onClick={() => setActiveTab('summary')}
                            className={`py-4 px-2 font-medium border-b-2 transition-colors ${activeTab === 'summary' ? 'border-taiba-blue text-taiba-blue' : 'border-transparent text-taiba-gray hover:text-taiba-blue'}`}
                        >
                            Daily Summary Report
                        </button>
                        <button 
                            onClick={() => setActiveTab('audit')}
                            className={`py-4 px-2 font-medium border-b-2 transition-colors ${activeTab === 'audit' ? 'border-taiba-blue text-taiba-blue' : 'border-transparent text-taiba-gray hover:text-taiba-blue'}`}
                        >
                            Assignment Audit Log
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {activeTab === 'summary' && (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-taiba-gray">Daily Summary Data</h3>
                                <div className="flex space-x-2">
                                    <input type="date" className="input-field w-auto" defaultValue={new Date().toISOString().split('T')[0]} />
                                    <button className="flex items-center space-x-2 btn-secondary px-4 py-2">
                                        <Download className="w-4 h-4" />
                                        <span>Export CSV</span>
                                    </button>
                                </div>
                            </div>
                            <DataTable columns={dailySummaryColumns} data={dailySummaryData} />
                        </div>
                    )}

                    {activeTab === 'audit' && (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-taiba-gray">Manual Assignment Logs</h3>
                                <button className="flex items-center space-x-2 btn-secondary px-4 py-2">
                                    <Download className="w-4 h-4" />
                                    <span>Export Log</span>
                                </button>
                            </div>
                            <DataTable columns={assignmentLogColumns} data={manualAssignmentLogData} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Reports;
