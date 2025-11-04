import React from 'react';
import { Map as MapIcon } from 'lucide-react';

function TrackingMap() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-taiba-gray mb-1">Tracking Map View</h2>
                <p className="text-sm text-taiba-gray">Live visualization of all drivers and orders in your zone.</p>
            </div>
            <div className="bg-white rounded-xl shadow-md h-[75vh] overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                    <MapIcon className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-taiba-gray">Map View Temporarily Unavailable</h3>
                    <p className="text-sm text-taiba-gray mt-2">Live map integration will be implemented in a future update.</p>
                </div>
            </div>
        </div>
    );
}

export default TrackingMap;
