import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { Truck, Package, User, Clock } from 'lucide-react';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const mockDrivers = [
    { id: 'D001', name: 'Khalid Ibrahim', lat: 24.7136, lng: 46.6753, activeOrder: 'ORD651' },
    { id: 'D004', name: 'Aisha Al-Ghamdi', lat: 24.7236, lng: 46.6853, activeOrder: 'ORD652' },
];

const mockOrders = [
    { id: 'ORD651', customer: 'Sara Hassan', pickup: { lat: 24.7036, lng: 46.6653 }, delivery: { lat: 24.7186, lng: 46.6803 }, eta: '15 min' },
    { id: 'ORD652', customer: 'Omar Rashid', pickup: { lat: 24.7336, lng: 46.6953 }, delivery: { lat: 24.7196, lng: 46.6723 }, eta: '28 min' },
];

function TrackingMap() {
    const [selectedItem, setSelectedItem] = useState(null);

    if (!API_KEY) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6 h-[70vh] flex items-center justify-center">
                <div className="text-center">
                    <h3 className="text-lg font-bold text-red-600">Configuration Error</h3>
                    <p className="text-sm text-taiba-gray mt-2">Google Maps API Key is missing. Please add it to your .env file.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-taiba-gray mb-1">Tracking Map View</h2>
                <p className="text-sm text-taiba-gray">Live visualization of all drivers and orders in your zone.</p>
            </div>
            <div className="bg-white rounded-xl shadow-md h-[75vh] overflow-hidden">
                <APIProvider apiKey={API_KEY}>
                    <Map
                        defaultCenter={{ lat: 24.7136, lng: 46.6753 }}
                        defaultZoom={12}
                        mapId="taiba-logistics-map"
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                    >
                        {/* Driver Markers */}
                        {mockDrivers.map(driver => (
                            <AdvancedMarker
                                key={driver.id}
                                position={{ lat: driver.lat, lng: driver.lng }}
                                onClick={() => setSelectedItem({ type: 'driver', data: driver })}
                            >
                                <div className="p-2 bg-taiba-blue rounded-full shadow-lg">
                                    <Truck className="w-5 h-5 text-white" />
                                </div>
                            </AdvancedMarker>
                        ))}

                        {/* Order Markers */}
                        {mockOrders.map(order => (
                            <AdvancedMarker
                                key={order.id}
                                position={order.delivery}
                                onClick={() => setSelectedItem({ type: 'order', data: order })}
                            >
                                <Pin background={'#732675'} borderColor={'#732675'} glyphColor={'#fff'}>
                                    <Package className="w-5 h-5" />
                                </Pin>
                            </AdvancedMarker>
                        ))}

                        {/* Info Window */}
                        {selectedItem && (
                            <InfoWindow
                                position={selectedItem.type === 'driver' ? { lat: selectedItem.data.lat, lng: selectedItem.data.lng } : selectedItem.data.delivery}
                                onCloseClick={() => setSelectedItem(null)}
                            >
                                {selectedItem.type === 'driver' ? (
                                    <div className="p-2 w-64">
                                        <h4 className="font-bold text-taiba-gray flex items-center space-x-2"><User className="w-4 h-4 text-taiba-blue" /><span>{selectedItem.data.name}</span></h4>
                                        <p className="text-sm text-taiba-gray mt-1">Active Order: <span className="font-semibold">{selectedItem.data.activeOrder}</span></p>
                                    </div>
                                ) : (
                                    <div className="p-2 w-64">
                                        <h4 className="font-bold text-taiba-gray flex items-center space-x-2"><Package className="w-4 h-4 text-taiba-purple" /><span>Order {selectedItem.data.id}</span></h4>
                                        <p className="text-sm text-taiba-gray mt-1">Customer: <span className="font-semibold">{selectedItem.data.customer}</span></p>
                                        <p className="text-sm text-taiba-gray mt-1 flex items-center space-x-1"><Clock className="w-3 h-3" /><span>ETA: <span className="font-semibold">{selectedItem.data.eta}</span></span></p>
                                    </div>
                                )}
                            </InfoWindow>
                        )}
                    </Map>
                </APIProvider>
            </div>
        </div>
    );
}

export default TrackingMap;
