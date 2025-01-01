import React, { useState } from "react";

const AddQuizSetModal = ({ onClose, onSubmit }) => {
  const [quizSetName, setQuizSetName] = useState("");
  const [description, setDescription] = useState("");
  const [timeLimit, setTimeLimit] = useState("");

  const handleSubmit = () => {
    const newQuizSet = {
      name: quizSetName,
      description: description,
      date: new Date().toLocaleDateString(), //lấy ngày hiện tại
      timeLimit: timeLimit,
    };

    onSubmit(newQuizSet); 

  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
        <h2 className="text-xl font-bold mb-4">Create New Quiz Set</h2>

        <input
          type="text"
          placeholder="Quiz Set Name"
          className="w-full mb-3 px-4 py-2 border rounded-lg"
          value={quizSetName}
          onChange={(e) => setQuizSetName(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full mb-3 px-4 py-2 border rounded-lg"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Time Limit (e.g., 15 Mins)"
          className="w-full mb-3 px-4 py-2 border rounded-lg"
          value={timeLimit}
          onChange={(e) => setTimeLimit(e.target.value)}
        />
       

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuizSetModal;
