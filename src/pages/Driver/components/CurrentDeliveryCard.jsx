import React, { useState } from 'react';
import { MapPin, Navigation, Package, CheckCircle, Phone, ExternalLink, ShieldCheck, Camera } from 'lucide-react';

const arrivalPin = '1234';

function ProofOfDelivery({ onComplete }) {
    return (
        <div className="space-y-4">
            <h4 className="text-base font-bold text-taiba-gray">Step 4: Proof of Delivery</h4>
            <div className="p-3 bg-gray-50 rounded-lg space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-taiba-purple text-taiba-purple rounded-lg font-medium text-sm hover:bg-taiba-purple hover:text-white transition-all">
                    <Camera className="w-4 h-4" />
                    <span>Upload Photo</span>
                </button>
            </div>
            <button onClick={onComplete} className="w-full bg-green-500 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-green-600 transition-all flex items-center justify-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Complete Delivery & End Trip</span>
            </button>
        </div>
    );
}

function CurrentDeliveryCard({ order, onComplete }) {
  const [deliveryStep, setDeliveryStep] = useState('accepted'); // accepted, enroute_to_pickup, at_store, enroute_to_delivery, at_delivery, pod
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const handleGetDirections = (address) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
    window.open(url, '_blank');
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput === arrivalPin) {
        setPinError(false);
        setDeliveryStep('pod');
    } else {
        setPinError(true);
    }
  };

  const renderContent = () => {
    switch(deliveryStep) {
        case 'accepted':
            return (
                <div className="p-4 space-y-3">
                    <h4 className="text-base font-bold text-taiba-gray">Step 1: Navigate to Pickup</h4>
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <MapPin className="w-5 h-5 text-taiba-purple mt-1 flex-shrink-0" />
                        <div>
                            <p className="font-semibold text-taiba-gray text-sm">Pickup Location:</p>
                            <p className="text-sm text-taiba-gray">{order.pickup}</p>
                        </div>
                    </div>
                </div>
            );
        case 'enroute_to_pickup':
            return (
                <div className="p-4 space-y-3">
                    <h4 className="text-base font-bold text-taiba-gray">Step 1: Navigate to Pickup</h4>
                    <button onClick={() => handleGetDirections(order.pickup)} className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-taiba-blue text-taiba-blue rounded-lg font-medium text-sm hover:bg-taiba-blue hover:text-white transition-all">
                        <ExternalLink className="w-4 h-4" />
                        <span>Get Directions to Store</span>
                    </button>
                </div>
            );
        case 'at_store':
            return (
                <div className="p-4 space-y-3">
                    <h4 className="text-base font-bold text-taiba-gray">Step 2: Confirm Pickup</h4>
                    <p className="text-sm text-taiba-gray">You have arrived at the store. Please collect the order items and confirm pickup.</p>
                </div>
            );
        case 'enroute_to_delivery':
            return (
                <div className="p-4 space-y-3">
                    <h4 className="text-base font-bold text-taiba-gray">Step 3: Navigate to Delivery</h4>
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Navigation className="w-5 h-5 text-taiba-purple mt-1 flex-shrink-0" />
                        <div>
                            <p className="font-semibold text-taiba-gray text-sm">Delivery Location:</p>
                            <p className="text-sm text-taiba-gray">{order.delivery}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => handleGetDirections(order.delivery)} className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-taiba-blue text-taiba-blue rounded-lg font-medium text-sm hover:bg-taiba-blue hover:text-white transition-all">
                            <ExternalLink className="w-4 h-4" />
                            <span>Get Directions</span>
                        </button>
                        <a href={`tel:${order.customerContact}`} className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-taiba-purple text-taiba-purple rounded-lg font-medium text-sm hover:bg-taiba-purple hover:text-white transition-all">
                            <Phone className="w-4 h-4" />
                            <span>Call Customer</span>
                        </a>
                    </div>
                </div>
            );
        case 'at_delivery':
            return (
                <div className="p-4 space-y-3">
                    <h4 className="text-base font-bold text-taiba-gray">Step 4: Verify Arrival PIN</h4>
                    <p className="text-sm text-taiba-gray">Please ask the customer for their 4-digit arrival PIN to confirm you've reached the correct location.</p>
                    <form onSubmit={handlePinSubmit} className="space-y-3">
                        <input
                            type="tel"
                            maxLength="4"
                            value={pinInput}
                            onChange={(e) => { setPinInput(e.target.value); setPinError(false); }}
                            className={`w-full p-3 text-center text-2xl font-bold tracking-[1em] border-2 rounded-lg focus:outline-none transition-colors ${pinError ? 'border-red-500' : 'border-gray-300 focus:border-taiba-blue'}`}
                        />
                        {pinError && <p className="text-red-500 text-sm text-center">Invalid PIN. Please try again.</p>}
                        <button type="submit" className="w-full bg-taiba-blue text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-opacity-90 transition-all flex items-center justify-center space-x-2">
                            <ShieldCheck className="w-5 h-5" />
                            <span>Verify PIN</span>
                        </button>
                    </form>
                </div>
            );
        case 'pod':
            return <div className="p-4"><ProofOfDelivery onComplete={onComplete} /></div>;
        default:
            return null;
    }
  };

  const renderButton = () => {
      switch(deliveryStep) {
          case 'accepted':
              return <button onClick={() => setDeliveryStep('enroute_to_pickup')} className="w-full bg-taiba-blue text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-opacity-90 flex items-center justify-center space-x-2"><Navigation className="w-5 h-5" /><span>Start Pickup Journey</span></button>;
          case 'enroute_to_pickup':
              return <button onClick={() => setDeliveryStep('at_store')} className="w-full bg-taiba-blue text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-opacity-90 flex items-center justify-center space-x-2"><MapPin className="w-5 h-5" /><span>Arrived at Store</span></button>;
          case 'at_store':
              return <button onClick={() => setDeliveryStep('enroute_to_delivery')} className="w-full bg-taiba-purple text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-opacity-90 flex items-center justify-center space-x-2"><Package className="w-5 h-5" /><span>Confirm Items & Pick Up</span></button>;
          case 'enroute_to_delivery':
              return <button onClick={() => setDeliveryStep('at_delivery')} className="w-full bg-taiba-blue text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-opacity-90 flex items-center justify-center space-x-2"><MapPin className="w-5 h-5" /><span>Arrived at Delivery</span></button>;
          default:
              return null;
      }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-taiba-blue bg-opacity-10 px-4 py-3 border-b border-gray-200">
        <h3 className="font-bold text-taiba-gray text-base">Current Delivery: {order.id}</h3>
      </div>
      
      {renderContent()}

      <div className="p-3 bg-gray-50 border-t">
        {renderButton()}
      </div>
    </div>
  );
}

export default CurrentDeliveryCard;
