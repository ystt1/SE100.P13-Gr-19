import axiosInstance from "../../core/instant_service/instant_service";

const createDragAndDropPayload = (quizData) => ({
  content: quizData.question,
  topicId: quizData.topic,
  type: "DRAG_AND_DROP",
  blanks: quizData.dragOptions.map((option, index) => ({
    content: option,
    order: index + 1,
  })),
});
const createSingleChoicePayload = (quizData) => ({
  content: quizData.question,
  topicId: quizData.topic,
  type: "SINGLE_CHOICE",
  options: quizData.answers.map((answer) => ({
    content: answer.text,
    isCorrect: answer.isCorrect,
  })),
});
const createFillInTheBlankPayload = (quizData) => ({
  content: quizData.question,
  topicId: quizData.topic,
  type: "FILL_IN_THE_BLANK",
  blanks: quizData.dragOptions.map((option, index) => ({
    content: option,
    order: index + 1,
  })),
});
const createShortAnswerPayload = (quizData) => ({
  content: quizData.question,
  topicId: quizData.topic,
  type: "SHORT_ANSWER",
  answer: {
    content:quizData.correctAnswer
  },
});
const createMultipleChoicePayload = (quizData) => ({
  content: quizData.question,
  topicId: quizData.topic,
  type: "MULTIPLE_CHOICE",
  options: quizData.answers.map((answer) => ({
    content: answer.text,
    isCorrect: answer.isCorrect,
  })),
});

const QuizService = {


  
  addQuiz : async (quizData) => {
    try {
      const { type } = quizData;
      let payload;
      console.log(quizData);
      
      switch (type) {
        case "DRAG_AND_DROP":
          payload = createDragAndDropPayload(quizData);
          break;
        case "SINGLE_CHOICE":
          payload = createSingleChoicePayload(quizData);
          break;
        case "FILL_IN_THE_BLANK":
          payload = createFillInTheBlankPayload(quizData);
          break;
        case "SHORT_ANSWER":
          payload = createShortAnswerPayload(quizData);
          break;
        case "MULTIPLE_CHOICE":
          payload = createMultipleChoicePayload(quizData);
          break;
        default:
          throw new Error(`Unsupported quiz type: ${type}`);
      }
        
      const response = await axiosInstance.post(`/quiz`, payload);
  
      if (response.status!=200) {
        throw new Error("Failed to add quiz");
      }
      return response;
    } catch (error) {
      console.error("Error adding quiz:", error.message);
      throw error;
    }
  },
  getAllQuiz: async (search = "", page = 1, limit = 10, sortKey = "createdAt", direction = "asc") => {
    try {
      const response = await axiosInstance.get(`/quiz/all`, {
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
  getAllQuizOfTopic: async (topic,search = "", page = 1, limit = 10, sortKey = "createdAt", direction = "asc") => {
    try {
      const response = await axiosInstance.get(`/topic/${topic}/quizzes`, {
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
  
  delete:async(id)=>
  {
    try {
      const response = await axiosInstance.delete(`http://localhost:8080/api/quiz/${id}`);
      if(response.status==204)
      {
        return "success";
      }
      return ("error"+response.status);
    } catch (error) {
      console.error("Error fetching topics:", error);
      throw error;
    }
  }
};

export default QuizService;
