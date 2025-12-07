// src/components/cart/CartItem.jsx
import React from "react";

const CartItem = ({ item }) => {
  const itemTotal = (item.unitPrice * item.qty).toFixed(2);

  return (
    <div className="flex p-4 border-b border-gray-100 last:border-b-0">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-16 h-10 object-cover rounded-md flex-shrink-0 mr-4"
        onError={(e) => {
          e.target.src = "https://placehold.co/80x50/333/fff?text=Gear";
        }}
      />

      <div className="flex-grow">
        <p className="font-semibold text-gray-800 text-sm md:text-base">{item.name}</p>
        <p className="text-xs text-gray-500 mt-0.5">Dates: {item.dates}</p>

        <div className="flex items-center justify-between mt-2">
          <div className="text-xs text-gray-600">
            <span className="font-medium">Qty: {item.qty}</span>
            <span className="ml-2 text-gray-400 hidden sm:inline">|</span>
            <span className="ml-2 font-medium">
              Price: ${item.unitPrice.toFixed(2)}
            </span>
          </div>

          <div className="text-sm font-semibold text-gray-800">${itemTotal}</div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
