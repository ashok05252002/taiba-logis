import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { allProducts } from './mockData';
import ProductCard from './components/ProductCard';

function ProductListPage({ onAddToCart }) {
  const { categoryName } = useParams();
  
  const products = categoryName
    ? allProducts.filter(p => p.category === categoryName)
    : allProducts;
    
  const title = categoryName ? `${categoryName}` : 'All Products';

  return (
    <div className="space-y-6">
      <Link to="/customer" className="flex items-center space-x-2 text-taiba-blue hover:underline font-medium">
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </Link>
      
      <h2 className="text-2xl font-bold text-taiba-gray">{title}</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}

export default ProductListPage;
