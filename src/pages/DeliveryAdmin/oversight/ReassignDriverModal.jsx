import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Modal';

function ReassignDriverModal({ isOpen, onClose, delivery, drivers, onConfirm }) {
  const [newDriverId, setNewDriverId] = useState('');
  const [availableDrivers, setAvailableDrivers] = useState([]);

  useEffect(() => {
    if (delivery && drivers) {
      const filtered = drivers.filter(d => d.cluster === delivery.cluster);
      setAvailableDrivers(filtered);
      setNewDriverId(drivers.find(d => d.name === delivery.driver)?.id || '');
    }
  }, [delivery, drivers]);
  
  if (!delivery) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const driverName = drivers.find(d => d.id === newDriverId)?.name || 'Unassigned';
    onConfirm(delivery.id, driverName);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Assign/Reassign Driver for ${delivery.id}`}>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <h4 className="font-semibold text-taiba-gray">Current Driver</h4>
          <p className="text-sm text-taiba-gray">{delivery.driver}</p>
        </div>
        <div>
            <label className="block text-sm font-medium text-taiba-gray mb-2">Select Available Driver from {delivery.cluster}</label>
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
              )) : <p className="text-sm text-center text-gray-500 p-4">No drivers found for this cluster.</p>}
            </div>
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-taiba-gray font-medium hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" className="btn-primary px-6 py-2">
            Confirm Assignment
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ReassignDriverModal;
