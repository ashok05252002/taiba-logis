import React, { useState } from 'react';
import ProfileLayout from '../components/ProfileLayout';
import ToggleSwitch from '../../../components/common/ToggleSwitch';

function NotificationSettingsPage() {
    const [settings, setSettings] = useState({
        promotions: true,
        orderUpdates: true,
        reminders: false,
    });

    const handleToggle = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <ProfileLayout title="Notification Settings">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <span className="font-medium text-taiba-gray">Promotions & Offers</span>
                    <ToggleSwitch enabled={settings.promotions} setEnabled={() => handleToggle('promotions')} />
                </div>
                <div className="flex items-center justify-between">
                    <span className="font-medium text-taiba-gray">Order Updates</span>
                    <ToggleSwitch enabled={settings.orderUpdates} setEnabled={() => handleToggle('orderUpdates')} />
                </div>
                <div className="flex items-center justify-between">
                    <span className="font-medium text-taiba-gray">Refill Reminders</span>
                    <ToggleSwitch enabled={settings.reminders} setEnabled={() => handleToggle('reminders')} />
                </div>
            </div>
        </ProfileLayout>
    );
}

export default NotificationSettingsPage;
