import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/SearchBar";
import AddQuizButton from "./AddQuizButton";
import QuizListItem from "./QuizListItem";
import AddQuizModal from "./AddQuizModal";
import avatar from "../../images/avatar.png";
import QuizService from "../../data/service/quiz_service";
import Pagination from "../topic/component/pagination"; // Add Pagination component
import { useSnackbar } from "../../components/NotificationBat";
import ConfirmationModal from "../../components/ConfirmModal";

const QuizLayout = () => {
  const { showSnackbar } = useSnackbar();
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [tempSearchQuery, setTempSearchQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState("createdAt");
  const [direction, setDirection] = useState("desc");
  const [quizToDelete, setQuizToDelete] = useState(null);

  const fetchData = async () => {
    try {
      const data = await QuizService.getAllQuiz(
        searchQuery,
        currentPage,
        8,
        sortKey,
        direction
      );
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

  useEffect(() => {
    fetchData();
  }, [currentPage, searchQuery, sortKey, direction]);

  const handleSearch = () => {
    setSearchQuery(tempSearchQuery);
    setCurrentPage(1);
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
      setQuizToDelete(null); // Đóng modal
    }
  };

  const handleCancelDelete = () => {
    setQuizToDelete(null); // Hủy xóa và đóng modal
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
            onClear={() => setTempSearchQuery("")}
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
              content={question.content}
              createdAt={question.createdDate}
              type={question.type}
              topic={question.topic}
              onDelete={() => handleDeleteRequest(question.id)}
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
