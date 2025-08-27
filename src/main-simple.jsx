import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './themes/ThemeContext';
import SimpleStudentDashboard from './components/student/SimpleStudentDashboard';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <SimpleStudentDashboard />
    </ThemeProvider>
  </React.StrictMode>
);
