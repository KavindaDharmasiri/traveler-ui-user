import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PaymentStatusHandler = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const statusCode = searchParams.get('status_code');
    const orderId = searchParams.get('order_id');
    const paymentId = searchParams.get('payment_id');

    // Handle PayHere return
    if (statusCode) {
      if (statusCode === '2') {
        // Payment successful
        navigate(`/payment/success?order_id=${orderId}&payment_id=${paymentId}`);
      } else {
        // Payment failed or cancelled
        navigate(`/payment/failed?order_id=${orderId}&status_code=${statusCode}`);
      }
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Processing payment...</p>
      </div>
    </div>
  );
};

export default PaymentStatusHandler;