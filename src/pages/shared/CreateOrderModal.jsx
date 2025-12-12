import React, { useState } from 'react';
import Modal from '../../components/common/Modal';
import { Plus, Trash2 } from 'lucide-react';

function CreateOrderModal({ isOpen, onClose, onCreateOrder }) {
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [cluster, setCluster] = useState('North');
    const [deliveryType, setDeliveryType] = useState('Standard Delivery');
    const [items, setItems] = useState([{ name: '', qty: 1, price: '' }]);

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, { name: '', qty: 1, price: '' }]);
    };

    const removeItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newOrder = {
            id: `ORD${Math.floor(Math.random() * 9000) + 1000}`,
            customer: customerName,
            phone: customerPhone,
            address: customerAddress,
            cluster,
            deliveryType,
            source: 'Manual', // Source is always Manual for this form
            items,
            driver: 'Unassigned',
            status: 'To Confirm',
            createdAt: new Date().toISOString(),
            timeRange: 'N/A',
            duration: 'N/A',
            destination: customerAddress,
            auditTrail: [{ action: 'Order Created Manually by Admin', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]
        };
        onCreateOrder(newOrder);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Manual Order">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer Section */}
                <fieldset className="border p-4 rounded-lg">
                    <legend className="text-lg font-semibold text-taiba-gray px-2">Customer Details</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-taiba-gray mb-2">Customer Name</label>
                            <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="input-field" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-taiba-gray mb-2">Phone Number</label>
                            <input type="tel" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="input-field" required />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-taiba-gray mb-2">Delivery Address</label>
                            <textarea value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} className="input-field" rows="2" required></textarea>
                        </div>
                    </div>
                </fieldset>

                {/* Order Section */}
                <fieldset className="border p-4 rounded-lg">
                    <legend className="text-lg font-semibold text-taiba-gray px-2">Order Details</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-taiba-gray mb-2">Cluster</label>
                            <select value={cluster} onChange={(e) => setCluster(e.target.value)} className="input-field">
                                <option>North</option>
                                <option>South</option>
                                <option>East</option>
                                <option>West</option>
                                <option>Central</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-taiba-gray mb-2">Delivery Type</label>
                            <select value={deliveryType} onChange={(e) => setDeliveryType(e.target.value)} className="input-field">
                                <option>Standard Delivery</option>
                                <option>Express Delivery</option>
                                <option>Smart Delivery</option>
                            </select>
                        </div>
                    </div>
                </fieldset>

                {/* Items Section */}
                <fieldset className="border p-4 rounded-lg">
                    <legend className="text-lg font-semibold text-taiba-gray px-2">Order Items</legend>
                    <div className="space-y-4">
                        {items.map((item, index) => (
                            <div key={index} className="grid grid-cols-12 gap-2 items-center">
                                <input type="text" placeholder="Item Name" value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} className="input-field col-span-5" required />
                                <input type="number" placeholder="Qty" value={item.qty} onChange={(e) => handleItemChange(index, 'qty', e.target.value)} className="input-field col-span-2" min="1" required />
                                <input type="number" placeholder="Price" value={item.price} onChange={(e) => handleItemChange(index, 'price', e.target.value)} className="input-field col-span-3" step="0.01" min="0" required />
                                <button type="button" onClick={() => removeItem(index)} className="p-2 text-red-500 hover:bg-red-100 rounded-full col-span-2 flex justify-center">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={addItem} className="mt-4 flex items-center space-x-2 text-sm font-medium text-taiba-blue hover:underline">
                        <Plus className="w-4 h-4" />
                        <span>Add Item</span>
                    </button>
                </fieldset>

                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-taiba-gray font-medium hover:bg-gray-50">Cancel</button>
                    <button type="submit" className="btn-primary px-6 py-2">Create Order</button>
                </div>
            </form>
        </Modal>
    );
}

export default CreateOrderModal;
