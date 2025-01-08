import axiosInstance from "../../core/instant_service/instant_service";

const HistoryService = {
  getAllHistory: async ({ page, limit, sortElement, direction }) => {
    try {
      const response = await axiosInstance.get(
        `/practice/all?page=${page}&limit=${limit}&sortElement=${sortElement}&direction=${direction}`
      );
  
      return response.data;
    } catch (error) {
      console.error("Error fetching history:", error);
      throw error;
    }
  },
  getLatestHistory: async () => {
    try {
      const response = await axiosInstance.get(
        `/practice/all?page=1&limit=1&sortElement=createdAt&direction=desc`
      );
      
      return response.data.results[0].id;
    } catch (error) {
      console.error("Error fetching history:", error);
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
  getHistoryByTeamAndQuizSet: async ({teamId,
    quizSetId, page, limit, sortElement, direction }) => {
    try {
      const response = await axiosInstance.get(
        `/team/${teamId}/quiz-set/${quizSetId}/practice?page=${page}&limit=${limit}&sortElement=${sortElement}&direction=${direction}`
      );
  
      return response.data;
    } catch (error) {
      console.error("Error fetching history:", error);
      throw error;
    }
  },
  getUser: async (id) => {
    try {
      const response = await axiosInstance.get(`/user/${id}`);
      return response;
      
    } catch (error) {
      console.error("Error fetching topics:", error);
      throw error;
    }
  },
}

export default HistoryService;

