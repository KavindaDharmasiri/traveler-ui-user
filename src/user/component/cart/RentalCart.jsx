// src/components/cart/RentalCart.jsx
import React, { useMemo, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { cartService } from "../../api/cartService";
import axios from "../../api/axios";

import CartHeader from "./CartHeader";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import PaymentModal from "./PaymentModal";

const RentalCart = ({ isOpen, setIsOpen, cartItems }) => {
  const navigate = useNavigate();
  const [taxRate, setTaxRate] = useState(0.08);
  const [backendCartItems, setBackendCartItems] = useState([]);
  const [imageMapper, setImageMapper] = useState({});
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

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
          const imageUuids = data.flatMap(cart => 
            cart.cartItems?.flatMap(item => item.itemObj?.images || []) || []
          );
          if (imageUuids.length > 0) {
            await fetchImages(imageUuids);
          }
        })
        .catch(err => console.error("Failed to fetch cart:", err));
    }
  }, [isOpen]);

  const { subtotal, taxes, total } = useMemo(() => {
    const sub = backendCartItems.reduce(
      (sum, cart) => sum + (cart.cartItems?.reduce((itemSum, item) => itemSum + item.totalPrice, 0) || 0),
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
                <div className="mb-3">
                  <p className="font-semibold text-lg">Cart: {cart.orderCode}</p>
                  <p className="text-sm text-gray-600">Items: {cart.cartItems?.length || 0}</p>
                </div>
                
                {cart.cartItems?.map((item, index) => (
                  <div key={item.id} className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex gap-3 mb-3">
                      {item.itemObj?.images?.[0] && imageMapper[item.itemObj.images[0]] && (
                        <img 
                          src={imageMapper[item.itemObj.images[0]]} 
                          alt={item.itemObj.name} 
                          className="w-16 h-16 object-cover rounded" 
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{item.itemObj?.name || `Item #${item.item}`}</p>
                        <p className="text-xs text-gray-500">Vendor: {item.providerName}</p>
                        <p className="text-sm text-gray-600">Qty: {item.qty} | Days: {item.rentalDays}</p>
                        <p className="text-xs text-gray-500">
                          {item.pickupDate} to {item.returnDate}
                        </p>
                      </div>
                      <p className="font-bold text-lg">Rs. {item.totalPrice.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
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
          onProceedToCheckout={() => setIsOpen(false)}
          orderCodes={backendCartItems.map(cart => cart.orderCode).filter(Boolean)}
        />
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        total={total}
        orderCodes={backendCartItems.map(cart => cart.orderCode).filter(Boolean)}
      />
    </div>
  );
};

export default RentalCart;
