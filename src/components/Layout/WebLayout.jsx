import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Bell, User } from 'lucide-react';

function WebLayout({ children, navigation, title, userRole }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
              <Bell className="w-5 h-5 md:w-6 md:h-6 text-taiba-gray" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
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
          className={`fixed left-0 top-16 bottom-0 w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 overflow-y-auto ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0`}
        >
          <nav className="p-4 space-y-2">
            {navigation}
          </nav>
        </aside>

        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
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
