import React, { useState } from 'react';
import { User, Smartphone, Mail, Car, Settings, Bell, Languages, Phone, MessageSquare, LifeBuoy } from 'lucide-react';
import ToggleSwitch from '../../components/common/ToggleSwitch';
import EditProfileModal from './components/EditProfileModal';

function ProfilePage({ profile, onUpdateProfile }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [settings, setSettings] = useState({ notifications: true, language: 'English' });

    const handleSaveProfile = (updatedData) => {
        onUpdateProfile(updatedData);
        setIsEditModalOpen(false);
    };

    return (
        <>
            <div className="space-y-6">
                {/* Profile Header */}
                <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-taiba-gray" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-taiba-gray">{profile.name}</h2>
                        <p className="text-sm text-taiba-gray">{profile.email}</p>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-taiba-gray">Personal & Vehicle Info</h3>
                        <button onClick={() => setIsEditModalOpen(true)} className="text-sm font-medium text-taiba-blue hover:underline">Edit</button>
                    </div>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center space-x-3"><Smartphone className="w-4 h-4 text-taiba-purple" /><span>{profile.mobile}</span></div>
                        <div className="flex items-center space-x-3"><Car className="w-4 h-4 text-taiba-purple" /><span>{profile.vehicleType} - {profile.vehicleNumber}</span></div>
                    </div>
                </div>

                {/* App Settings */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="font-bold text-taiba-gray mb-4">App Settings</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="flex items-center space-x-3 text-sm font-medium text-taiba-gray"><Bell className="w-4 h-4" /><span>Push Notifications</span></span>
                            <ToggleSwitch enabled={settings.notifications} setEnabled={(val) => setSettings(p => ({ ...p, notifications: val }))} />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center space-x-3 text-sm font-medium text-taiba-gray"><Languages className="w-4 h-4" /><span>Language</span></span>
                            <select value={settings.language} onChange={(e) => setSettings(p => ({ ...p, language: e.target.value }))} className="text-sm border-gray-300 rounded-lg focus:ring-taiba-blue focus:border-taiba-blue">
                                <option>English</option>
                                <option>العربية</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Support */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="font-bold text-taiba-gray mb-4">Support / Help</h3>
                    <div className="space-y-3">
                        <button className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <Phone className="w-5 h-5 text-taiba-blue" />
                            <span className="text-sm font-medium text-taiba-gray">Call Zone Incharge</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <MessageSquare className="w-5 h-5 text-taiba-blue" />
                            <span className="text-sm font-medium text-taiba-gray">Chat with Support</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <LifeBuoy className="w-5 h-5 text-taiba-blue" />
                            <span className="text-sm font-medium text-taiba-gray">Create Support Ticket</span>
                        </button>
                    </div>
                </div>
            </div>
            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                profile={profile}
                onSave={handleSaveProfile}
            />
        </>
    );
}

export default ProfilePage;
