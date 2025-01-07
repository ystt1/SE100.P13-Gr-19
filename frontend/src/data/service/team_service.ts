
import axiosInstance from "../../core/instant_service/instant_service";

interface addQuizSetPayLoad{
  quizSetId:number;
  startTime:String;
  endTime:String;
}
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
  getJoinRequest: async (page: number, limit: number, search = "", sortElement = "", direction = "", status = "PENDING", id) => {
    try {
      const params: any = { page, limit, status };
      if (search) params.search = search;
      if (sortElement) params.sortElement = sortElement;
      if (direction) params.direction = direction;

      const response = await axiosInstance.get(`/team/${id}/join-requests`, { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching topics:", error);
      throw error;
    }
  },
  sendJoinRequest: async (id) => {
    try {
      const response = await axiosInstance.post(`/team/${id}/join`,);
      return response;
    } catch (error) {
      console.error("Error fetching topics:", error);
      throw error;
    }
  },
  ChangeRequestStatus: async (id, status) => {
    try {
      const response = await axiosInstance.patch(`/team/join-request/${id}`, { status: status });
      console.log(response);
      return response
    } catch (error) {
      console.error("Error fetching topics:", error);
      throw error;
    }
  },

  GetAllMember: async (id) => {
    try {

      const response = await axiosInstance.get(`/team/${id}/members`);
      return response;

    } catch (error) {
      console.error("Error fetching topics:", error);
      throw error;
    }
  },
  removeMember: async (idTeam, idUser) => {
    try {
      const response = await axiosInstance.delete(`/team/${idTeam}/members/${idUser}`);
      return response
    } catch (error) {
      console.error("Error fetching topics:", error);
      throw error;
    }
  },
  getAllQuizSet: async (idTeam) => {
    try {
      const response = await axiosInstance.get(`/team/${idTeam}/quiz-set`);
      return response
    } catch (error) {
      console.error("Error fetching topics:", error);
      throw error;
    }
  },
  addTeamQuizSet:async(addQuizSet:addQuizSetPayLoad,teamId)=>{
    try {
      console.log(addQuizSet);
      
      const response = await axiosInstance.post(`/team/${teamId}/quiz-set`,addQuizSet);
      return response
    } catch (error) {
      console.error("Error post QuizSet:", error);
      throw error;
    }
  },
  removeQuizSet: async (idTeam, idQuizSet) => {
    try {
      const response = await axiosInstance.delete(`/team/${idTeam}/quiz-set/${idQuizSet}`);
      return response
    } catch (error) {
      console.error("Error remove quizSet:", error);
      throw error;
    }
  },
  removeTeam: async (idTeam) => {
    try {
      const response = await axiosInstance.delete(`/team/${idTeam}`);
      return response
    } catch (error) {
      console.error("Error remove quizSet:", error);
      throw error;
    }
  },
}

export default TeamService;
