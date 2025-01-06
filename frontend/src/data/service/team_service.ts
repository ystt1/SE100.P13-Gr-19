import axiosInstance from "../../core/instant_service/instant_service";
import axios from 'axios';

interface TeamAddPayLoad {
  name: string;
  maxParticipant: number;
}



const TeamService = {
  //add team truyền vào name,maxParticipant
  addTeams: async (topicAddPayload: TeamAddPayLoad) => {
    try {
      const response = await axiosInstance.post("/team", topicAddPayload);
      console.log(response);
      
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

      return "Add Team Fail";
    }
  },
  getAllTeam: async (page: number, limit: number, search = "", sortElement = "", direction = "") => {
    try {
      const params: any = { page, limit };
      if (search) params.search = search;
      if (sortElement) params.sortElement = sortElement;
      if (direction) params.direction = direction;

      const response = await axiosInstance.get("/team/all", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching topics:", error);
      throw error;
    }
  },
  getMyTeams: async (page: number, limit: number, search = "", sortElement = "", direction = "") => {
    try {
      const params: any = { page, limit };
      if (search) params.search = search;
      if (sortElement) params.sortElement = sortElement;
      if (direction) params.direction = direction;

      const response = await axiosInstance.get("/team/my-teams", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching topics:", error);
      throw error;
    }
  },
  getJoinedTeams: async (page: number, limit: number, search = "", sortElement = "", direction = "") => {
    try {
      const params: any = { page, limit };
      if (search) params.search = search;
      if (sortElement) params.sortElement = sortElement;
      if (direction) params.direction = direction;

      const response = await axiosInstance.get("/team/joined-teams", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching topics:", error);
      throw error;
    }
  },
  getJoinRequest: async (page: number, limit: number, search = "", sortElement = "", direction = "",status="PENDING") => {
    try {
      const params: any = { page, limit ,status};
      if (search) params.search = search;
      if (sortElement) params.sortElement = sortElement;
      if (direction) params.direction = direction;

      const response = await axiosInstance.get("/team/join-requests", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching topics:", error);
      throw error;
    }
  },
  sendJoinRequest: async (id) => {
    try {
    
      const response = await axiosInstance.post(`/team/${id}/join`,);
      console.log(response);
      
    } catch (error) {
      console.error("Error fetching topics:", error);
      throw error;
    }
  },
}

export default TeamService;

