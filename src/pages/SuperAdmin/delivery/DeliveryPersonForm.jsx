import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, UploadCloud, MapPin, CheckCircle, Save, User, FileText, Activity } from 'lucide-react';
import ToggleSwitch from '../../../components/common/ToggleSwitch';
import { deliveryManagementData } from '../../../data/mockData';

function DeliveryPersonForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

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
        proofs: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_location_update: new Date().toISOString()
    });

    useEffect(() => {
        if (isEditMode) {
            const person = deliveryManagementData.find(p => p.id === id);
            if (person) {
                setFormData({ ...person });
            }
        } else {
            setFormData(prev => ({
                ...prev,
                id: `DM${Math.floor(Math.random() * 9000) + 1000}`,
            }));
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleToggle = (key) => {
        setFormData(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, [field]: file.name }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Saving delivery person data:', formData);
        // Here you would typically make an API call
        navigate('/super-admin/delivery-management');
    };

    const renderBasicInfo = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">User ID <span className="text-red-500">*</span></label>
                    <input name="user_id" value={formData.user_id} onChange={handleChange} className="input-field" placeholder="e.g. U001" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Full Name <span className="text-red-500">*</span></label>
                    <input name="name" value={formData.name} onChange={handleChange} className="input-field" placeholder="Driver Name" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">National ID <span className="text-red-500">*</span></label>
                    <input name="national_id" value={formData.national_id} onChange={handleChange} className="input-field" placeholder="National ID Number" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Status</label>
                    <select name="status" value={formData.status} onChange={handleChange} className="input-field">
                        <option value="Pending">Pending</option>
                        <option value="Verified">Verified</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Suspended">Suspended</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Verified By</label>
                    <input name="verified_by" value={formData.verified_by || ''} onChange={handleChange} className="input-field" placeholder="Admin Name" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Verified At</label>
                    <input type="datetime-local" name="verified_at" value={formData.verified_at ? formData.verified_at.slice(0, 16) : ''} onChange={handleChange} className="input-field" />
                </div>
            </div>
        </div>
    );

    const renderStatusAvailability = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                        <h4 className="font-semibold text-taiba-gray">Is Available?</h4>
                        <p className="text-xs text-gray-500">Driver is ready to accept orders</p>
                    </div>
                    <ToggleSwitch enabled={formData.is_available} setEnabled={() => handleToggle('is_available')} />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                        <h4 className="font-semibold text-taiba-gray">Is Busy?</h4>
                        <p className="text-xs text-gray-500">Driver is currently on a trip</p>
                    </div>
                    <ToggleSwitch enabled={formData.is_busy} setEnabled={() => handleToggle('is_busy')} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Checked In At</label>
                    <input type="datetime-local" name="checked_in_at" value={formData.checked_in_at ? formData.checked_in_at.slice(0, 16) : ''} onChange={handleChange} className="input-field" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Checked Out At</label>
                    <input type="datetime-local" name="checked_out_at" value={formData.checked_out_at ? formData.checked_out_at.slice(0, 16) : ''} onChange={handleChange} className="input-field" />
                </div>
            </div>
        </div>
    );

    const renderLocation = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3 border border-blue-100">
                <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                    <h4 className="text-sm font-bold text-blue-800">Current Location</h4>
                    <p className="text-xs text-blue-600">Last updated: {formData.last_location_update ? new Date(formData.last_location_update).toLocaleString() : 'Never'}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Latitude</label>
                    <input name="current_latitude" value={formData.current_latitude || ''} onChange={handleChange} className="input-field" placeholder="e.g. 23.5880" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Longitude</label>
                    <input name="current_longitude" value={formData.current_longitude || ''} onChange={handleChange} className="input-field" placeholder="e.g. 58.3829" />
                </div>
            </div>
        </div>
    );

    const renderDocuments = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Driver Photo</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors relative bg-white group">
                        <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, 'driver_photo')} />
                        {formData.driver_photo ? (
                            <div className="flex flex-col items-center justify-center text-green-600">
                                <CheckCircle className="w-8 h-8 mb-2" />
                                <span className="font-medium truncate max-w-full px-4">{formData.driver_photo}</span>
                                <span className="text-xs text-gray-400 mt-1">Click to replace</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-gray-500 group-hover:text-taiba-blue">
                                <UploadCloud className="w-8 h-8 mb-2" />
                                <span className="text-sm">Click to upload photo</span>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Driver License</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors relative bg-white group">
                        <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, 'driver_license')} />
                        {formData.driver_license ? (
                            <div className="flex flex-col items-center justify-center text-green-600">
                                <CheckCircle className="w-8 h-8 mb-2" />
                                <span className="font-medium truncate max-w-full px-4">{formData.driver_license}</span>
                                <span className="text-xs text-gray-400 mt-1">Click to replace</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-gray-500 group-hover:text-taiba-blue">
                                <UploadCloud className="w-8 h-8 mb-2" />
                                <span className="text-sm">Click to upload license</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Additional Proofs</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors relative bg-white group">
                        <input type="file" multiple className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        <div className="flex flex-col items-center text-gray-500 group-hover:text-taiba-blue">
                            <UploadCloud className="w-8 h-8 mb-2" />
                            <span className="text-sm">Click to upload proofs</span>
                        </div>
                    </div>
                    {formData.proofs && formData.proofs.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {formData.proofs.map((proof, idx) => (
                                <div key={idx} className="text-xs text-gray-600 flex items-center space-x-1 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
                                    <FileText className="w-3 h-3 text-taiba-blue" />
                                    <span>{proof}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    const tabs = [
        { id: 'basic', label: 'Basic Info', icon: User },
        { id: 'status', label: 'Status & Availability', icon: Activity },
        { id: 'location', label: 'Location', icon: MapPin },
        { id: 'documents', label: 'Documents', icon: FileText }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6 text-taiba-gray" />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-taiba-gray">{isEditMode ? 'Edit Delivery Person' : 'Add Delivery Person'}</h2>
                        <p className="text-sm text-taiba-gray">{isEditMode ? `ID: ${id}` : 'Create a new delivery personnel record'}</p>
                    </div>
                </div>
                <button onClick={handleSubmit} className="flex items-center space-x-2 btn-primary px-6 py-2.5">
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                </button>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row min-h-[600px]">
                {/* Sidebar Tabs */}
                <div className="w-full md:w-64 border-r border-gray-200 bg-gray-50 p-4">
                    <div className="space-y-1">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                                    activeTab === tab.id 
                                        ? 'bg-white text-taiba-blue shadow-sm ring-1 ring-black/5' 
                                        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                            >
                                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-taiba-blue' : 'text-gray-400'}`} />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Form Area */}
                <div className="flex-1 p-8">
                    <div className="max-w-3xl">
                        {activeTab === 'basic' && renderBasicInfo()}
                        {activeTab === 'status' && renderStatusAvailability()}
                        {activeTab === 'location' && renderLocation()}
                        {activeTab === 'documents' && renderDocuments()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeliveryPersonForm;
