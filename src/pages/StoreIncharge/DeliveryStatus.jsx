import React from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/Tables/DataTable';

function DeliveryStatus({ ongoingDeliveries }) {
    const navigate = useNavigate();

    const columns = [
        { header: 'Order ID', accessor: 'id' },
        { header: 'Driver', accessor: 'driver' },
        { header: 'ETA', accessor: 'eta' },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {row.status}
                </span>
            )
        },
        {
            header: 'Actions',
            accessor: 'actions',
            render: (row) => (
                <button
                    onClick={() => navigate(`/store-incharge/status/${row.id}`)}
                    className="btn-primary text-xs px-3 py-1"
                >
                    View Details
                </button>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-taiba-gray mb-1">Tracking & Monitoring</h2>
                <p className="text-sm text-taiba-gray">Track live delivery status for orders dispatched from your store.</p>
            </div>

            <DataTable columns={columns} data={ongoingDeliveries} />
        </div>
    );
}

export default DeliveryStatus;
