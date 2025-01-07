import React, { useState, useEffect } from "react";
import QuizSetService from "../../../data/service/quiz_set_service";
import { QuizSetCard } from "../../QuizSet/QuizsetCard";
import Pagination from "../../topic/component/pagination";
import TeamService from "../../../data/service/team_service";
import { useSnackbar } from "../../../components/NotificationBat";
const AddQuizSetModal = ({ onClose,teamId }) => {
     const { showSnackbar } = useSnackbar();
  const [myQuizSets, setMyQuizSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedQuizSet, setSelectedQuizSet] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState("");
const [selectedEndDateTime, setSelectedEndDateTime] = useState("");

  const fetchMyQuizSets = async (page = 1) => {
    setLoading(true);
    try {
      const data = await QuizSetService.getAllQuizSet(
        searchQuery,
        page,
        5, // Items per page
        sortOption,
        sortOrder
      );
      setMyQuizSets(
        data.quizSets.map((quizSet) => ({
          id: quizSet.id,
          name: quizSet.name,
          description: quizSet.description,
          createdTime: quizSet.createdTime,
          totalQuestion: quizSet.totalQuestion,
          creator: quizSet.creator.name,
        }))
      );
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching quiz sets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyQuizSets(currentPage);
  }, [searchQuery, sortOption, sortOrder, currentPage]);

  const handleSelectQuizSet = (quizSet) => {
    setSelectedQuizSet(quizSet);
  };

  const handleSave = async() => {
    if (selectedQuizSet && selectedDateTime && selectedEndDateTime) {
      // Chuyển đổi ngày giờ từ chuỗi thành đối tượng Date
      const startTime = selectedDateTime;
      const endTime = selectedEndDateTime;
      const startDate = new Date(selectedDateTime);
      const endDate = new Date(selectedEndDateTime);
        const quizSetId =selectedQuizSet.id;
      // Kiểm tra xem ngày kết thúc có lớn hơn ngày bắt đầu không
      if (endDate <= startDate) {
        alert("End date must be later than start date!");
        return;
      }
  
      var response=await TeamService.addTeamQuizSet({quizSetId,startTime,endTime},teamId)
      if(response.status===200)
      {
        showSnackbar(response.data)
        onClose()
      }
      else{
        alert("Some thing went wrong")
      }
    
    } else {
      alert("Please select a quiz set and both start and end dates!");
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-2/3 p-6 relative">
        <h2 className="text-xl font-bold mb-4">Select a Quiz Set</h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* Search and Sort Controls */}
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search Quiz Sets"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-lg w-2/3"
          />
          <div className="flex space-x-2">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="name">Sort by Name</option>
              <option value="createdTime">Sort by Created Time</option>
            </select>
            <button
              onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              {sortOrder === "asc" ? "Asc" : "Desc"}
            </button>
          </div>
        </div>

        {/* Quiz Sets List */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-4 overflow-y-auto"
            style={{ maxHeight: "200px" }}
          >
            {myQuizSets.map((quizSet) => (
              <QuizSetCard
                key={quizSet.id}
                name={quizSet.name}
                description={quizSet.description}
                createdTime={quizSet.createdTime}
                questionCount={quizSet.totalQuestion}
                creator={quizSet.creator}
                onClick={() => handleSelectQuizSet(quizSet)}
                selected={selectedQuizSet?.id === quizSet.id}
                onSelect={() => handleSelectQuizSet(quizSet)} 
              />
            ))}
          </div>
        )}

        {/* DateTime Picker and Save Button */}
        {selectedQuizSet && (
  <div className="mt-4">
    <h3 className="font-bold text-lg mb-2">Selected Quiz Set: {selectedQuizSet.name}</h3>
    <input
      type="datetime-local"
      value={selectedDateTime}
      onChange={(e) => setSelectedDateTime(e.target.value)}
      className="border px-4 py-2 rounded-lg w-full mb-4"
      placeholder="Start Date & Time"
    />
    <input
      type="datetime-local"
      value={selectedEndDateTime}
      onChange={(e) => setSelectedEndDateTime(e.target.value)}
      className="border px-4 py-2 rounded-lg w-full mb-4"
      placeholder="End Date & Time"
    />
    <button
      onClick={handleSave}
      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
    >
      Save
    </button>
  </div>
)}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default AddQuizSetModal;
