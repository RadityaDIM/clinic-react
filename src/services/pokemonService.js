import axios from "axios";
import { apiClient } from "../config/apiClient";

export const pokemonService = {
  getAll: async () => {
    try {
      const response = await apiClient.get("/v2/pokemon");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getById: async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
