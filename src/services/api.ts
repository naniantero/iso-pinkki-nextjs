import axios from 'axios';
import { API_BASE_URL } from '@constants';

/**
 * API instance. Basically ensures that we use the same config
 * throughout the app
 */
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});
