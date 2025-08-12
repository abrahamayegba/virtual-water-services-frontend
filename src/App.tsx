import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import CourseOverview from './pages/CourseOverview';
import LessonPage from './pages/LessonPage';
import QuizPage from './pages/QuizPage';
import CertificatePage from './pages/CertificatePage';
import AdminPanel from './pages/AdminPanel';
import Profile from './pages/Profile';
import Support from './pages/Support';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <CourseProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/course/:courseId" element={
                <ProtectedRoute>
                  <CourseOverview />
                </ProtectedRoute>
              } />
              <Route path="/course/:courseId/lesson/:lessonId" element={
                <ProtectedRoute>
                  <LessonPage />
                </ProtectedRoute>
              } />
              <Route path="/course/:courseId/quiz" element={
                <ProtectedRoute>
                  <QuizPage />
                </ProtectedRoute>
              } />
              <Route path="/certificate/:certificateId" element={
                <ProtectedRoute>
                  <CertificatePage />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute requireAdmin>
                  <AdminPanel />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/support" element={<Support />} />
            </Routes>
          </div>
        </Router>
      </CourseProvider>
    </AuthProvider>
  );
}

export default App;