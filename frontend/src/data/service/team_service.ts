import axios from "axios";
import axiosInstance from "../../core/instant_service/instant_service";

interface TeamAddPayload {
  name: string;
  description: string;
}

// Main Team Service
const TeamService = {
  // Fetch all teams
  getAllTeams: async () => {
    try {
      const response = await axiosInstance.get("/teams/all");
      return response.data.results; // Assuming the API returns a list of teams under `results`
    } catch (error) {
      console.error("Error fetching teams:", error);
      throw error;
    }
  },

  // Add a new team
  addTeam: async (teamAddPayload: TeamAddPayload) => {
    try {
      const response = await axiosInstance.post("/teams/create", teamAddPayload);

      if (response.status === 200) {
        return response.data; // Return the created team data
      }
      return response.data.message;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const { data } = error.response;
          return data.message;
        }
      }
      return "Unexpected error while adding team";
    }
  },

  // Join a team
  joinTeam: async (teamId: number) => {
    try {
      const response = await axiosInstance.post(`/teams/${teamId}/join`);
      return response.data;
    } catch (error) {
      console.error("Error joining team:", error);
      throw error;
    }
  }, 

  // Fetch team details (for status = 0, 1)
  getTeamDetails: async (teamId: number) => {
    try {
      const response = await axiosInstance.get(`/teams/${teamId}/details`);
      return response.data; // Assuming API returns team details
    } catch (error) {
      console.error("Error fetching team details:", error);
      throw error;
    }
  },

  // Remove a member from the team (change role instead of deleting)
  removeTeamMember: async (teamId: number, memberId: number) => {
    try {
      const response = await axiosInstance.post(`/teams/${teamId}/remove-member`, {
        memberId,
      });
      return response.data;
    } catch (error) {
      console.error("Error removing team member:", error);
      throw error;
    }
  },

  // Add a new quizset to the team
  addQuizSet: async (teamId: number, quizSetPayload: any) => {
    try {
      const response = await axiosInstance.post(
        `/teams/${teamId}/add-quizset`,
        quizSetPayload
      );
      return response.data;
    } catch (error) {
      console.error("Error adding quizset:", error);
      throw error;
    }
  },

  // Get leaderboard for a quizset
  getLeaderboard: async (quizSetId: number) => {
    try {
      const response = await axiosInstance.get(`/quizset/${quizSetId}/leaderboard`);
      return response.data;
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      throw error;
    }
  },

   // Send join request
   joinTeamRequest: async (teamId) => {
    try {
      const response = await axiosInstance.post(`/teams/${teamId}/join`);
      return response.data.message || "success";
    } catch (error) {
      console.error("Error sending join request:", error);
      throw error;
    }
  },

  // Cancel join request
  cancelJoinRequest: async (teamId) => {
    try {
      const response = await axiosInstance.post(`/teams/${teamId}/cancel`);
      return response.data.message || "success";
    } catch (error) {
      console.error("Error canceling join request:", error);
      throw error;
    }
  },

  approveRequest: async (teamId, requestId) => {
    try {
      const response = await axiosInstance.post(`/teams/${teamId}/approve`, {
        requestId,
      });
      return response.data.message || "success";
    } catch (error) {
      console.error("Error approving request:", error);
      throw error;
    }
  },
  
  rejectRequest: async (teamId, requestId) => {
    try {
      const response = await axiosInstance.post(`/teams/${teamId}/reject`, {
        requestId,
      });
      return response.data.message || "success";
    } catch (error) {
      console.error("Error rejecting request:", error);
      throw error;
    }
  },
  
  leaveTeam: async (teamId) => {
    try {
      const response = await axiosInstance.post(`/teams/${teamId}/leave`);
      return response.data.message || "success";
    } catch (error) {
      console.error("Error leaving team:", error);
      throw error;
    }
  },

  // // Export quiz results to Excel
  // exportQuizResults: async (quizSetId: number) => {
  //   try {
  //     const response = await axiosInstance.get(
  //       `/quizset/${quizSetId}/export-results`,
  //       { responseType: "blob" } 
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error exporting quiz results:", error);
  //     throw error;
  //   }
  // },
};

export default TeamService;
