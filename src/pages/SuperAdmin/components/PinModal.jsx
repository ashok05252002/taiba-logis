import React from 'react';
import Modal from '../../../components/common/Modal';
import { KeyRound, Copy, Check } from 'lucide-react';

function PinModal({ isOpen, onClose, pin = '1234' }) {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = async () => {
        try {
            // Try modern API first
            await navigator.clipboard.writeText(pin);
            setCopied(true);
        } catch (err) {
            // Fallback for restricted environments (like iframes) or older browsers
            try {
                const textArea = document.createElement("textarea");
                textArea.value = pin;
                
                // Ensure it's part of the DOM but not visually disruptive
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                textArea.style.top = "0";
                
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                
                const successful = document.execCommand('copy');
                if (successful) {
                    setCopied(true);
                }
                document.body.removeChild(textArea);
            } catch (fallbackErr) {
                console.error('Failed to copy PIN:', fallbackErr);
            }
        }
        
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Arrival PIN">
            <div className="flex flex-col items-center justify-center p-8 space-y-6">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-2">
                    <KeyRound className="w-8 h-8 text-taiba-blue" />
                </div>
                
                <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-800">Verification Code</h3>
                    <p className="text-sm text-gray-500 mt-1">Share this code with the driver to confirm delivery.</p>
                </div>

                <div className="relative group cursor-pointer" onClick={handleCopy}>
                    <div className="bg-gray-100 border-2 border-gray-200 rounded-xl px-8 py-4 flex items-center justify-center space-x-4 transition-all hover:border-taiba-blue hover:bg-blue-50">
                        <span className="text-4xl font-mono font-bold tracking-[0.25em] text-gray-800">
                            {pin}
                        </span>
                    </div>
                    <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-gray-400" />}
                    </div>
                </div>

                <button onClick={onClose} className="btn-primary w-full py-3 mt-4">
                    Done
                </button>
            </div>
        </Modal>
    );
}

export default PinModal;
