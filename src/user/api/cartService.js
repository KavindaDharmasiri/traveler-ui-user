import axios from './axios';

export const cartService = {
  getCartItems: async () => {
    const response = await axios.get('/core/api/v1/cart');
    return response.data;
  }
};
