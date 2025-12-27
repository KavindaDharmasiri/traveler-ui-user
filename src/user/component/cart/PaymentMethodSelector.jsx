import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCreditCard, faUniversity } from "@fortawesome/free-solid-svg-icons";
import PaymentModal from "./PaymentModal";
import BankPaymentModal from "./BankPaymentModal";

const PaymentMethodSelector = ({ isOpen, onClose, total, orderCodes, customerEmail }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleBack = () => {
    setSelectedMethod(null);
  };

  if (!isOpen) return null;

  if (selectedMethod === 'card') {
    return (
      <PaymentModal
        isOpen={true}
        onClose={onClose}
        total={total}
        orderCodes={orderCodes}
        customerEmail={customerEmail}
        onBack={handleBack}
      />
    );
  }

  if (selectedMethod === 'bank') {
    return (
      <BankPaymentModal
        isOpen={true}
        onClose={onClose}
        total={total}
        orderCodes={orderCodes}
        customerEmail={customerEmail}
        onBack={handleBack}
      />
    );
  }

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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Payment Method</h2>
          <p className="text-gray-600">Select how you'd like to pay</p>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mt-4">
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="text-3xl font-bold text-emerald-700">LKR {total}</p>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleMethodSelect('card')}
            className="w-full flex items-center gap-4 p-6 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all"
          >
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faCreditCard} className="text-white" size="lg" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">Credit/Debit Card</h3>
              <p className="text-sm text-gray-500">Pay with Visa, Mastercard, or other cards</p>
            </div>
          </button>

          <button
            onClick={() => handleMethodSelect('bank')}
            className="w-full flex items-center gap-4 p-6 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all"
          >
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faUniversity} className="text-white" size="lg" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">Business Bank Transfer</h3>
              <p className="text-sm text-gray-500">Pay directly from your business bank account</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;