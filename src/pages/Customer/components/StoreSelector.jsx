import React, { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

const stores = ['Muscat - Al Khuwair', 'Salalah - City Center', 'Sohar - Main Street'];

function StoreSelector() {
  const [selectedStore, setSelectedStore] = useState(stores[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-1 text-sm font-medium text-taiba-gray">
        <MapPin className="w-4 h-4 text-taiba-purple" />
        <span className="truncate max-w-[100px]">{selectedStore}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-50">
          {stores.map(store => (
            <button
              key={store}
              onClick={() => { setSelectedStore(store); setIsOpen(false); }}
              className="w-full text-left px-4 py-2 text-sm text-taiba-gray hover:bg-gray-100"
            >
              {store}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default StoreSelector;
