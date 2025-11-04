import React from 'react';
import StatCard from '../../components/Cards/StatCard';
import { Package, Clock, CheckCircle, AlertCircle } from 'lucide-react';

function Overview() {
  const stats = [
    { icon: Package, title: 'Ready for Pickup', value: '23', subtitle: 'Orders packed', color: 'blue' },
    { icon: Clock, title: 'Being Prepared', value: '15', subtitle: 'In progress', color: 'orange' },
    { icon: CheckCircle, title: 'Handed Over', value: '187', subtitle: 'Today', color: 'green' },
    { icon: AlertCircle, title: 'Delayed', value: '2', subtitle: 'Needs attention', color: 'red' },
  ];

  const orders = [
    { id: 'ORD001', items: '5 items', driver: 'Pending', status: 'Ready' },
    { id: 'ORD002', items: '3 items', driver: 'Driver #12', status: 'Picked Up' },
    { id: 'ORD003', items: '8 items', driver: 'Pending', status: 'Ready' },
    { id: 'ORD004', items: '2 items', driver: 'Driver #7', status: 'Picked Up' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-taiba-gray mb-1">Store Order Management</h2>
        <p className="text-sm text-taiba-gray">Track and handover orders to delivery partners</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-taiba-gray mb-4">Orders Ready for Handover</h3>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div>
                <p className="font-semibold text-taiba-gray">{order.id}</p>
                <p className="text-sm text-taiba-gray opacity-75">{order.items} • {order.driver}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  order.status === 'Ready' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {order.status}
                </span>
                {order.status === 'Ready' && (
                  <button className="btn-primary text-sm">Handover</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Overview;
