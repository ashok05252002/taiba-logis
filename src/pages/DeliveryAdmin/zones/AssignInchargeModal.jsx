import React, { useState, useEffect } from 'react';
import Modal from '../../../components/common/Modal';

function AssignInchargeModal({ isOpen, onClose, zone, incharges, onAssign }) {
    const [selectedIncharge, setSelectedIncharge] = useState('');

    useEffect(() => {
        if (zone) {
            setSelectedIncharge(zone.inchargeId || '');
        }
    }, [zone]);

    if (!zone) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onAssign(zone.id, selectedIncharge);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Assign Incharge for ${zone.name}`}>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Select Zone Incharge</label>
                    <select
                        value={selectedIncharge}
                        onChange={(e) => setSelectedIncharge(e.target.value)}
                        className="input-field"
                        required
                    >
                        <option value="" disabled>Choose an incharge</option>
                        {incharges.map(incharge => (
                            <option key={incharge.id} value={incharge.id}>{incharge.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-taiba-gray font-medium hover:bg-gray-50">
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary px-6 py-2">
                        Save Assignment
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default AssignInchargeModal;
