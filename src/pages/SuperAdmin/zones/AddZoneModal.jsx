import React, { useState } from 'react';
import Modal from '../../../components/common/Modal';
import { ChevronDown } from 'lucide-react';
import { allStores } from '../../../data/mockData';

function AddZoneModal({ isOpen, onClose, onZoneCreate, admins }) {
  const [selectedStores, setSelectedStores] = useState([]);
  const [isStoreDropdownOpen, setIsStoreDropdownOpen] = useState(false);

  const toggleStore = (storeName) => {
    setSelectedStores(prev => 
      prev.includes(storeName) 
        ? prev.filter(s => s !== storeName) 
        : [...prev, storeName]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const region = formData.get('region');
    const adminId = formData.get('adminId');
    const subClusters = formData.get('subClusters').split(',').map(c => c.trim()).filter(Boolean);
    const selectedAdmin = admins.find(a => a.id === adminId);

    const newCluster = {
      id: `C${Math.floor(Math.random() * 900) + 100}`,
      name,
      region,
      admin: selectedAdmin ? selectedAdmin.name : 'Unassigned',
      adminId,
      drivers: '0',
      incharges: '0',
      orders: '0',
      status: 'Active',
      subClusters,
      stores: selectedStores,
      createdAt: new Date().toISOString(),
    };
    
    onZoneCreate(newCluster);
    setSelectedStores([]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Cluster">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-taiba-gray mb-2">Cluster Name</label>
            <input name="name" type="text" className="input-field" placeholder="e.g., North-East Cluster" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-taiba-gray mb-2">Region</label>
            <input name="region" type="text" className="input-field" placeholder="e.g., Riyadh" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-taiba-gray mb-2">Assign to Delivery Admin</label>
          <select name="adminId" className="input-field" required>
            <option value="">Select an Admin</option>
            {admins.map(admin => (
              <option key={admin.id} value={admin.id}>{admin.name}</option>
            ))}
          </select>
        </div>
        
        {/* Multi-select for Stores */}
        <div>
            <label className="block text-sm font-medium text-taiba-gray mb-2">Assign Stores</label>
            <div className="relative">
                <button 
                    type="button" 
                    className="input-field text-left flex justify-between items-center bg-white"
                    onClick={() => setIsStoreDropdownOpen(!isStoreDropdownOpen)}
                >
                    <span className="truncate text-gray-700">
                        {selectedStores.length > 0 ? selectedStores.join(', ') : 'Select stores...'}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                {isStoreDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {allStores.map(store => (
                            <div key={store.id} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer" onClick={() => toggleStore(store.name)}>
                                <input 
                                    type="checkbox" 
                                    checked={selectedStores.includes(store.name)} 
                                    readOnly
                                    className="mr-3 h-4 w-4 text-taiba-blue rounded focus:ring-taiba-blue pointer-events-none"
                                />
                                <span className="text-sm text-gray-700">{store.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <p className="text-xs text-gray-500 mt-1">{selectedStores.length} stores selected.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-taiba-gray mb-2">Define Areas/Sub-clusters</label>
          <textarea name="subClusters" className="input-field" rows="3" placeholder="Enter area names, separated by commas (e.g., Area A, Area B)"></textarea>
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-taiba-gray font-medium hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" className="btn-primary px-6 py-2">
            Create Cluster
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddZoneModal;
