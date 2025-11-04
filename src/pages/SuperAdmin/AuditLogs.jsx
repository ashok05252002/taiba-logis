import React, { useState } from 'react';
import DataTable from '../../components/Tables/DataTable';
import { UserPlus, MapPin, Zap, Shield } from 'lucide-react';

const auditLogData = [
  {
    id: 'L001',
    timestamp: '2025-08-01 10:30:15',
    eventType: 'USER_CREATION',
    performedBy: 'Super Admin',
    ipAddress: '192.168.1.1',
    details: {
      userId: 'U007',
      userName: 'Layla Faisal',
      role: 'Delivery Admin'
    }
  },
  {
    id: 'L002',
    timestamp: '2025-08-01 09:45:00',
    eventType: 'ZONE_UPDATE',
    performedBy: 'Super Admin',
    ipAddress: '192.168.1.1',
    details: {
      zoneId: 'Z001',
      zoneName: 'North Zone',
      field: 'admin',
      oldValue: 'Ahmed Ali',
      newValue: 'Yusuf Ahmed'
    }
  },
  {
    id: 'L003',
    timestamp: '2025-07-31 15:20:10',
    eventType: 'API_INTEGRATION_CHANGE',
    performedBy: 'Super Admin',
    ipAddress: '192.168.1.1',
    details: {
      integrationName: 'WhatsApp API Token',
      change: 'updated'
    }
  },
  {
    id: 'L004',
    timestamp: '2025-07-31 11:00:00',
    eventType: 'ROLE_PERMISSION_CHANGE',
    performedBy: 'Super Admin',
    ipAddress: '192.168.1.1',
    details: {
      roleName: 'Zone Incharge',
      changes: 'Added "Handle Escalations" permission'
    }
  },
  {
    id: 'L005',
    timestamp: '2025-07-30 18:05:30',
    eventType: 'USER_MODIFICATION',
    performedBy: 'Super Admin',
    ipAddress: '192.168.1.1',
    details: {
      userId: 'U004',
      userName: 'Sara Abdullah',
      change: 'Status changed from Inactive to Active'
    }
  },
  {
    id: 'L006',
    timestamp: '2025-07-30 14:00:00',
    eventType: 'LOGIN_SUCCESS',
    performedBy: 'Ahmed Ali',
    ipAddress: '10.0.0.5',
    details: {
      message: 'User logged in successfully.'
    }
  }
];

const eventTypes = [...new Set(auditLogData.map(log => log.eventType))];
const users = [...new Set(auditLogData.map(log => log.performedBy))];

const EventTypeBadge = ({ eventType }) => {
  const config = {
    USER_CREATION: { icon: UserPlus, color: 'blue' },
    USER_MODIFICATION: { icon: UserPlus, color: 'blue' },
    ZONE_UPDATE: { icon: MapPin, color: 'purple' },
    API_INTEGRATION_CHANGE: { icon: Zap, color: 'orange' },
    ROLE_PERMISSION_CHANGE: { icon: Shield, color: 'green' },
    default: { icon: null, color: 'gray' }
  };

  const { icon: Icon, color } = config[eventType] || config.default;
  const colors = {
    blue: 'bg-blue-100 text-blue-800',
    purple: 'bg-purple-100 text-purple-800',
    orange: 'bg-orange-100 text-orange-800',
    green: 'bg-green-100 text-green-800',
    gray: 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${colors[color]}`}>
      {Icon && <Icon className="w-3 h-3" />}
      <span>{eventType.replace(/_/g, ' ')}</span>
    </span>
  );
};

const DetailsRenderer = ({ row }) => {
  const { eventType, details } = row;
  switch (eventType) {
    case 'USER_CREATION':
      return `User "${details.userName}" (ID: ${details.userId}) was created with role "${details.role}".`;
    case 'USER_MODIFICATION':
      return `User "${details.userName}" (ID: ${details.userId}): ${details.change}.`;
    case 'ZONE_UPDATE':
      return (
        <p className="max-w-md whitespace-normal">
          Zone "{details.zoneName}" (ID: {details.zoneId}): field <span className="font-semibold">"{details.field}"</span> changed from <span className="text-red-600">"{details.oldValue}"</span> to <span className="text-green-600">"{details.newValue}"</span>.
        </p>
      );
    case 'API_INTEGRATION_CHANGE':
      return `Integration "${details.integrationName}" was ${details.change}.`;
    case 'ROLE_PERMISSION_CHANGE':
      return `Role "${details.roleName}": ${details.changes}.`;
    default:
      return details.message || 'No specific details.';
  }
};

function AuditLogs() {
  const [eventTypeFilter, setEventTypeFilter] = useState('');
  const [userFilter, setUserFilter] = useState('');

  const columns = [
    { header: 'Timestamp', accessor: 'timestamp' },
    {
      header: 'Event Type',
      accessor: 'eventType',
      render: (row) => <EventTypeBadge eventType={row.eventType} />
    },
    { header: 'Performed By', accessor: 'performedBy' },
    {
      header: 'Details',
      accessor: 'details',
      render: (row) => <DetailsRenderer row={row} />
    },
    { header: 'IP Address', accessor: 'ipAddress' },
  ];

  const filteredData = auditLogData.filter(log => {
    const eventTypeMatch = eventTypeFilter ? log.eventType === eventTypeFilter : true;
    const userMatch = userFilter ? log.performedBy === userFilter : true;
    return eventTypeMatch && userMatch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-taiba-gray mb-1">Audit Logs & Security</h2>
        <p className="text-sm text-taiba-gray">Track all significant actions and changes performed within the system.</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-taiba-gray mb-2">Filter by Event Type</label>
            <select value={eventTypeFilter} onChange={(e) => setEventTypeFilter(e.target.value)} className="input-field">
              <option value="">All Event Types</option>
              {eventTypes.map(type => <option key={type} value={type}>{type.replace(/_/g, ' ')}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-taiba-gray mb-2">Filter by User</label>
            <select value={userFilter} onChange={(e) => setUserFilter(e.target.value)} className="input-field">
              <option value="">All Users</option>
              {users.map(user => <option key={user} value={user}>{user}</option>)}
            </select>
          </div>
        </div>
      </div>

      <DataTable columns={columns} data={filteredData} />
    </div>
  );
}

export default AuditLogs;
