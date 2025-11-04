import React, { useState } from 'react';
import ToggleSwitch from '../../components/common/ToggleSwitch';
import { Zap, Gavel, MessageSquare, Smartphone, Globe, Save, CheckCircle } from 'lucide-react';

const initialSettings = {
  integrations: {
    googleMapsKey: 'gm-xxxxxxxxxxxx-xxxx',
    whatsAppToken: 'wa-xxxxxxxxxxxx-xxxx',
    pushServiceKey: 'pn-xxxxxxxxxxxx-xxxx',
  },
  rules: {
    deliverySla: 60,
    rejectionTime: 5,
    driverResponseTimeout: 60,
  },
  templates: {
    newOrderSms: 'Your Taiba Pharmacy order #{orderId} is on its way!',
    welcomeEmail: 'Welcome, {adminName}! Your account is ready. Login at {loginUrl}.',
    deliveryComplete: 'Your order #{orderId} has been delivered. Thank you!',
  },
  appVersion: {
    latestVersion: '1.0.0',
    forceUpdate: false,
    releaseNotes: 'Initial release of the driver application.',
  },
  global: {
    twoFactorAuth: true,
    maintenanceMode: false,
  },
};

const tabs = [
  { id: 'integrations', label: 'API Integrations', icon: Zap },
  { id: 'rules', label: 'Business Rules', icon: Gavel },
  { id: 'templates', label: 'Notifications', icon: MessageSquare },
  { id: 'appVersion', label: 'App Version', icon: Smartphone },
  { id: 'global', label: 'Global Settings', icon: Globe },
];

function SystemSettings() {
  const [activeTab, setActiveTab] = useState('integrations');
  const [settings, setSettings] = useState(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleInputChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };
  
  const handleSave = () => {
    setIsSaving(true);
    setSaveSuccess(false);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000); // Hide success message after 3s
    }, 1500);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'integrations':
        return (
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-taiba-gray">API Integrations</h4>
            <div>
              <label className="block text-sm font-medium text-taiba-gray mb-2">Google Maps API Key</label>
              <input type="password" value={settings.integrations.googleMapsKey} onChange={(e) => handleInputChange('integrations', 'googleMapsKey', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-taiba-gray mb-2">WhatsApp API Token</label>
              <input type="password" value={settings.integrations.whatsAppToken} onChange={(e) => handleInputChange('integrations', 'whatsAppToken', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-taiba-gray mb-2">Push Notification Service Key</label>
              <input type="password" value={settings.integrations.pushServiceKey} onChange={(e) => handleInputChange('integrations', 'pushServiceKey', e.target.value)} className="input-field" />
            </div>
          </div>
        );
      case 'rules':
        return (
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-taiba-gray">Business Rules Setup</h4>
            <div>
              <label className="block text-sm font-medium text-taiba-gray mb-2">Delivery SLA (minutes)</label>
              <input type="number" value={settings.rules.deliverySla} onChange={(e) => handleInputChange('rules', 'deliverySla', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-taiba-gray mb-2">Order Auto-Rejection Time (minutes)</label>
              <input type="number" value={settings.rules.rejectionTime} onChange={(e) => handleInputChange('rules', 'rejectionTime', e.target.value)} className="input-field" />
            </div>
             <div>
              <label className="block text-sm font-medium text-taiba-gray mb-2">Driver Response Timeout (seconds)</label>
              <input type="number" value={settings.rules.driverResponseTimeout} onChange={(e) => handleInputChange('rules', 'driverResponseTimeout', e.target.value)} className="input-field" />
            </div>
          </div>
        );
      case 'templates':
        return (
            <div className="space-y-6">
                <h4 className="text-lg font-bold text-taiba-gray">Notification Templates</h4>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">New Order SMS Template</label>
                    <textarea className="input-field" rows="3" value={settings.templates.newOrderSms} onChange={(e) => handleInputChange('templates', 'newOrderSms', e.target.value)}></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Delivery Admin Welcome Email</label>
                    <textarea className="input-field" rows="3" value={settings.templates.welcomeEmail} onChange={(e) => handleInputChange('templates', 'welcomeEmail', e.target.value)}></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Delivery Complete SMS</label>
                    <textarea className="input-field" rows="3" value={settings.templates.deliveryComplete} onChange={(e) => handleInputChange('templates', 'deliveryComplete', e.target.value)}></textarea>
                </div>
                <div className="text-xs text-gray-500">Available placeholders: {'{orderId}'}, {'{customerName}'}, {'{adminName}'}, {'{loginUrl}'}</div>
            </div>
        );
      case 'appVersion':
        return (
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-taiba-gray">App Version Control</h4>
            <div>
              <label className="block text-sm font-medium text-taiba-gray mb-2">Latest Driver App Version</label>
              <input type="text" placeholder="e.g., 1.2.3" value={settings.appVersion.latestVersion} onChange={(e) => handleInputChange('appVersion', 'latestVersion', e.target.value)} className="input-field" />
            </div>
            <ToggleSwitch enabled={settings.appVersion.forceUpdate} setEnabled={(val) => handleInputChange('appVersion', 'forceUpdate', val)} label="Force drivers to update" />
            <div>
              <label className="block text-sm font-medium text-taiba-gray mb-2">Release Notes</label>
              <textarea className="input-field" rows="4" placeholder="What's new in this version?" value={settings.appVersion.releaseNotes} onChange={(e) => handleInputChange('appVersion', 'releaseNotes', e.target.value)}></textarea>
            </div>
          </div>
        );
      case 'global':
        return (
            <div className="space-y-6">
                <h4 className="text-lg font-bold text-taiba-gray">Global Settings</h4>
                <ToggleSwitch enabled={settings.global.twoFactorAuth} setEnabled={(val) => handleInputChange('global', 'twoFactorAuth', val)} label="Enable 2-Factor Authentication for Admins" />
                <ToggleSwitch enabled={settings.global.maintenanceMode} setEnabled={(val) => handleInputChange('global', 'maintenanceMode', val)} label="Enable System-wide Maintenance Mode" />
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-taiba-gray mb-1">System Configuration</h2>
        <p className="text-sm text-taiba-gray">Manage integrations, business rules, and global settings.</p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex space-x-1 md:space-x-4 px-2 md:px-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-3 text-sm md:text-base font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-taiba-blue text-taiba-blue'
                    : 'border-transparent text-taiba-gray hover:text-taiba-blue'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {renderContent()}
        </div>
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex items-center justify-end space-x-4">
            {saveSuccess && (
                <div className="flex items-center space-x-2 text-green-600 transition-opacity duration-300">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Settings saved successfully!</span>
                </div>
            )}
            <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center justify-center space-x-2 btn-primary px-8 py-2 w-40 disabled:opacity-75 disabled:cursor-wait"
            >
                {isSaving ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    <>
                        <Save className="w-5 h-5" />
                        <span>Save Changes</span>
                    </>
                )}
            </button>
        </div>
      </div>
    </div>
  );
}

export default SystemSettings;
