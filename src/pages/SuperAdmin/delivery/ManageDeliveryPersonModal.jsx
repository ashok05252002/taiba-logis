import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Modal';
import { UploadCloud, MapPin, Calendar, CheckCircle, XCircle } from 'lucide-react';
import ToggleSwitch from '../../../components/common/ToggleSwitch';

function ManageDeliveryPersonModal({ isOpen, onClose, person, onSave }) {
    const [activeTab, setActiveTab] = useState('basic');
    const [formData, setFormData] = useState({
        id: '',
        user_id: '',
        name: '',
        national_id: '',
        status: 'Pending',
        is_available: false,
        is_busy: false,
        verified_by: '',
        verified_at: '',
        current_latitude: '',
        current_longitude: '',
        checked_in_at: '',
        checked_out_at: '',
        driver_license: null,
        driver_photo: null,
        proofs: []
    });

    useEffect(() => {
        if (person) {
            setFormData({ ...person });
        } else {
            // Reset for new entry
            setFormData({
                id: `DM${Math.floor(Math.random() * 9000) + 1000}`,
                user_id: '',
                name: '',
                national_id: '',
                status: 'Pending',
                is_available: false,
                is_busy: false,
                verified_by: '',
                verified_at: '',
                current_latitude: '',
                current_longitude: '',
                checked_in_at: '',
                checked_out_at: '',
                driver_license: null,
                driver_photo: null,
                proofs: [],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                last_location_update: new Date().toISOString()
            });
        }
    }, [person, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleToggle = (key) => {
        setFormData(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleFileChange = (e, field) => {
        // Mock file upload handling
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, [field]: file.name }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            updated_at: new Date().toISOString()
        });
    };

    const renderBasicInfo = () => (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-1">User ID</label>
                    <input name="user_id" value={formData.user_id} onChange={handleChange} className="input-field" placeholder="e.g. U001" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-1">Full Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} className="input-field" placeholder="Driver Name" required />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-taiba-gray mb-1">National ID</label>
                <input name="national_id" value={formData.national_id} onChange={handleChange} className="input-field" placeholder="National ID Number" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-1">Status</label>
                    <select name="status" value={formData.status} onChange={handleChange} className="input-field">
                        <option value="Pending">Pending</option>
                        <option value="Verified">Verified</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Suspended">Suspended</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-1">Verified By</label>
                    <input name="verified_by" value={formData.verified_by} onChange={handleChange} className="input-field" placeholder="Admin Name" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-taiba-gray mb-1">Verified At</label>
                <input type="datetime-local" name="verified_at" value={formData.verified_at ? formData.verified_at.slice(0, 16) : ''} onChange={handleChange} className="input-field" />
            </div>
        </div>
    );

    const renderStatusAvailability = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                    <h4 className="font-semibold text-taiba-gray">Is Available?</h4>
                    <p className="text-xs text-gray-500">Driver is ready to accept orders</p>
                </div>
                <ToggleSwitch enabled={formData.is_available} setEnabled={() => handleToggle('is_available')} />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                    <h4 className="font-semibold text-taiba-gray">Is Busy?</h4>
                    <p className="text-xs text-gray-500">Driver is currently on a trip</p>
                </div>
                <ToggleSwitch enabled={formData.is_busy} setEnabled={() => handleToggle('is_busy')} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-1">Checked In At</label>
                    <input type="datetime-local" name="checked_in_at" value={formData.checked_in_at ? formData.checked_in_at.slice(0, 16) : ''} onChange={handleChange} className="input-field" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-1">Checked Out At</label>
                    <input type="datetime-local" name="checked_out_at" value={formData.checked_out_at ? formData.checked_out_at.slice(0, 16) : ''} onChange={handleChange} className="input-field" />
                </div>
            </div>
        </div>
    );

    const renderLocation = () => (
        <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                    <h4 className="text-sm font-bold text-blue-800">Current Location</h4>
                    <p className="text-xs text-blue-600">Last updated: {formData.last_location_update ? new Date(formData.last_location_update).toLocaleString() : 'Never'}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-1">Latitude</label>
                    <input name="current_latitude" value={formData.current_latitude} onChange={handleChange} className="input-field" placeholder="e.g. 23.5880" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-1">Longitude</label>
                    <input name="current_longitude" value={formData.current_longitude} onChange={handleChange} className="input-field" placeholder="e.g. 58.3829" />
                </div>
            </div>
        </div>
    );

    const renderDocuments = () => (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-taiba-gray mb-2">Driver Photo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors relative">
                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, 'driver_photo')} />
                    {formData.driver_photo ? (
                        <div className="flex items-center justify-center space-x-2 text-green-600">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">{formData.driver_photo}</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center text-gray-500">
                            <UploadCloud className="w-8 h-8 mb-2" />
                            <span className="text-sm">Click to upload photo</span>
                        </div>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-taiba-gray mb-2">Driver License</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors relative">
                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, 'driver_license')} />
                    {formData.driver_license ? (
                        <div className="flex items-center justify-center space-x-2 text-green-600">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">{formData.driver_license}</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center text-gray-500">
                            <UploadCloud className="w-8 h-8 mb-2" />
                            <span className="text-sm">Click to upload license</span>
                        </div>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-taiba-gray mb-2">Additional Proofs</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors relative">
                    <input type="file" multiple className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <div className="flex flex-col items-center text-gray-500">
                        <UploadCloud className="w-8 h-8 mb-2" />
                        <span className="text-sm">Click to upload proofs</span>
                    </div>
                </div>
                {formData.proofs && formData.proofs.length > 0 && (
                    <div className="mt-2 space-y-1">
                        {formData.proofs.map((proof, idx) => (
                            <div key={idx} className="text-xs text-gray-600 flex items-center space-x-2">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                <span>{proof}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={person ? "Edit Delivery Person" : "Add Delivery Person"}>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Tabs */}
                <div className="flex space-x-1 border-b border-gray-200">
                    {['basic', 'status', 'location', 'documents'].map(tab => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-sm font-medium capitalize transition-colors border-b-2 ${activeTab === tab ? 'border-taiba-blue text-taiba-blue' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="min-h-[300px]">
                    {activeTab === 'basic' && renderBasicInfo()}
                    {activeTab === 'status' && renderStatusAvailability()}
                    {activeTab === 'location' && renderLocation()}
                    {activeTab === 'documents' && renderDocuments()}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-400">
                        {formData.created_at && <span>Created: {new Date(formData.created_at).toLocaleDateString()}</span>}
                    </div>
                    <div className="flex space-x-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">Cancel</button>
                        <button type="submit" className="btn-primary px-6 py-2">Save Changes</button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}

export default ManageDeliveryPersonModal;
