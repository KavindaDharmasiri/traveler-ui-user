import Swal from 'sweetalert2';

export const showSecurePaymentConfirmation = (paymentData) => {
  return Swal.fire({
    title: 'Payment Successful!',
    html: `
      <div class="text-center">
        <div class="mb-4">
          <i class="fas fa-check-circle text-green-500 text-6xl"></i>
        </div>
        <p class="text-lg font-semibold mb-2">Your payment has been processed securely</p>
        <div class="bg-gray-50 p-4 rounded-lg mb-4">
          <p class="text-sm text-gray-600">Transaction ID</p>
          <p class="font-mono text-lg">${paymentData.transactionId || 'TXN-' + Date.now()}</p>
        </div>
        <div class="bg-green-50 p-4 rounded-lg">
          <p class="text-sm text-gray-600">Amount Paid</p>
          <p class="text-2xl font-bold text-green-600">LKR ${paymentData.amount}</p>
        </div>
      </div>
    `,
    icon: 'success',
    confirmButtonText: 'Continue',
    confirmButtonColor: '#10b981',
    allowOutsideClick: false,
    allowEscapeKey: false,
    customClass: {
      popup: 'rounded-xl shadow-2xl',
      title: 'text-2xl font-bold text-gray-800',
      confirmButton: 'px-8 py-3 rounded-lg font-semibold'
    }
  });
};

export const showPaymentError = (errorMessage) => {
  return Swal.fire({
    title: 'Payment Failed',
    text: errorMessage || 'Something went wrong with your payment. Please try again.',
    icon: 'error',
    confirmButtonText: 'Try Again',
    confirmButtonColor: '#ef4444',
    customClass: {
      popup: 'rounded-xl shadow-2xl',
      title: 'text-2xl font-bold text-gray-800',
      confirmButton: 'px-8 py-3 rounded-lg font-semibold'
    }
  });
};