import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';

function CartPage({ cart, onUpdateQuantity, onRemoveFromCart }) {
  const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('OMR ', ''));
    return sum + price * item.quantity;
  }, 0);

  const deliveryFee = 1.50;
  const total = subtotal + deliveryFee;

  return (
    <div className="space-y-6 pb-24">
      <Link to={-1} className="flex items-center space-x-2 text-taiba-blue hover:underline font-medium">
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </Link>
      <h2 className="text-2xl font-bold text-taiba-gray">My Cart</h2>

      {cart.length > 0 ? (
        <>
          <div className="bg-white rounded-xl shadow-md p-4 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center space-x-4 border-b pb-4 last:border-0 last:pb-0">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-semibold text-taiba-gray">{item.name}</p>
                  <p className="text-sm text-taiba-blue font-bold">{item.price}</p>
                  <div className="flex items-center space-x-3 mt-2">
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1 bg-gray-200 rounded-full"><Minus className="w-4 h-4" /></button>
                    <span className="font-bold text-base">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1 bg-gray-200 rounded-full"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>
                <button onClick={() => onRemoveFromCart(item.id)} className="p-2 text-red-500 hover:bg-red-100 rounded-full">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 space-y-3">
            <h3 className="text-lg font-bold text-taiba-gray">Order Summary</h3>
            <div className="flex justify-between text-sm text-taiba-gray">
              <span>Subtotal</span>
              <span>OMR {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-taiba-gray">
              <span>Delivery Fee</span>
              <span>OMR {deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-taiba-gray text-base border-t pt-3 mt-2">
              <span>Total</span>
              <span>OMR {total.toFixed(2)}</span>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="font-medium text-taiba-gray">Your cart is empty.</p>
          <p className="text-sm text-taiba-gray mt-2">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/customer" className="mt-6 inline-block btn-primary">
            Start Shopping
          </Link>
        </div>
      )}

      {cart.length > 0 && (
        <div className="fixed bottom-[90px] left-0 right-0 bg-white p-4 border-t border-gray-200 shadow-top z-10">
          <button className="w-full btn-primary py-3">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
