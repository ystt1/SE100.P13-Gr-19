import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import { FaClock } from "react-icons/fa";

const QuizStartPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy quizSet ID từ URL
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 phút

  // Fetch quiz data từ API
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`/api/practice/quizset/${id}`);
        const data = await response.json();
        console.log("Quiz Data:", data); // Kiểm tra dữ liệu
        setQuizData(data.questions);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu quiz:", error);
      }
    };

    fetchQuizData();
  }, [id]);

  // Đếm ngược thời gian
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit(); // Nộp bài khi hết giờ
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format thời gian hiển thị
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Xử lý lưu câu trả lời của người dùng
  const handleAnswerChange = (answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [quizData[currentQuestionIndex].id]: answer,
    }));
  };

  // Xử lý nộp bài
  const handleSubmit = () => {
    navigate(`/dashboard/quiz/complete/${id}`, {
      state: { userAnswers },
    });
  };

  // Hiển thị câu hỏi hiện tại
  const renderQuestion = () => {
    const currentQuestion = quizData[currentQuestionIndex];

    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case "SINGLE_CHOICE":
        return currentQuestion.options.map((option, index) => (
          <div key={index} className="mb-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                value={option}
                checked={userAnswers[currentQuestion.id] === option}
                onChange={() => handleAnswerChange(option)}
              />
              {option}
            </label>
          </div>
        ));
      case "MULTIPLE_CHOICE":
        return currentQuestion.options.map((option, index) => (
          <div key={index} className="mb-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name={`question-${currentQuestion.id}`}
                value={option}
                checked={
                  Array.isArray(userAnswers[currentQuestion.id]) &&
                  userAnswers[currentQuestion.id].includes(option)
                }
                onChange={() => {
                  const currentAnswers =
                    userAnswers[currentQuestion.id] || [];
                  const updatedAnswers = currentAnswers.includes(option)
                    ? currentAnswers.filter((ans) => ans !== option)
                    : [...currentAnswers, option];
                  handleAnswerChange(updatedAnswers);
                }}
              />
              {option}
            </label>
          </div>
        ));
      case "FILL_IN_THE_BLANK":
      case "SHORT_ANSWER":
        return (
          <input
            type="text"
            className="w-full border rounded p-2"
            value={userAnswers[currentQuestion.id] || ""}
            onChange={(e) => handleAnswerChange(e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar className="fixed top-0 left-0 w-64 h-full bg-white shadow-md z-50" />
      <div className="ml-64 flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg shadow mb-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel
          </button>

          <div className="text-center">
            <h2 className="text-lg font-bold text-blue-800 mb-1">
              {`This is just a title of Quiz`}
            </h2>
            <div className="text-sm text-gray-600">
              {`Answered: ${Object.keys(userAnswers).length} / ${quizData.length}`}
            </div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-2">
              <FaClock className="text-blue-800" />
              {`Time Left: ${formatTime(timeLeft)}`}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
          >
            Submit
          </button>
        </div>

        {/* Question */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-4">
            {`Question ${currentQuestionIndex + 1} / ${quizData.length}`}
          </h3>
          <p className="mb-4 text-gray-700">{currentQuestion?.question}</p>
          {renderQuestion()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            disabled={currentQuestionIndex === 0}
            onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
            className={`px-4 py-2 rounded shadow ${
              currentQuestionIndex === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-500 text-white hover:bg-gray-600"
            }`}
          >
            Previous
          </button>
          <button
            disabled={currentQuestionIndex === quizData.length - 1}
            onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
            className={`px-4 py-2 rounded shadow ${
              currentQuestionIndex === quizData.length - 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-500 text-white hover:bg-gray-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizStartPage;
