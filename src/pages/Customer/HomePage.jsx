import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { categories, recentlyViewed } from './mockData';
import ProductCard from './components/ProductCard';

const Banner = () => (
  <div className="bg-gradient-to-r from-taiba-blue to-taiba-purple rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
    <h2 className="text-2xl font-bold mb-2">Summer Health Sale</h2>
    <p className="text-sm opacity-90 mb-4">Up to 30% off on vitamins and supplements.</p>
    <button className="bg-white text-taiba-blue font-bold py-2 px-4 rounded-full text-sm">Shop Now</button>
  </div>
);

const CategoryList = () => (
  <div>
    <h3 className="text-lg font-bold text-taiba-gray mb-4">Categories</h3>
    <div className="flex space-x-4 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
      {categories.map((category) => (
        <Link to={`/customer/products/${category.name}`} key={category.name} className="flex flex-col items-center space-y-2 flex-shrink-0 w-20">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <category.icon className="w-8 h-8 text-taiba-purple" />
          </div>
          <p className="text-xs text-center font-medium text-taiba-gray">{category.name}</p>
        </Link>
      ))}
    </div>
  </div>
);

const RecentlyViewed = ({ onAddToCart }) => (
  <div>
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-bold text-taiba-gray">Recently Viewed</h3>
      <Link to="/customer/products" className="text-sm font-medium text-taiba-blue flex items-center">
        <span>View All</span>
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
    <div className="flex space-x-4 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
      {recentlyViewed.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  </div>
);

function HomePage({ onAddToCart }) {
  return (
    <div className="space-y-8">
      <Banner />
      <CategoryList />
      <RecentlyViewed onAddToCart={onAddToCart} />
    </div>
  );
}

export default HomePage;
