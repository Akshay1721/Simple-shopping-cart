import React from 'react';

const Footer = () => {
  const handleNavClick = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent mb-2">
              🛍️ ShopEasy
            </h3>
            <p className="text-gray-400 text-sm mb-4">Your Shopping Paradise</p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Discover amazing products at unbeatable prices. We're committed to providing 
              you with the best shopping experience with quality products and excellent service.
            </p>
            <div className="flex gap-4">
              {['📘', '🐦', '📷', '💼'].map((icon, index) => (
                <a key={index} href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                  {icon}
                </a>
              ))}
            </div>
          </div>

  
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'Home', id: 'home' },
                { name: 'Products', id: 'products' },
                { name: 'About Us', id: 'about' }
              ].map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => handleNavClick(link.id)}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>


          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {['Electronics', 'Clothing', 'Home & Garden', 'Sports & Outdoors'].map((category) => (
                <li key={category}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">{category}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to get special offers and updates.
            </p>
            <div className="space-y-3">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-gray-400"
              />
              <button className="w-full btn-primary">Subscribe</button>
            </div>
            <div className="mt-4 space-y-1 text-sm text-gray-300">
              <p>📞 +91 98765 43210</p>
              <p>✉️ hello@shopeasy.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 ShopEasy. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map((link) => (
              <a key={link} href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
