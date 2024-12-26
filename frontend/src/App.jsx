import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizsetList from "./pages/QuizsetList";
import AddQuizset from "./pages/AddQuizset";
import QuizsetDetail from "./pages/QuizsetDetail";
import AddQuiz from "./pages/AddQuiz";
import Quiz from "./pages/Quiz";
import QuizSetPage from "./pages/QuizSetPage";
import { LoginForm } from "./pages/auth/login_page";
import { RegisterPage } from "./pages/auth/register_page";
import { SnackbarProvider } from "./components/NotificationBat";
import { ProtectedRoute } from "./components/ProtectedRoute"; 

function App() {
  return (

    <SnackbarProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginForm />} />

     
          <Route
            path="/quizset/:id"
            element={
              <ProtectedRoute>
                <QuizsetDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-quiz"
            element={
              <ProtectedRoute>
                <AddQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz-set"
            element={
              <ProtectedRoute>
                <QuizSetPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-quiz-set"
            element={
              <ProtectedRoute>
                <AddQuizset />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz"
            element={
              <ProtectedRoute>
                <Quiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Quiz />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
