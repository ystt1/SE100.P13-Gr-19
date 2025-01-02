import axios from "axios";
import axiosInstance from "../../core/instant_service/instant_service";
interface QuizsetAddPayload {
  name: string;
  description: string;
  timeLimit: number;
  allowShowAnswer: false;
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


      return response.data;
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      throw error;
    }
  },
  getSaveQuizSet: async (search = "", page = 1, limit = 10, sortKey = "id", direction = "asc") => {
    try {
      const response = await axiosInstance.get(`/quiz-set/bookmarks`, {
        params: {
          search,
          page,
          limit,
          sortElement: sortKey,
          direction,
        },
      });


      return response.data;
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      throw error;
    }
  },

  addQuizSet: async (quizSetAddPayload: QuizsetAddPayload) => {
    try {
      const response = await axiosInstance.post("/quiz-set", quizSetAddPayload);
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
  delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`http://localhost:8080/api/quiz-set/${id}`);
      if (response.status == 204) {
        return "success";
      }
      return ("error" + response.status);
    } catch (error) {
      throw error;
    }
  },
  addBookmarked: async (id) => {
    try {
      const response = await axiosInstance.post(`http://localhost:8080/api/quiz-set/${id}/bookmark`);
      console.log(response);

      if (response.status == 200) {
        return response;
      }
      return ("error" + response.status);
    } catch (error) {
      throw error;
    }
  },
  deleteBookmarked: async (id) => {
    try {
      const response = await axiosInstance.delete(`http://localhost:8080/api/quiz-set/${id}/bookmark`);
      console.log(response);

      if (response.status == 200) {
        return response;
      }
      return ("error" + response.status);
    } catch (error) {
      throw error;
    }
  },
  getQuizSetDetail: async (id) => {
    try {
      const response = await axiosInstance.get(`http://localhost:8080/api/quiz-set/${id}`);
      if (response.status == 200) {
        return response;
      }
      return ("error" + response.status);
    } catch (error) {
      throw error;
    }
  },
  getQuizOfQuizSet: async (id) => {
    try {
      const response = await axiosInstance.get(`http://localhost:8080/api/quiz-set/${id}/quizzes`);

      if (response.status == 200) {
        return response;
      }
      return ("error" + response.status);
    } catch (error) {
      throw error;
    }
  },
  addQuizToQuizSet: async (listquizId,id) => {
    try {
      const response = await axiosInstance.post(`http://localhost:8080/api/quiz-set/${id}/quiz`,listquizId);
      console.log(response);
      if (response.status == 200) {
        return response;
      }
      return ("error" + response.status);
    } catch (error) {
      throw error;
    }
  },


  updateQuizSet: async (id,changeData) => {
    try {
      const response = await axiosInstance.patch(`/quiz-set/${id}`, changeData);
     return response;
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
  changeAllowShowAnswer: async (id) => {
    try {
      const response = await axiosInstance.patch(`/quiz-set/${id}/allow-show-answer`);
      
     return response;
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
  changDisableShowAnswer: async (id) => {
    try {
      const response = await axiosInstance.patch(`/quiz-set/${id}/disable-show-answer`);
     return response;
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
  removeQuizFromQuizSet: async (id,idQuiz) => {
    try {
      const response = await axiosInstance.delete(`/quiz-set/${id}/quiz/${idQuiz}`);
     return response;
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
