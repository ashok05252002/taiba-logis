import React, { useState } from 'react';
import DataTable from '../../components/Tables/DataTable';
import { AlertTriangle } from 'lucide-react';
import ReassignModal from './components/ReassignModal';

const initialExceptionOrders = [
    { id: 'ORD652', customer: 'Omar Rashid', store: 'Southside Health', driver: 'Aisha Al-Ghamdi', driverId: 'D004', eta: 'Delayed (28 min)', status: 'Delayed', cluster: 'Cluster B' },
    { id: 'ORD789', customer: 'Ibrahim Said', store: 'Main Branch', driver: 'Khalid Ibrahim', driverId: 'D001', eta: 'N/A', status: 'Failed', cluster: 'Cluster A', reason: 'Customer unavailable' },
];

const initialDrivers = [
    { id: 'D001', name: 'Khalid Ibrahim', cluster: 'Cluster A', availability: 'On Delivery' },
    { id: 'D004', name: 'Aisha Al-Ghamdi', cluster: 'Cluster B', availability: 'On Delivery' },
    { id: 'D009', name: 'Zayn Malik', cluster: 'Cluster A', availability: 'Available' },
    { id: 'D010', name: 'Lina Saad', cluster: 'Cluster B', availability: 'Available' },
];

function ExceptionHandling() {
    const [exceptionOrders, setExceptionOrders] = useState(initialExceptionOrders);
    const [drivers, setDrivers] = useState(initialDrivers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const openReassignModal = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleReassignment = (orderId, newDriverId, reason) => {
        const order = exceptionOrders.find(o => o.id === orderId);
        const newDriver = drivers.find(d => d.id === newDriverId);
        const oldDriverId = order.driverId;

        // 1. Update order list (remove the reassigned order from exceptions)
        const updatedOrders = exceptionOrders.filter(o => o.id !== orderId);
        setExceptionOrders(updatedOrders);

        // 2. Update driver statuses
        const updatedDrivers = drivers.map(d => {
            if (d.id === oldDriverId) {
                return { ...d, availability: 'Available' }; // Original driver is now available
            }
            if (d.id === newDriverId) {
                return { ...d, availability: 'On Delivery' }; // New driver is on delivery
            }
            return d;
        });
        setDrivers(updatedDrivers);
        
        // 3. Log to audit trail (simulated)
        console.log(`AUDIT: Order ${orderId} reassigned from ${order.driver} to ${newDriver.name}. Reason: ${reason}. Original driver status set to 'Available'.`);

        setIsModalOpen(false);
    };

    const columns = [
        { header: 'Order ID', accessor: 'id' },
        { header: 'Customer', accessor: 'customer' },
        { header: 'Current Driver', accessor: 'driver' },
        { header: 'Status', accessor: 'status', render: (row) => (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${row.status === 'Delayed' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'}`}>
                {row.status}
            </span>
        )},
        { header: 'Reason/ETA', accessor: 'reason', render: (row) => row.reason || row.eta },
        {
            header: 'Actions',
            accessor: 'actions',
            render: (row) => (
                <button onClick={() => openReassignModal(row)} className="btn-secondary text-xs px-3 py-1">
                    Reassign
                </button>
            ),
        },
    ];

    return (
        <>
            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-bold text-taiba-gray mb-1">Reassignment & Exception Handling</h2>
                    <p className="text-sm text-taiba-gray">Manage failed, delayed, or problematic orders.</p>
                </div>

                <DataTable columns={columns} data={exceptionOrders} />

                {exceptionOrders.length === 0 && (
                    <div className="bg-white rounded-xl shadow-md p-8 text-center">
                        <AlertTriangle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-taiba-gray">No Active Exceptions</h3>
                        <p className="text-sm text-taiba-gray mt-2">All orders are proceeding without issues.</p>
                    </div>
                )}
            </div>
            <ReassignModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                order={selectedOrder}
                drivers={drivers}
                onConfirm={handleReassignment}
            />
        </>
    );
}

export default ExceptionHandling;
