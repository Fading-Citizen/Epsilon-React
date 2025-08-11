import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './themes/ThemeContext';
import AppRoutes from './pages/Routes';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  </React.StrictMode>
);
