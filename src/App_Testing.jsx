import React from 'react';
import { ThemeProvider } from './themes/ThemeContext';
import StudentDashboard from './components/student/StudentDashboard';

// Este archivo es solo para testing del dashboard sin necesidad de login
function AppTesting() {
  return (
    <ThemeProvider>
      <StudentDashboard />
    </ThemeProvider>
  );
}

export default AppTesting;
