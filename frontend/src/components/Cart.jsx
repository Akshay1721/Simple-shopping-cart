import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = ({ onClose, onCheckout }) => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const total = getCartTotal();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (cart.length > 0 && onCheckout) {
      onCheckout();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end" onClick={onClose}>
      <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Shopping Cart ({cart.length})</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex flex-col h-full">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
              <div className="text-6xl mb-4 opacity-30">🛒</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">Add some products to get started!</p>
              <button onClick={onClose} className="btn-primary">
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 px-6 py-4 space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex gap-4">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-1">{item.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">₹{item.price.toFixed(2)} each</p>
                        <p className="text-xs text-gray-500">{item.category}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center bg-white rounded-full border border-gray-300">
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 font-semibold text-gray-800">{item.quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-primary-600">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Summary */}
              <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping:</span>
                    <span className={total >= 1999 ? 'text-green-600 font-semibold' : ''}>
                      {total >= 1999 ? 'Free' : '₹99.00'}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t border-gray-300">
                    <span>Total:</span>
                    <span>₹{(total >= 1999 ? total : total + 99).toFixed(2)}</span>
                  </div>
                  {total < 1999 && (
                    <div className="bg-green-50 text-green-700 p-2 rounded-lg text-sm text-center mt-2">
                      Add ₹{(1999 - total).toFixed(2)} more for free shipping
                    </div>
                  )}
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={clearCart}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Clear Cart
                  </button>
                  <button 
                    onClick={handleCheckout}
                    disabled={cart.length === 0}
                    className="flex-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
