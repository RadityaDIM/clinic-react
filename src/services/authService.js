import { apiClient } from "../config/apiClient";

export const authService = {
  register: async (userData) => {
    try {
      const response = await apiClient.post("/register", userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  login: async (loginUserData) => {
    try {
      const response = await apiClient.post("/login", loginUserData);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
