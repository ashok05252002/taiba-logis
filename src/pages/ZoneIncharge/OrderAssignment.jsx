import React, { useState } from 'react';
import { PackagePlus, CheckCircle } from 'lucide-react';
import ManualAssignOrderModal from './components/ManualAssignOrderModal';
import DataTable from '../../components/Tables/DataTable';

const initialUnassignedOrders = [
    { id: 'ORD901', customer: 'Hassan Ali', store: 'Main Branch', cluster: 'Cluster A' },
    { id: 'ORD902', customer: 'Aisha Bakr', store: 'Westside Pharmacy', cluster: 'Cluster B' },
    { id: 'ORD903', customer: 'Omar Farooq', store: 'Southside Health', cluster: 'Cluster A' },
    { id: 'ORD904', customer: 'Lina Saad', store: 'Main Branch', cluster: 'Cluster B' },
];

const availableDrivers = [
    { id: 'D001', name: 'Khalid Ibrahim', cluster: 'Cluster A', availability: 'Available' },
    { id: 'D004', name: 'Aisha Al-Ghamdi', cluster: 'Cluster B', availability: 'On Delivery' },
    { id: 'D009', name: 'Zayn Malik', cluster: 'Cluster A', availability: 'Available' },
    { id: 'D010', name: 'Lina Saad', cluster: 'Cluster B', availability: 'Available' },
];

function OrderAssignment() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [unassignedOrders, setUnassignedOrders] = useState(initialUnassignedOrders);
    const [recentlyAssigned, setRecentlyAssigned] = useState([]);

    const handleAssignOrder = (assignmentDetails) => {
        // Add to recently assigned list
        setRecentlyAssigned(prev => [{...assignmentDetails, timestamp: new Date()}, ...prev]);
        
        // Remove from unassigned list
        setUnassignedOrders(prev => prev.filter(o => o.id !== assignmentDetails.orderId));

        console.log("Order Assigned:", assignmentDetails);
        setIsModalOpen(false);
    };
    
    const unassignedColumns = [
        { header: 'Order ID', accessor: 'id' },
        { header: 'Customer', accessor: 'customer' },
        { header: 'Store', accessor: 'store' },
        { header: 'Cluster', accessor: 'cluster' },
    ];

    return (
        <>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div>
                        <h2 className="text-xl font-bold text-taiba-gray mb-1">Manual Order Assignment</h2>
                        <p className="text-sm text-taiba-gray">Assign unallocated orders to available drivers.</p>
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2 btn-primary px-6 py-2.5" disabled={unassignedOrders.length === 0}>
                        <PackagePlus className="w-5 h-5" />
                        <span>Assign New Order</span>
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-bold text-taiba-gray mb-4">Unassigned Orders ({unassignedOrders.length})</h3>
                    {unassignedOrders.length > 0 ? (
                        <DataTable columns={unassignedColumns} data={unassignedOrders} itemsPerPage={5} />
                    ) : (
                        <p className="text-sm text-taiba-gray text-center py-8">No pending orders to assign.</p>
                    )}
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-bold text-taiba-gray mb-4">Recently Assigned Orders</h3>
                    {recentlyAssigned.length > 0 ? (
                        <div className="space-y-4">
                            {recentlyAssigned.map((order, index) => (
                                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-green-50">
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <div>
                                            <p className="font-semibold text-taiba-gray">Order <span className="font-bold">{order.orderId}</span> assigned to <span className="font-bold">{order.driverName}</span></p>
                                            <p className="text-xs text-gray-500">Remarks: {order.remarks || 'None'}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500">{order.timestamp.toLocaleTimeString()}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-taiba-gray text-center py-8">No orders have been manually assigned recently.</p>
                    )}
                </div>
            </div>

            <ManualAssignOrderModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAssign={handleAssignOrder}
                drivers={availableDrivers}
                unassignedOrders={unassignedOrders}
            />
        </>
    );
}

export default OrderAssignment;
