import React from 'react';
import ProfileLayout from '../components/ProfileLayout';
import { Phone, Mail, MessageSquare } from 'lucide-react';

function SupportPage() {
  return (
    <ProfileLayout title="Contact Support">
        <div className="space-y-4">
            <p className="text-taiba-gray mb-4">If you need help, you can reach us through the following channels:</p>
            <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <Phone className="w-6 h-6 text-taiba-blue" />
                <div>
                    <p className="font-semibold text-taiba-gray">Call Us</p>
                    <a href="tel:+96880070000" className="text-sm text-taiba-blue hover:underline">+968 800 70000</a>
                </div>
            </div>
            <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <Mail className="w-6 h-6 text-taiba-blue" />
                <div>
                    <p className="font-semibold text-taiba-gray">Email Us</p>
                    <a href="mailto:support@taiba.om" className="text-sm text-taiba-blue hover:underline">support@taiba.om</a>
                </div>
            </div>
             <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <MessageSquare className="w-6 h-6 text-taiba-blue" />
                <div>
                    <p className="font-semibold text-taiba-gray">Live Chat</p>
                    <p className="text-sm text-taiba-gray">Available 9 AM - 9 PM</p>
                </div>
            </div>
        </div>
    </ProfileLayout>
  );
}

export default SupportPage;
