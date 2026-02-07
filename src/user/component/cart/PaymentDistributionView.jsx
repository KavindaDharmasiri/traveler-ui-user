import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversity, faCheck, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';

const PaymentDistributionView = ({ paymentId, isOpen, onClose }) => {
  const [distributions, setDistributions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && paymentId) {
      fetchDistributions();
    }
  }, [isOpen, paymentId]);

  const fetchDistributions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/payment/api/payments/distribution/${paymentId}`);
      const data = await response.json();
      setDistributions(data);
    } catch (error) {
      console.error('Failed to fetch distributions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'COMPLETED':
        return <FontAwesomeIcon icon={faCheck} className="text-green-500" />;
      case 'PROCESSING':
        return <FontAwesomeIcon icon={faSpinner} spin className="text-blue-500" />;
      case 'FAILED':
        return <FontAwesomeIcon icon={faTimes} className="text-red-500" />;
      default:
        return <FontAwesomeIcon icon={faSpinner} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED': return 'text-green-600 bg-green-50';
      case 'PROCESSING': return 'text-blue-600 bg-blue-50';
      case 'FAILED': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Payment Distribution</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <FontAwesomeIcon icon={faSpinner} spin size="2x" className="text-blue-500" />
          </div>
        ) : (
          <div className="space-y-4">
            {distributions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No distributions found for this payment</p>
            ) : (
              distributions.map((dist, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon icon={faUniversity} className="text-blue-600" />
                      <div>
                        <h3 className="font-semibold text-gray-800">Provider {dist.providerId}</h3>
                        <p className="text-sm text-gray-500">Account: {dist.providerBankAccount}</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(dist.status)}`}>
                      {getStatusIcon(dist.status)}
                      {dist.status}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Amount</p>
                      <p className="font-semibold">LKR {dist.amount}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Commission ({(dist.commissionRate * 100).toFixed(1)}%)</p>
                      <p className="font-semibold text-red-600">-LKR {(dist.amount * dist.commissionRate).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Net Amount</p>
                      <p className="font-semibold text-green-600">LKR {dist.netAmount}</p>
                    </div>
                  </div>
                  
                  {dist.transferReference && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500">Transfer Reference: {dist.transferReference}</p>
                    </div>
                  )}
                </div>
              ))
            )}
            
            {distributions.length > 0 && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Total Distributed:</span>
                  <span className="font-bold text-lg text-green-600">
                    LKR {distributions.reduce((sum, dist) => sum + parseFloat(dist.netAmount), 0).toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentDistributionView;
