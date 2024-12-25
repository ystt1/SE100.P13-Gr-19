import React, { useState } from "react";
import { createQuizSet } from "../services/api";

const AddQuizSet = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [allowShowAnswer, setAllowShowAnswer] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      description,
      allowShowAnswer,
    };
    const response = await createQuizSet(data);
    console.log("Quiz set created:", response);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-xl font-bold mb-4">Create Quiz Set</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="block mb-4 p-2 border rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="block mb-4 p-2 border rounded"
      />
      <label>
        <input
          type="checkbox"
          checked={allowShowAnswer}
          onChange={(e) => setAllowShowAnswer(e.target.checked)}
        />
        Allow Show Answer
      </label>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create
      </button>
    </form>
  );
};

export default AddQuizSet;
