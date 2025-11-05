import React from 'react';
import { Link } from 'react-router-dom';
import { User, ChevronRight, Bell, Languages, MapPin, CreditCard, LifeBuoy, FileText, LogOut } from 'lucide-react';

const ProfileMenuItem = ({ icon: Icon, text, hasArrow = true, to }) => (
    <Link to={to} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
        <div className="flex items-center space-x-4">
            <Icon className="w-5 h-5 text-taiba-purple" />
            <span className="font-medium text-taiba-gray">{text}</span>
        </div>
        {hasArrow && <ChevronRight className="w-5 h-5 text-gray-400" />}
    </Link>
);

function ProfilePage({ onLogout }) {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-taiba-gray" />
        </div>
        <div>
            <h2 className="text-2xl font-bold text-taiba-gray">Saud Ahmed</h2>
            <p className="text-sm text-taiba-gray">saud.ahmed@email.com</p>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden divide-y divide-gray-200">
        <h3 className="font-bold text-taiba-gray p-4 text-lg">My Account</h3>
        <ProfileMenuItem icon={User} text="Edit Profile" to="/customer/profile/edit" />
        <ProfileMenuItem icon={MapPin} text="Saved Addresses" to="/customer/profile/addresses" />
        <ProfileMenuItem icon={CreditCard} text="Payment Methods" to="/customer/profile/payments" />
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden divide-y divide-gray-200">
        <h3 className="font-bold text-taiba-gray p-4 text-lg">Settings</h3>
        <ProfileMenuItem icon={Bell} text="Notifications" to="/customer/profile/notifications" />
        <ProfileMenuItem icon={Languages} text="Language" to="/customer/profile/language" />
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden divide-y divide-gray-200">
        <h3 className="font-bold text-taiba-gray p-4 text-lg">Help & Support</h3>
        <ProfileMenuItem icon={LifeBuoy} text="Contact Support" to="/customer/profile/support" />
        <ProfileMenuItem icon={FileText} text="Terms & Conditions" to="/customer/profile/terms" />
      </div>

      {/* Logout Button */}
      <div className="mt-8">
        <button 
            onClick={onLogout} 
            className="w-full flex items-center justify-center space-x-2 py-3 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors"
        >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
