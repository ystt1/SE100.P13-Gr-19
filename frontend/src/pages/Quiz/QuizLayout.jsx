import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/SearchBar";
import AddQuizButton from "../../components/AddQuizButton";
import QuizListItem from "../../components/QuizListItem";
import AddQuizModal from "../../components/AddQuizModal"; 
import avatar from "../../images/avatar.png";

const mockData = [
  {
    id: 1,
    content: "Question 1",
    createdDate: "25/12/2024",
    type: "Multiple choice",
    topic: "Math",
  },
  {
    id: 2,
    content: "Question 2",
    createdDate: "25/12/2024",
    type: "Short answer",
    topic: "Math",
  },  
  {
    id: 3,
    content: "Question 3",
    createdDate: "25/12/2024",
    type: "Short answer",
    topic: "Math",
  },
  {
    id: 4,
    content: "Question 4",
    createdDate: "25/12/2024",
    type: "Short answer",
    topic: "Math",
  },
  {
    id: 5,
    content: "Question 5",
    createdDate: "25/12/2024",
    type: "Short answer",
    topic: "Math",
  },
];

const QuizLayout = () => {
  const [questions, setQuestions] = useState(mockData); 
  const [showModal, setShowModal] = useState(false); 

  const handleDelete = (id) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };
  
  const handleAddQuiz = (quizData) => {
    const newQuiz = {
      id: questions.length + 1, 
      ...quizData,
    };
    setQuestions([...questions, newQuiz]);
    setShowModal(false); 
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-gray-50">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Quiz</h1>
          <div className="flex items-center space-x-4">
            <div className="text-lg">Trung Huynh</div>
            <img
              src={avatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2"
            />
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar />
        </div>

        {/* Quiz List */}
        <div className="space-y-4">
          {questions.map((question) => (
            <QuizListItem
              key={question.id}
              question={question}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Add Quiz Button */}
        <div className="fixed bottom-6 right-6">
          <button
            onClick={() => setShowModal(true)} 
            className="px-4 py-2 bg-purple-600 text-white rounded-full shadow-lg"
          >
            Add Quiz
          </button>
        </div>

        {/* Add Quiz Modal */}
        {showModal && (
          <AddQuizModal
            onClose={() => setShowModal(false)} 
            onSubmit={handleAddQuiz} 
          />
        )}
      </div>
    </div>
  );
};

export default QuizLayout;
