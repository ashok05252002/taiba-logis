import React, { useState } from 'react';
import DataTable from '../../components/Tables/DataTable';
import { Mail, MessageSquare, Bell, Plus } from 'lucide-react';
import CreateNotificationModal from './components/CreateNotificationModal';

const initialNotificationsData = [
    {
        id: 'N021',
        timestamp: '2025-08-02 11:30:00',
        trigger: 'Driver Arrived',
        recipient: 'Store Incharge',
        channel: 'In-App',
        message: '“Driver Aisha Al-Ghamdi has arrived for Order #ORD103.”',
    },
    {
        id: 'N022',
        timestamp: '2025-08-02 11:25:00',
        trigger: 'Order Ready for Pickup',
        recipient: 'Zone Incharge & Driver',
        channel: 'WhatsApp / Push',
        message: '“Order #ORD103 is ready for pickup from Main Store.”',
    },
    {
        id: 'N023',
        timestamp: '2025-08-02 10:45:00',
        trigger: 'Handover Confirmed',
        recipient: 'Customer',
        channel: 'WhatsApp / SMS',
        message: '“Your order #ORD107 is now out for delivery.”',
    },
    {
        id: 'N024',
        timestamp: '2025-08-02 09:50:00',
        trigger: 'Delivery Completed',
        recipient: 'Store Incharge',
        channel: 'In-App',
        message: '“Order #ORD109 successfully delivered.”',
    },
];

const ChannelIcons = ({ channels }) => {
    const channelMap = {
        'Email': <Mail className="w-4 h-4 text-blue-500" title="Email" />,
        'SMS': <MessageSquare className="w-4 h-4 text-green-500" title="SMS" />,
        'WhatsApp': <MessageSquare className="w-4 h-4 text-green-600" title="WhatsApp" />,
        'In-App': <Bell className="w-4 h-4 text-purple-500" title="In-App" />,
        'Push': <Bell className="w-4 h-4 text-purple-600" title="Push Notification" />,
    };

    const channelList = channels.split(' / ');

    return (
        <div className="flex items-center space-x-2">
            {channelList.map(channel => (
                <span key={channel}>{channelMap[channel]}</span>
            ))}
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
    { header: 'Timestamp', accessor: 'timestamp', },
    { header: 'Trigger Event', accessor: 'trigger', },
    { header: 'Recipient', accessor: 'recipient', },
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
            <h2 className="text-xl font-bold text-taiba-gray mb-1">Communication & Notifications</h2>
            <p className="text-sm text-taiba-gray">A log of all notifications related to your store's orders.</p>
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
