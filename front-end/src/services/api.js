import axios from 'axios';

// Get the base URL from environment variables
const apiBaseURL = import.meta.env.API_BASE_URL;

const apiClient = axios.create({
  baseURL: apiBaseURL,
  timeout: 10000, // Set timeout as needed
  headers: {
    'Content-Type': 'application/json',
    // You can add other headers here if needed
  },
});

// Add a response interceptor
apiClient.interceptors.response.use(
  response => response,
  error => {
    // Handle errors globally
    return Promise.reject(error);
  }
);

export default apiClient;
