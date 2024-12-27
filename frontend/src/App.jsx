import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddQuizset from "./pages/QuizSet/AddQuizset";
import QuizsetDetail from "./pages/QuizSet/QuizsetDetail";
import AddQuiz from "./pages/AddQuiz";
import Quiz from "./pages/Quiz/Quiz";
import QuizSetPage from "./pages/QuizSet/QuizSetPage";
import { LoginForm } from "./pages/auth/login_page";
import { RegisterPage } from "./pages/auth/register_page";
import { SnackbarProvider } from "./components/NotificationBat";
import { ProtectedRoute } from "./components/ProtectedRoute"; 
import TopicsPage from "./pages/topic/topic_page";

function App() {
  return (

    <SnackbarProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/topic"
            element={
              // <ProtectedRoute>
                <TopicsPage />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/quizset-detail/:id"
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
