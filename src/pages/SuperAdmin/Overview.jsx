import React from 'react';
import StatCard from '../../components/Cards/StatCard';
import { Package, Truck, Users, MapPin, TrendingUp, Clock } from 'lucide-react';

function Overview() {
  const stats = [
    { icon: Package, title: 'Total Orders Today', value: '1,247', subtitle: 'Across all zones', color: 'blue', trend: 12 },
    { icon: Truck, title: 'Active Deliveries', value: '324', subtitle: 'In progress', color: 'purple', trend: -3 },
    { icon: Users, title: 'Active Drivers', value: '89', subtitle: 'On duty now', color: 'green', trend: 5 },
    { icon: MapPin, title: 'Delivery Zones', value: '12', subtitle: 'Active zones', color: 'orange' },
    { icon: TrendingUp, title: 'Success Rate', value: '94.2%', subtitle: 'Last 30 days', color: 'green', trend: 2 },
    { icon: Clock, title: 'Avg Delivery Time', value: '42 min', subtitle: 'Last 24 hours', color: 'blue', trend: -8 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-taiba-gray mb-2">Dashboard Overview</h2>
        <p className="text-taiba-gray">Welcome back! Here's what's happening with your logistics today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-taiba-gray mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start space-x-4 pb-4 border-b border-gray-100 last:border-0">
                <div className="w-2 h-2 bg-taiba-blue rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-taiba-gray">New order assigned to Zone {i}</p>
                  <p className="text-xs text-taiba-gray opacity-75">2 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-taiba-gray mb-4">Zone Performance</h3>
          <div className="space-y-4">
            {['North Zone', 'South Zone', 'East Zone', 'West Zone', 'Central Zone'].map((zone, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-taiba-gray">{zone}</span>
                  <span className="text-sm font-bold text-taiba-blue">{95 - i * 2}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-taiba-blue h-2 rounded-full transition-all"
                    style={{ width: `${95 - i * 2}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
