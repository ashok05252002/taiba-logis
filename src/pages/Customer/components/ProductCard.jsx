import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-40 flex-shrink-0 relative">
      <Link to={`/customer/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="w-full h-24 object-cover" />
        <div className="p-3">
          <h4 className="text-sm font-semibold text-taiba-gray truncate">{product.name}</h4>
          <p className="text-xs text-taiba-gray opacity-75">{product.description}</p>
          <p className="text-sm font-bold text-taiba-blue mt-2">{product.price}</p>
        </div>
      </Link>
      <button onClick={() => onAddToCart(product)} className="absolute bottom-2 right-2 bg-taiba-blue text-white w-7 h-7 flex items-center justify-center rounded-full shadow-lg hover:bg-opacity-90 transition-all">
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}

export default ProductCard;
