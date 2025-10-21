import axios, { AxiosResponse, AxiosError } from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Handle 401 - Invalid JWT
    if (error.response?.status === 401 && !originalRequest?._retry) {
      localStorage.removeItem("accessToken");
      // Redirect to login
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // Handle 429 - Rate limit exceeded
    if (error.response?.status === 429) {
      // Exponential backoff
      const retryAfter = error.response.headers["retry-after"] || 1;
      await new Promise((resolve) =>
        setTimeout(resolve, parseInt(retryAfter) * 1000),
      );
      if (originalRequest && !originalRequest._retry) {
        originalRequest._retry = true;
        return api(originalRequest);
      }
    }

    // Handle network errors with retry
    if (!error.response && !originalRequest?._retry) {
      originalRequest._retry = true;
      // Retry once after delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return api(originalRequest);
    }

    // Log errors for monitoring
    console.error("API Error:", error.response?.status, error.response?.data);

    return Promise.reject(error);
  },
);

export default api;
