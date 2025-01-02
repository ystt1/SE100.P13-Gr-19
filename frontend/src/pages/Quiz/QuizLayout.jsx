import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"; // Import thêm useParams
import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/SearchBar";
import AddQuizButton from "./AddQuizButton";
import QuizListItem from "./QuizListItem";
import AddQuizModal from "./AddQuizModal";
import QuizService from "../../data/service/quiz_service";
import Pagination from "../topic/component/pagination"; // Add Pagination component
import { useSnackbar } from "../../components/NotificationBat";
import ConfirmationModal from "../../components/ConfirmModal";

const QuizLayout = () => {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const { id: topicId } = useParams(); // Lấy topicId nếu có

  const [questions, setQuestions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);
  const [tempSearchQuery, setTempSearchQuery] = useState("");

  // Parse URL parameters
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page")) || 1; 
  const sortKey = queryParams.get("sortKey") || "createdAt";
  const direction = queryParams.get("direction") || "desc";
  const searchQuery = queryParams.get("search") || "";

  // Fetch data based on URL parameters
  const fetchData = async () => {
    try {
      let data;
      if (topicId) {
        // Fetch quizzes for a specific topic
        data = await QuizService.getAllQuizOfTopic(
          topicId,
          searchQuery,
          currentPage,
          8, // Limit fixed for topic-specific quizzes
          sortKey,
          direction
        );
      } else {
        // Fetch all quizzes
        data = await QuizService.getAllQuiz(
          searchQuery,
          currentPage,
          8,
          sortKey,
          direction
        );
      }

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
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  // Sync data when URL changes
  useEffect(() => {
    fetchData();
  }, [location.search, topicId]);

  const updateURL = (updates) => {
    const params = new URLSearchParams(location.search);
    Object.keys(updates).forEach((key) => {
      if (updates[key] === null) {
        params.delete(key); 
      } else {
        params.set(key, updates[key]);
      }
    });
    navigate(`?${params.toString()}`);
  };

  const handleSearch = () => {
    updateURL({ search: tempSearchQuery, page: 1 });
  };

  const handleSortChange = (key) => {
    updateURL({ sortKey: key, page: 1 });
  };

  const handleDirectionChange = () => {
    updateURL({ direction: direction === "asc" ? "desc" : "asc", page: 1 });
  };

  const handlePageChange = (page) => {
    updateURL({ page });
  };

  const handleQuizSubmit = async (quizData) => {
    const response = await QuizService.addQuiz(quizData);
    if (response.status === 200) {
      showSnackbar("Add Quiz Success");
      fetchData();
    }
  };

  const handleDeleteRequest = (id) => {
    setQuizToDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (!quizToDelete) return;

    try {
      const response = await QuizService.delete(quizToDelete);
      if (response === "success") {
        showSnackbar("Delete success");
        setQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question.id !== quizToDelete)
        );
      } else {
        alert(response);
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
    } finally {
      setQuizToDelete(null); // Close modal
    }
  };

  const handleCancelDelete = () => {
    setQuizToDelete(null); // Cancel delete and close modal
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-gray-50">
        {/* Search Bar and Sort */}
        <div className="flex items-center justify-between mb-6">
          <SearchBar
            value={tempSearchQuery}
            onChange={(e) => setTempSearchQuery(e.target.value)}
            onSearch={handleSearch} 
            onClear={() => {
              setTempSearchQuery("");
              updateURL({ search: "", page: 1 });
            }}
          />
          <div className="flex items-center space-x-2">
            <select
              className="border px-4 py-2 rounded-lg"
              value={sortKey}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="createdAt">Sort by Created Date</option>
              <option value="content">Sort by Content</option>
              <option value="type">Sort by Type</option>
              <option value="topic">Sort by Topic</option>
              <option value="id">Sort by ID</option>
            </select>
            <button
              onClick={handleDirectionChange}
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
              content={question.content}
              createdAt={question.createdDate}
              type={question.type}
              topic={question.topic}
              onAction={() => handleDeleteRequest(question.id)}
              actionType={"delete"}
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

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
            onSubmit={handleQuizSubmit}
          />
        )}

        {quizToDelete && (
          <ConfirmationModal
            title="Confirm Delete"
            message="Are you sure you want to delete this quiz? This action cannot be undone."
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </div>
    </div>
  );
};

export default QuizLayout;
