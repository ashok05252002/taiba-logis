import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Modal';

function AssignOrderModal({ isOpen, onClose, order, drivers, onAssign }) {
    const [selectedDriver, setSelectedDriver] = useState('');
    const [remarks, setRemarks] = useState('');

    useEffect(() => {
        if (order) {
            if (order.isReassign && order.driver) {
                const driver = drivers.find(d => d.name === order.driver);
                setSelectedDriver(driver ? driver.id : '');
            } else {
                setSelectedDriver('');
            }
            setRemarks(order.remarks || '');
        }
    }, [order, drivers]);

    if (!order) return null;

    // Filter drivers who are in the same cluster AND are "Available"
    const filteredDrivers = drivers.filter(d => d.cluster === order.cluster && d.availability === 'Available');
    const title = order.isReassign ? `Reassign Order ${order.id}` : `Assign Order ${order.id}`;

    const handleSubmit = (e) => {
        e.preventDefault();
        onAssign(order.id, selectedDriver, remarks, order.isReassign);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div><p className="text-sm text-taiba-gray">Order ID:</p><p className="font-semibold">{order.id}</p></div>
                    <div><p className="text-sm text-taiba-gray">Customer:</p><p className="font-semibold">{order.customer}</p></div>
                    <div><p className="text-sm text-taiba-gray">Store:</p><p className="font-semibold">{order.store}</p></div>
                    <div><p className="text-sm text-taiba-gray">Cluster:</p><p className="font-semibold">{order.cluster}</p></div>
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
                        >
                            <option value="" disabled>Choose a driver from {order.cluster}</option>
                            {filteredDrivers.length > 0 ? (
                                filteredDrivers.map(driver => (
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
                    <button type="submit" className="btn-primary px-6 py-2">
                        {order.isReassign ? 'Confirm Reassignment' : 'Assign Order'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default AssignOrderModal;
