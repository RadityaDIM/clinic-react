import axios from "axios";
import useAuthStore from "../components/pages/auth/useAuthStore";

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);
