import React, { useState, useEffect } from 'react';
import {QuizCard} from '../components/QuizCard.jsx';
import {AddQuizModal} from '../components/AddQuizModal';
import { fetchQuizzes, addQuiz, deleteQuiz } from '../services/api';

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadQuizzes = async () => {
      setLoading(true);
      const data = await fetchQuizzes();
      setQuizzes(data);
      setLoading(false);
    };
    loadQuizzes();
  }, []);

  const handleAddQuiz = async (quizData) => {
    const newQuiz = await addQuiz(quizData);
    setQuizzes([...quizzes, newQuiz]);
  };

  const handleDeleteQuiz = async (id) => {
    await deleteQuiz(id);
    setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Quizzes</h1>
      <button
        onClick={() => setShowModal(true)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Add Quiz
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              question={quiz.content}
              type={quiz.type}
              answer={quiz.answer}
              onDelete={() => handleDeleteQuiz(quiz.id)}
            />
          ))}
        </div>
      )}
      {showModal && (
        <AddQuizModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddQuiz}
        />
      )}
    </div>
  );
};

export default Quiz;
