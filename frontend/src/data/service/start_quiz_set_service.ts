import axiosInstance from "../../core/instant_service/instant_service";
import axios from "axios";

interface QuizAnswerPayload {
  questionId: number;
  answer: string | string[];
}


const StartQuizService = {
    getQuizSet: async (quizSetId: string) => {
      try {
        const response = await axiosInstance.get(`/practice/quizset/${quizSetId}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching quiz set:", error);
        throw error;
      }
    },
  
    submitQuiz: async (quizSetId: string, userAnswers: any) => {
      try {
        const response = await axiosInstance.post(
          `/practice/quizset/${quizSetId}`,
          userAnswers
        );
        return response.data;
      } catch (error) {
        console.error("Error submitting quiz:", error);
        throw error;
      }
    },
  };

export default StartQuizService;
