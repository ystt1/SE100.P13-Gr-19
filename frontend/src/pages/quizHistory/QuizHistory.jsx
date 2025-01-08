import React, { useEffect, useState } from "react";
import { useNavigate,useParams, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Pagination from "../topic/component/pagination";
import HistoryService from "../../data/service/history_service";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

const QuizHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Lấy teamId và quizSetId từ URL (nếu có)
  const { teamId, quizSetId } = useParams(); 

  // Các state
  const [page, setPage] = useState(Number(queryParams.get("page")) || 1);
  const [limit, setLimit] = useState(Number(queryParams.get("limit")) || 5);
  const [sortElement, setSortElement] = useState(queryParams.get("sortElement") || "createdAt");
  const [direction, setDirection] = useState(queryParams.get("direction") || "asc");
  const [quizHistory, setQuizHistory] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  // Danh sách các loại sắp xếp
  const sortOptions = [
    { value: "createdAt", label: "Created At" },
    { value: "quizSetName", label: "Quiz Set Name" },
    { value: "attemptTime", label: "Attempt Time" },
    { value: "completeTime", label: "Complete Time" },
    { value: "numberCorrect", label: "Number Correct" },
  ];

  useEffect(() => {
    const fetchQuizHistory = async () => {
      try {
        let response;
        if (teamId && quizSetId) {
          // Nếu có teamId và quizSetId, gọi API với tham số bổ sung
          response = await HistoryService.getHistoryByTeamAndQuizSet({
            teamId,
            quizSetId,
            page,
            limit,
            sortElement,
            direction,
          });
        } else {
          // Nếu không có teamId và quizSetId, gọi API mặc định
          response = await HistoryService.getAllHistory({
            page,
            limit,
            sortElement,
            direction,
          });
        }

        const resultsWithUser = await Promise.all(
          response.results.map(async (result) => {
            try {
              const user = await HistoryService.getUser(result.userId);
              return { ...result, userName: user.data.name };
            } catch (error) {
              console.error(`Error fetching user for ID ${result.userId}:`, error);
              return { ...result, userName: "Unknown" };
            }
          })
        );
        
       
        setQuizHistory(resultsWithUser);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Error fetching quiz history:", error);
      }
    };

    fetchQuizHistory();
  }, [teamId, quizSetId, page, limit, sortElement, direction]);

  const updateUrl = () => {
    const params = new URLSearchParams({
      page,
      limit,
      sortElement,
      direction,
    });
    if (teamId) params.append("teamId", teamId);
    if (quizSetId) params.append("quizSetId", quizSetId);
    navigate(`?${params.toString()}`);
  };

  useEffect(updateUrl, [page, limit, sortElement, direction, teamId, quizSetId]);

  const handleSortChange = (event) => {
    setSortElement(event.target.value);
  };

  const toggleDirection = () => {
    setDirection(direction === "asc" ? "desc" : "asc");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Sidebar className="fixed top-0 left-0 w-64 h-full bg-white shadow-md z-50" />
      <div className="ml-64 flex-1 p-6">
        <div className="flex items-center gap-4 mb-4">
          <label htmlFor="sort" className="text-lg font-medium text-gray-700">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortElement}
            onChange={handleSortChange}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            onClick={toggleDirection}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
          >
            {direction === "asc" ? (
              <FaSortAlphaDown className="text-lg" />
            ) : (
              <FaSortAlphaUp className="text-lg" />
            )}
          </button>
        </div>

        {/* Quiz History List */}
        <div className="grid grid-cols-1 gap-4">
        {quizHistory.length > 0 ? (
  quizHistory.map((history) => (
    <div
      key={history.id}
      className="flex items-center bg-white p-4 shadow-md rounded-lg"
    >
      <div className="flex-grow ml-4">
        <p className="text-sm text-gray-500">
          Created At: {new Date(history.createdAt).toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">
          Quiz Set Name: {history.quizSetName}
        </p>
        <p className="text-sm text-gray-500">
          Attempt Time: {history.attemptTime}
        </p>
        <p className="text-sm text-gray-500">
          Complete Time: {history.completeTime} seconds
        </p>
        <p className="text-sm text-gray-500">
          Number Correct: {history.numberCorrect}
        </p>
        <p className="text-sm text-gray-500">
          User Name: {history.userName}
        </p>
      </div>
      <button
        onClick={() => navigate(`/history-detail/${history.id}`)}
        className="bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        Xem lại
      </button>
    </div>
  ))
) : (
  <p className="text-gray-500">No quiz history found.</p>
)}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
};

export default QuizHistory;
