import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import axios from "axios";

import HistoryService from "../../data/service/history_service";

const QuizHistory = () => {
  const [quizHistory, setQuizHistory] = useState([]);
  const navigate = useNavigate();

  // Lấy danh sách lịch sử từ API
  useEffect(() => {
    const fetchQuizHistory = async () => {
      try {
        const response = await HistoryService.getAllHistory();
        console.log(response);
        
        setQuizHistory(response);
      } catch (error) {
        console.error("Error fetching quiz history:", error);
      }
    };

    fetchQuizHistory();
  }, []);

  const handleReviewQuiz = (quizId) => {
    navigate(`/history-detail/${quizId}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Sidebar className="fixed top-0 left-0 w-64 h-full bg-white shadow-md z-50" />
      <div className="ml-64 flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Quiz History</h1>

        <div className="grid grid-cols-1 gap-4">
          {quizHistory.length > 0 ? (
            quizHistory.map((history) => (
              <div
                key={history.id}
                className="flex items-center bg-white p-4 shadow-md rounded-lg"
              >
                <div className="flex-grow ml-4">
                  <p className="text-sm text-gray-500">
                    Created At:{" "}
                    {new Date(history.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Attempt Time: {history.attemptTime}
                  </p>
                  <p className="text-sm text-gray-500">
                    Complete Time: {history.completeTime} seconds
                  </p>
                  <p className="text-sm text-gray-500">
                    Number Correct: {history.numberCorrect}
                  </p>
                </div>
                <button
                  onClick={() => handleReviewQuiz(history.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Xem lại
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No quiz history found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizHistory;
