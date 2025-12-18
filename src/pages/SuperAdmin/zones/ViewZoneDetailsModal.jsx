import React, { useState } from 'react';
import Modal from '../../../components/common/Modal';
import { MapPin, User, Users, Puzzle, CheckCircle, XCircle, Calendar, UserCog, Truck, Phone, Mail, Store } from 'lucide-react';
import { allUsers, allDrivers } from '../../../data/mockData';

function ViewZoneDetailsModal({ isOpen, onClose, zone }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!zone) return null;

  const formattedDate = zone.createdAt 
    ? new Date(zone.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'N/A';

  // Filter data for this cluster
  const clusterIncharges = allUsers.filter(u => u.role === 'Cluster Incharge' && u.cluster === zone.name);
  const clusterDrivers = allDrivers.filter(d => d.cluster === zone.name);

  const renderOverview = () => (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-taiba-purple" />
            <span className="text-taiba-gray">Admin: {zone.admin}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-taiba-purple" />
            <span className="text-taiba-gray">{clusterDrivers.length} Active Drivers</span>
          </div>
          <div className="flex items-center space-x-3">
            <UserCog className="w-5 h-5 text-taiba-purple" />
            <span className="text-taiba-gray">{clusterIncharges.length} Active Incharges</span>
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
                <Store className="w-5 h-5 text-taiba-purple" />
                <span>Assigned Stores ({zone.stores ? zone.stores.length : 0})</span>
            </h4>
            <div className="flex flex-wrap gap-2">
                {zone.stores && zone.stores.length > 0 ? zone.stores.map(s => (
                    <span key={s} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">{s}</span>
                )) : <p className="text-sm text-gray-500">No stores assigned to this cluster.</p>}
            </div>
        </div>
        <div>
            <h4 className="font-semibold text-taiba-gray mb-2 flex items-center space-x-2">
                <Puzzle className="w-5 h-5 text-taiba-purple" />
                <span>Areas/Sub-clusters ({zone.subClusters ? zone.subClusters.length : 0})</span>
            </h4>
            <div className="flex flex-wrap gap-2">
                {zone.subClusters && zone.subClusters.length > 0 ? zone.subClusters.map(c => (
                    <span key={c} className="px-3 py-1 bg-gray-100 text-taiba-gray rounded-full text-sm font-medium">{c}</span>
                )) : <p className="text-sm text-gray-500">No areas defined for this cluster.</p>}
            </div>
        </div>
    </div>
  );

  const renderIncharges = () => (
      <div className="space-y-4">
          <h4 className="font-semibold text-taiba-gray mb-2">Assigned Incharges ({clusterIncharges.length})</h4>
          {clusterIncharges.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                  {clusterIncharges.map(incharge => (
                      <div key={incharge.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                          <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                                  {incharge.name.charAt(0)}
                              </div>
                              <div>
                                  <p className="font-medium text-taiba-gray">{incharge.name}</p>
                                  <p className="text-xs text-gray-500">{incharge.id}</p>
                              </div>
                          </div>
                          <div className="text-right text-sm text-gray-600">
                              <div className="flex items-center justify-end space-x-1 mb-1">
                                  <Phone className="w-3 h-3" />
                                  <span>{incharge.phone}</span>
                              </div>
                              <div className="flex items-center justify-end space-x-1">
                                  <Mail className="w-3 h-3" />
                                  <span>{incharge.email}</span>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          ) : (
              <p className="text-sm text-gray-500 text-center py-4">No incharges assigned to this cluster.</p>
          )}
      </div>
  );

  const renderDrivers = () => (
      <div className="space-y-4">
          <h4 className="font-semibold text-taiba-gray mb-2">Delivery Persons ({clusterDrivers.length})</h4>
          {clusterDrivers.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto pr-2">
                  {clusterDrivers.map(driver => (
                      <div key={driver.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                          <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                  <Truck className="w-5 h-5" />
                              </div>
                              <div>
                                  <p className="font-medium text-taiba-gray">{driver.name}</p>
                                  <p className="text-xs text-gray-500">{driver.vehicle} • {driver.id}</p>
                              </div>
                          </div>
                          <div className="text-right">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                  driver.status === 'Available' ? 'bg-green-100 text-green-800' :
                                  driver.status === 'On Delivery' ? 'bg-blue-100 text-blue-800' :
                                  'bg-gray-100 text-gray-800'
                              }`}>
                                  {driver.status}
                              </span>
                              <div className="flex items-center justify-end space-x-1 mt-1 text-xs text-gray-500">
                                  <Phone className="w-3 h-3" />
                                  <span>{driver.phone}</span>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          ) : (
              <p className="text-sm text-gray-500 text-center py-4">No drivers assigned to this cluster.</p>
          )}
      </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cluster Details">
      <div className="space-y-6">
        <div className="flex items-center space-x-4 border-b pb-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <MapPin className="w-8 h-8 text-taiba-gray" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-taiba-gray">{zone.name}</h3>
            <p className="text-taiba-gray text-sm">{zone.region}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {['overview', 'incharges', 'drivers'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all capitalize ${
                        activeTab === tab 
                        ? 'bg-white text-taiba-blue shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>

        {/* Content */}
        <div className="min-h-[250px]">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'incharges' && renderIncharges()}
            {activeTab === 'drivers' && renderDrivers()}
        </div>

        <div className="flex justify-end pt-4 border-t">
          <button onClick={onClose} className="btn-primary px-8 py-2">
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ViewZoneDetailsModal;
