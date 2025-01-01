import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import { FaClock } from "react-icons/fa"; 
const QuizStartPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); //  quizSet ID  từ URL
  const [timeLeft, setTimeLeft] = useState(900); // 15 phút
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);


 
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    // Fetch dữ liệu quizSet từ API
    const fetchQuizData = async () => {
      try {
          // Thay thế bằng API 
        const mockQuizData = [
          {
            id: 1,
            question: "Laravel là gì?",
            type: "SINGLE_CHOICE",
            options: [
              "Một PHP framework mã nguồn mở và miễn phí",
              "Một công cụ quản lý cơ sở dữ liệu",
              "Một ngôn ngữ lập trình",
              "Một framework phát triển ứng dụng di động",
            ],
          },
          {
            id: 2,
            question: "Điền số vào chỗ trống: 1 + _ = 2",
            type: "FILL_IN_THE_BLANK",
          },
          {
            id: 3,
            question: "Điền từ còn thiếu: React là _ của JavaScript.",
            type: "SHORT_ANSWER",
          },
          {
            id: 4,
            question: "Chọn các thành phần chính của React",
            type: "MULTIPLE_CHOICE",
            options: ["Component", "JSX", "Database", "State"],
          },
        ];
        setQuizData(mockQuizData);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu quiz:", error);
        setLoading(false);
      }
    };

    fetchQuizData();

    // Đếm ngược thời gian
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [id]);

  const currentQuestion = quizData[currentQuestionIndex];

  const handleSubmit = () => {
    console.log("User Answers:", userAnswers);
    navigate(`/dashboard/quiz/complete/${id}`, { state: { userAnswers } });
  };

  const handleAnswerChange = (answer) => {
    setUserAnswers({ ...userAnswers, [currentQuestion.id]: answer });
  };

  const renderQuestion = () => {
      if (!currentQuestion) return null;
    
      switch (currentQuestion.type) {
        case "SHORT_ANSWER":
          return (
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={userAnswers[currentQuestion.id] || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
            />
          );
    
        case "SINGLE_CHOICE":
          return (
            <div>
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={userAnswers[currentQuestion.id] === option}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                  />
                  <span>{option}</span>
                </div>
              ))}
            </div>
          );
    
        case "MULTIPLE_CHOICE":
          return (
            <div>
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    value={option}
                    checked={userAnswers[currentQuestion.id]?.includes(option)}
                    onChange={(e) => {
                      const selected = userAnswers[currentQuestion.id] || [];
                      const updatedAnswers = e.target.checked
                        ? [...selected, option]
                        : selected.filter((o) => o !== option);
                      handleAnswerChange(updatedAnswers);
                    }}
                  />
                  <span>{option}</span>
                </div>
              ))}
            </div>
          );
    
        case "FILL_IN_THE_BLANK":
          return (
            <input
              type="text"
              className="w-full border p-2 rounded"
              placeholder="Điền đáp án"
              value={userAnswers[currentQuestion.id] || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
            />
          );
    
        default:
          return null;
      }
    };
  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar  className="fixed top-0 left-0 w-64 h-full bg-white shadow-md z-50"/>
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
