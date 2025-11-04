import React from 'react';
import Modal from '../../../components/common/Modal';
import { MapPin, User, Users, Puzzle, CheckCircle, XCircle, Calendar } from 'lucide-react';

function ViewZoneDetailsModal({ isOpen, onClose, zone }) {
  if (!zone) return null;

  const formattedDate = zone.createdAt 
    ? new Date(zone.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'N/A';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Zone Details">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
            <MapPin className="w-10 h-10 text-taiba-gray" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-taiba-gray">{zone.name}</h3>
            <p className="text-taiba-gray">{zone.region}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-taiba-purple" />
            <span className="text-taiba-gray">Admin: {zone.admin}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-taiba-purple" />
            <span className="text-taiba-gray">{zone.drivers} Active Drivers</span>
          </div>
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-taiba-purple" />
            <span className="text-taiba-gray">{zone.incharges} Active Incharges</span>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-taiba-purple" />
            <span className="text-taiba-gray">Created: {formattedDate}</span>
          </div>
          <div className="flex items-center space-x-3 md:col-span-2">
            {zone.status === 'Active' ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <span className={`font-medium ${zone.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
              {zone.status}
            </span>
          </div>
        </div>
        <div>
            <h4 className="font-semibold text-taiba-gray mb-2 flex items-center space-x-2">
                <Puzzle className="w-5 h-5 text-taiba-purple" />
                <span>Clusters ({zone.clusters.length})</span>
            </h4>
            <div className="flex flex-wrap gap-2">
                {zone.clusters.length > 0 ? zone.clusters.map(c => (
                    <span key={c} className="px-3 py-1 bg-gray-100 text-taiba-gray rounded-full text-sm font-medium">{c}</span>
                )) : <p className="text-sm text-gray-500">No clusters defined for this zone.</p>}
            </div>
        </div>
        <div className="flex justify-end pt-4">
          <button onClick={onClose} className="btn-primary px-8 py-2">
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ViewZoneDetailsModal;
