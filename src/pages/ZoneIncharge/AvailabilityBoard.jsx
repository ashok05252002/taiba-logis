import React, { useState } from 'react';
import DataTable from '../../components/Tables/DataTable';

const drivers = [
    { id: 'D001', name: 'Khalid Ibrahim', cluster: 'Cluster A', assignment: 'None', lastUpdate: '2m ago', status: 'Available', location: 'Near Main St' },
    { id: 'D004', name: 'Aisha Al-Ghamdi', cluster: 'Cluster B', assignment: 'ORD652', lastUpdate: '1m ago', status: 'On Delivery', location: 'Park Ave' },
    { id: 'D008', name: 'Sami Al-Johani', cluster: 'Cluster A', assignment: 'None', lastUpdate: '1h ago', status: 'Offline', location: 'N/A' },
    { id: 'D007', name: 'Fahad Al-Harbi', cluster: 'Cluster B', assignment: 'None', lastUpdate: '5m ago', status: 'On Break', location: 'Central Cafe' },
    { id: 'D009', name: 'Zayn Malik', cluster: 'Cluster A', assignment: 'None', lastUpdate: '10m ago', status: 'Available', location: 'Warehouse' },
];

const statusFilters = ['All', 'Available', 'On Delivery', 'On Break', 'Offline'];

function AvailabilityBoard() {
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredDrivers = drivers.filter(d => activeFilter === 'All' || d.status === activeFilter);

    const getRowClassName = (row) => {
        switch (row.status) {
            case 'Available': return 'bg-green-50 hover:bg-green-100';
            case 'On Delivery': return 'bg-blue-50 hover:bg-blue-100';
            case 'On Break': return 'bg-orange-50 hover:bg-orange-100';
            case 'Offline': return 'bg-gray-100 hover:bg-gray-200';
            default: return 'hover:bg-gray-50';
        }
    };

    const columns = [
        { header: 'Driver Name', accessor: 'name' },
        { header: 'Cluster', accessor: 'cluster' },
        { header: 'Current Assignment', accessor: 'assignment' },
        { header: 'Last Location', accessor: 'location' },
        { header: 'Last Update', accessor: 'lastUpdate' },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => {
                const config = {
                    'Available': 'bg-green-100 text-green-800',
                    'On Delivery': 'bg-blue-100 text-blue-800',
                    'On Break': 'bg-orange-100 text-orange-800',
                    'Offline': 'bg-gray-200 text-gray-800',
                };
                return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${config[row.status]}`}>{row.status}</span>;
            },
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-taiba-gray mb-1">Driver Availability Board</h2>
                <p className="text-sm text-taiba-gray">A real-time list of all drivers and their current status.</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4">
                <div className="flex flex-wrap gap-2">
                    {statusFilters.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === filter ? 'bg-taiba-blue text-white' : 'bg-gray-100 text-taiba-gray hover:bg-gray-200'}`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <DataTable
                columns={columns}
                data={filteredDrivers}
                getRowClassName={getRowClassName}
            />
        </div>
    );
}

export default AvailabilityBoard;
