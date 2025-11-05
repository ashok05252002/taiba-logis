import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <h3 className="font-semibold text-taiba-gray">{title}</h3>
        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pb-4 text-sm text-taiba-gray prose prose-sm max-w-none">
          {children}
        </div>
      )}
    </div>
  );
}

export default Accordion;
