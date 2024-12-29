import React from "react";

const SingleChoiceInput = ({ quizData, setQuizData }) => {
  const addAnswer = () => {
    setQuizData((prev) => ({
      ...prev,
      answers: [...prev.answers, { text: "", isCorrect: false }],
    }));
  };

  const deleteAnswer = (index) => {
    setQuizData((prev) => ({
      ...prev,
      answers: prev.answers.filter((_, i) => i !== index),
    }));
  };

  const handleAnswerChange = (index, field, value) => {
    setQuizData((prev) => ({
      ...prev,
      answers: prev.answers.map((a, i) =>
        i === index ? { ...a, [field]: value } : a
      ),
    }));
  };

  return (
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
              setQuizData((prev) => ({
                ...prev,
                answers: prev.answers.map((a, i) => ({
                  ...a,
                  isCorrect: i === index,
                })),
              }))
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
  );
};

export default SingleChoiceInput;
