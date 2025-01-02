import React, { useState, useEffect } from "react";
import SearchBar from "../../../components/SearchBar";
import Pagination from "../../topic/component/pagination"; // Pagination Component
import QuizListItem from "../../Quiz/QuizListItem";
import QuizService from "../../../data/service/quiz_service";

const AddQuizModal = ({ show, onClose, onAddQuiz, quizsetQuizzes }) => {
    if (!show) return null;

    const [allQuizzes, setAllQuizzes] = useState([]);
    const [selectedQuizzes, setSelectedQuizzes] = useState([]);
    const [tempSearchQuery, setTempSearchQuery] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortKey, setSortKey] = useState("createdAt");
    const [direction, setDirection] = useState("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchAllQuizzes = async () => {
        try {
            const data = await QuizService.getAllQuiz(
                searchQuery,
                currentPage,
                8, // Items per page
                sortKey,
                direction
            );

            if (data.quizzes) {
                // Loại bỏ các quiz đã tồn tại trong quizsetQuizzes
                const filteredQuizzes = data.quizzes.filter(
                    (quiz) => !quizsetQuizzes.some((q) => q.id === quiz.id)
                );
                setAllQuizzes(filteredQuizzes);
                setTotalPages(data.totalPages);
            }
        } catch (error) {
            console.error("Error fetching quizzes:", error);
        }
    };

    useEffect(() => {
        fetchAllQuizzes();
    }, [searchQuery, sortKey, direction, currentPage]);

    const handleSearch = () => {
        setSearchQuery(tempSearchQuery);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const toggleQuizSelection = (quiz) => {
        if (selectedQuizzes.some((q) => q.id === quiz.id)) {
            setSelectedQuizzes(selectedQuizzes.filter((q) => q.id !== quiz.id));
        } else {
            setSelectedQuizzes([...selectedQuizzes, quiz]);
        }
    };

    const handleConfirmAdd = () => {
        onAddQuiz(selectedQuizzes);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-2/3 relative flex flex-col">
                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-bold">Add Quiz to Quizset</h2>
                    <button
                        onClick={onClose}
                        className="text-red-500 text-lg font-bold"
                    >
                        ✖
                    </button>
                </div>

                {/* Search and Sort */}
                <div className="flex items-center justify-between mb-4">
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

                {/* Scrollable Quiz List */}
                <div className="flex-1 overflow-y-auto mb-4 max-h-80 border-t">
                    {allQuizzes.map((quiz) => (
                        <QuizListItem
                            key={quiz.id}
                            content={quiz.content}
                            type={quiz.type}
                            topic={quiz.topic?.name}
                            createdAt={new Date(quiz.createdAt).toLocaleDateString()}
                            onAction={() => toggleQuizSelection(quiz)}
                            actionType={selectedQuizzes.some((q) => q.id === quiz.id) ? "selected" : "add"}
                        />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center border-t pt-4">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                    {/* Confirm Add Button */}
                    <button
                        onClick={handleConfirmAdd}
                        disabled={selectedQuizzes.length === 0}
                        className={`px-6 py-3 rounded-lg shadow-md ${selectedQuizzes.length === 0
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                : "bg-green-500 text-white hover:bg-green-700"
                            }`}
                    >
                        Confirm Add
                    </button>
                </div>
            </div>
        </div>
    );
};


export default AddQuizModal;