import React from 'react';
import ReactDOM from 'react-dom/client';
import StudentDashboardFixed from './components/student/StudentDashboardFixed';

console.log('Inicializando aplicación...');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StudentDashboardFixed />
  </React.StrictMode>
);
