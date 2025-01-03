import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { FaClock } from "react-icons/fa";
import StartQuizService from "../../data/service/start_quiz_set_service";

const QuizStartPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quizData, setQuizData] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 phút

  const fetchQuizData = async () => {
    try {
      const response = await StartQuizService.getQuizSet(id);
      setQuizData(response);
      console.log(response);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu quiz:", error);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, [id]);

  useEffect(() => {
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
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const prepareSubmitData = () => {
    const listAnswer = quizData.map((question) => {
      const { id, type } = question;
      const userAnswer = userAnswers[id];
  
      switch (type) {
        case "SINGLE_CHOICE":
          return {
            id,
            type,
            options: userAnswer ? [userAnswer] : [], // Đáp án đơn
          };
  
        case "MULTIPLE_CHOICE":
          return {
            id,
            type,
            options: userAnswer || [], // Đáp án nhiều
          };
  
        case "FILL_IN_THE_BLANK":
          return {
            id,
            type,
            blanks: (userAnswer || []).map((content, index) => ({
              content: content || "", // Giá trị ô trống
              order: index + 1, // Thứ tự ô trống
            })),
          };
  
        case "SHORT_ANSWER":
          return {
            id,
            type,
            shortAnswer: userAnswer || "", // Câu trả lời ngắn
          };
  
        case "DRAG_AND_DROP":
          return {
            id,
            type,
            blanks: (userAnswer || []).map((content, index) => ({
              content,
              order: index + 1,
            })), // Kéo thả
          };
  
        default:
          return null; // Bỏ qua các loại không hợp lệ
      }
    }).filter((answer) => answer !== null); // Loại bỏ các câu hỏi không hợp lệ
  
    return {
      time: 600 - timeLeft, // Thời gian đã làm bài
      listAnswer,
    };
  };
  
  
  const handleAnswerChange = (questionId, valueOrIndex, value) => {
    setUserAnswers((prev) => {
      if (typeof valueOrIndex === "number") {
        // Trường hợp FILL_IN_THE_BLANK
        const updatedAnswers = [...(prev[questionId] || [])];
        updatedAnswers[valueOrIndex] = value;
        return {
          ...prev,
          [questionId]: updatedAnswers.filter((answer) => answer !== undefined && answer !== ""),
        };
      } else if (Array.isArray(valueOrIndex)) {
        // Trường hợp MULTIPLE_CHOICE
        return {
          ...prev,
          [questionId]: valueOrIndex,
        };
      } else {
        // Trường hợp SINGLE_CHOICE và SHORT_ANSWER
        return {
          ...prev,
          [questionId]: valueOrIndex,
        };
      }
    });
  };
  
  
  
  
  

  const handleSubmit = async() => {
    
    var submitData=prepareSubmitData()

    console.log("Submit Result:", submitData);

    var response=await StartQuizService.submitQuiz(id,submitData);
    if(response.status===200)
    {
      navigate("/complete")
    }
  };

  const renderQuestion = (question, index) => {
    return (
      <div key={question.id} className="mb-6 p-4 border rounded-md bg-gray-50 shadow">
        {/* Hiển thị số thứ tự */}
        <div className="mb-2 text-xl font-bold text-blue-600">
          Câu {index + 1}
        </div>
  
        {/* Hiển thị nội dung câu hỏi */}
        <div className="text-lg font-semibold text-gray-700 mb-4">
          {question.type === "FILL_IN_THE_BLANK"
            ? question.content.split("_").map((part, i) => (
                <React.Fragment key={i}>
                  {part}
                  {i < question.content.split("_").length - 1 && (
                    <input
                      type="text"
                      className="border-b-2 border-gray-400 mx-2 focus:outline-blue-500 w-16 text-center"
                      placeholder={`...`}
                      value={userAnswers[question.id]?.[i] || ""}
        onChange={(e) =>
          handleAnswerChange(question.id, i, e.target.value)
        }
                    />
                  )}
                </React.Fragment>
              ))
            : question.content}
        </div>
  
        {/* Hiển thị phần trả lời */}
        <div className="space-y-2">
          {(() => {
            switch (question.type) {
              case "SHORT_ANSWER":
                return (
                  <input
                    type="text"
                    className="border p-2 w-full rounded-md focus:outline-blue-500"
                    placeholder="Nhập câu trả lời..."
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  />
                );
  
                case "SINGLE_CHOICE":
                  return question.options.map((option) => (
                    <div key={option.id} className="flex items-center">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option.content}
                        className="mr-2"
                        checked={userAnswers[question.id] === option.content}
                        onChange={() => handleAnswerChange(question.id, option.content)}
                      />
                      <label className="cursor-pointer">{option.content}</label>
                    </div>
                  ));
                
  
                  case "MULTIPLE_CHOICE":
                    return question.options.map((option) => (
                      <div key={option.id} className="flex items-center">
                        <input
                          type="checkbox"
                          value={option.content}
                          className="mr-2"
                          checked={(userAnswers[question.id] || []).includes(option.content)}
                          onChange={(e) => {
                            const selectedOptions = userAnswers[question.id] || [];
                            if (e.target.checked) {
                              handleAnswerChange(question.id, [...selectedOptions, option.content]);
                            } else {
                              handleAnswerChange(
                                question.id,
                                selectedOptions.filter((content) => content !== option.content)
                              );
                            }
                          }}
                        />
                        <label className="cursor-pointer">{option.content}</label>
                      </div>
                    ));
                  
                
              case "DRAG_AND_DROP":
                return (
                  <>
                    <div className="flex gap-4 mb-4">
                      {question.blanks.map((blank) => (
                        <div
                          key={blank.id}
                          className="border-2 border-dashed p-4 w-20 h-20 flex items-center justify-center rounded-md bg-white"
                        >
                          Drop Here
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {question.options.map((option) => (
                        <div
                          key={option.id}
                          className="border p-2 rounded-md bg-blue-100 text-center cursor-pointer"
                          draggable
                          onDragStart={(e) => e.dataTransfer.setData("text/plain", option.id)}
                        >
                          {option.content}
                        </div>
                      ))}
                    </div>
                  </>
                );
  
              default:
                return null;
            }
          })()}
        </div>
      </div>
    );
  };
  
  

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar className="fixed top-0 left-0 w-64 h-full bg-white shadow-md z-50" />
      <div className="ml-64 flex-1 p-6">
        <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg shadow mb-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel
          </button>
          <div className="text-center">
            <h2 className="text-lg font-bold text-blue-800 mb-1">
              This is just a title of Quiz
            </h2>
            <div className="text-sm text-gray-600">
              Answered: {Object.keys(userAnswers).length} / {quizData.length}
            </div>
            <div className="text-sm text-gray-600 flex items-center justify-center gap-2">
              <FaClock className="text-blue-800" />
              Time Left: {formatTime(timeLeft)}
            </div>
          </div>
          <button
          onClick={()=>handleSubmit()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
        <div>
          {quizData.map((question,index) => renderQuestion(question,index))}
        </div>
      </div>
    </div>
  );
};

export default QuizStartPage;
