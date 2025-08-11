import React, { useState } from 'react';
import styled from 'styled-components';
import { User, Bell } from 'lucide-react';
import { useTheme } from '../../themes/ThemeContext';
import ThemeToggle from '../common/ThemeToggle';

const SimpleStudentDashboard = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { theme, isDarkMode } = useTheme();

  const navegarA = (pagina) => {
    setCurrentPage(pagina);
  };

  const renderDashboard = () => (
    <main className="main-content">
      <h1 style={{color: isDarkMode ? 'white' : 'black', padding: '2rem'}}>
        Dashboard del Estudiante - Modo {isDarkMode ? 'Oscuro' : 'Claro'}
      </h1>
      
      <div className="main-sections">
        <div className="section-card oferta-academica">
          <div className="card-header">
            <h2>Oferta Académica</h2>
            <p>Explora todos los cursos disponibles</p>
          </div>
          <button 
            className="action-button secondary"
            onClick={() => navegarA('oferta-academica')}
          >
            Ver todos los cursos
          </button>
        </div>

        <div className="section-card mis-cursos">
          <div className="card-header">
            <h2>Mis Cursos</h2>
            <p>Tu progreso académico personal</p>
          </div>
          <button 
            className="action-button primary"
            onClick={() => navegarA('mis-cursos')}
          >
            Ver mis cursos
          </button>
        </div>

        <div className="section-card simulacros">
          <div className="card-header">
            <h2>Simulacros</h2>
            <p>Practica con exámenes reales</p>
          </div>
          <button 
            className="action-button secondary"
            onClick={() => navegarA('simulacros')}
          >
            Ir a simulacros
          </button>
        </div>
      </div>
    </main>
  );

  return (
    <StyledWrapper $isDark={isDarkMode} id="simple-student-dashboard">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="logo-section">
            <h1 style={{color: 'white'}}>EPSILON ACADEMY</h1>
            <span className="perfil-badge">PERFIL</span>
          </div>
          
          <div className="user-profile">
            <ThemeToggle />
            <div className="notification-icon">
              <Bell size={20} color="white" />
            </div>
            <div className="user-info">
              <div className="user-name">Demo Student</div>
              <div className="user-email">demo@epsilonacademy.com</div>
            </div>
            <div className="profile-icon">
              <User size={20} color="white" />
            </div>
          </div>
        </header>

        {renderDashboard()}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  &#simple-student-dashboard {
    width: 100vw !important;
    margin: 0 !important;
    padding: 0 !important;
    max-width: none !important;
    min-height: 100vh;
    
    .dashboard-container {
      min-height: 100vh;
      width: 100vw !important;
      background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
        : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
      } !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    .dashboard-header {
      background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
        : 'linear-gradient(135deg, #087799 0%, #076687 100%)'
      } !important;
      color: white !important;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .perfil-badge {
      background: #18e2a2;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .user-info {
      text-align: right;
    }

    .user-name {
      font-weight: 600;
      color: white;
    }

    .user-email {
      font-size: 0.8rem;
      color: #cbd5e1;
    }

    .main-content {
      padding: 2rem;
    }

    .main-sections {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .section-card {
      background: ${props => props.$isDark 
        ? 'rgba(30, 41, 59, 0.6)'
        : 'rgba(255, 255, 255, 0.8)'
      };
      backdrop-filter: blur(10px);
      border: ${props => props.$isDark 
        ? '1px solid rgba(255, 255, 255, 0.1)'
        : '1px solid rgba(0, 0, 0, 0.05)'
      };
      border-radius: 12px;
      padding: 2rem;
      box-shadow: ${props => props.$isDark 
        ? '0 8px 32px rgba(0, 0, 0, 0.3)'
        : '0 4px 20px rgba(0, 0, 0, 0.1)'
      };
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-4px);
      }

      &.oferta-academica {
        border-left: 4px solid #F0E23D;
      }

      &.mis-cursos {
        border-left: 4px solid #087799;
      }

      &.simulacros {
        border-left: 4px solid #F7750b;
      }
    }

    .card-header h2 {
      color: ${props => props.$isDark ? '#f1f5f9' : '#2c3e50'};
      margin-bottom: 0.5rem;
    }

    .card-header p {
      color: ${props => props.$isDark ? '#94a3b8' : '#7f8c8d'};
      margin-bottom: 1.5rem;
    }

    .action-button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &.primary {
        background: linear-gradient(135deg, #087799, #0891b2);
        color: white;
      }

      &.secondary {
        background: linear-gradient(135deg, #F7750b, #ea580c);
        color: white;
      }

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      }
    }
  }
`;

export default SimpleStudentDashboard;
