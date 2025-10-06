import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart, cart } = useCart();

  const isInCart = cart.some(item => item.id === product.id);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    addToCart(product);
    setIsAdding(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        {product.stock < 10 && (
          <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Low Stock
          </span>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mb-3">
            <div className="text-yellow-400 text-sm">
              {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5-Math.floor(product.rating))}
            </div>
            <span className="ml-2 text-gray-500 text-sm">({product.rating})</span>
          </div>
        )}
        
        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {product.features.slice(0, 2).map((feature, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                {feature}
              </span>
            ))}
          </div>
        )}
        
        {/* Price and Add to Cart */}
        <div className="flex justify-between items-end">
          <div>
            {/* Fixed Price Display */}
            <div className="text-xl font-bold text-blue-600 mb-1">
              ₹{product.price.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">{product.category}</div>
          </div>
          
          <button 
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              isInCart 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : isAdding
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:scale-105 hover:shadow-lg'
            }`}
          >
            {isAdding ? 'Adding...' : isInCart ? 'In Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
