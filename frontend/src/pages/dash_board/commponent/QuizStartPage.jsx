import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import { FaClock } from "react-icons/fa";
import StartQuizService from "../../../data/service/start_quiz_set_service";
import DragAndDropQuestion from "./drag_and_drop";
const QuizStartPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 phút

  // Fetch quiz data từ API


  const fetchQuizData = async () => {
    try {
      const response = await StartQuizService.getQuizSet(id);
      setQuizData(response);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu quiz:", error);
    }
  };

  useEffect(() => {
    

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

  const prepareSubmitData = () => {
    const listAnswer = quizData.map((question) => {
      const { id, type, options, blanks } = question;
      const userAnswer = userAnswers[id];
  
      switch (type) {
        case "SINGLE_CHOICE":
          return {
            id,
            type,
            options: userAnswer ? [userAnswer] : [],
          };
  
        case "MULTIPLE_CHOICE":
          return {
            id,
            type,
            options: userAnswer || [],
          };
  
        case "FILL_IN_THE_BLANK":
          return {
            id,
            type,
            blanks: (userAnswer || []).map((content, index) => ({
              content,
              order: index + 1,
            })),
          };
  
        case "SHORT_ANSWER":
          return {
            id,
            type,
            shortAnswer: userAnswer || "",
          };
  
        case "DRAG_AND_DROP":
          return {
            id,
            type,
            blanks: (userAnswer || []).map((content, index) => ({
              content,
              order: index + 1,
            })),
          };
  
        default:
          return null;
      }
    }).filter((answer) => answer !== null); // Loại bỏ các câu hỏi không hợp lệ
  
    return {
      time: 600 - timeLeft, // Thời gian đã làm bài
      listAnswer,
    };
  };
  
  const handleAnswerChange = (answer, questionId, type) => {
    setUserAnswers((prev) => {
      const updatedAnswers = { ...prev };
  
      switch (type) {
        case "SINGLE_CHOICE":
          updatedAnswers[questionId] = answer; // Ghi lại lựa chọn
          break;
  
        case "MULTIPLE_CHOICE":
          const currentAnswers = updatedAnswers[questionId] || [];
          updatedAnswers[questionId] = currentAnswers.includes(answer)
            ? currentAnswers.filter((ans) => ans !== answer) // Bỏ lựa chọn
            : [...currentAnswers, answer]; // Thêm lựa chọn
          break;
  
        case "FILL_IN_THE_BLANK":
          updatedAnswers[questionId] = answer; // Ghi lại nội dung
          break;
  
        case "SHORT_ANSWER":
          updatedAnswers[questionId] = answer; // Ghi lại nội dung
          break;
  
        case "DRAG_AND_DROP":
          updatedAnswers[questionId] = answer; // Ghi lại danh sách sau khi kéo thả
          break;
  
        default:
          console.warn("Unsupported question type:", type);
          break;
      }
  
      return updatedAnswers;
    });
  };
  
  

  const handleSubmit = async () => {
    const submitData = prepareSubmitData();
  
    try {
      const response = await StartQuizService.submitQuiz(id, submitData);
      if(response.status===200)
      {
        navigate("/complete")
      }
    } catch (error) {
      console.error("Lỗi khi submit bài quiz:", error);
    }
  };
  

  // Hiển thị câu hỏi hiện tại
  const renderQuestions = () => {
    return quizData.map((question, index) => (
      <div key={question.id} className="mb-6 border-b pb-4">
        {/* Hiển thị câu hỏi */}
        <h3 className="text-lg font-bold mb-2">
          {`Question ${index + 1}: ${question.content}`}
        </h3>
  
        {/* Hiển thị đáp án theo loại câu hỏi */}
        {renderAnswerOptions(question)}
      </div>
    ));
  };
  
  const renderAnswerOptions = (question) => {
    const { id, type, options, blanks } = question;
  
    switch (type) {
      case "SINGLE_CHOICE":
        return options.map((option, idx) => (
          <div key={idx} className="mb-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`question-${id}`}
                value={option.content}
                checked={userAnswers[id] === option.content}
                onChange={() => handleAnswerChange(option.content, id, type)}
              />
              {option.content}
            </label>
          </div>
        ));
  
      case "MULTIPLE_CHOICE":
        return options.map((option, idx) => (
          <div key={idx} className="mb-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name={`question-${id}`}
                value={option.content}
                checked={
                  Array.isArray(userAnswers[id]) &&
                  userAnswers[id].includes(option.content)
                }
                onChange={() => handleAnswerChange(option.content, id, type)}
              />
              {option.content}
            </label>
          </div>
        ));
  
      case "FILL_IN_THE_BLANK":
        return blanks.map((blank, idx) => (
          <input
            key={idx}
            type="text"
            className="w-full border rounded p-2 mb-2"
            value={userAnswers[id]?.[idx] || ""}
            onChange={(e) => {
              const updatedBlanks = [...(userAnswers[id] || [])];
              updatedBlanks[idx] = e.target.value;
              handleAnswerChange(updatedBlanks, id, type);
            }}
          />
        ));
  
      case "SHORT_ANSWER":
        return (
          <input
            type="text"
            className="w-full border rounded p-2"
            value={userAnswers[id] || ""}
            onChange={(e) => handleAnswerChange(e.target.value, id, type)}
          />
        );
  
      case "DRAG_AND_DROP":
        return (
          <DragAndDropQuestion
            question={question}
            userAnswers={userAnswers}
            onChange={(updatedAnswer) =>
              handleAnswerChange(updatedAnswer, id, type)
            }
          />
        );
  
      default:
        return <p className="text-red-500">Unsupported question type</p>;
    }
  };
  
  
 
  

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar className="fixed top-0 left-0 w-64 h-full bg-white shadow-md z-50" />
      <div className="ml-64 flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg shadow mb-6 ">
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
            onClick={()=>handleSubmit()}
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
          {renderQuestions()}
        </div>

        
         
        
      </div>
    </div>
  );
};

export default QuizStartPage;
