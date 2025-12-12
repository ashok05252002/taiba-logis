import React from 'react';
import Modal from '../../../components/common/Modal';
import { User, Mail, Phone, Briefcase, MapPin, CheckCircle, XCircle } from 'lucide-react';

function ViewUserDetailsModal({ isOpen, onClose, user }) {
  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="User Details">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-taiba-gray" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-taiba-gray">{user.name}</h3>
            <p className="text-taiba-gray">{user.role}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-taiba-purple" />
            <span className="text-taiba-gray">{user.email}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-taiba-purple" />
            <span className="text-taiba-gray">{user.phone}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Briefcase className="w-5 h-5 text-taiba-purple" />
            <span className="text-taiba-gray">{user.role}</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-taiba-purple" />
            <span className="text-taiba-gray">{user.cluster}</span>
          </div>
          <div className="flex items-center space-x-3">
            {user.status === 'Active' ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <span className={`font-medium ${user.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
              {user.status}
            </span>
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

export default ViewUserDetailsModal;
