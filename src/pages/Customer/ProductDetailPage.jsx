import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Plus, Minus, Star } from 'lucide-react';
import { allProducts } from './mockData';
import Accordion from './components/Accordion';
import ProductCard from './components/ProductCard';

function ProductDetailPage({ onAddToCart }) {
  const { productId } = useParams();
  const product = allProducts.find(p => p.id === parseInt(productId));
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-bold text-red-500">Product Not Found</h2>
        <Link to="/customer" className="mt-4 inline-block btn-primary">Back to Home</Link>
      </div>
    );
  }

  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="pb-24"> {/* Padding bottom to avoid overlap with sticky footer */}
      <div className="p-4 bg-white fixed top-16 left-0 right-0 z-10 shadow-sm">
        <Link to={-1} className="flex items-center space-x-2 text-taiba-blue hover:underline font-medium">
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </Link>
      </div>
      
      <div className="pt-16"> {/* Start content below fixed header */}
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />

        <div className="p-4 space-y-4">
          <h2 className="text-xl font-bold text-taiba-gray">{product.name}</h2>
          <p className="text-sm text-taiba-gray">{product.description}</p>
          
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-taiba-blue">{product.price}</p>
            <div className="flex items-center space-x-1">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-bold text-taiba-gray">4.8</span>
              <span className="text-sm text-gray-500">(125 reviews)</span>
            </div>
          </div>
        </div>

        <div className="px-4">
          <Accordion title="Description">
            <p>{product.longDescription}</p>
          </Accordion>
          <Accordion title="How to Use">
            <p>{product.howToUse}</p>
          </Accordion>
          <Accordion title="Ingredients">
            <p>{product.ingredients}</p>
          </Accordion>
        </div>

        {relatedProducts.length > 0 && (
          <div className="p-4 mt-6">
            <h3 className="text-lg font-bold text-taiba-gray mb-4">Related Products</h3>
            <div className="flex space-x-4 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-[90px] left-0 right-0 bg-white p-4 border-t border-gray-200 shadow-top z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 bg-gray-200 rounded-full"><Minus className="w-5 h-5" /></button>
            <span className="font-bold text-xl">{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} className="p-2 bg-gray-200 rounded-full"><Plus className="w-5 h-5" /></button>
          </div>
          <button onClick={() => onAddToCart(product, quantity)} className="flex-1 ml-4 flex items-center justify-center space-x-2 btn-primary py-3">
            <ShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
