import axios from './axios';

export const paymentService = {
  // Initiate payment and get checkout URL
  initiatePayment: async (paymentData) => {
    try {
      const response = await axios.post('/payment/api/payments/process/initiate', paymentData);
      return response.data;
    } catch (error) {
      console.error('Payment initiation failed:', error);
      throw error;
    }
  },

  // Get payment details
  getPayment: async (paymentId) => {
    try {
      const response = await axios.get(`/payment/api/payments/${paymentId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get payment:', error);
      throw error;
    }
  },

  // Get user payments
  getUserPayments: async (userId) => {
    try {
      const response = await axios.get(`/payment/api/payments/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get user payments:', error);
      throw error;
    }
  },

  // Process refund
  processRefund: async (refundData) => {
    try {
      const response = await axios.post('/payment/api/payments/refund', refundData);
      return response.data;
    } catch (error) {
      console.error('Refund failed:', error);
      throw error;
    }
  },

  // Initiate bank transfer
  initiateBankTransfer: async (bankTransferData) => {
    try {
      const response = await axios.post('/payment/api/payments/process/bank-transfer', bankTransferData);
      return response.data;
    } catch (error) {
      console.error('Bank transfer initiation failed:', error);
      throw error;
    }
  },

  // Test APIs
  test: {
    createMockPayment: async () => {
      try {
        const response = await fetch('/payment/api/test/create-mock-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        return await response.json();
      } catch (error) {
        console.error('Mock payment creation failed:', error);
        throw error;
      }
    },

    simulateSuccess: async (paymentId) => {
      try {
        const response = await fetch(`/payment/api/test/simulate-payment-success/${paymentId}`, {
          method: 'POST'
        });
        return await response.text();
      } catch (error) {
        console.error('Payment simulation failed:', error);
        throw error;
      }
    },

    checkStatus: async (paymentId) => {
      try {
        const response = await fetch(`/payment/api/test/payment-status/${paymentId}`);
        return await response.json();
      } catch (error) {
        console.error('Status check failed:', error);
        throw error;
      }
    },

    completeTestFlow: async () => {
      try {
        const response = await fetch('/payment/api/test/complete-test-flow', {
          method: 'POST'
        });
        return await response.json();
      } catch (error) {
        console.error('Complete test flow failed:', error);
        throw error;
      }
    }
  }
};
