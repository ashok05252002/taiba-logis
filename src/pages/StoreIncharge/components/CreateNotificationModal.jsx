import React, { useState } from 'react';
import Modal from '../../../components/common/Modal';

const recipients = ['Zone Incharge - North', 'Driver - Khalid Ibrahim', 'Customer Support'];
const channelOptions = ['Email', 'WhatsApp', 'In-App', 'Push'];

function CreateNotificationModal({ isOpen, onClose, onCreate }) {
    const [selectedChannels, setSelectedChannels] = useState([]);

    const handleChannelToggle = (channel) => {
        setSelectedChannels(prev => 
            prev.includes(channel) 
                ? prev.filter(c => c !== channel) 
                : [...prev, channel]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newNotification = {
            id: `N${Math.floor(Math.random() * 900) + 100}`,
            timestamp: new Date().toLocaleString('en-CA').replace(',', ''),
            trigger: 'Manual Notification',
            recipient: formData.get('recipient'),
            channel: selectedChannels.join(' / '),
            message: `“${formData.get('message')}”`,
        };
        onCreate(newNotification);
        setSelectedChannels([]);
        e.target.reset();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Notification">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Recipient</label>
                    <select name="recipient" className="input-field" required>
                        <option value="">Select a recipient</option>
                        {recipients.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Channels</label>
                    <div className="flex flex-wrap gap-4">
                        {channelOptions.map(channel => (
                            <label key={channel} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 text-taiba-blue rounded border-gray-300 focus:ring-taiba-blue"
                                    checked={selectedChannels.includes(channel)}
                                    onChange={() => handleChannelToggle(channel)}
                                />
                                <span className="text-sm text-taiba-gray">{channel}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-taiba-gray mb-2">Message</label>
                    <textarea
                        name="message"
                        className="input-field"
                        rows="4"
                        placeholder="Type your notification message here..."
                        required
                    ></textarea>
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-taiba-gray font-medium hover:bg-gray-50">
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary px-6 py-2">
                        Send Notification
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default CreateNotificationModal;
