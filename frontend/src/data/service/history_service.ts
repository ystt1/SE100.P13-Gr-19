import axiosInstance from "../../core/instant_service/instant_service";

const HistoryService = {
  getAllHistory: async () => {
    try {
      const response = await axiosInstance.get("/practice/all");

      return response.data;
    } catch (error) {
      console.error("Error fetching topics:", error);
      throw error;
    }
  },
  getDetail: async (id) => {
    try {
      const response = await axiosInstance.get(`/practice/${id}`);

      return response.data;
    } catch (error) {
      console.error("Error fetching topics:", error);
      throw error;
    }
  },
}

export default HistoryService;

