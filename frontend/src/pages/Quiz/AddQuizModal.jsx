import React, { useState } from "react";

const AddQuizModal = ({ onClose, onSubmit }) => {
  const [quizData, setQuizData] = useState({
    question: "",
    topic: "",
    type: "Short answer",
    answers: [{ text: "", isCorrect: false }],
    correctAnswer: "",
    fillText: "",
    dragOptions: [],
  });

  const addAnswer = () => {
    setQuizData({
      ...quizData,
      answers: [...quizData.answers, { text: "", isCorrect: false }],
    });
  };

  const deleteAnswer = (index) => {
    const updatedAnswers = quizData.answers.filter((_, i) => i !== index);
    setQuizData({ ...quizData, answers: updatedAnswers });
  };

  const handleAnswerChange = (index, field, value) => {
    const updatedAnswers = [...quizData.answers];
    updatedAnswers[index][field] = value;
    setQuizData({ ...quizData, answers: updatedAnswers });
  };

  const handleSubmit = () => {
    const finalQuizData = {
      ...quizData,
      fillText: quizData.fillText, 
      correctAnswers: quizData.dragOptions, 
    };
    onSubmit(finalQuizData);
    onClose();
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
        <h2 className="text-xl font-bold mb-4">Create New Quiz</h2>
        <input
          type="text"
          placeholder="Question"
          className="w-full mb-3 px-4 py-2 border rounded-lg"
          value={quizData.question}
          onChange={(e) => setQuizData({ ...quizData, question: e.target.value })}
        />
        <input
          type="text"
          placeholder="Topic"
          className="w-full mb-3 px-4 py-2 border rounded-lg"
          value={quizData.topic}
          onChange={(e) => setQuizData({ ...quizData, topic: e.target.value })}
        />
        <select
          className="w-full mb-3 px-4 py-2 border rounded-lg"
          value={quizData.type}
          onChange={(e) => setQuizData({ ...quizData, type: e.target.value })}
        >
          <option value="Short answer">Short Answer</option>
          <option value="Single choice">Single Choice</option>
          <option value="Multiple choice">Multiple Choice</option>
          <option value="Fill in the blank">Fill in the Blank</option>
          <option value="Drag and drop">Drag and Drop</option>
        </select>
      
        {quizData.type === "Short answer" && (
          <input
            type="text"
            placeholder="Correct Answer"
            className="w-full mb-3 px-4 py-2 border rounded-lg"
            value={quizData.correctAnswer}
            onChange={(e) => setQuizData({ ...quizData, correctAnswer: e.target.value })}
          />
        )}

        {quizData.type === "Single choice" && (
          <div>
            {quizData.answers.map((answer, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  placeholder={`Answer ${index + 1}`}
                  className="flex-1 px-4 py-2 border rounded-lg"
                  value={answer.text}
                  onChange={(e) => handleAnswerChange(index, "text", e.target.value)}
                />
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={answer.isCorrect}
                  onChange={() =>
                    setQuizData({
                      ...quizData,
                      answers: quizData.answers.map((a, i) => ({
                        ...a,
                        isCorrect: i === index,
                      })),
                    })
                  }
                />
                <button
                  onClick={() => deleteAnswer(index)}
                  className="px-2 py-1 text-white bg-red-500 rounded"
                >
                  -
                </button>
              </div>
            ))}
            <button onClick={addAnswer} className="text-blue-500">
              + Add Answer
            </button>
          </div>
        )}

        {quizData.type === "Multiple choice" && (
          <div>
            {quizData.answers.map((answer, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  placeholder={`Answer ${index + 1}`}
                  className="flex-1 px-4 py-2 border rounded-lg"
                  value={answer.text}
                  onChange={(e) => handleAnswerChange(index, "text", e.target.value)}
                />
                <input
                  type="checkbox"
                  checked={answer.isCorrect}
                  onChange={(e) =>
                    handleAnswerChange(index, "isCorrect", e.target.checked)
                  }
                />
                <button
                  onClick={() => deleteAnswer(index)}
                  className="px-2 py-1 text-white bg-red-500 rounded"
                >
                  -
                </button>
              </div>
            ))}
            <button onClick={addAnswer} className="text-blue-500">
              + Add Answer
            </button>
          </div>
        )}

        {quizData.type === "Fill in the blank" && (
          <div>        
            <textarea
              placeholder="Text with blanks (use '_' for blanks)"
              className="w-full mb-3 px-4 py-2 border rounded-lg"
              value={quizData.fillText}
              onChange={(e) => setQuizData({ ...quizData, fillText: e.target.value })}
            />

            {/* answer */}
            <div>
              {quizData.dragOptions.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    placeholder={`Correct Answer ${index + 1}`}
                    className="flex-1 px-4 py-2 border rounded-lg"
                    value={option}
                    onChange={(e) => {
                      const updatedOptions = [...quizData.dragOptions];
                      updatedOptions[index] = e.target.value;
                      setQuizData({ ...quizData, dragOptions: updatedOptions });
                    }}
                  />
                  <button
                    onClick={() =>
                      setQuizData({
                        ...quizData,
                        dragOptions: quizData.dragOptions.filter((_, i) => i !== index),
                      })
                    }
                    className="px-2 py-1 text-white bg-red-500 rounded"
                  >
                    -
                  </button>
                </div>
              ))}
              
              <button
                onClick={() => {
                  const blankCount = (quizData.fillText.match(/_/g) || []).length;
                  if (quizData.dragOptions.length < blankCount) {
                    setQuizData({ ...quizData, dragOptions: [...quizData.dragOptions, ""] });
                  } else {
                    alert("Số lượng blank không được vượt quá số lượng '_' trong câu hỏi.");
                  }
                }}
                className="text-blue-500"
              >
                + Blank
              </button>
            </div>
          </div>
        )}



        {quizData.type === "Drag and drop" && (
          <div>          
            <textarea
              placeholder="Text with blanks (use '_' for blanks)"
              className="w-full mb-3 px-4 py-2 border rounded-lg"
              value={quizData.fillText}
              onChange={(e) => setQuizData({ ...quizData, fillText: e.target.value })}
            />

            {/* answer */}
            <textarea
              placeholder="Enter the correct answer (exactly match the blanks)"
              className="w-full mb-3 px-4 py-2 border rounded-lg"
              value={quizData.correctAnswer}
              onChange={(e) => setQuizData({ ...quizData, correctAnswer: e.target.value })}
            />

            {/*  drag options */}
            <div>
              {quizData.dragOptions.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    className="flex-1 px-4 py-2 border rounded-lg"
                    value={option}
                    onChange={(e) => {
                      const updatedOptions = [...quizData.dragOptions];
                      updatedOptions[index] = e.target.value;
                      setQuizData({ ...quizData, dragOptions: updatedOptions });
                    }}
                  />
                  <button
                    onClick={() =>
                      setQuizData({
                        ...quizData,
                        dragOptions: quizData.dragOptions.filter((_, i) => i !== index),
                      })
                    }
                    className="px-2 py-1 text-white bg-red-500 rounded"
                  >
                    -
                  </button>
                </div>
              ))}          

              <button
                onClick={() => {
                  const blankCount = (quizData.fillText.match(/_/g) || []).length;
                  if (quizData.dragOptions.length < blankCount) {
                    setQuizData({ ...quizData, dragOptions: [...quizData.dragOptions, ""] });
                  } else {
                    alert("Số lượng options không được vượt quá số lượng blank ('_')");
                  }
                }}
                className="text-blue-500"
              >
                + Option
              </button>
            </div>
          </div>
        )}


        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuizModal;
