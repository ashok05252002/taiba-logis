import React from 'react';
import StatCard from '../../components/Cards/StatCard';
import { 
  MapPin, 
  Truck, 
  Clock, 
  TrendingUp, 
  AlertCircle,
  Puzzle,
  UserCheck,
  UserCog,
  Users,
  AlertTriangle
} from 'lucide-react';

function Overview() {
  // As per your request, the dashboard widgets are organized into System Summary and Delivery Performance
  const systemSummaryStats = [
    { icon: MapPin, title: 'Total Clusters', value: '12', subtitle: 'Across all regions', color: 'blue' },
    { icon: Puzzle, title: 'Total Areas', value: '48', subtitle: 'Managed sub-clusters', color: 'blue' },
    { icon: UserCheck, title: 'Active Admins', value: '4', subtitle: 'Delivery Admins', color: 'purple' },
    { icon: UserCog, title: 'Active Incharges', value: '12', subtitle: 'Cluster Incharges', color: 'purple' },
    { icon: Users, title: 'Active Drivers', value: '129', subtitle: 'On-duty partners', color: 'purple' },
  ];

  const deliveryPerformanceStats = [
    { icon: Truck, title: 'Active Deliveries', value: '324', subtitle: 'Real-time count', color: 'orange' },
    { icon: TrendingUp, title: 'Overall SLA %', value: '94.2%', subtitle: 'Last 30 days', color: 'green', trend: 2 },
    { icon: Clock, title: 'Avg. Delivery Time', value: '42 min', subtitle: 'Last 24 hours', color: 'blue', trend: -8 },
    { icon: AlertTriangle, title: 'Delays Today', value: '27', subtitle: 'Requires attention', color: 'red' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-taiba-gray mb-1">Dashboard Overview</h2>
        <p className="text-sm text-taiba-gray">A bird's-eye view of the entire delivery network.</p>
      </div>

      {/* System Summary Widgets */}
      <div>
        <h3 className="text-lg font-bold text-taiba-gray mb-4">System Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {systemSummaryStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
      
      {/* Delivery Performance Widgets */}
      <div>
        <h3 className="text-lg font-bold text-taiba-gray mb-4">Delivery Performance</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deliveryPerformanceStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>

      {/* Map and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-taiba-gray mb-4">Driver Distribution Map</h3>
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <p className="text-taiba-gray">Map integration placeholder</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-taiba-gray mb-4">Escalations & Alerts</h3>
          <div className="space-y-4">
            {[
              { cluster: 'North Cluster', issue: 'High delay rate', time: '15m ago' },
              { cluster: 'Central Cluster', issue: 'Driver shortage', time: '45m ago' },
              { cluster: 'East Cluster', issue: 'API Failure: Payments', time: '1h ago' },
              { cluster: 'South Cluster', issue: 'Multiple failed deliveries', time: '3h ago' },
            ].map((alert, i) => (
              <div key={i} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0">
                <AlertCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-taiba-gray">{alert.cluster}</p>
                  <p className="text-xs text-taiba-gray">{alert.issue}</p>
                </div>
                <p className="text-xs text-gray-400">{alert.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
