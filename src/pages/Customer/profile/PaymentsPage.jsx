import React, { useState } from 'react';
import ProfileLayout from '../components/ProfileLayout';
import { CreditCard, Plus } from 'lucide-react';
import AddPaymentModal from './AddPaymentModal';

const paymentMethods = [
    { type: 'Visa', last4: '4242', expiry: '12/26' },
    { type: 'Mastercard', last4: '5555', expiry: '08/25' },
];

function PaymentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <ProfileLayout title="Payment Methods">
      <div className="space-y-4">
        {paymentMethods.map(pm => (
          <div key={pm.last4} className="p-4 border rounded-lg flex items-center space-x-4">
            <CreditCard className="w-8 h-8 text-taiba-blue" />
            <div>
              <p className="font-semibold text-taiba-gray">{pm.type} ending in {pm.last4} </p>
              <p className="text-sm text-taiba-gray">Expires {pm.expiry}</p>
            </div>
          </div>
        ))}
        <button onClick={() => setIsModalOpen(true)} className="w-full flex items-center justify-center space-x-2 btn-secondary py-3 mt-4">
            <Plus className="w-5 h-5" />
            <span>Add New Card</span>
        </button>
      </div>
      <AddPaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </ProfileLayout>
  );
}

export default PaymentsPage;
