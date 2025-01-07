
import axiosInstance from "../../core/instant_service/instant_service";


const TeamService = {
  
  addTeam: async (TeamAddPayLoad) => {
    try {
      console.log(TeamAddPayLoad);
      
      const response = await axiosInstance.post("/team", TeamAddPayLoad);
      console.log(response);
      
      if (response.status == 200) {
        return "success";
      }
      return response.data.message;
    } catch (error) {
      
      return "Unexpected error while adding team";
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
