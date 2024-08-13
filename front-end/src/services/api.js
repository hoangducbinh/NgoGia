import axios from 'axios';

// Get the base URL from environment variables
const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: apiBaseURL,
  timeout: 10000, // Set timeout as needed
  headers: {
    'Content-Type': 'application/json',
    // You can add other headers here if needed
  },
});

// Add a request interceptor to include the token in headers
apiClient.interceptors.request.use(
  config => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Include token in Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
apiClient.interceptors.response.use(
  response => response,
  error => {
    // Handle errors globally
    if (error.response && error.response.status === 401) {
      // Optionally handle unauthorized errors, like redirecting to login
      console.error('Unauthorized access - possibly invalid token');
    } else if (error.response && error.response.status === 403) {
      // Optionally handle forbidden errors
      console.error('Forbidden - you do not have permission');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
