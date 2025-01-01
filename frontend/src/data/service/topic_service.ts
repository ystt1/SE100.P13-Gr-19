import axiosInstance from "../../core/instant_service/instant_service";
import axios from 'axios';

interface TopicAddPayload {
  name: string;
  description: string;
}



const TopicService = {
  getAllTopic: async () => {
    try {
      const response = await axiosInstance.get("/topics?page=1");

      return response.data;
    } catch (error) {
      console.error("Error fetching topics:", error);
      throw error;
    }
  },

  getTopics: async (page: number, limit: number, search = "", sortElement = "", direction = "") => {
    try {
      const params: any = { page, limit };
      if (search) params.search = search;
      if (sortElement) params.sortElement = sortElement;
      if (direction) params.direction = direction;

      const response = await axiosInstance.get("/topics", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching topics:", error);
      throw error;
    }
  },


  addTopic: async (topicAddPayload: TopicAddPayload) => {
    try {
      const response = await axiosInstance.post("/topic", topicAddPayload);
      if (response.status == 200) {
        return "success";
      }
      return response.data.message;
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const { status, data } = error.response;
          return data.message;
        }
      } else {
        return "Unexpected error";
      }

      return "Add Topic Fail";
    }
  },


  editTopic: async (topicAddPayload: TopicAddPayload, id: String) => {
    try {
      console.log(localStorage.getItem("authToken"));
      const response = await axiosInstance.patch(`/topic/${id}`, topicAddPayload);

      if (response.status == 200) {
        return "success";
      }
      return `Something went wrong + ${response.status}`;
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const { status, data } = error.response;
          return data.message;
        }
      } else {
        return "Unexpected error";
      }
      return "Add Topic Fail";
    }
  },

  deleteTopic: async (id: String) => {
    try {
      const response = await axiosInstance.delete(`/topic/${id}`,);
      console.log(response);
      if (response.status == 204) {
        return "success";
      }
      return response.data.message;
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const { status, data } = error.response;
          return data.message;
        }
      } else {
        return "Unexpected error";
      }

      return "Delete Topic Fail";
    }
  },
}

export default TopicService;

