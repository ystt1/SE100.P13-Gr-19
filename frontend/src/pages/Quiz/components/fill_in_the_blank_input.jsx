import React, { useState } from "react";

const FillInTheBlankInput = ({ quizData, setQuizData }) => {
  const [error, setError] = useState("");


  const addBlank = () => {
    const blankCount = (quizData.question.match(/_/g) || []).length;

    if (quizData.dragOptions.length < blankCount) {
      setQuizData((prev) => ({
        ...prev,
        dragOptions: [...prev.dragOptions, ""],
      }));
    } else {
      setError("Số lượng đáp án không được vượt quá số lượng '_'.");
    }
  };

  const deleteBlank = (index) => {
    setQuizData((prev) => ({
      ...prev,
      dragOptions: prev.dragOptions.filter((_, i) => i !== index),
    }));
  };

  const handleBlankChange = (index, value) => {
    setQuizData((prev) => ({
      ...prev,
      dragOptions: prev.dragOptions.map((option, i) =>
        i === index ? value : option
      ),
    }));
  };



  return (
    <div>
      <p className="text-gray-600 mb-3">
        Tạo câu hỏi bằng cách sử dụng ký tự '_' để đánh dấu các vị trí cần điền.
      </p>
      <div>
        {quizData.dragOptions.map((option, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              placeholder={`Đáp án ${index + 1}`}
              className="flex-1 px-4 py-2 border rounded-lg"
              value={option}
              onChange={(e) => handleBlankChange(index, e.target.value)}
            />
            <button
              onClick={() => deleteBlank(index)}
              className="px-2 py-1 text-white bg-red-500 rounded"
            >
              -
            </button>
          </div>
        ))}
        <button onClick={addBlank} className="text-blue-500">
          + Thêm đáp án
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default FillInTheBlankInput;
