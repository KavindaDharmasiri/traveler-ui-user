import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faHome, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { paymentService } from '../api/paymentService';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orderId = searchParams.get('order_id');
    const paymentId = searchParams.get('payment_id');
    
    if (orderId) {
      // Update order status to PAID
      updateOrderStatus(orderId);
    }
    
    if (paymentId) {
      fetchPaymentDetails(paymentId);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const updateOrderStatus = async (orderId) => {
    try {
      const axios = (await import("../api/axios")).default;
      await axios.put('core/api/v1/order/updateStatus', {
        orderCodes: [orderId],
        status: "PAYED"
      });
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const fetchPaymentDetails = async (paymentId) => {
    try {
      const details = await paymentService.getPayment(paymentId);
      setPaymentDetails(details);
    } catch (error) {
      console.error('Failed to fetch payment details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <FontAwesomeIcon 
            icon={faCheckCircle} 
            className="text-green-500 text-6xl mb-4" 
          />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600">
            Your payment has been processed successfully.
          </p>
        </div>

        {loading ? (
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-3">Payment Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-medium">{searchParams.get('order_id') || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment ID:</span>
                <span className="font-medium">{searchParams.get('payment_id') || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">LKR {paymentDetails?.amount || searchParams.get('payhere_amount') || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-green-600">Completed</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => navigate('/user/bookings')}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faReceipt} />
            View My Bookings
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faHome} />
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;