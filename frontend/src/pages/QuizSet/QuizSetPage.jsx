import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { QuizSetCard } from "./QuizSetCard";
import TabNavigation from "../../components/TabNavigation";
import AddQuizSetModal from "./AddQuizSetModal";
import SearchBar from "../../components/SearchBar";
import Sidebar from "../../components/Sidebar";
import Pagination from "../topic/component/pagination";
import QuizSetService from "../../data/service/quiz_set_service";
import { format } from "date-fns";
import { useSnackbar } from "../../components/NotificationBat";
import ConfirmationModal from "../../components/ConfirmModal";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

const QuizSetPage = () => {
  const { showSnackbar } = useSnackbar();
  const [quizSetData, setQuizSetData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSearchQuery, setTempSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(0); 
  const sortOption = searchParams.get("sort") || "id";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [sortOrder, setSortOrder] = useState("asc");
  const fetchQuizSets = async () => {
    setLoading(true);
    try {
      let data;
      if (activeTab === 0) {
        data = await QuizSetService.getAllQuizSetOfAllUser(searchQuery, currentPage, 10, sortOption, sortOrder);
      } else if (activeTab === 1) {
        data = await QuizSetService.getAllQuizSet(searchQuery, currentPage, 10, sortOption, sortOrder);
      } else {
        data = await QuizSetService.getSaveQuizSet(searchQuery, currentPage, 10, sortOption, sortOrder);
      }
      setQuizSetData(
        data.quizSets.map((quizSet) => ({
          creator:quizSet.creator.name,
          id: quizSet.id,
          name: quizSet.name,
          description: quizSet.description,
          createdTime: format(new Date(quizSet.createdTime), "MMMM d, yyyy h:mm:ss a"),
          isBookmarked: quizSet.isBookmarked ?? false,
          totalQuestion: quizSet.totalQuestion,
          isYour:quizSet.allowShowAnswer??false
        }))
      );
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching quiz sets:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchQuizSets();
  }, [searchQuery, currentPage, sortOption, activeTab,sortOrder]);
  useEffect(() => {
    const tabMapping = { all: 0, "my-quiz": 1, "my-saved": 2 };
    const currentTab = searchParams.get("tab") || "all";
    setActiveTab(tabMapping[currentTab]);
  }, [searchParams]);

  const handleDeleteRequest = (id) => {
    setQuizToDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (!quizToDelete) return;
    try {
      const response = await QuizSetService.delete(quizToDelete);
      if (response === "success") {
        showSnackbar("Delete quizset success");
        fetchQuizSets();
      } else {
        alert(response);
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
    } finally {
      setQuizToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setQuizToDelete(null);
  };

  const handleSearch = () => {
    setSearchQuery(tempSearchQuery);
  };

  const handleSortChange = (option) => {
    setSearchParams({ search: searchQuery, sort: option, page: 1 });
  };

  const handleQuizSetClick = (id) => {
    navigate(`/quizset-detail/${id}`);
  };

  const toggleSaveStatus = async (id, isBookmarked) => {
    let response;
    if (isBookmarked) {
      response = await QuizSetService.deleteBookmarked(id);
    } else {
      response = await QuizSetService.addBookmarked(id);
    }
    if (response.status === 200) {
      showSnackbar(response.data);
      fetchQuizSets();
    } else {
      alert(response);
    }
  };

  const handleAddQuizSet = async (newQuizSet) => {
    const { name, description, timeLimit } = newQuizSet;
    try {
      const response = await QuizSetService.addQuizSet({ name, description, timeLimit });
      if (response === "success") {
        showSnackbar("Quiz Set added successfully!", "success");
        fetchQuizSets();
        setShowAddModal(false);
      } else {
        alert("Failed to add Quiz Set: " + response, "error");
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again.", "error");
    }
  };

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
    const tabMapping = ["all", "my-quiz", "my-saved"];
    setSearchParams({ search: searchQuery, sort: sortOption, page: 1, tab: tabMapping[tabIndex] });
  };

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setSearchParams({ search: searchQuery, sort: sortOption, page: 1, tab: searchParams.get("tab") || "all", order: newSortOrder });
  };


  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-6 bg-gray-50">
        {/* Search Bar */}
        <SearchBar
          placeholder="Search QuizSet"
          value={tempSearchQuery}
          onChange={(e) => setTempSearchQuery(e.target.value)}
          onSearch={handleSearch}
          onClear={() => setTempSearchQuery("")}
        />

        {/* Tabs và Sort */}
        <div className="flex justify-between items-center mt-6 mb-6">
          <TabNavigation
            tabs={["All Quiz", "My Quiz Set", "My Saved Quiz Set"]}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />

          <div className="flex items-center space-x-4">
            <select
              value={sortOption}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="name">Sort by Name</option>
              <option value="createdTime">Sort by Created Date</option>
            </select>
            <button
              onClick={toggleSortOrder}
              className="px-4 py-2 bg-gray-300 text-black rounded-lg"
            >
              {sortOrder === "asc" ? (
                                <FaSortAlphaDown className="text-lg" />
                              ) : (
                                <FaSortAlphaUp className="text-lg" />
                              )}
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Add Quiz Set
            </button>
          </div>
        </div>

        {/* Quiz Sets */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {quizSetData.map((quizSet) => (
              <QuizSetCard
              creator={quizSet.creator}
                questionCount={quizSet.totalQuestion}
                key={quizSet.id}
                name={quizSet.name}
                description={quizSet.description}
                createdTime={quizSet.createdTime}
                isSaved={quizSet.isBookmarked}
                onClick={() => handleQuizSetClick(quizSet.id)}
                onToggleSave={() => toggleSaveStatus(quizSet.id, quizSet.isBookmarked)}
                onDelete={() => handleDeleteRequest(quizSet.id)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) =>
            setSearchParams({ search: searchQuery, sort: sortOption, page, tab: searchParams.get("tab") || "all" })
          }
        />


        {/* Modal */}
        {showAddModal && (
          <AddQuizSetModal
            onClose={() => setShowAddModal(false)}
            onSubmit={handleAddQuizSet}
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

export default QuizSetPage;
