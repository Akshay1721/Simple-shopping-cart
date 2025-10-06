import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const Header = ({ onCartClick }) => {
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    console.log('Navigating to:', sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.error('Section not found:', sectionId);
    }
  };

  const handleCartClick = () => {
    console.log('Cart button clicked!');
    if (onCartClick) {
      onCartClick();
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg py-2' : 'bg-white/95 backdrop-blur-sm py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              🛍️ ShopEasy
            </h2>
            <span className="text-xs text-gray-500 ml-2">Your Shopping Paradise</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              onClick={() => handleNavClick('home')}
            >
              Home
            </button>
            <button
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              onClick={() => handleNavClick('products')}
            >
              Products
            </button>
            <button
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              onClick={() => handleNavClick('about')}
            >
              About
            </button>
          </nav>
          
          <button 
            className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
            onClick={handleCartClick}
          >
            🛒 Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center animate-pulse">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
