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
           //   <ProtectedRoute>
                <QuizsetDetail />
           //   </ProtectedRoute>
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
             // <ProtectedRoute>
                <QuizSetPage />
           //   </ProtectedRoute>
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
           //  <ProtectedRoute>
                <Quiz />
          ///   </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={            
              // <ProtectedRoute>
                <Dashboard />
              //  </ProtectedRoute>
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
  
          {/* <Route
            path="/quiz/attemp"
            element={            
              // <ProtectedRoute>
                <quizComplete />
              // </ProtectedRoute>
            }
          /> */}

        </Routes>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
