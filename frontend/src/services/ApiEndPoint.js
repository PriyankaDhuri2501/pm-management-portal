import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Enhanced request methods
export const get = (url, params, config = {}) => 
  instance.get(url, { ...config, params });

export const post = (url, data, config = {}) => 
  instance.post(url, data, config);

export const put = (url, data, config = {}) => 
  instance.put(url, data, config);

export const deleteUser = (url, config = {}) => 
  instance.delete(url, config);

// Request interceptor
instance.interceptors.request.use(
  config => {
    // You can add auth tokens here if needed
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  response => {
    // You can modify successful responses here
    return response;
  },
  error => {
    // Enhanced error handling
    if (error.response) {
      // Server responded with a status code outside 2xx
      console.error('Response error:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Request setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default instance;