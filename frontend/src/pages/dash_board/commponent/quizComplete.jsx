const quizComplete = ({ title, correctAnswers, totalQuestions, timeTaken, questions }) => {
    return (
      <div className="bg-gray-50 min-h-screen p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
              <p>Correct: {correctAnswers}/{totalQuestions}</p>
              <p>Time Taken: {timeTaken}</p>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-gray-800">Review Questions</h3>
              <ul className="space-y-4">
                {questions.map((question, index) => (
                  <li key={index} className="p-4 bg-gray-100 rounded-lg">
                    <p className="font-semibold">{question.text}</p>
                    <p className={`text-sm mt-2 ${question.isCorrect ? "text-green-600" : "text-red-600"}`}>
                      {question.isCorrect ? "Correct" : "Incorrect"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Your Answer: {question.yourAnswer}</p>
                    <p className="text-sm text-gray-500">Correct Answer: {question.correctAnswer}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default quizComplete;
  