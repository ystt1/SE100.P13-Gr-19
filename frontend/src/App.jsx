import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizsetList  from "./pages/QuizsetList";
import AddQuizset from "./pages/AddQuizset";
import QuizsetDetail from "./pages/QuizsetDetail";
import AddQuiz from "./pages/AddQuiz";
import Quiz from "./pages/Quiz";
import QuizSetPage from "./pages/QuizSetPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/quizset/:id" element={<QuizsetDetail />} />
        <Route path="/add-quiz" element={<AddQuiz />} />
        <Route path="/quiz-set" element={<QuizSetPage />} />
        <Route path="/add-quiz-set" element={<AddQuizset />} />
        <Route path="/quiz" element={<Quiz />} />  
      </Routes>
    </Router>
  );
}

export default App;
