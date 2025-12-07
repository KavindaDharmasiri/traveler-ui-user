// src/components/cart/RentalCart.jsx
import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";


import CartHeader from "./CartHeader";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const RentalCart = ({ isOpen, setIsOpen, cartItems }) => {
  const TAX_RATE = 0.08;

  const { subtotal, taxes, total } = useMemo(() => {
    const sub = cartItems.reduce(
      (sum, item) => sum + item.unitPrice * item.qty,
      0
    );
    const tax = sub * TAX_RATE;
    const finalTotal = sub + tax;

    return {
      subtotal: sub.toFixed(2),
      taxes: tax.toFixed(2),
      total: finalTotal.toFixed(2),
    };
  }, [cartItems]);

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      ></div>

      <div
        className={`fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <CartHeader onClose={() => setIsOpen(false)} />

        <div className="flex-grow overflow-y-auto divide-y divide-gray-100">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <CartSummary
          subtotal={subtotal}
          taxes={taxes}
          total={total}
          onContinueShopping={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
};

export default RentalCart;
