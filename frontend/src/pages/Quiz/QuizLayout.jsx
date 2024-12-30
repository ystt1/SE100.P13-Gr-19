import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/SearchBar";
import AddQuizButton from "./AddQuizButton";
import QuizListItem from "./QuizListItem";
import AddQuizModal from "./AddQuizModal"; 
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
];

const QuizLayout = () => {
  const [questions, setQuestions] = useState(mockData);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState("createdDate");

  //  xóa câu hỏi
  const handleDelete = (id) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  // thêm quiz
  const handleAddQuiz = (quizData) => {
    const newQuiz = {
      id: questions.length + 1, 
      ...quizData,
    };
    setQuestions([...questions, newQuiz]);
    setShowModal(false);
  };

  // tìm kiếm
  const filteredQuestions = questions.filter((question) =>
    question.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //  sắp xếp
  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (sortKey === "createdDate") {
      return new Date(a.createdDate) - new Date(b.createdDate);
    }
    if (sortKey === "content") {
      return a.content.localeCompare(b.content);
    }
    if (sortKey === "type") {
      return a.type.localeCompare(b.type);
    }
    return 0;
  });

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

        {/* Search Bar và Sort */}
        <div className="flex items-center justify-between mb-6">
          <SearchBar
            placeholder="Search Quiz"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="border px-4 py-2 rounded-lg"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
          >
            <option value="createdDate">Sort by Created Date</option>
            <option value="content">Sort by Content</option>
            <option value="type">Sort by Type</option>
          </select>
        </div>

        {/* Quiz List */}
        <div className="space-y-4">
          {sortedQuestions.map((question) => (
            <QuizListItem
              key={question.id}
              question={question}
              onAction={handleDelete}
              actionType="delete"
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
