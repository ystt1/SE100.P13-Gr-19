import React from "react";

const DragAndDropInput = ({ quizData, setQuizData }) => {
  const addOption = () => {
    const blankCount = (quizData.fillText.match(/_/g) || []).length;
    if (quizData.dragOptions.length < blankCount) {
      setQuizData((prev) => ({
        ...prev,
        dragOptions: [...prev.dragOptions, ""],
      }));
    } else {
      alert("Số lượng options không được vượt quá số lượng blank ('_').");
    }
  };

  const deleteOption = (index) => {
    setQuizData((prev) => ({
      ...prev,
      dragOptions: prev.dragOptions.filter((_, i) => i !== index),
    }));
  };

  const handleOptionChange = (index, value) => {
    setQuizData((prev) => ({
      ...prev,
      dragOptions: prev.dragOptions.map((option, i) =>
        i === index ? value : option
      ),
    }));
  };

  return (
    <div>
      <textarea
        placeholder="Text with blanks (use '_' for blanks)"
        className="w-full mb-3 px-4 py-2 border rounded-lg"
        value={quizData.fillText}
        onChange={(e) => setQuizData((prev) => ({ ...prev, fillText: e.target.value }))}
      />
      <textarea
        placeholder="Enter the correct answer (exactly match the blanks)"
        className="w-full mb-3 px-4 py-2 border rounded-lg"
        value={quizData.correctAnswer}
        onChange={(e) => setQuizData((prev) => ({ ...prev, correctAnswer: e.target.value }))}
      />
      <div>
        {quizData.dragOptions.map((option, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              className="flex-1 px-4 py-2 border rounded-lg"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
            <button
              onClick={() => deleteOption(index)}
              className="px-2 py-1 text-white bg-red-500 rounded"
            >
              -
            </button>
          </div>
        ))}
        <button onClick={addOption} className="text-blue-500">
          + Add Option
        </button>
      </div>
    </div>
  );
};

export default DragAndDropInput;