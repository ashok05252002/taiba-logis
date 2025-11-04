import React from 'react';
import StatCard from '../../components/Cards/StatCard';
import { Package, Truck, CheckCircle, ArchiveX, BellRing } from 'lucide-react';

// This component is now stateless and receives its data as props for a pure dashboard view.
function Overview({ stats, arrivalAlerts }) {
  const statCards = [
    { icon: Package, title: 'Pending Orders', value: stats.pending, subtitle: 'Awaiting dispatch', color: 'blue' },
    { icon: Truck, title: 'Ongoing Deliveries', value: stats.ongoing, subtitle: 'Picked up by drivers', color: 'orange' },
    { icon: CheckCircle, title: 'Delivered Today', value: stats.delivered, subtitle: 'Completed successfully', color: 'green' },
    { icon: ArchiveX, title: 'Cancelled / Returned', value: stats.cancelled, subtitle: 'Requires processing', color: 'red' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-taiba-gray mb-1">Store Dashboard</h2>
        <p className="text-sm text-taiba-gray">Real-time status of store orders and deliveries.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1">
        {/* Driver Arrival Alerts */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-taiba-gray mb-4">Driver Arrival Alerts</h3>
          <div className="space-y-4">
            {arrivalAlerts.length > 0 ? (
              arrivalAlerts.map((alert, i) => (
                <div key={i} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0">
                  <BellRing className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-taiba-gray">Driver <span className="font-bold">{alert.driver}</span> has arrived.</p>
                    <p className="text-xs text-taiba-gray">For Order: {alert.orderId}</p>
                  </div>
                  <p className="text-xs text-gray-400">{alert.time}</p>
                </div>
              ))
            ) : (
              <p className="text-center py-8 text-taiba-gray">No new driver arrivals.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
