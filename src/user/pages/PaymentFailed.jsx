import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faHome, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const PaymentFailed = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get('order_id');
  const statusCode = searchParams.get('status_code');
  
  const getFailureReason = (code) => {
    switch (code) {
      case '-1': return 'Payment was cancelled by user';
      case '-2': return 'Payment failed due to technical error';
      case '-3': return 'Payment was charged back';
      default: return 'Payment could not be processed';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <FontAwesomeIcon 
            icon={faTimesCircle} 
            className="text-red-500 text-6xl mb-4" 
          />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Failed
          </h1>
          <p className="text-gray-600">
            Unfortunately, your payment could not be processed.
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
          <h3 className="font-semibold text-red-800 mb-3">Payment Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-red-600">Order ID:</span>
              <span className="font-medium">{orderId || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-600">Status:</span>
              <span className="font-medium text-red-600">Failed</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-600">Reason:</span>
              <span className="font-medium">{getFailureReason(statusCode)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Try Again
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

export default PaymentFailed;