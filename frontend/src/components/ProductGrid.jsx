import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';
import { productData } from '../../../backend/data/products';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Electronics', 'Clothing', 'Home & Garden', 'Accessories', 'Sports & Outdoors'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
     
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products);
          setError(null);
          return;
        }
      } catch (backendError) {
        console.log('Backend not available, using local data');
      }

      
      setProducts(productData);
      setError(null);
      
    } catch (err) {
      setError(err.message);
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  if (loading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-semibold text-red-600 mb-4">Oops! Something went wrong</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <button onClick={fetchProducts} className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-4xl font-bold text-center mb-8">Our Products</h2>
      
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map(category => (
          <button
            key={category}
            data-category={category}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
            <span className="ml-2 text-sm opacity-80">
              ({category === 'All' ? products.length : products.filter(p => p.category === category).length})
            </span>
          </button>
        ))}
      </div>

      {/* Products Display */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-6 opacity-50">📦</div>
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-gray-600">Try selecting a different category.</p>
        </div>
      ) : (
        <>
          <div className="text-center mb-8 text-gray-600">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductGrid;
