import React from 'react';
import StatCard from '../../components/Cards/StatCard';
import { Package, Truck, CheckCircle, Users, AlertCircle, MapPin, UserCheck, UserX, Coffee } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

// Mock Data for the Delivery Admin Dashboard
const deliveryStats = [
  { icon: Package, title: 'Pending Deliveries', value: '34', subtitle: 'Awaiting assignment', color: 'orange' },
  { icon: Truck, title: 'In Progress', value: '58', subtitle: 'Currently on the road', color: 'blue' },
  { icon: CheckCircle, title: 'Completed Today', value: '312', subtitle: 'Successfully delivered', color: 'green' },
  { icon: Users, title: 'Total Active Drivers', value: '46', subtitle: 'Across your zones', color: 'purple' },
];

const zonesData = [
  {
    name: 'North Zone',
    inchargeCount: 3,
    driverCount: 24,
    availability: { active: 18, onBreak: 4, offline: 2 },
    performance: { sla: '96%', successRate: '98%', rejectionRate: '1.5%', avgTime: '38 min' },
  },
  {
    name: 'Central Zone',
    inchargeCount: 4,
    driverCount: 28,
    availability: { active: 22, onBreak: 2, offline: 4 },
    performance: { sla: '98%', successRate: '99%', rejectionRate: '0.8%', avgTime: '32 min' },
  },
];

const exceptionAlerts = [
  { type: 'Delayed Delivery', details: 'Order #ORD8876 is 25m late', zone: 'North Zone', time: '5m ago' },
  { type: 'Failed Pickup', details: 'Driver #12 failed to pick up from Store #3', zone: 'Central Zone', time: '15m ago' },
  { type: 'Customer Complaint', details: 'Complaint received for Order #ORD8872', zone: 'North Zone', time: '30m ago' },
  { type: 'Low Driver Availability', details: 'Only 2 drivers active in Cluster C', zone: 'Central Zone', time: '1h ago' },
];

const performanceData = [
    { name: 'North Zone', sla: 96, success: 98 },
    { name: 'Central Zone', sla: 98, success: 99 },
];

function Overview() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-taiba-gray mb-1">Delivery Admin Dashboard</h2>
        <p className="text-sm text-taiba-gray">Centralized overview of your assigned zones.</p>
      </div>

      {/* Top Level Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {deliveryStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Zone Summaries */}
        <div className="lg:col-span-2 space-y-6">
          {zonesData.map((zone) => (
            <div key={zone.name} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-taiba-gray flex items-center"><MapPin className="w-5 h-5 mr-2 text-taiba-purple" />{zone.name}</h3>
                  <p className="text-sm text-taiba-gray">{zone.inchargeCount} Incharges • {zone.driverCount} Total Drivers</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-taiba-gray mb-3">Driver Availability</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center"><UserCheck className="w-4 h-4 mr-2 text-green-500"/>Active</span>
                      <span className="font-bold">{zone.availability.active}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center"><Coffee className="w-4 h-4 mr-2 text-orange-500"/>On Break</span>
                      <span className="font-bold">{zone.availability.onBreak}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center"><UserX className="w-4 h-4 mr-2 text-red-500"/>Offline</span>
                      <span className="font-bold">{zone.availability.offline}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-taiba-gray mb-3">Performance Indicators</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-taiba-gray">SLA Met</span>
                      <span className="font-bold text-green-600">{zone.performance.sla}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-taiba-gray">Success Rate</span>
                      <span className="font-bold text-green-600">{zone.performance.successRate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-taiba-gray">Rejection Rate</span>
                      <span className="font-bold text-red-600">{zone.performance.rejectionRate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-taiba-gray">Avg. Delivery Time</span>
                      <span className="font-bold">{zone.performance.avgTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Exception Alerts */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-taiba-gray mb-4">Exception Alerts</h3>
          <div className="space-y-4">
            {exceptionAlerts.map((alert, i) => (
              <div key={i} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0">
                <AlertCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-taiba-gray">{alert.type}</p>
                  <p className="text-xs text-taiba-gray">{alert.details} - <span className="font-semibold">{alert.zone}</span></p>
                </div>
                <p className="text-xs text-gray-400">{alert.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-taiba-gray mb-4">Zone Performance Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis unit="%" />
                <Tooltip />
                <Legend />
                <Bar dataKey="sla" name="SLA Met (%)" fill="#108BFA" />
                <Bar dataKey="success" name="Success Rate (%)" fill="#732675" />
            </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Overview;
