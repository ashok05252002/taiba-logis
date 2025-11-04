import React from 'react';
import DataTable from '../../components/Tables/DataTable';
import { Mail, MessageSquare, Bell } from 'lucide-react';

const notificationsData = [
    {
        id: 'N001',
        timestamp: '2025-07-30 14:20:00',
        trigger: 'New Admin Created',
        recipient: 'Delivery Admin',
        channel: 'Email / WhatsApp',
        message: '“Your Delivery Admin account for "Ali Hassan" has been created.”',
    },
    {
        id: 'N002',
        timestamp: '2025-07-30 14:15:00',
        trigger: 'Delay Escalation',
        recipient: 'Super Admin',
        channel: 'In-App / Push',
        message: '“Zone A exceeded SLA threshold (15%).”',
    },
    {
        id: 'N003',
        timestamp: '2025-07-30 13:50:00',
        trigger: 'Zone Assignment',
        recipient: 'Delivery Admin',
        channel: 'Email',
        message: '“You’ve been assigned Zone North & East.”',
    },
    {
        id: 'N004',
        timestamp: '2025-07-30 12:00:00',
        trigger: 'API Failure',
        recipient: 'Super Admin',
        channel: 'Email / SMS',
        message: '“Google Maps API connection failed.”',
    },
    {
        id: 'N005',
        timestamp: '2025-07-29 18:00:00',
        trigger: 'Low Driver Availability',
        recipient: 'Zone Incharge',
        channel: 'In-App',
        message: '“Driver availability in Central Zone is low (3 active).”',
    },
    {
        id: 'N006',
        timestamp: '2025-07-29 16:30:00',
        trigger: 'System Update',
        recipient: 'All Admins',
        channel: 'Email',
        message: '“A system update is scheduled for 2 AM tonight.”',
    },
    {
        id: 'N007',
        timestamp: '2025-07-29 15:00:00',
        trigger: 'Password Reset',
        recipient: 'Sara Abdullah',
        channel: 'Email',
        message: '“Password for user Sara Abdullah was reset by Super Admin.”',
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
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-taiba-gray mb-1">Notifications & Alerts</h2>
        <p className="text-sm text-taiba-gray">A log of all system-generated notifications and alerts.</p>
      </div>
      <DataTable columns={columns} data={notificationsData} />
    </div>
  );
}

export default Notifications;
