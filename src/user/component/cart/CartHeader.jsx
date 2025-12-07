// src/components/cart/CartHeader.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const CartHeader = ({ onClose }) => (
  <header className="bg-emerald-700 text-white p-4 flex justify-between items-center">
    <h2 className="text-xl font-bold">Your Rental Cart</h2>
    <button
      onClick={onClose}
      className="p-1 rounded-full hover:bg-emerald-600 transition"
    >
      <FontAwesomeIcon icon={faXmark} className="w-6 h-6" />
    </button>
  </header>
);

export default CartHeader;
