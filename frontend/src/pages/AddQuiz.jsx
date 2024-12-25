import React, { useState } from "react";
import axios from "axios";

const AddQuiz = () => {
  const [content, setContent] = useState("");
  const [type, setType] = useState("SHORT_ANSWER");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/quiz", { content, type, answer });
      alert("Quiz added successfully!");
    } catch (error) {
      alert("Failed to add quiz");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold mb-4">Add New Quiz</h1>
        <textarea
          placeholder="Question"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="block w-full p-2 border mb-4"
        ></textarea>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="block w-full p-2 border mb-4"
        >
          <option value="SHORT_ANSWER">Short Answer</option>
          <option value="MULTI_CHOICE">Multiple Choice</option>
        </select>
        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="block w-full p-2 border mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Add Quiz
        </button>
      </form>
    </div>
  );
};

export default AddQuiz;
