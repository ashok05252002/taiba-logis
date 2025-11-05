import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ShoppingCart } from 'lucide-react';
import StoreSelector from '../../pages/Customer/components/StoreSelector';

function MobileLayout({ children, bottomNav, warningMessage, cartCount = 0 }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-40">
        <div className="px-4 py-3 flex items-center justify-between">
          <StoreSelector />
          <img 
            src="public/Images/taiba-pharmacy-new (1).png" 
            alt="Taiba" 
            className="h-10 object-contain absolute left-1/2 -translate-x-1/2"
          />
          <button onClick={() => navigate('/customer/cart')} className="relative p-2">
            <ShoppingCart className="w-6 h-6 text-taiba-gray" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {warningMessage && (
        <div className="fixed top-16 left-0 right-0 bg-yellow-400 text-yellow-900 px-4 py-2 text-sm font-medium flex items-center justify-center space-x-2 z-30">
          <AlertTriangle className="w-4 h-4" />
          <span>{warningMessage}</span>
        </div>
      )}

      <main className={`pt-20 px-4 pb-4 ${warningMessage ? 'mt-8' : ''}`}>
        {children}
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
        <nav className="bg-gradient-to-t from-gray-800 to-gray-900 rounded-2xl shadow-2xl max-w-md mx-auto">
          <div className="flex justify-around items-center py-2">
            {bottomNav}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default MobileLayout;
