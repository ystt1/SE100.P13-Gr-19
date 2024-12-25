import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const QuizsetDetail = () => {
  const { id } = useParams();
  const [quizset, setQuizset] = useState(null);

  useEffect(() => {
    const fetchQuizset = async () => {
      const response = await axios.get(`http://localhost:8080/api/quiz-set/${id}`);
      setQuizset(response.data);
    };
    fetchQuizset();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {quizset ? (
        <div>
          <h1 className="text-2xl font-bold">{quizset.name}</h1>
          <p className="text-gray-600">{quizset.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default QuizsetDetail;
