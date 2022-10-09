import axios from 'axios';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * API instance. Basically ensures that we use the same config
 * throughout the app
 */
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});
