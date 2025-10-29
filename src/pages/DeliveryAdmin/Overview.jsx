import React from 'react';
import StatCard from '../../components/Cards/StatCard';
import { Package, Truck, MapPin, AlertCircle } from 'lucide-react';

function Overview() {
  const stats = [
    { icon: Package, title: 'Zone Orders', value: '425', subtitle: 'Central Zone', color: 'blue' },
    { icon: Truck, title: 'Active Drivers', value: '28', subtitle: 'On duty', color: 'green' },
    { icon: MapPin, title: 'Clusters', value: '8', subtitle: 'In this zone', color: 'purple' },
    { icon: AlertCircle, title: 'Escalations', value: '3', subtitle: 'Needs attention', color: 'red' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-taiba-gray mb-2">Zone-wise Management</h2>
        <p className="text-taiba-gray">Central Zone Operations Dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-taiba-gray mb-4">Cluster Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {['Cluster A', 'Cluster B', 'Cluster C', 'Cluster D', 'Cluster E', 'Cluster F', 'Cluster G', 'Cluster H'].map((cluster, i) => (
            <div key={i} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-taiba-gray mb-2">{cluster}</h4>
              <div className="space-y-1 text-sm text-taiba-gray">
                <p>Orders: {Math.floor(Math.random() * 50) + 30}</p>
                <p>Drivers: {Math.floor(Math.random() * 5) + 3}</p>
                <p className="text-green-600 font-medium">On Track</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Overview;
