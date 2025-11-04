import React, { useState } from 'react';
import DataTable from '../../components/Tables/DataTable';
import { MapPin, UserCog, SlidersHorizontal } from 'lucide-react';

const auditLogData = [
  {
    id: 'L011',
    timestamp: '2025-08-01 10:30:15',
    eventType: 'ZONE_ASSIGNMENT',
    performedBy: 'Delivery Admin',
    details: {
      zoneId: 'Z001',
      oldInchargeId: 'U002',
      newInchargeId: 'U007',
      adminId: 'DA001'
    }
  },
  {
    id: 'L012',
    timestamp: '2025-07-31 18:05:30',
    eventType: 'USER_DEACTIVATION',
    performedBy: 'Delivery Admin',
    details: {
      userId: 'D005',
      action: 'Suspended',
      performedBy: 'Delivery Admin (DA001)'
    }
  },
  {
    id: 'L013',
    timestamp: '2025-07-31 15:20:10',
    eventType: 'CONFIGURATION_UPDATE',
    performedBy: 'Delivery Admin',
    details: {
      configKey: 'North Zone Shift Time',
      oldValue: '9 AM - 6 PM',
      newValue: '10 AM - 7 PM',
      updatedBy: 'Delivery Admin (DA001)'
    }
  },
];

const EventTypeBadge = ({ eventType }) => {
  const config = {
    ZONE_ASSIGNMENT: { icon: MapPin, color: 'blue' },
    USER_DEACTIVATION: { icon: UserCog, color: 'red' },
    CONFIGURATION_UPDATE: { icon: SlidersHorizontal, color: 'purple' },
  };
  const { icon: Icon, color } = config[eventType] || {};
  const colors = {
    blue: 'bg-blue-100 text-blue-800',
    red: 'bg-red-100 text-red-800',
    purple: 'bg-purple-100 text-purple-800',
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
    case 'ZONE_ASSIGNMENT':
      return `Zone ${details.zoneId}: Incharge reassigned from ${details.oldInchargeId} to ${details.newInchargeId}.`;
    case 'USER_DEACTIVATION':
      return `User ${details.userId} was ${details.action} by ${details.performedBy}.`;
    case 'CONFIGURATION_UPDATE':
      return `Config "${details.configKey}" changed from "${details.oldValue}" to "${details.newValue}".`;
    default:
      return 'No specific details.';
  }
};

function AuditLogs() {
  const columns = [
    { header: 'Timestamp', accessor: 'timestamp' },
    { header: 'Event Type', accessor: 'eventType', render: (row) => <EventTypeBadge eventType={row.eventType} /> },
    { header: 'Details', accessor: 'details', render: (row) => <DetailsRenderer row={row} /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-taiba-gray mb-1">Audit Logs</h2>
        <p className="text-sm text-taiba-gray">Track all significant actions performed within your assigned zones.</p>
      </div>
      <DataTable columns={columns} data={auditLogData} />
    </div>
  );
}

export default AuditLogs;
