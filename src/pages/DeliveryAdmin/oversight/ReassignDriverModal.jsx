import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Modal';

function ReassignDriverModal({ isOpen, onClose, delivery, drivers, onConfirm }) {
  const [newDriver, setNewDriver] = useState('');

  useEffect(() => {
    if (delivery) {
      setNewDriver(delivery.driver === 'Unassigned' ? '' : delivery.driver);
    }
  }, [delivery]);
  
  if (!delivery) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(delivery.id, newDriver);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Reassign Driver for ${delivery.id}`}>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <h4 className="font-semibold text-taiba-gray">Current Driver</h4>
          <p className="text-sm text-taiba-gray">{delivery.driver}</p>
        </div>
        <div>
            <label className="block text-sm font-medium text-taiba-gray mb-2">New Driver</label>
            <select value={newDriver} onChange={(e) => setNewDriver(e.target.value)} className="input-field" required>
              <option value="">Select a driver</option>
              {drivers.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
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

export default ReassignDriverModal;
