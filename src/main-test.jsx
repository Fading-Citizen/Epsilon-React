import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './themes/ThemeContext';
import StudentDashboard from './components/student/StudentDashboard';
import './index.css';

// Versión simplificada para testing
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <StudentDashboard />
    </ThemeProvider>
  </React.StrictMode>
);
