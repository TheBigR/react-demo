// Environment configuration
export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};
