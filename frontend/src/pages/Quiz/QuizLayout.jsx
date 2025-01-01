import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/SearchBar";
import AddQuizButton from "./AddQuizButton";
import QuizListItem from "./QuizListItem";
import AddQuizModal from "./AddQuizModal"; 
import avatar from "../../images/avatar.png";
import QuizService from "../../data/service/quiz_service";
import { useSnackbar } from "../../components/NotificationBat";


const QuizLayout = () => {
  const { showSnackbar } = useSnackbar();
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState("createdAt");
  const [direction, setDirection] = useState("desc");

  
  const fetchData = async () => {
    try {
      const data = await QuizService.getAllQuiz(sortKey,direction);
      console.log(data);
      if (data.quizzes) {
        setQuestions(
          data.quizzes.map((quiz) => ({
            id: quiz.id,
            content: quiz.content,
            createdDate: new Date(quiz.createdAt).toLocaleDateString(),
            type: quiz.type.replace("_", " ").toLowerCase(),
            topic: quiz.topic.name,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [sortKey, direction]);

  
  const handleDeleteButton = async (id) => {
    try {
      const response = await QuizService.delete(id);
      if (response === "success") {
        showSnackbar("Delete success");
        setQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question.id !== id)
        );
      } else {
        alert(response);
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };
  
  const filteredQuestions = questions.filter((question) =>
    question.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <div className="flex items-center space-x-2">
            <select
              className="border px-4 py-2 rounded-lg"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
            >
              <option value="createdAt">Sort by Created Date</option>
              <option value="content">Sort by Content</option>
              <option value="type">Sort by Type</option>
              <option value="topic">Sort by Topic</option>
              <option value="id">Sort by ID</option>
            </select>
            <button
              onClick={() =>
                setDirection((prev) => (prev === "asc" ? "desc" : "asc"))
              }
              className="px-4 py-2 border rounded-lg"
            >
              {direction === "asc" ? "Ascending" : "Descending"}
            </button>
          </div>
        </div>

        {/* Quiz List */}
        <div className="space-y-4">
          {questions.map((question) => (
            <QuizListItem
              key={question.id}
              question={question}
              onDelete={() => handleDeleteButton(question.id)}
              
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
            onSuccess={fetchData}
            onSubmit={(quizData) => {
              const newQuiz = {
                id: questions.length + 1,
                ...quizData,
              };
              setQuestions([...questions, newQuiz]);
              setShowModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default QuizLayout;
