import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Modal';

function EditProfileModal({ isOpen, onClose, profile, onSave }) {
    const [formData, setFormData] = useState({ name: '', mobile: '', vehicleType: '', vehicleNumber: '' });

    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name,
                mobile: profile.mobile,
                vehicleType: profile.vehicleType,
                vehicleNumber: profile.vehicleNumber,
            });
        }
    }, [profile, isOpen]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...profile, ...formData });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Full Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} className="input-field" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Mobile Number</label>
                    <input name="mobile" value={formData.mobile} onChange={handleChange} className="input-field" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-taiba-gray mb-2">Vehicle Type</label>
                        <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="input-field">
                            <option>Bike</option>
                            <option>Car</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-taiba-gray mb-2">Vehicle Number</label>
                        <input name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} className="input-field" required />
                    </div>
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-taiba-gray font-medium hover:bg-gray-50">
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary px-6 py-2">
                        Save Changes
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default EditProfileModal;
