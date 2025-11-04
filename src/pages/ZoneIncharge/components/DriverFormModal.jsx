import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Modal';

function DriverFormModal({ isOpen, onClose, driver, onSave }) {
    const [formData, setFormData] = useState({ name: '', mobile: '', vehicle: 'Bike', cluster: 'Cluster A', shift: '' });

    useEffect(() => {
        if (driver) {
            setFormData({
                name: driver.name,
                mobile: driver.mobile,
                vehicle: driver.vehicle,
                cluster: driver.cluster,
                shift: driver.shift,
            });
        } else {
            setFormData({ name: '', mobile: '', vehicle: 'Bike', cluster: 'Cluster A', shift: '' });
        }
    }, [driver, isOpen]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...driver, ...formData });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={driver ? 'Edit Driver' : 'Add New Driver'}>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-taiba-gray mb-2">Full Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} className="input-field" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-taiba-gray mb-2">Mobile Number</label>
                        <input name="mobile" value={formData.mobile} onChange={handleChange} className="input-field" required />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-taiba-gray mb-2">Vehicle Type</label>
                        <select name="vehicle" value={formData.vehicle} onChange={handleChange} className="input-field">
                            <option>Bike</option>
                            <option>Car</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-taiba-gray mb-2">Assigned Cluster</label>
                        <select name="cluster" value={formData.cluster} onChange={handleChange} className="input-field">
                            <option>Cluster A</option>
                            <option>Cluster B</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Shift Hours</label>
                    <input name="shift" value={formData.shift} onChange={handleChange} placeholder="e.g., 9AM - 5PM" className="input-field" required />
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-taiba-gray font-medium hover:bg-gray-50">
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary px-6 py-2">
                        Save Driver
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default DriverFormModal;
