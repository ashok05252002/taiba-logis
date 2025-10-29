import React, { useState } from 'react';
import StatCard from '../../components/Cards/StatCard';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';

function Overview() {
  const [activeTab, setActiveTab] = useState('pending');

  const stats = [
    { icon: Package, title: 'Pending Orders', value: '47', subtitle: 'Awaiting assignment', color: 'orange' },
    { icon: Clock, title: 'Ongoing Orders', value: '89', subtitle: 'In delivery', color: 'blue' },
    { icon: CheckCircle, title: 'Completed Today', value: '234', subtitle: 'Successfully delivered', color: 'green' },
    { icon: XCircle, title: 'Failed Deliveries', value: '5', subtitle: 'Needs attention', color: 'red' },
  ];

  const orders = {
    pending: [
      { id: 'ORD001', customer: 'Ali Ahmed', address: '123 Main St', time: '10:30 AM', priority: 'High' },
      { id: 'ORD002', customer: 'Fatima Khan', address: '456 Park Ave', time: '10:45 AM', priority: 'Medium' },
      { id: 'ORD003', customer: 'Mohammed Ali', address: '789 Oak Rd', time: '11:00 AM', priority: 'Low' },
    ],
    ongoing: [
      { id: 'ORD101', customer: 'Sara Hassan', driver: 'Driver #12', eta: '15 min', status: 'In Transit' },
      { id: 'ORD102', customer: 'Omar Rashid', driver: 'Driver #7', eta: '28 min', status: 'In Transit' },
    ],
    completed: [
      { id: 'ORD201', customer: 'Aisha Mohamed', deliveredAt: '9:45 AM', driver: 'Driver #5' },
      { id: 'ORD202', customer: 'Yusuf Ibrahim', deliveredAt: '10:15 AM', driver: 'Driver #12' },
    ],
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-taiba-gray mb-2">Order Tracking Dashboard</h2>
        <p className="text-taiba-gray">Monitor and manage all orders in your zone</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            {['pending', 'ongoing', 'completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 font-medium border-b-2 transition-colors capitalize ${
                  activeTab === tab
                    ? 'border-taiba-blue text-taiba-blue'
                    : 'border-transparent text-taiba-gray hover:text-taiba-blue'
                }`}
              >
                {tab} Orders
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {orders[activeTab].map((order) => (
              <div key={order.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                  <div>
                    <p className="font-semibold text-taiba-gray">{order.id} - {order.customer}</p>
                    <p className="text-sm text-taiba-gray opacity-75">
                      {order.address || order.driver || order.deliveredAt}
                    </p>
                  </div>
                  {activeTab === 'pending' && (
                    <button className="btn-primary text-sm">Assign Driver</button>
                  )}
                  {activeTab === 'ongoing' && (
                    <span className="text-sm font-medium text-taiba-blue">ETA: {order.eta}</span>
                  )}
                  {activeTab === 'completed' && (
                    <span className="text-sm font-medium text-green-600">✓ Delivered</span>
                  )}
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
