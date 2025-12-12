import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Modal';
import { X } from 'lucide-react';

function ManageClustersModal({ isOpen, onClose, zone, onSave }) {
    const [subClusters, setSubClusters] = useState([]);
    const [newSubCluster, setNewSubCluster] = useState('');

    useEffect(() => {
        if (zone) {
            setSubClusters(zone.subClusters || []);
        }
    }, [zone]);

    if (!zone) return null;

    const handleAddSubCluster = () => {
        if (newSubCluster.trim() && !subClusters.includes(newSubCluster.trim())) {
            setSubClusters([...subClusters, newSubCluster.trim()]);
            setNewSubCluster('');
        }
    };

    const handleRemoveSubCluster = (subClusterToRemove) => {
        setSubClusters(subClusters.filter(c => c !== subClusterToRemove));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(zone.id, subClusters);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Manage Areas for ${zone.name}`}>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Existing Areas</label>
                    <div className="p-4 border rounded-lg min-h-[8rem] space-y-2">
                        {subClusters.length > 0 ? (
                            subClusters.map(subCluster => (
                                <div key={subCluster} className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md">
                                    <span className="text-sm font-medium text-taiba-gray">{subCluster}</span>
                                    <button type="button" onClick={() => handleRemoveSubCluster(subCluster)} className="p-1 text-red-500 hover:bg-red-100 rounded-full">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No areas defined yet.</p>
                        )}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Add New Area</label>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={newSubCluster}
                            onChange={(e) => setNewSubCluster(e.target.value)}
                            className="input-field"
                            placeholder="Enter new area name"
                        />
                        <button type="button" onClick={handleAddSubCluster} className="btn-secondary px-4">
                            Add
                        </button>
                    </div>
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-taiba-gray font-medium hover:bg-gray-50">
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary px-6 py-2">
                        Save Areas
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default ManageClustersModal;
