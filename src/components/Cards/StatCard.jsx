import React from 'react';

function StatCard({ icon: Icon, title, value, subtitle, color = 'blue', trend }) {
  const colorClasses = {
    blue: 'bg-taiba-blue',
    purple: 'bg-taiba-purple',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-taiba-gray mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-taiba-gray mb-1">{value}</h3>
          {subtitle && <p className="text-xs text-taiba-gray opacity-75">{subtitle}</p>}
          {trend && (
            <div className={`mt-1 text-xs font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
            </div>
          )}
        </div>
        <div className={`p-2.5 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
}

export default StatCard;
