import axios from '@/api/setup';
import store from '@/store';
import {
  ERROR_400_MESSAGE,
  ERROR_401_MESSAGE,
  DEFAULT_MESSAGE
} from '@/constants.js';

export default function interceptorsSetup() {
  axios.interceptors.request.use(
    (request) => {
      if (
        request.url?.includes('cart') ||
        request.url?.includes('users') ||
        request.method === 'put' ||
        request.method === 'post'
      ) {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
          request.headers.Authorization = `Bearer ${accessToken}`;
        }
      }

      return request;
    },
    (error) => Promise.reject(error)
  );
}
