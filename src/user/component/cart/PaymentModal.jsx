import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCreditCard, faLock } from "@fortawesome/free-solid-svg-icons";

const PaymentModal = ({ isOpen, onClose, total, orderCodes }) => {
  const [cardType, setCardType] = useState("visa");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const axios = (await import("../../api/axios")).default;
      await axios.put('core/api/v1/order/updateStatus', {
        orderCodes,
        status: "PAYED"
      });
      console.log("Payment successful");
      onClose();
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faLock} className="text-emerald-700" size="lg" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Secure Payment</h2>
              <p className="text-sm text-gray-500">Your payment is protected</p>
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mt-4">
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="text-3xl font-bold text-emerald-700">${total}</p>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Select Card Type</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setCardType("visa")}
              className={`flex items-center justify-center gap-3 px-4 py-4 rounded-xl border-2 transition-all ${
                cardType === "visa"
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-200 bg-white hover:border-blue-300"
              }`}
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faCreditCard} className="text-white" />
              </div>
              <span className="font-semibold text-gray-700">Visa</span>
            </button>
            <button
              type="button"
              onClick={() => setCardType("mastercard")}
              className={`flex items-center justify-center gap-3 px-4 py-4 rounded-xl border-2 transition-all ${
                cardType === "mastercard"
                  ? "border-orange-500 bg-orange-50 shadow-md"
                  : "border-gray-200 bg-white hover:border-orange-300"
              }`}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faCreditCard} className="text-white" />
              </div>
              <span className="font-semibold text-gray-700">Mastercard</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Card Number
            </label>
            <div className="relative">
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
              <FontAwesomeIcon icon={faCreditCard} className="absolute right-4 top-4 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value.toUpperCase())}
              placeholder="JOHN DOE"
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all uppercase"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').substr(0, 5))}
                placeholder="MM/YY"
                maxLength="5"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                CVV
              </label>
              <input
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substr(0, 3))}
                placeholder="•••"
                maxLength="3"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-xl font-bold text-lg hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg hover:shadow-xl mt-6 flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faLock} />
            Pay ${total}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
