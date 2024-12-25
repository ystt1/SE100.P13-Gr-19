import React, { useState } from "react";

const AddQuizModal = ({ onClose, onSubmit }) => {
  const [quizData, setQuizData] = useState({
    content: "",
    type: "SHORT_ANSWER",
    answer: "",
    options: [], // Dùng cho Multiple Choice
  });

  const handleSubmit = () => {
    if (quizData.type === "MULTIPLE_CHOICE" && quizData.options.length < 2) {
      alert("Please provide at least 2 options for multiple choice.");
      return;
    }
    onSubmit(quizData);
    onClose();
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...quizData.options];
    newOptions[index] = value;
    setQuizData({ ...quizData, options: newOptions });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
        <h2 className="text-xl font-bold mb-4">Add New Quiz</h2>

      {/* input */}
        <input
          type="text"
          placeholder="Question"
          className="w-full mb-3 px-4 py-2 border rounded-lg"
          value={quizData.content}
          onChange={(e) => setQuizData({ ...quizData, content: e.target.value })}
        />

        {/* type */}
        <select
          className="w-full mb-3 px-4 py-2 border rounded-lg"
          value={quizData.type}
          onChange={(e) => setQuizData({ ...quizData, type: e.target.value, options: [] })}
        >
          <option value="SHORT_ANSWER">Short Answer</option>
          <option value="MULTIPLE_CHOICE">Multiple Choice</option>
        </select>

        {/* Multiple Choice */}
        {quizData.type === "MULTIPLE_CHOICE" && (
          <div className="mb-3">
            <div className="flex flex-col gap-2">
              {["A", "B", "C", "D"].map((label, index) => (
                <div key={index} className="flex items-center gap-2">
                  <label className="text-sm font-medium">{label}</label>
                  <input
                    type="text"
                    placeholder={`Option ${label}`}
                    className="flex-1 px-4 py-2 border rounded-lg"
                    value={quizData.options[index] || ""}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ANSWER */}
        {quizData.type === "SHORT_ANSWER" && (
          <input
            type="text"
            placeholder="Answer"
            className="w-full mb-3 px-4 py-2 border rounded-lg"
            value={quizData.answer}
            onChange={(e) => setQuizData({ ...quizData, answer: e.target.value })}
          />
        )}

      
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuizModal;
