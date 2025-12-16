import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCreditCard, faLock, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { paymentService } from "../../api/paymentService";
import { useAuth } from "../../hooks/useAuth";

const PaymentModal = ({ isOpen, onClose, total, orderCodes, customerEmail }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();

  const handlePayHerePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Create payment request
      const paymentRequest = {
        userId: user?.id || 'guest',
        orderId: orderCodes[0] || `ORDER_${Date.now()}`,
        amount: parseFloat(total),
        currency: 'LKR',
        customerEmail: customerEmail || user?.email || 'customer@example.com',
        description: `Travel booking payment for ${orderCodes.length} item(s)`
      };

      // Initiate payment
      const response = await paymentService.initiatePayment(paymentRequest);
      
      if (response.checkoutUrl) {
        // Redirect to PayHere checkout
        window.location.href = `/payment${response.checkoutUrl}`;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('Payment initiation failed. Please try again.');
      setIsProcessing(false);
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
              <h2 className="text-2xl font-bold text-gray-800">PayHere Payment</h2>
              <p className="text-sm text-gray-500">Secure Sri Lankan payment gateway</p>
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mt-4">
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="text-3xl font-bold text-emerald-700">LKR {total}</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faCreditCard} className="text-white" size="lg" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">PayHere Payment Gateway</h3>
                <p className="text-sm text-blue-700">Secure payment processing for Sri Lanka</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handlePayHerePayment} className="space-y-5">
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-xl font-bold text-lg hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg hover:shadow-xl mt-6 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <FontAwesomeIcon icon={faLock} />
            )}
            {isProcessing ? 'Processing...' : `Pay LKR ${total}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
