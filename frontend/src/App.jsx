import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const toggleCart = () => {
    console.log('Cart toggled:', !isCartOpen);
    setIsCartOpen(!isCartOpen);
  };

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header onCartClick={toggleCart} />
        
        <main>
          {/* Hero Section */}
          <section id="home" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-5xl font-bold mb-6">Discover Amazing Products</h1>
                  <p className="text-xl mb-8 opacity-90">Premium quality items at unbeatable prices with fast delivery across India</p>
                  <div className="flex gap-4">
                    <button 
                      className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all"
                      onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
                    >
                      Shop Now
                    </button>
                    <button 
                      className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all"
                      onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=500&fit=crop&crop=center" 
                    alt="Shopping Experience" 
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                {[
                  { number: "10,000+", label: "Happy Customers" },
                  { number: "500+", label: "Products" },
                  { number: "24/7", label: "Support" },
                  { number: "Free", label: "Shipping" }
                ].map((stat, index) => (
                  <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <div className="text-3xl font-bold">{stat.number}</div>
                    <div className="text-white/80 uppercase text-sm tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Categories Section */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-center mb-12">Shop by Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop", desc: "Latest gadgets & tech" },
                  { name: "Clothing", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop", desc: "Fashion & apparel" },
                  { name: "Home & Garden", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop", desc: "Lifestyle essentials" },
                  { name: "Sports & Outdoors", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop", desc: "Fitness & adventure" }
                ].map((category, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                    onClick={() => {
                      document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
                      setTimeout(() => {
                        const categoryBtn = document.querySelector(`[data-category="${category.name}"]`);
                        if (categoryBtn) categoryBtn.click();
                      }, 800);
                    }}
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                      <p className="text-gray-600">{category.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Products Section - Using ProductGrid Component */}
          <section id="products" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ProductGrid />
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold mb-6">Why Choose ShopEasy?</h2>
                  <p className="text-lg text-gray-600 mb-8">ShopEasy is India's trusted online marketplace, committed to delivering quality products at competitive prices.</p>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { icon: "🚚", title: "Free Shipping", desc: "Free delivery on orders above ₹1,999" },
                      { icon: "🔒", title: "Secure Payments", desc: "SSL encrypted payments" },
                      { icon: "↩️", title: "Easy Returns", desc: "30-day hassle-free returns" },
                      { icon: "⭐", title: "Quality Assured", desc: "Hand-picked products" }
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-xl">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold">{feature.title}</h3>
                          <p className="text-sm text-gray-600">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=600&fit=crop&crop=center" 
                    alt="About Us" 
                    className="rounded-2xl shadow-xl"
                  />
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />

        {isCartOpen && (
          <Cart 
            onClose={toggleCart} 
            onCheckout={openCheckout}
          />
        )}

        {isCheckoutOpen && (
          <CheckoutModal onClose={closeCheckout} />
        )}
      </div>
    </CartProvider>
  );
}

export default App;
