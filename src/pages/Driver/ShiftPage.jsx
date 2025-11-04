import React from 'react';
import { LogIn, LogOut, Coffee, Clock } from 'lucide-react';

const iconMap = {
  'Checked In': { icon: LogIn, color: 'text-green-500' },
  'Checked Out': { icon: LogOut, color: 'text-red-500' },
  'Started Break': { icon: Coffee, color: 'text-orange-500' },
  'Ended Break': { icon: Coffee, color: 'text-green-500' },
};

function ShiftPage({ history }) {
  const getActivityIcon = (action) => {
    for (const key in iconMap) {
      if (action.startsWith(key)) {
        return iconMap[key];
      }
    }
    return { icon: Clock, color: 'text-gray-500' };
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-taiba-gray mb-4">Shift Activity Log</h2>
        {history.length > 0 ? (
          <div className="space-y-0">
            {history.map((event, index) => {
              const { icon: Icon, color } = getActivityIcon(event.action);
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    {index < history.length - 1 && (
                      <div className="w-px h-12 bg-gray-300"></div>
                    )}
                  </div>
                  <div className="pt-2">
                    <p className="font-semibold text-taiba-gray">{event.action}</p>
                    <p className="text-sm text-gray-500">{event.timestamp.toLocaleString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-taiba-gray">No shift activity recorded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShiftPage;
