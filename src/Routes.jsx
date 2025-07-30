import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import LoginRegister from "pages/login-register";
import TeacherDashboard from "pages/teacher-dashboard";
import ParentDashboard from "pages/parent-dashboard";
import SchoolAdminDashboard from "pages/school-admin-dashboard";
import StudentDashboard from "pages/student-dashboard";
import BookingSystem from "pages/booking-system";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<LoginRegister />} />
        <Route path="/login-register" element={<LoginRegister />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/parent-dashboard" element={<ParentDashboard />} />
        <Route path="/school-admin-dashboard" element={<SchoolAdminDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/booking-system" element={<BookingSystem />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;