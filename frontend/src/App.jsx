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
import Dashboard from "./pages/dash_board/dash_board_page";
import Teams from "./pages/teams/teams_page";
import QuizSetDetails from "./pages/dash_board/commponent/quizSetDetails";
// import quizComplete from "./pages/dash_board/commponent/quizComplete";
import QuizStartPage from "./pages/practice/practice";
import QuizCompletePage from "./pages/dash_board/commponent/QuizCompletePage";
import NotFound from "./pages/NotFound";
import QuizHistory from "./pages/quizHistory/QuizHistory";
import Profile from "./pages/Profile/quizProfile";
import Complete from "./pages/dash_board/commponent/complete";
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
              //  </ProtectedRoute>
            }
          />
          <Route
            path="/teams"
            element={
              <ProtectedRoute>
                <Teams />
              </ProtectedRoute>
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
            path="/topic/:id/quizzes"
            element={
              <ProtectedRoute>
                <Quiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-quiz"
            element={
              // <ProtectedRoute>
              <AddQuiz />
              // </ProtectedRoute>
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
              //  <ProtectedRoute>
              <AddQuizset />
              // </ProtectedRoute>
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
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/quiz-set-card/:quizSetId"
            element={
              // <ProtectedRoute>
              <QuizSetDetails />
              // </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/quiz/attempt/:id"
            element={
              // <ProtectedRoute>
              <QuizStartPage />
              // </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/quiz/complete/:quizSetId"
            element={
              // <ProtectedRoute>
              <QuizCompletePage />
              // </ProtectedRoute>
            }
          />

          <Route

            path="/quiz-history"
            element={
              // <ProtectedRoute>
              <QuizHistory />}
          // <ProtectedRoute>                  

          />

          <Route
            path="/profile"
            element={
              // <ProtectedRoute>
              <Profile />}
          // <ProtectedRoute>

          />


<Route path="/complete" element={<Complete />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </SnackbarProvider>
  );
}

export default App;