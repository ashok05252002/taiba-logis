import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Modal';

function ReassignModal({ isOpen, onClose, order, drivers, onConfirm }) {
    const [newDriverId, setNewDriverId] = useState('');
    const [reason, setReason] = useState('');
    const [availableDrivers, setAvailableDrivers] = useState([]);

    useEffect(() => {
        if (order && drivers) {
            // Show drivers in the same cluster who are 'Available'
            const filtered = drivers.filter(d => d.cluster === order.cluster && d.availability === 'Available');
            setAvailableDrivers(filtered);
        }
        // Reset form on open
        setNewDriverId('');
        setReason('');
    }, [order, drivers, isOpen]);

    if (!order) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newDriverId || !reason) {
            alert('Please select a new driver and provide a reason.');
            return;
        }
        onConfirm(order.id, newDriverId, reason);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Reassign Order ${order.id}`}>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-taiba-gray">Current Driver: <span className="font-semibold">{order.driver}</span></p>
                    <p className="text-sm text-taiba-gray">Status: <span className="font-semibold">{order.status}</span></p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Select New Driver</label>
                    <select
                        value={newDriverId}
                        onChange={(e) => setNewDriverId(e.target.value)}
                        className="input-field"
                        required
                    >
                        <option value="" disabled>Choose an available driver</option>
                        {availableDrivers.length > 0 ? (
                            availableDrivers.map(driver => (
                                <option key={driver.id} value={driver.id}>{driver.name}</option>
                            ))
                        ) : (
                            <option disabled>No available drivers in this cluster</option>
                        )}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Reason for Reassignment</label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="input-field"
                        rows="3"
                        placeholder="e.g., Original driver had vehicle trouble."
                        required
                    ></textarea>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-taiba-gray font-medium hover:bg-gray-50">
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary px-6 py-2">
                        Confirm Reassignment
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default ReassignModal;
