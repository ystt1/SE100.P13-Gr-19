// src/utils/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", 
  timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
  // Chỉ thêm token nếu endpoint không phải là '/auth/login' hoặc '/auth/register'
  if (!config.url?.includes('/auth/login') && !config.url?.includes('/auth/register')) {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  else 
  {
    
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
