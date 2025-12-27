import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faUniversity, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { paymentService } from "../../api/paymentService";
import { useAuth } from "../../hooks/useAuth";

const BankPaymentModal = ({ isOpen, onClose, total, orderCodes, customerEmail }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const { user } = useAuth();

  const sriLankanBanks = [
    { code: "7278", name: "Commercial Bank", logo: "🏦" },
    { code: "7056", name: "Peoples Bank", logo: "🏛️" },
    { code: "7083", name: "Bank of Ceylon", logo: "🏦" },
    { code: "7302", name: "Sampath Bank", logo: "🏛️" },
    { code: "7454", name: "Hatton National Bank", logo: "🏦" },
    { code: "7135", name: "Nations Trust Bank", logo: "🏛️" },
    { code: "7454", name: "DFCC Bank", logo: "🏦" },
    { code: "7302", name: "Seylan Bank", logo: "🏛️" }
  ];

  const handleBankTransfer = async (e) => {
    e.preventDefault();
    if (!selectedBank) {
      alert("Please select a bank");
      return;
    }

    setIsProcessing(true);
    
    try {
      const bankTransferRequest = {
        userId: user?.id || 'guest',
        orderId: orderCodes[0] || `ORDER_${Date.now()}`,
        amount: parseFloat(total),
        currency: 'LKR',
        customerEmail: customerEmail || user?.email || 'customer@example.com',
        description: `Travel booking payment for ${orderCodes.length} item(s)`,
        bankCode: selectedBank,
        accountHolderName: user?.name || 'Customer'
      };

      const response = await fetch('/payment/api/payments/process/bank-transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bankTransferRequest)
      });

      const result = await response.json();
      
      if (result.checkoutUrl) {
        window.location.href = `/payment${result.checkoutUrl}`;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Bank transfer initiation failed:', error);
      alert('Bank transfer initiation failed. Please try again.');
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
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faUniversity} className="text-blue-700" size="lg" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Bank Transfer</h2>
              <p className="text-sm text-gray-500">Pay using your business bank account</p>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="text-3xl font-bold text-blue-700">LKR {total}</p>
          </div>
        </div>

        <form onSubmit={handleBankTransfer} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Your Bank
            </label>
            <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto">
              {sriLankanBanks.map((bank) => (
                <button
                  key={bank.code}
                  type="button"
                  onClick={() => setSelectedBank(bank.code)}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                    selectedBank === bank.code
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-blue-300"
                  }`}
                >
                  <span className="text-2xl">{bank.logo}</span>
                  <div>
                    <p className="font-semibold text-gray-800">{bank.name}</p>
                    <p className="text-sm text-gray-500">Online Banking</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing || !selectedBank}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <FontAwesomeIcon icon={faUniversity} />
            )}
            {isProcessing ? 'Processing...' : `Pay LKR ${total} via Bank Transfer`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BankPaymentModal;
