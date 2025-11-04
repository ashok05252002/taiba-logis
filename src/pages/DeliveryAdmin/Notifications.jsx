import React, { useState } from 'react';
import DataTable from '../../components/Tables/DataTable';
import { Mail, MessageSquare, Bell, Plus } from 'lucide-react';
import CreateNotificationModal from './notifications/CreateNotificationModal';

const initialNotificationsData = [
    {
        id: 'N011',
        timestamp: '2025-08-01 10:00:00',
        trigger: 'Delivery Delay (> SLA)',
        recipient: 'Delivery Admin',
        channel: 'Push / In-App',
        message: '“Order #ORD8876 delayed beyond SLA in North Zone.”',
    },
    {
        id: 'N012',
        timestamp: '2025-08-01 09:45:00',
        trigger: 'Escalation Raised',
        recipient: 'Delivery Admin',
        channel: 'In-App',
        message: '“Driver reported issue on Order #ORD552.”',
    },
    {
        id: 'N013',
        timestamp: '2025-07-31 18:00:00',
        trigger: 'New Zone Incharge Assigned',
        recipient: 'Fatima Hassan',
        channel: 'Email / WhatsApp',
        message: '“You’ve been assigned to manage North Zone.”',
    },
    {
        id: 'N014',
        timestamp: '2025-07-31 16:00:00',
        trigger: 'Zone Incharge Deactivated',
        recipient: 'Super Admin',
        channel: 'Email',
        message: '“Zone Incharge "John Smith" has been deactivated by Delivery Admin.”',
    },
];

const ChannelIcons = ({ channels }) => {
    const channelMap = {
        'Email': <Mail className="w-4 h-4 text-blue-500" title="Email" />,
        'WhatsApp': <MessageSquare className="w-4 h-4 text-green-600" title="WhatsApp" />,
        'In-App': <Bell className="w-4 h-4 text-purple-500" title="In-App" />,
        'Push': <Bell className="w-4 h-4 text-purple-600" title="Push Notification" />,
    };
    return (
        <div className="flex items-center space-x-2">
            {channels.split(' / ').map(channel => <span key={channel}>{channelMap[channel]}</span>)}
        </div>
    );
};

function Notifications() {
  const [notifications, setNotifications] = useState(initialNotificationsData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateNotification = (newNotification) => {
    setNotifications(prev => [newNotification, ...prev]);
    setIsModalOpen(false);
  };

  const columns = [
    { header: 'Timestamp', accessor: 'timestamp' },
    { header: 'Trigger Event', accessor: 'trigger' },
    { header: 'Recipient', accessor: 'recipient' },
    { 
        header: 'Channel(s)', 
        accessor: 'channel', 
        render: (row) => <ChannelIcons channels={row.channel} /> 
    },
    { 
        header: 'Message', 
        accessor: 'message', 
        render: (row) => <p className="max-w-md whitespace-normal">{row.message}</p>
    },
  ];

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h2 className="text-xl font-bold text-taiba-gray mb-1">Notifications</h2>
            <p className="text-sm text-taiba-gray">A log of all notifications relevant to your operations.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 btn-primary px-6 py-2.5"
          >
            <Plus className="w-5 h-5" />
            <span>Create Notification</span>
          </button>
        </div>
        <DataTable columns={columns} data={notifications} />
      </div>
      <CreateNotificationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateNotification}
      />
    </>
  );
}

export default Notifications;
