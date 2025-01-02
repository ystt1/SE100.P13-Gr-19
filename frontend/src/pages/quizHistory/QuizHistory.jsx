import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

//Fetch API

// const QuizHistory = () => {
//   const [quizHistory, setQuizHistory] = useState([]);
//   const navigate = useNavigate();

//   
//   const fetchQuizHistory = async () => {
//     try {
//      
//       const response = await fetch("https://api/quiz/history");
//       const data = await response.json();
//       setQuizHistory(data); // Cập nhật dữ liệu vào state
//     } catch (error) {
//       console.error("Failed to fetch quiz history:", error);
//     }
//   };

//   useEffect(() => {
//     fetchQuizHistory(); // Gọi fetch API khi component mount
//   }, []);


  const QuizHistory = () => {
   
    const sampleQuizHistory = [
      {
        id: 1,
        name: "Quiz Set 1",
        description: "Description for Quiz Set 1",
        createdTime: "2025-01-01T01:15:31.344+00:00",
        updatedTime: "2025-01-01T01:15:31.344+00:00",
        timeLimit: 1800,
        totalQuestion: 15,
        allowShowAnswer: true,
        isBookmarked: false,
        creator: {
          id: 1,
          name: "John Doe",
        },
      },
      {
        id: 2,
        name: "Quiz Set 2",
        description: "Description for Quiz Set 2",
        createdTime: "2025-01-02T01:15:31.344+00:00",
        updatedTime: "2025-01-02T01:15:31.344+00:00",
        timeLimit: 1200,
        totalQuestion: 20,
        allowShowAnswer: true,
        isBookmarked: false,
        creator: {
          id: 2,
          name: "Jane Smith",
        },
      },
      {
        id: 3,
        name: "Quiz Set 3",
        description: "Description for Quiz Set 3",
        createdTime: "2025-01-03T01:15:31.344+00:00",
        updatedTime: "2025-01-03T01:15:31.344+00:00",
        timeLimit: 2400,
        totalQuestion: 10,
        allowShowAnswer: true,
        isBookmarked: true,
        creator: {
          id: 3,
          name: "Alice Johnson",
        },
      },
    ];
  
    const [quizHistory, setQuizHistory] = useState(sampleQuizHistory);
    const navigate = useNavigate();


  const handleReviewQuiz = (quizSetId) => {
    navigate(`/dashboard/quiz/complete/${quizSetId}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
         <Sidebar className="fixed top-0 left-0 w-64 h-full bg-white shadow-md z-50" />
         <div className="ml-64 flex-1 p-6">

      <h1 className="text-2xl font-bold mb-4">Quiz History</h1>

      {/* Search Bar */}
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Enter Quiz Name"
          className="w-full p-3 border rounded-l-lg"
        />
        <button className="bg-blue-500 text-white px-4 py-3 rounded-r-lg">
          🔄
        </button>
      </div>

      {/* Quiz History List */}
      <div className="grid grid-cols-1 gap-4">
        {quizHistory.length > 0 ? (
          quizHistory.map((quiz) => (
            <div
              key={quiz.id}
              className="flex items-center bg-white p-4 shadow-md rounded-lg"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                📚
              </div>
              <div className="flex-grow ml-4">
                <p className="text-sm text-gray-500">
                  Created: {new Date(quiz.createdTime).toLocaleString()}
                </p>
                <h3 className="text-lg font-semibold">{quiz.name}</h3>
                <p className="text-sm text-gray-500">
                  Total Questions: {quiz.totalQuestion}
                </p>
                <p className="text-sm text-gray-500">
                  Created by: {quiz.creator.name}
                </p>
                <p className="text-sm text-gray-500">
                  Time Limit: {Math.floor(quiz.timeLimit / 60)} minutes
                </p>
              </div>
              <button
                onClick={() => handleReviewQuiz(quiz.id)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                xem lại
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No quiz history found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button className="text-blue-500 hover:underline">← Previous Page</button>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-blue-500 text-white rounded-lg">1</button>
          <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg">2</button>
          <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg">3</button>
        </div>
        <button className="text-blue-500 hover:underline">Next Page →</button>
      </div>
    </div>
    </div>
  );
};

export default QuizHistory;
