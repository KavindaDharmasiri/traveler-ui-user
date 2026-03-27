// src/components/cart/CartSummary.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const CartSummary = ({ subtotal, taxes, total, onContinueShopping, onProceedToCheckout }) => {
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    navigate('/checkout');
    // Close the cart popup by calling the parent's close function
    if (onProceedToCheckout) {
      onProceedToCheckout();
    }
  };
  
  return (
    <div className="p-5 border-t border-gray-200 bg-gray-50">
      <div className="space-y-1 mb-4 text-sm">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal:</span>
          <span className="font-medium">Rs. {subtotal}</span>
        </div>

        <div className="flex justify-between text-gray-700 border-b pb-2">
          <span>Taxes & Fees:</span>
          <span className="font-medium">Rs. {taxes}</span>
        </div>

        <div className="flex justify-between pt-2 text-base font-bold text-gray-900">
          <span>Total (LKR):</span>
          <span>Rs. {total}</span>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleCheckout}
          className="w-full bg-emerald-700 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-emerald-800"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
