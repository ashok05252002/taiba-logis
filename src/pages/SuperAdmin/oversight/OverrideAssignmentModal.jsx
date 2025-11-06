import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Modal';

function OverrideAssignmentModal({ isOpen, onClose, delivery, zones, drivers, onConfirm }) {
  const [newZone, setNewZone] = useState('');
  const [newDriverId, setNewDriverId] = useState('');
  const [availableDrivers, setAvailableDrivers] = useState([]);

  useEffect(() => {
    if (delivery) {
      setNewZone(delivery.zone);
      setNewDriverId(drivers.find(d => d.name === delivery.driver)?.id || '');
    }
  }, [delivery, drivers]);

  useEffect(() => {
    if (newZone && drivers) {
      const filtered = drivers.filter(d => d.zone === newZone);
      setAvailableDrivers(filtered);
      if (!filtered.some(d => d.id === newDriverId)) {
        setNewDriverId('');
      }
    }
  }, [newZone, drivers, newDriverId]);
  
  if (!delivery) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const driverName = drivers.find(d => d.id === newDriverId)?.name || 'Unassigned';
    onConfirm(delivery.id, newZone, driverName);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Override Assignment for ${delivery.id}`}>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <h4 className="font-semibold text-taiba-gray">Current Assignment</h4>
          <p className="text-sm text-taiba-gray">Zone: {delivery.zone} | Driver: {delivery.driver}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-taiba-gray mb-2">New Zone</label>
            <select value={newZone} onChange={(e) => setNewZone(e.target.value)} className="input-field" required>
              {zones.map(z => <option key={z} value={z}>{z}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-taiba-gray mb-2">Select Driver from {newZone}</label>
            <div className="space-y-2 border rounded-lg p-2 max-h-48 overflow-y-auto">
              {availableDrivers.length > 0 ? availableDrivers.map(driver => (
                <label key={driver.id} className={`flex items-center justify-between p-3 rounded-md transition-colors ${driver.status !== 'Available' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'cursor-pointer hover:bg-blue-50'}`}>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            name="driver"
                            value={driver.id}
                            checked={newDriverId === driver.id}
                            onChange={(e) => setNewDriverId(e.target.value)}
                            disabled={driver.status !== 'Available'}
                            className="h-4 w-4 text-taiba-blue focus:ring-taiba-blue"
                        />
                        <span className="ml-3 font-medium">{driver.name}</span>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        driver.status === 'Available' ? 'bg-green-100 text-green-800' :
                        driver.status === 'On Delivery' ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                    }`}>
                        {driver.status}
                    </span>
                </label>
              )) : <p className="text-sm text-center text-gray-500 p-4">No available drivers in this zone.</p>}
            </div>
          </div>
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

export default OverrideAssignmentModal;
