import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask } from '@fortawesome/free-solid-svg-icons';

const PaymentTestButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/payment/test')}
      className="fixed bottom-4 right-4 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-50"
      title="Payment Test Dashboard"
    >
      <FontAwesomeIcon icon={faFlask} size="lg" />
    </button>
  );
};

export default PaymentTestButton;