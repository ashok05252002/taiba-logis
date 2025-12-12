import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Menu, X, LogOut, Bell, User, AlertCircle, Package, ChevronsLeft, ChevronsRight } from 'lucide-react';

function WebLayout({ children, navItems, title, userRole }) {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const notifications = [
    { icon: AlertCircle, text: 'Cluster A exceeded SLA threshold (15%).', time: '5m ago', color: 'red' },
    { icon: Package, text: 'New high-priority order #ORD8876 assigned.', time: '12m ago', color: 'blue' },
    { icon: User, text: 'Delivery Admin "John Doe" created.', time: '1h ago', color: 'green' },
  ];
  
  const basePath = '/' + (typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'super-admin');

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-30">
        <div className="px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
            >
              {isMobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <img 
              src="https://i.ibb.co/7JhXfK9/taiba-logo.png" 
              alt="Taiba" 
              className="h-10 object-contain"
            />
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-taiba-gray">{title}</h1>
              <p className="text-xs text-taiba-gray opacity-75">{userRole}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
              >
                <Bell className="w-5 h-5 md:w-6 md:h-6 text-taiba-gray" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="p-4 border-b">
                    <h4 className="font-semibold text-taiba-gray">Notifications</h4>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 hover:bg-gray-50">
                        <notif.icon className={`w-5 h-5 mt-1 flex-shrink-0 text-${notif.color}-500`} />
                        <div className="flex-1">
                          <p className="text-sm text-taiba-gray">{notif.text}</p>
                          <p className="text-xs text-gray-400">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t text-center">
                    <button className="text-sm font-medium text-taiba-blue hover:underline">View all</button>
                  </div>
                </div>
              )}
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <User className="w-5 h-5 md:w-6 md:h-6 text-taiba-gray" />
            </button>
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-16 flex">
        <aside
          className={`fixed left-0 top-16 bottom-0 bg-white shadow-lg transform transition-all duration-300 z-20 flex flex-col
          ${isMinimized ? 'lg:w-20' : 'lg:w-64'}
          ${isMobileSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full'} lg:translate-x-0`}
        >
          <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={`${basePath}/${item.path}`}
                end={item.path === ''}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors group relative ${
                    isMinimized ? 'justify-center' : ''
                  } ${
                    isActive
                      ? 'bg-taiba-blue text-white'
                      : 'text-taiba-gray hover:bg-gray-100'
                  }`
                }
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className={`font-medium text-sm transition-opacity duration-200 ${isMinimized ? 'lg:opacity-0 lg:w-0' : 'opacity-100'}`}>{item.name}</span>
                {isMinimized && (
                   <span className="absolute left-full ml-4 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                     {item.name}
                   </span>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-200 hidden lg:block">
            <button 
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-full flex items-center justify-center p-3 rounded-lg text-taiba-gray hover:bg-gray-100 transition-colors"
            >
              {isMinimized ? <ChevronsRight className="w-5 h-5" /> : <ChevronsLeft className="w-5 h-5" />}
            </button>
          </div>
        </aside>

        <main
          className={`flex-1 transition-all duration-300 ${
            isMinimized ? 'lg:ml-20' : 'lg:ml-64'
          }`}
        >
          <div className="p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default WebLayout;
