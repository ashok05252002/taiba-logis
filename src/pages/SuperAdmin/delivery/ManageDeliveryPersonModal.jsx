import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Modal';
import { UploadCloud, Plus, Trash2, FileText } from 'lucide-react';

const clusters = ['North Cluster', 'South Cluster', 'East Cluster', 'West Cluster', 'Central Cluster'];

function ManageDeliveryPersonModal({ isOpen, onClose, person, onSave }) {
    const [formData, setFormData] = useState({
        id: '',
        user_id: '',
        name: '',
        profession: '',
        national_id: '',
        cluster: '',
        status: 'Pending',
    });

    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        if (person) {
            setFormData({ 
                ...person,
                profession: person.profession || 'Driver',
                cluster: person.cluster || '' 
            });
            // If editing, we would populate documents from person data if available
            setDocuments(person.documents || [
                { id: 1, name: 'Driver License', file: person.driver_license, isDefault: true },
                { id: 2, name: 'National ID', file: null, isDefault: true }
            ]);
        } else {
            // Reset for new entry
            setFormData({
                id: `DM${Math.floor(Math.random() * 9000) + 1000}`,
                user_id: '',
                name: '',
                profession: 'Driver',
                national_id: '',
                cluster: '',
                status: 'Pending',
            });
            setDocuments([
                { id: 1, name: 'Driver License', file: null, isDefault: true },
                { id: 2, name: 'National ID', file: null, isDefault: true }
            ]);
        }
    }, [person, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddDocument = () => {
        setDocuments([...documents, { id: Date.now(), name: '', file: null, isDefault: false }]);
    };

    const handleRemoveDocument = (id) => {
        setDocuments(documents.filter(doc => doc.id !== id));
    };

    const handleDocumentChange = (id, field, value) => {
        setDocuments(documents.map(doc => 
            doc.id === id ? { ...doc, [field]: value } : doc
        ));
    };

    const handleFileChange = (id, e) => {
        const file = e.target.files[0];
        if (file) {
            handleDocumentChange(id, 'file', file.name);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            documents: documents,
            is_available: person ? person.is_available : false, 
            is_busy: person ? person.is_busy : false,
            created_at: person ? person.created_at : new Date().toISOString(),
            updated_at: new Date().toISOString(),
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={person ? "Edit Delivery Person" : "Add Delivery Person"}>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info Section */}
                <div className="space-y-4">
                    <h4 className="font-bold text-taiba-gray border-b pb-2">Personal Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-taiba-gray mb-1">User ID <span className="text-red-500">*</span></label>
                            <input name="user_id" value={formData.user_id} onChange={handleChange} className="input-field" placeholder="e.g. U001" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-taiba-gray mb-1">Full Name <span className="text-red-500">*</span></label>
                            <input name="name" value={formData.name} onChange={handleChange} className="input-field" placeholder="Driver Name" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-taiba-gray mb-1">Profession <span className="text-red-500">*</span></label>
                            <input name="profession" value={formData.profession} onChange={handleChange} className="input-field" placeholder="e.g. Driver, PRO" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-taiba-gray mb-1">National ID <span className="text-red-500">*</span></label>
                            <input name="national_id" value={formData.national_id} onChange={handleChange} className="input-field" placeholder="National ID Number" required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-taiba-gray mb-1">Assign Cluster <span className="text-red-500">*</span></label>
                        <select name="cluster" value={formData.cluster} onChange={handleChange} className="input-field" required>
                            <option value="">Select Cluster</option>
                            {clusters.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>

                {/* Documents Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                        <h4 className="font-bold text-taiba-gray">Documents & Proofs</h4>
                        <button type="button" onClick={handleAddDocument} className="text-sm text-taiba-blue flex items-center hover:underline font-medium">
                            <Plus className="w-4 h-4 mr-1" /> Add Document
                        </button>
                    </div>
                    
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                        {documents.map((doc, index) => (
                            <div key={doc.id} className="flex items-start space-x-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                                <div className="flex-1 space-y-2">
                                    <label className="block text-xs font-medium text-gray-500">Document Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Profession License" 
                                        value={doc.name}
                                        onChange={(e) => handleDocumentChange(doc.id, 'name', e.target.value)}
                                        className="w-full text-sm border-gray-300 rounded-md focus:ring-taiba-blue focus:border-taiba-blue px-3 py-1.5 border"
                                    />
                                    <div className="relative pt-1">
                                        <input 
                                            type="file" 
                                            id={`file-${doc.id}`} 
                                            className="hidden" 
                                            onChange={(e) => handleFileChange(doc.id, e)} 
                                        />
                                        <label 
                                            htmlFor={`file-${doc.id}`} 
                                            className="flex items-center justify-center w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-white transition-colors"
                                        >
                                            {doc.file ? (
                                                <span className="text-sm text-green-600 flex items-center">
                                                    <FileText className="w-4 h-4 mr-2" />
                                                    {doc.file}
                                                </span>
                                            ) : (
                                                <span className="text-xs text-gray-500 flex items-center">
                                                    <UploadCloud className="w-4 h-4 mr-2" />
                                                    Click to Upload File
                                                </span>
                                            )}
                                        </label>
                                    </div>
                                </div>
                                {!doc.isDefault && (
                                    <button 
                                        type="button" 
                                        onClick={() => handleRemoveDocument(doc.id)}
                                        className="p-2 text-red-500 hover:bg-red-100 rounded-full mt-6"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                    <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 font-medium">Cancel</button>
                    <button type="submit" className="btn-primary px-8 py-2">Save Details</button>
                </div>
            </form>
        </Modal>
    );
}

export default ManageDeliveryPersonModal;
