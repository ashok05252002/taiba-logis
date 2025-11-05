import React, { useState } from 'react';
import ProfileLayout from '../components/ProfileLayout';
import { Home, Briefcase, Plus } from 'lucide-react';
import AddAddressModal from './AddAddressModal';

const addresses = [
    { type: 'Home', address: '123 Al Khuwair St, Muscat, Oman', icon: Home },
    { type: 'Work', address: '456 Knowledge Oasis, Muscat, Oman', icon: Briefcase },
];

function AddressesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ProfileLayout title="Saved Addresses">
      <div className="space-y-4">
        {addresses.map(addr => (
          <div key={addr.type} className="p-4 border rounded-lg flex items-start space-x-4">
            <addr.icon className="w-6 h-6 text-taiba-purple mt-1" />
            <div>
              <p className="font-semibold text-taiba-gray">{addr.type}</p>
              <p className="text-sm text-taiba-gray">{addr.address}</p>
            </div>
          </div>
        ))}
        <button onClick={() => setIsModalOpen(true)} className="w-full flex items-center justify-center space-x-2 btn-secondary py-3 mt-4">
            <Plus className="w-5 h-5" />
            <span>Add New Address</span>
        </button>
      </div>
      <AddAddressModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </ProfileLayout>
  );
}

export default AddressesPage;
