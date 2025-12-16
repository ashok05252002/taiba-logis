import React from 'react';
import Modal from '../../../components/common/Modal';
import { CheckCircle, XCircle, FileText, ZoomIn } from 'lucide-react';

function PrescriptionVerificationModal({ isOpen, onClose, order, onVerify, onReject }) {
  if (!order) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Verify Prescription - Order #${order.id}`}>
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start space-x-3">
            <FileText className="w-5 h-5 text-taiba-blue mt-0.5" />
            <div>
                <h4 className="text-sm font-bold text-taiba-gray">Verification Required</h4>
                <p className="text-xs text-gray-600">Please review the uploaded prescription against the order items before accepting.</p>
            </div>
        </div>

        {/* Prescription Image Viewer */}
        <div className="relative bg-gray-100 rounded-lg h-64 flex items-center justify-center overflow-hidden border border-gray-300 group">
            {order.prescriptionUrl ? (
                <img 
                    src={order.prescriptionUrl} 
                    alt="Prescription" 
                    className="h-full w-full object-contain"
                />
            ) : (
                <div className="text-center text-gray-400">
                    <FileText className="w-12 h-12 mx-auto mb-2" />
                    <p>No image available</p>
                </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
                <button className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg text-sm font-medium flex items-center">
                    <ZoomIn className="w-4 h-4 mr-2" /> Zoom
                </button>
            </div>
        </div>

        {/* Order Items Summary */}
        <div>
            <h5 className="font-semibold text-taiba-gray mb-2 text-sm">Requested Items</h5>
            <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500">
                        <tr>
                            <th className="px-3 py-2">Item</th>
                            <th className="px-3 py-2 text-right">Qty</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {order.orderItems && order.orderItems.map((item, idx) => (
                            <tr key={idx}>
                                <td className="px-3 py-2 text-gray-700">{item.name}</td>
                                <td className="px-3 py-2 text-right font-medium">{item.qty}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-4 pt-2">
            <button 
                onClick={onReject}
                className="flex-1 flex items-center justify-center space-x-2 border border-red-200 bg-red-50 text-red-700 py-3 rounded-lg hover:bg-red-100 transition-colors font-medium"
            >
                <XCircle className="w-5 h-5" />
                <span>Reject & Refund</span>
            </button>
            <button 
                onClick={onVerify}
                className="flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md"
            >
                <CheckCircle className="w-5 h-5" />
                <span>Verify & Accept</span>
            </button>
        </div>
      </div>
    </Modal>
  );
}

export default PrescriptionVerificationModal;
