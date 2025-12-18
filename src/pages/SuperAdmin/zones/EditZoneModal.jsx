import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Modal';
import { ChevronDown } from 'lucide-react';
import { allStores } from '../../../data/mockData';

function EditZoneModal({ isOpen, onClose, zone, onSave, admins }) {
  const [formData, setFormData] = useState({ name: '', region: '', adminId: '', subClusters: '' });
  const [selectedStores, setSelectedStores] = useState([]);
  const [isStoreDropdownOpen, setIsStoreDropdownOpen] = useState(false);

  useEffect(() => {
    if (zone) {
      setFormData({
        name: zone.name,
        region: zone.region,
        adminId: zone.adminId,
        subClusters: zone.subClusters ? zone.subClusters.join(', ') : '',
      });
      setSelectedStores(zone.stores || []);
    }
  }, [zone]);

  if (!zone) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleStore = (storeName) => {
    setSelectedStores(prev => 
      prev.includes(storeName) 
        ? prev.filter(s => s !== storeName) 
        : [...prev, storeName]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedAdmin = admins.find(a => a.id === formData.adminId);
    onSave({ 
      ...zone, 
      ...formData,
      admin: selectedAdmin ? selectedAdmin.name : 'Unassigned',
      subClusters: formData.subClusters.split(',').map(c => c.trim()).filter(Boolean),
      stores: selectedStores,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Cluster">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-taiba-gray mb-2">Cluster Name</label>
            <input name="name" type="text" className="input-field" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-taiba-gray mb-2">Region</label>
            <input name="region" type="text" className="input-field" value={formData.region} onChange={handleChange} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-taiba-gray mb-2">Assign to Delivery Admin</label>
          <select name="adminId" className="input-field" value={formData.adminId} onChange={handleChange} required>
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
          <textarea name="subClusters" className="input-field" rows="3" value={formData.subClusters} onChange={handleChange}></textarea>
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

export default EditZoneModal;
