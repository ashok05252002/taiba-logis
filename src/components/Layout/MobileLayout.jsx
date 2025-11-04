import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

function MobileLayout({ children, bottomNav, title, warningMessage }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="px-4 py-4 flex items-center justify-between">
          <img 
            src="https://i.ibb.co/7JhXfK9/taiba-logo.png" 
            alt="Taiba" 
            className="h-10 object-contain"
          />
          <h1 className="text-base font-bold text-taiba-gray">{title}</h1>
        </div>
      </header>

      {warningMessage && (
        <div className="fixed top-16 left-0 right-0 bg-yellow-400 text-yellow-900 px-4 py-2 text-sm font-medium flex items-center justify-center space-x-2 z-40">
          <AlertTriangle className="w-4 h-4" />
          <span>{warningMessage}</span>
        </div>
      )}

      <main className={`pt-20 px-4 pb-4 ${warningMessage ? 'mt-8' : ''}`}>
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around items-center py-2">
          {bottomNav}
        </div>
      </nav>
    </div>
  );
}

export default MobileLayout;
