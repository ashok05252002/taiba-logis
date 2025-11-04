import React from 'react';

function ToggleSwitch({ enabled, setEnabled, label }) {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={enabled} onChange={() => setEnabled(!enabled)} />
        <div className={`block w-14 h-8 rounded-full transition-colors ${enabled ? 'bg-taiba-blue' : 'bg-gray-300'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${enabled ? 'transform translate-x-6' : ''}`}></div>
      </div>
      {label && <div className="ml-3 text-taiba-gray font-medium">{label}</div>}
    </label>
  );
}

export default ToggleSwitch;
