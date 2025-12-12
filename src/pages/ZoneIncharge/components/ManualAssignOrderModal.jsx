import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Modal';

function ManualAssignOrderModal({ isOpen, onClose, onAssign, drivers, unassignedOrders }) {
    const [orderId, setOrderId] = useState('');
    const [cluster, setCluster] = useState('');
    const [selectedDriver, setSelectedDriver] = useState('');
    const [remarks, setRemarks] = useState('');
    const [availableDrivers, setAvailableDrivers] = useState([]);

    useEffect(() => {
        if (cluster) {
            const filtered = drivers.filter(d => d.cluster === cluster && d.availability === 'Available');
            setAvailableDrivers(filtered);
            setSelectedDriver('');
        } else {
            setAvailableDrivers([]);
        }
    }, [cluster, drivers]);

    useEffect(() => {
        if (isOpen) {
            setOrderId('');
            setCluster('');
            setSelectedDriver('');
            setRemarks('');
        }
    }, [isOpen]);

    const handleOrderSelect = (selectedOrderId) => {
        const order = unassignedOrders.find(o => o.id === selectedOrderId);
        if (order) {
            setOrderId(order.id);
            setCluster(order.cluster);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const driver = drivers.find(d => d.id === selectedDriver);
        onAssign({
            orderId,
            cluster,
            driverId: selectedDriver,
            driverName: driver.name,
            assignmentType: 'Manual',
            remarks,
            assigned_by: 'Fatima Hassan (Cluster Incharge)', // Hardcoded for example
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Manually Assign Order">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-taiba-gray mb-2">Order ID</label>
                        <select
                            value={orderId}
                            onChange={(e) => handleOrderSelect(e.target.value)}
                            className="input-field"
                            required
                        >
                            <option value="">Select an unassigned order</option>
                            {unassignedOrders.map(order => (
                                <option key={order.id} value={order.id}>{order.id} - {order.customer}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-taiba-gray mb-2">Cluster</label>
                        <input type="text" value={cluster} readOnly className="input-field bg-gray-100" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-taiba-gray mb-2">Assignment Type</label>
                        <input type="text" value="Manual" readOnly className="input-field bg-gray-100" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-taiba-gray mb-2">Select Available Driver</label>
                        <select
                            value={selectedDriver}
                            onChange={(e) => setSelectedDriver(e.target.value)}
                            className="input-field"
                            required
                            disabled={!cluster}
                        >
                            <option value="">
                                {cluster ? 'Choose a driver' : 'Select a cluster first'}
                            </option>
                            {availableDrivers.length > 0 ? (
                                availableDrivers.map(driver => (
                                    <option key={driver.id} value={driver.id}>{driver.name}</option>
                                ))
                            ) : (
                                <option disabled>No available drivers in this cluster</option>
                            )}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Remarks (Optional)</label>
                    <textarea
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        className="input-field"
                        rows="3"
                        placeholder="Add any notes for this assignment..."
                    ></textarea>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-taiba-gray font-medium hover:bg-gray-50">
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary px-6 py-2" disabled={!selectedDriver}>
                        Assign Order
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default ManualAssignOrderModal;
