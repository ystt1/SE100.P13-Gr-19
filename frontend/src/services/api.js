import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// Quiz APIs
export const fetchQuizzes = (params) =>
  axios.get(`${API_BASE}/quiz`, { params }).then((res) => res.data);

export const addQuiz = (quizData) =>
  axios.post(`${API_BASE}/quiz`, quizData).then((res) => res.data);

export const deleteQuiz = (id) =>
  axios.delete(`${API_BASE}/quiz/${id}`).then((res) => res.data);

export const updateQuiz = (id, quizData) =>
  axios.patch(`${API_BASE}/quiz/${id}`, quizData).then((res) => res.data);


export const createQuizSet = async (quizSetData) => {
  const response = await axios.post(`${API_BASE_URL}/quiz-set`, quizSetData);
  return response.data;
};

export const deleteQuizSet = async (quizSetId) => {
  const response = await axios.delete(`${API_BASE_URL}/quiz-set/${quizSetId}`);
  return response.data;
};

export const updateQuizSet = async (quizSetId, updatedData) => {
  const response = await axios.patch(
    `${API_BASE_URL}/quiz-set/${quizSetId}`,
    updatedData
  );
  return response.data;
};

export const addQuiz = async (quizData) => {
  const response = await axios.post(`${API_BASE_URL}/quiz`, quizData);
  return response.data;
};
