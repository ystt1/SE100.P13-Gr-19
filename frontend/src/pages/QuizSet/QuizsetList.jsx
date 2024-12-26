import React, { useEffect, useState } from "react";
import { fetchQuizzes, deleteQuizSet } from "../../services/api";

const QuizList = () => {
  const [quizSets, setQuizSets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuizzes = async () => {
      setLoading(true);
      const data = await fetchQuizzes();
      setQuizSets(data.quizSets);
      setLoading(false);
    };
    loadQuizzes();
  }, []);

  const handleDelete = async (id) => {
    await deleteQuizSet(id);
    setQuizSets(quizSets.filter((quiz) => quiz.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Quiz Sets</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {quizSets.map((quiz) => (
            <div key={quiz.id} className="p-4 border-b">
              <h2 className="text-lg">{quiz.name}</h2>
              <p>{quiz.description}</p>
              <button
                onClick={() => handleDelete(quiz.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizList;
