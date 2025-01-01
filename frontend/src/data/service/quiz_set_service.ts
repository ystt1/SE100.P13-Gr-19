import axios from "axios";
import axiosInstance from "../../core/instant_service/instant_service";
interface QuizsetAddPayload {
  name: string;
  description: string;
  allowShowAnswer:false;
}

const QuizSetService = {
  getAllQuizSet: async (search = "", page = 1, limit = 10, sortKey = "id", direction = "asc") => {
        try {
      const response = await axiosInstance.get(`/quiz-set/all`, {
        params: {
          search,
          page,
          limit,
          sortElement: sortKey,
          direction,
        },
      });
      console.log(response);
      
      return response.data;
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      throw error;
    }
  },
  
  addTopic: async (topicAddPayload: QuizsetAddPayload) => {
    try {
      const response = await axiosInstance.post("/quiz-set", topicAddPayload);
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

      return "Add quiz-set Fail";
    }
  },


  
};

export default QuizSetService;
