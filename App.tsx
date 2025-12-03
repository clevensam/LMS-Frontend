import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store/store';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Catalog from './pages/Catalog';
import CoursePlayer from './pages/CoursePlayer';
import Login from './pages/Login';
import MyLearning from './pages/MyLearning';
import Achievements from './pages/Achievements';
import InstructorCourses from './pages/InstructorCourses';
import Community from './pages/Community';
import CreateCourse from './pages/CreateCourse';
import ManageCourse from './pages/ManageCourse';
import Assessment from './pages/Assessment';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Announcements from './pages/Announcements';

// Admin Pages
import AdminUsers from './pages/AdminUsers';
import AdminCourses from './pages/AdminCourses';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminReports from './pages/AdminReports';
import AdminCertificates from './pages/AdminCertificates';
import Calendar from './pages/Calendar'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Initial data is already loaded in store/store.ts via constants
  }, [dispatch]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        }>
            <Route index element={<Dashboard />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="my-learning" element={<MyLearning />} />
            <Route path="achievements" element={<Achievements />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="community" element={<Community />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="calendar" element={<Calendar />} />
            
            {/* Instructor Routes */}
            <Route path="instructor/courses" element={<InstructorCourses />} />
            <Route path="instructor/create-course" element={<CreateCourse />} />
            <Route path="instructor/course/:id/manage" element={<ManageCourse />} />
            <Route path="instructor/assessments" element={<Assessment />} />

            {/* Admin Routes */}
            <Route path="admin/users" element={<AdminUsers />} />
            <Route path="admin/courses" element={<AdminCourses />} />
            <Route path="admin/analytics" element={<AdminAnalytics />} />
            <Route path="admin/reports" element={<AdminReports />} />
            <Route path="admin/certificates" element={<AdminCertificates />} />

            <Route path="course/:id" element={<CoursePlayer />} />
            {/* Fallback for undefined routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;