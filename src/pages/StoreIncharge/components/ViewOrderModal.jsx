import React from 'react';
import Modal from '../../../components/common/Modal';
import { User, MapPin, Package, Phone, FileText, Calendar, CreditCard, Clock, CheckCircle, XCircle, Truck, ZoomIn } from 'lucide-react';

function ViewOrderModal({ isOpen, onClose, order }) {
  if (!order) return null;

  // Mock data for extended details if not present
  const paymentMethod = order.paymentMethod || 'Credit Card';
  const paymentStatus = order.status === 'Refunded' ? 'Refunded' : 'Paid';
  const deliveryTime = order.deliveredAt || 'N/A';
  const driverName = order.driver || 'Unassigned';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Order Details #${order.id}`}>
      <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
        {/* Header Info */}
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Status</p>
                <span className={`font-bold text-lg ${
                    order.status === 'Refunded' || order.status === 'Canceled' ? 'text-red-600' : 
                    order.status === 'Delivered' ? 'text-green-600' : 'text-taiba-blue'
                }`}>
                    {order.status}
                </span>
            </div>
            <div className="text-right">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Date</p>
                <div className="flex items-center justify-end space-x-1 font-medium text-gray-700">
                    <Calendar className="w-4 h-4" />
                    <span>{order.timestamp}</span>
                </div>
            </div>
        </div>

        {/* Customer Details */}
        <div>
            <h4 className="font-bold text-taiba-gray mb-3 flex items-center text-sm uppercase tracking-wide">
                <User className="w-4 h-4 mr-2 text-taiba-purple" /> Customer Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-3 border rounded-lg bg-white">
                    <p className="text-gray-500 text-xs mb-1">Name</p>
                    <p className="font-semibold text-gray-800">{order.customer}</p>
                </div>
                <div className="p-3 border rounded-lg bg-white">
                    <p className="text-gray-500 text-xs mb-1">Phone</p>
                    <div className="flex items-center">
                        <Phone className="w-3 h-3 mr-1 text-gray-400" />
                        <p className="font-semibold text-gray-800">{order.phone || 'N/A'}</p>
                    </div>
                </div>
                <div className="p-3 border rounded-lg md:col-span-2 bg-white">
                    <p className="text-gray-500 text-xs mb-1">Delivery Address</p>
                    <div className="flex items-start">
                        <MapPin className="w-3 h-3 mr-1 text-gray-400 mt-0.5" />
                        <p className="font-semibold text-gray-800">{order.address}</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Prescription Section (If Applicable) */}
        {order.requiresPrescription && (
            <div>
                <h4 className="font-bold text-taiba-gray mb-3 flex items-center text-sm uppercase tracking-wide">
                    <FileText className="w-4 h-4 mr-2 text-taiba-purple" /> Prescription
                </h4>
                <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-purple-800">Prescription Attached</span>
                        <span className="bg-purple-200 text-purple-800 text-xs px-2 py-1 rounded font-bold">Verified</span>
                    </div>
                    {/* Mock Image Placeholder if URL is missing, or actual image */}
                    <div className="relative h-40 bg-gray-200 rounded-md overflow-hidden group cursor-pointer border border-gray-300">
                        <img 
                            src={order.prescriptionUrl || 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/600x200/e2e8f0/94a3b8?text=Prescription+Image'} 
                            alt="Prescription" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                            <button className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 px-3 py-1.5 rounded-full shadow-lg text-xs font-bold flex items-center">
                                <ZoomIn className="w-3 h-3 mr-1" /> View Full
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Order Items */}
        <div>
            <h4 className="font-bold text-taiba-gray mb-3 flex items-center text-sm uppercase tracking-wide">
                <Package className="w-4 h-4 mr-2 text-taiba-purple" /> Order Items
            </h4>
            <div className="border rounded-lg overflow-hidden bg-white">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500">
                        <tr>
                            <th className="px-4 py-2 font-medium">Item Name</th>
                            <th className="px-4 py-2 text-right font-medium">Qty</th>
                            <th className="px-4 py-2 text-right font-medium">Price</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {order.orderItems && order.orderItems.length > 0 ? (
                            order.orderItems.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="px-4 py-3 font-medium text-gray-800">{item.name}</td>
                                    <td className="px-4 py-3 text-right font-bold">{item.qty}</td>
                                    <td className="px-4 py-3 text-right text-gray-600">OMR 0.00</td> {/* Mock Price */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="px-4 py-3 text-center text-gray-500">No items listed</td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot className="bg-gray-50">
                        <tr>
                            <td colSpan="2" className="px-4 py-2 text-right font-bold text-gray-700">Total</td>
                            <td className="px-4 py-2 text-right font-bold text-taiba-blue">OMR 0.00</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>

        {/* History / Status Details */}
        {(order.status === 'Delivered' || order.status === 'Refunded' || order.status === 'Cancelled') && (
            <div>
                <h4 className="font-bold text-taiba-gray mb-3 flex items-center text-sm uppercase tracking-wide">
                    <Clock className="w-4 h-4 mr-2 text-taiba-purple" /> History Details
                </h4>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                    {order.status === 'Delivered' && (
                        <>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500 flex items-center"><Truck className="w-3 h-3 mr-2"/> Delivered By</span>
                                <span className="text-sm font-medium text-gray-800">{driverName}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500 flex items-center"><Clock className="w-3 h-3 mr-2"/> Delivery Time</span>
                                <span className="text-sm font-medium text-gray-800">{deliveryTime}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500 flex items-center"><CheckCircle className="w-3 h-3 mr-2"/> Proof of Delivery</span>
                                <span className="text-xs text-blue-600 cursor-pointer hover:underline">View Photo</span>
                            </div>
                        </>
                    )}

                    {(order.status === 'Refunded' || order.status === 'Cancelled') && (
                        <>
                            <div className="flex justify-between items-start">
                                <span className="text-sm text-gray-500 flex items-center mt-0.5"><XCircle className="w-3 h-3 mr-2 text-red-500"/> Reason</span>
                                <span className="text-sm font-medium text-red-600 text-right">{order.rejectionReason || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500 flex items-center"><CreditCard className="w-3 h-3 mr-2"/> Refund Status</span>
                                <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded-full">{order.refundStatus || 'Processed'}</span>
                            </div>
                            {order.notes && (
                                <div className="mt-2 pt-2 border-t border-gray-200">
                                    <p className="text-xs text-gray-500 mb-1">Notes:</p>
                                    <p className="text-sm text-gray-700 italic">"{order.notes}"</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        )}

        {/* Payment Info (Extended Data) */}
        <div>
            <h4 className="font-bold text-taiba-gray mb-3 flex items-center text-sm uppercase tracking-wide">
                <CreditCard className="w-4 h-4 mr-2 text-taiba-purple" /> Payment Information
            </h4>
            <div className="flex justify-between items-center p-3 border rounded-lg bg-white">
                <div>
                    <p className="text-xs text-gray-500">Payment Method</p>
                    <p className="font-medium text-sm text-gray-800">{paymentMethod}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500">Status</p>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {paymentStatus}
                    </span>
                </div>
            </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100">
            <button onClick={onClose} className="btn-primary px-8 py-2">
                Close
            </button>
        </div>
      </div>
    </Modal>
  );
}

export default ViewOrderModal;
