import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

customAxios.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error)
);

customAxios.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export default customAxios;
