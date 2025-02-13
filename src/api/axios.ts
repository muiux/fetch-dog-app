import axios from "axios";

const API_BASE_URL = "https://frontend-take-home-service.fetch.com";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Allow cookies to be sent
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
  }
);
