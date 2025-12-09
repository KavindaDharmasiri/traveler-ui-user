// src/components/cart/RentalCart.jsx
import React, { useMemo, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { cartService } from "../../api/cartService";
import axios from "../../api/axios";

import CartHeader from "./CartHeader";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const RentalCart = ({ isOpen, setIsOpen, cartItems }) => {
  const [taxRate, setTaxRate] = useState(0.08);
  const [backendCartItems, setBackendCartItems] = useState([]);
  const [imageMapper, setImageMapper] = useState({});

  const fetchImages = async (imageUuids) => {
    const mapper = {};
    for (const uuid of imageUuids) {
      try {
        const response = await axios.get(`storage/files/download/${uuid}`, {
          responseType: 'blob'
        });
        mapper[uuid] = URL.createObjectURL(response.data);
      } catch (error) {
        console.error(`Error fetching image ${uuid}:`, error);
      }
    }
    setImageMapper(mapper);
  };

  useEffect(() => {
    if (isOpen) {
      axios.get('auth/rate')
        .then(res => setTaxRate(res.data.rate))
        .catch(err => console.error("Failed to fetch tax rate:", err));

      cartService.getCartItems()
        .then(async (data) => {
          setBackendCartItems(data);
          const imageUuids = data.flatMap(cart => cart.itemDetails?.images || []);
          if (imageUuids.length > 0) {
            await fetchImages(imageUuids);
          }
        })
        .catch(err => console.error("Failed to fetch cart:", err));
    }
  }, [isOpen]);

  const { subtotal, taxes, total } = useMemo(() => {
    const sub = backendCartItems.reduce(
      (sum, cart) => sum + (cart.order?.totalPrice || 0),
      0
    );
    const tax = sub * taxRate;
    const finalTotal = sub + tax;

    return {
      subtotal: sub.toFixed(2),
      taxes: tax.toFixed(2),
      total: finalTotal.toFixed(2),
    };
  }, [backendCartItems, taxRate]);

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
          {backendCartItems.length > 0 ? (
            backendCartItems.map((cart) => (
              <div key={cart.id} className="p-4 border-b">
                {cart.itemDetails && (
                  <div className="flex gap-3 mb-3">
                    {cart.itemDetails.images && cart.itemDetails.images[0] && imageMapper[cart.itemDetails.images[0]] && (
                      <img src={imageMapper[cart.itemDetails.images[0]]} alt={cart.itemDetails.name} className="w-20 h-20 object-cover rounded" />
                    )}
                    <div>
                      <p className="font-semibold">{cart.itemDetails.name}</p>
                      <p className="text-xs text-gray-500">{cart.itemDetails.category}</p>
                    </div>
                  </div>
                )}
                <p className="font-semibold text-lg">Order: {cart.order?.orderCode}</p>
                <p className="text-sm text-gray-600">Customer: {cart.order?.customerName}</p>
                <p className="text-sm text-gray-600">Status: {cart.order?.status}</p>
                <p className="text-sm text-gray-600">Days: {cart.order?.rentalDays}</p>
                <p className="text-lg font-bold mt-2">${cart.order?.totalPrice?.toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p className="p-8 text-center text-gray-500">No items in cart</p>
          )}
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
