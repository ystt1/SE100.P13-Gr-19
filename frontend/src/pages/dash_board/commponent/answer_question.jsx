const QuizStartPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { quizData, userAnswers, handleAnswerChange, handleSubmit } =
      useQuizData(id);
    const { timeLeft, formatTime } = useCountdownTimer(600, handleSubmit);
  
    return (
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar className="fixed top-0 left-0 w-64 h-full bg-white shadow-md z-50" />
        <div className="ml-64 flex-1 p-6">
          <QuizHeader
            quizData={quizData}
            userAnswers={userAnswers}
            timeLeft={timeLeft}
            formatTime={formatTime}
            onCancel={() => navigate(-1)}
            onSubmit={handleSubmit}
          />
          <QuestionList
            quizData={quizData}
            userAnswers={userAnswers}
            handleAnswerChange={handleAnswerChange}
          />
        </div>
      </div>
    );
  };
  
  export default QuizStartPage;