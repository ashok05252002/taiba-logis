import React from 'react';
import { Search, TrendingUp } from 'lucide-react';
import { recentlyViewed } from './mockData';

const ProductRow = ({ product }) => (
    <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
        <img src={product.image} alt={product.name} className="w-12 h-12 rounded-md object-cover" />
        <div>
            <p className="font-semibold text-taiba-gray text-sm">{product.name}</p>
            <p className="text-xs text-taiba-blue font-bold">{product.price}</p>
        </div>
    </div>
);

function SearchPage() {
  const trendingSearches = ['Panadol', 'Vitamin C', 'Sunscreen', 'Baby Diapers'];

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-taiba-gray w-5 h-5" />
        <input
          type="text"
          placeholder="Search for products & medicines..."
          className="w-full pl-12 pr-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-taiba-blue"
        />
      </div>

      <div className="bg-white rounded-xl shadow-md p-4">
        <h3 className="font-bold text-taiba-gray mb-3 text-base flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-taiba-purple" />
            <span>Trending Searches</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {trendingSearches.map((term) => (
            <button key={term} className="bg-gray-100 text-taiba-gray px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-200">
              {term}
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-4">
         <h3 className="font-bold text-taiba-gray mb-3 text-base">Popular Products</h3>
         <div className="space-y-2">
            {recentlyViewed.slice(0, 3).map(product => (
                <ProductRow key={product.id} product={product} />
            ))}
         </div>
      </div>
    </div>
  );
}

export default SearchPage;
