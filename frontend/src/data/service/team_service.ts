import axiosInstance from "../../core/instant_service/instant_service";
import axios from 'axios';

interface TopicAddPayload {
  name: string;
  description: string;
}



const TeamService = {
  addTeams: async (topicAddPayload: TopicAddPayload) => {
    try {
      const response = await axiosInstance.post("/teams/create", topicAddPayload);
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
  }
}

export default TeamService;

