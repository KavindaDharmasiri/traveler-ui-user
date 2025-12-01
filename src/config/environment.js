const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;

export const API_CONFIG = {
  BASE_URL: isDev ? '/' : '/api/',
  PROD_API_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5555',
  ENDPOINTS: {
    AUTH: {
      LOGIN: 'auth/login',
      REGISTER: 'auth/register',
      LOGOUT: 'auth/logout',
      REFRESH: 'auth/refresh'
    }
  }
};