import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/SearchBar";
import AddQuizModal from "../Quiz/AddQuizModal";
import QuizListItem from "../Quiz/QuizListItem"; 
import avatar from "../../images/avatar.png";

//Quizlist
const quizList = [
  { id: 1, content: "Question 1", type: "Multiple choice", topic: "Math", createdDate: "2023-12-25" },
  { id: 2, content: "Question 2", type: "Short answer", topic: "Science", createdDate: "2023-12-24" },
];



const QuizsetDetail = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [quizsetQuizzes, setQuizsetQuizzes] = useState(quizList);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const navigate = useNavigate();
  const [quizLibrary, setQuizLibrary] = useState([
    { id: 3, content: "Question 3", type: "Multiple choice", topic: "Math", createdDate: "2023-12-25" },
    { id: 4, content: "Question 4", type: "Short answer", topic: "Science", createdDate: "2023-12-24" },
  ]); 
  const quizsetDetail = {
    title: "Protecting the Organisation from Cyber Attacks",
    description:
      "One of the most efficient ways to protect against cyber attacks and all types of data breaches is to train your employees on cyber attack prevention and detection.",
    date: "28/07/2021",
    timeLimit: "15 Mins",
    attempts: "Twice",
    owner: "Trung Huynh",
  };
  

  const handleAddQuiz = (quiz) => {    
    // Check
    if (!quizsetQuizzes.some((q) => q.id === quiz.id)) {
      setQuizsetQuizzes([...quizsetQuizzes, quiz]);
    } else {
      alert("This question is already added to the quiz set!");
    }
  };

  const handleDeleteQuiz = (id) => {
    setQuizsetQuizzes(quizsetQuizzes.filter((quiz) => quiz.id !== id));
  };

  const filteredQuizzes = quizList
    .filter((quiz) => quiz.content.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === "name") return a.content.localeCompare(b.content);
      if (sortOption === "type") return a.type.localeCompare(b.type);
      if (sortOption === "createdDate") return new Date(a.createdDate) - new Date(b.createdDate);
      return 0;
    });

    
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-6 bg-gray-50">
        {/* Header */}
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

        {/* Quizset Information */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-2">{quizsetDetail.title}</h2>
          <p className="text-gray-700 mb-4">{quizsetDetail.description}</p>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div>
              <p>Date: {quizsetDetail.date}</p>
              <p>Time Limit: {quizsetDetail.timeLimit}</p>
              <p>Attempts: {quizsetDetail.attempts}</p>
              <p><b>Owner: {quizsetDetail.owner}</b></p> {/* Hiển thị owner */}
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              Start Quiz
            </button>
          </div>
        </div>

       {/* Quiz List */}
        <div className="mt-6 space-y-4">
          {quizsetQuizzes.map((quiz) => (
            <QuizListItem
              key={quiz.id}
              question={quiz}
              onAction={handleDeleteQuiz} 
              actionType="delete" 
            />
          ))}
        </div>


        {/* Add Quiz Button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="fixed bottom-6 right-6 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg"
        >
          Add Quiz
        </button>

        {/* Add Quiz Modal */}
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

              {/* Tabs */}
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

              {/* From Quiz Library */}
              {activeTab === 0 && (
                <div>
                {/* Search and Sort */}
                <div className="flex items-center mb-4">
                  <SearchBar
                    placeholder="Search Quiz"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <select
                    className="ml-4 px-4 py-2 border rounded-lg"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="name">Sort by Name</option>
                    <option value="type">Sort by Type</option>
                    <option value="createdDate">Sort by Created Date</option>
                  </select>
                </div>
              
                {/* Quiz Library List */}
                {quizLibrary
                  .filter((quiz) => quiz.content.toLowerCase().includes(searchQuery.toLowerCase()))
                  .sort((a, b) => {
                    if (sortOption === "name") return a.content.localeCompare(b.content);
                    if (sortOption === "type") return a.type.localeCompare(b.type);
                    if (sortOption === "createdDate") return new Date(a.createdDate) - new Date(b.createdDate);
                    return 0;
                  })
                  .map((quiz) => (
                    <QuizListItem
                      key={quiz.id}
                      question={quiz}
                      onAction={handleAddQuiz}
                      actionType="add"
                    />
                  ))}
              </div>              
              )}

              {/* New Question */}
              {activeTab === 1 && (
                <AddQuizModal
                  onClose={() => {
                    setActiveTab(0); // Back "From Quiz Library"
                  }}
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
