import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Modal';
import { X } from 'lucide-react';

function ManageClustersModal({ isOpen, onClose, zone, onSave }) {
    const [clusters, setClusters] = useState([]);
    const [newCluster, setNewCluster] = useState('');

    useEffect(() => {
        if (zone) {
            setClusters(zone.clusters || []);
        }
    }, [zone]);

    if (!zone) return null;

    const handleAddCluster = () => {
        if (newCluster.trim() && !clusters.includes(newCluster.trim())) {
            setClusters([...clusters, newCluster.trim()]);
            setNewCluster('');
        }
    };

    const handleRemoveCluster = (clusterToRemove) => {
        setClusters(clusters.filter(c => c !== clusterToRemove));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(zone.id, clusters);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Manage Clusters for ${zone.name}`}>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Existing Clusters</label>
                    <div className="p-4 border rounded-lg min-h-[8rem] space-y-2">
                        {clusters.length > 0 ? (
                            clusters.map(cluster => (
                                <div key={cluster} className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md">
                                    <span className="text-sm font-medium text-taiba-gray">{cluster}</span>
                                    <button type="button" onClick={() => handleRemoveCluster(cluster)} className="p-1 text-red-500 hover:bg-red-100 rounded-full">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No clusters defined yet.</p>
                        )}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Add New Cluster</label>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={newCluster}
                            onChange={(e) => setNewCluster(e.target.value)}
                            className="input-field"
                            placeholder="Enter new cluster name"
                        />
                        <button type="button" onClick={handleAddCluster} className="btn-secondary px-4">
                            Add
                        </button>
                    </div>
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-taiba-gray font-medium hover:bg-gray-50">
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary px-6 py-2">
                        Save Clusters
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default ManageClustersModal;
