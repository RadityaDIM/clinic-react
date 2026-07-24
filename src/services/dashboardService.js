import { apiClient } from "../config/apiClient";

export const dashboardService = {
  getPatients: async () => {
    try {
      const response = await apiClient.get("/patient/display");
      return response;
    } catch (error) {
      throw error;
    }
  },
};
