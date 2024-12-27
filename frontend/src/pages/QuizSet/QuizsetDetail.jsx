import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/SearchBar";
import AddQuizModal from "../Quiz/AddQuizModal"; 
import avatar from "../../images/avatar.png";

const quizList = [
  { id: 1, content: "Question 1", type: "Multiple choice", topic: "Math" },
  { id: 2, content: "Question 2", type: "Short answer", topic: "Science" },
];

const QuizsetDetail = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0); 
  const [quizsetQuizzes, setQuizsetQuizzes] = useState(quizList);
  const navigate = useNavigate(); 

  
  const quizsetDetail = {
    title: "Protecting the Organisation from Cyber Attacks",
    description:
      "One of the most efficient ways to protect against cyber attacks and all types of data breaches is to train your employees on cyber attack prevention and detection.",
    date: "28/07/2021",
    timeLimit: "15 Mins",
    attempts: "Twice",
  };

  const handleAddQuiz = (newQuiz) => {
    setQuizsetQuizzes([...quizsetQuizzes, newQuiz]);
  };

  const handleDeleteQuiz = (id) => {
    setQuizsetQuizzes(quizsetQuizzes.filter((quiz) => quiz.id !== id));
  };

  return (
    <div className="flex">
    
      <Sidebar />
      <div className="flex-1 ml-64 p-6 bg-gray-50">
      
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)} 
              className="mr-4 px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
            >
              Back
            </button>
            <h1 className="text-3xl font-bold">Quizset Detail</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-xl">Trung Huynh</div>
            <img
              src={avatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-gray-300"
            />
          </div>
        </div>

    
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-2">{quizsetDetail.title}</h2>
          <p className="text-gray-700 mb-4">{quizsetDetail.description}</p>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div>
              <p>Date: {quizsetDetail.date}</p>
              <p>Time Limit: {quizsetDetail.timeLimit}</p>
              <p>Attempts: {quizsetDetail.attempts}</p>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              Start Quiz
            </button>
          </div>
        </div>

     

        {/* Quiz List */}
        <div className="mt-6">
          {quizsetQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md mb-4"
            >
              <div>
                <h3 className="font-bold">{quiz.content}</h3>
                <p className="text-sm text-gray-500">
                  Type: {quiz.type} | Topic: {quiz.topic}
                </p>
              </div>
              <button
                onClick={() => handleDeleteQuiz(quiz.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

     
        <button
          onClick={() => setShowAddModal(true)}
          className="fixed bottom-6 right-6 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg"
        >
          Add Quiz
        </button>

    
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-2/3">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">Add Quiz to Quizset</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-red-500 text-lg font-bold"
                >
                  ✖
                </button>
              </div>

        
              <div className="flex border-b mb-4">
                <button
                  className={`flex-1 text-center py-2 ${
                    activeTab === 0
                      ? "border-b-2 border-blue-600 font-bold"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab(0)}
                >
                  From Quiz Library
                </button>
                <button
                  className={`flex-1 text-center py-2 ${
                    activeTab === 1
                      ? "border-b-2 border-blue-600 font-bold"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab(1)}
                >
                  New Question
                </button>
              </div>

           
              {activeTab === 0 && (
                <div>
                  {quizList.map((quiz) => (
                    <div
                      key={quiz.id}
                      className="flex justify-between items-center p-4 bg-gray-100 rounded-lg mb-2"
                    >
                      <div>
                        <h3 className="font-bold">{quiz.content}</h3>
                        <p className="text-sm text-gray-500">
                          Type: {quiz.type} | Topic: {quiz.topic}
                        </p>
                      </div>
                      <button
                        onClick={() => handleAddQuiz(quiz)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 1 && (
                <AddQuizModal
                  onClose={() => setShowAddModal(false)}
                  onSubmit={(newQuiz) => handleAddQuiz(newQuiz)}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizsetDetail;
