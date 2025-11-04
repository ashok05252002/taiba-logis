import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Modal';

function OverrideAssignmentModal({ isOpen, onClose, delivery, zones, drivers, onConfirm }) {
  const [newZone, setNewZone] = useState('');
  const [newDriver, setNewDriver] = useState('');

  useEffect(() => {
    if (delivery) {
      setNewZone(delivery.zone);
      setNewDriver(delivery.driver === 'Unassigned' ? '' : delivery.driver);
    }
  }, [delivery]);
  
  if (!delivery) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(delivery.id, newZone, newDriver);
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
            <label className="block text-sm font-medium text-taiba-gray mb-2">New Driver</label>
            <select value={newDriver} onChange={(e) => setNewDriver(e.target.value)} className="input-field" required>
              <option value="">Select a driver</option>
              {drivers.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
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
