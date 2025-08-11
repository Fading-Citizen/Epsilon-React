import React, { useState } from 'react';
import styled from 'styled-components';
import { User, Bell } from 'lucide-react';
import { useTheme } from '../../themes/ThemeContext';
import ThemeToggle from '../common/ThemeToggle';
import OfertaAcademica from './OfertaAcademica';
import MisCursos from './MisCursos';
import Simulacros from './Simulacros';

const StudentDashboard = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { theme, isDarkMode } = useTheme();

  const navegarA = (pagina) => {
    setCurrentPage(pagina);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'oferta-academica':
        return <OfertaAcademica />;
      case 'mis-cursos':
        return <MisCursos />;
      case 'simulacros':
        return <Simulacros />;
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <main className="main-content">
      {/* Three main sections */}
      <div className="main-sections">
        {/* Oferta Académica */}
        <div className="section-card oferta-academica">
          <div className="card-header">
            <h2>Oferta Académica</h2>
            <p>Explora todos los cursos disponibles</p>
          </div>
          <div className="course-list">
            <div className="course-item matematicas">
              <span className="course-label">Matemáticas</span>
              <span className="course-desc">Curso completo de cálculo diferencial</span>
            </div>
            <div className="course-item fisica">
              <span className="course-label">Física</span>
              <span className="course-desc">Fundamentos de mecánica clásica</span>
            </div>
            <div className="course-item quimica">
              <span className="course-label">Química</span>
              <span className="course-desc">Química orgánica avanzada</span>
            </div>
          </div>
          <button 
            className="action-button secondary"
            onClick={() => navegarA('oferta-academica')}
          >
            Ver todos los cursos
          </button>
        </div>

        {/* Mis Cursos */}
        <div className="section-card mis-cursos">
          <div className="card-header">
            <h2>Mis Cursos</h2>
            <p>Tu progreso académico personal</p>
          </div>
          <div className="stats-section">
            <div className="stat">
              <div className="stat-number">5</div>
              <div className="stat-label">Cursos Activos</div>
            </div>
            <div className="stat">
              <div className="stat-number">78%</div>
              <div className="stat-label">Progreso Promedio</div>
            </div>
          </div>
          <div className="progress-courses">
            <div className="course-progress">
              <div className="course-name">Cálculo I - Límites y Continuidad</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '95%'}}></div>
              </div>
              <div className="progress-text">95%</div>
            </div>
            <div className="course-progress">
              <div className="course-name">Física General - Cinemática</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '62%'}}></div>
              </div>
              <div className="progress-text">62%</div>
            </div>
          </div>
          <button 
            className="action-button primary"
            onClick={() => navegarA('mis-cursos')}
          >
            Ver mis cursos
          </button>
        </div>

        {/* Simulacros */}
        <div className="section-card simulacros">
          <div className="card-header">
            <h2>Simulacros</h2>
            <p>Practica con exámenes reales</p>
          </div>
          <div className="simulacros-options">
            <div className="simulacro-option">
              <span className="icon">📝</span>
              <span>Exámenes cronometrados</span>
            </div>
            <div className="simulacro-option">
              <span className="icon">📊</span>
              <span>Ranking de estudiantes</span>
            </div>
            <div className="simulacro-option">
              <span className="icon">🏆</span>
              <span>Certificados de logros</span>
            </div>
          </div>
          <button 
            className="action-button secondary"
            onClick={() => navegarA('simulacros')}
          >
            Ir a simulacros
          </button>
        </div>
      </div>

      {/* News Section */}
      <div className="news-section">
        <h2 className="news-title">Noticias y Anuncios</h2>
        <div className="news-content">
          <div className="news-item">
            <h3>🎉 ¡Nuevos cursos disponibles!</h3>
            <p>Hemos agregado cursos de Biología y Literatura para completar tu preparación académica.</p>
            <small>Hace 2 días</small>
          </div>
          <div className="news-item">
            <h3>📅 Próximo simulacro nacional</h3>
            <p>Regístrate para el simulacro nacional que se realizará el próximo sábado a las 9:00 AM.</p>
            <small>Hace 1 semana</small>
          </div>
        </div>
      </div>
    </main>
  );

  return (
    <StyledWrapper $isDark={isDarkMode}>
      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="logo-section">
            <img 
              src="/assets/images/LogotipoBlanco.png" 
              alt="Epsilon Academy" 
              className="logo-image"
              onError={(e) => {
                e.target.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.innerHTML = '<span class="logo">epsilon</span><span class="academy">ACADEMY</span>';
                fallback.className = 'logo-fallback';
                e.target.parentElement.insertBefore(fallback, e.target);
              }}
            />
            <span className="perfil-badge">PERFIL</span>
          </div>
          
          <div className="header-center">
            {/* Navigation */}
            {currentPage !== 'dashboard' && (
              <button 
                className="nav-button back"
                onClick={() => navegarA('dashboard')}
              >
                ← Dashboard
              </button>
            )}
            
            {/* Page Title */}
            {currentPage !== 'dashboard' && (
              <h1 className="page-title">
                {currentPage === 'oferta-academica' && 'Oferta Académica'}
                {currentPage === 'mis-cursos' && 'Mis Cursos'}
                {currentPage === 'simulacros' && 'Simulacros'}
              </h1>
            )}
          </div>
          
          <div className="user-profile">
            <ThemeToggle />
            <div className="notification-icon">
              <Bell size={20} color={isDarkMode ? "#cbd5e1" : "#2c3e50"} />
            </div>
            <div className="user-info">
              <div className="user-name">Demo Student</div>
              <div className="user-email">demo@epsilonacademy.com</div>
              <div className="edit-profile">Editar perfil</div>
            </div>
            <div className="profile-icon">
              <User size={20} color={isDarkMode ? "#cbd5e1" : "#2c3e50"} />
            </div>
          </div>
        </header>

        {/* Render Content */}
        {renderContent()}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  min-height: 100vh;
  background: ${props => props.$isDark 
    ? 'linear-gradient(135deg, #1a1a2e, #16213e)' 
    : 'linear-gradient(135deg, #f5f7fa, #c3cfe2)'
  };

  .container {
    max-width: 100%;
    padding: 0;
  }

  /* Header Styling */
  .header {
    background: ${props => props.$isDark 
      ? 'rgba(30, 30, 60, 0.95)' 
      : 'rgba(255, 255, 255, 0.95)'
    };
    backdrop-filter: blur(20px);
    border-bottom: 1px solid ${props => props.$isDark ? '#333660' : '#e1e5e9'};
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  .logo-section {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .logo-image {
    height: 40px;
    width: auto;
  }

  .logo-fallback {
    .logo {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--color-e-kids);
      text-transform: lowercase;
    }
    .academy {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--color-profes);
      margin-left: 0.25rem;
    }
  }

  .perfil-badge {
    background: linear-gradient(135deg, var(--color-e-kids), var(--color-bachillerato));
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .header-center {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .nav-button {
    background: ${props => props.$isDark ? '#4a5568' : '#e2e8f0'};
    color: ${props => props.$isDark ? '#e2e8f0' : '#2d3748'};
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;

    &:hover {
      background: ${props => props.$isDark ? '#5a6578' : '#cbd5e0'};
    }
  }

  .page-title {
    color: ${props => props.$isDark ? '#e2e8f0' : '#2d3748'};
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
  }

  .user-profile {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .notification-icon {
    padding: 0.5rem;
    border-radius: 8px;
    background: ${props => props.$isDark ? '#4a5568' : '#f7fafc'};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: ${props => props.$isDark ? '#5a6578' : '#edf2f7'};
    }
  }

  .user-info {
    text-align: right;
    .user-name {
      font-weight: 600;
      color: ${props => props.$isDark ? '#e2e8f0' : '#2d3748'};
      font-size: 0.875rem;
    }
    .user-email {
      font-size: 0.75rem;
      color: ${props => props.$isDark ? '#a0aec0' : '#718096'};
    }
    .edit-profile {
      font-size: 0.75rem;
      color: var(--color-profes);
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .profile-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--color-pre-u), var(--color-profes));
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  /* Main Content */
  .main-content {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .main-sections {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .section-card {
    background: ${props => props.$isDark 
      ? 'rgba(30, 30, 60, 0.8)' 
      : 'rgba(255, 255, 255, 0.9)'
    };
    backdrop-filter: blur(20px);
    border-radius: 16px;
    padding: 1.5rem;
    border: 1px solid ${props => props.$isDark ? '#333660' : '#e1e5e9'};
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: ${props => props.$isDark 
        ? '0 20px 40px rgba(0,0,0,0.3)' 
        : '0 20px 40px rgba(0,0,0,0.1)'
      };
    }
  }

  .card-header {
    margin-bottom: 1.5rem;
    h2 {
      color: ${props => props.$isDark ? '#e2e8f0' : '#2d3748'};
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    p {
      color: ${props => props.$isDark ? '#a0aec0' : '#718096'};
      font-size: 0.875rem;
    }
  }

  .course-list {
    margin-bottom: 1.5rem;
  }

  .course-item {
    padding: 0.75rem;
    border-radius: 8px;
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    &.matematicas {
      background: linear-gradient(135deg, rgba(240, 226, 61, 0.1), rgba(247, 117, 11, 0.1));
      border-left: 4px solid var(--color-e-kids);
    }
    &.fisica {
      background: linear-gradient(135deg, rgba(105, 105, 188, 0.1), rgba(8, 119, 153, 0.1));
      border-left: 4px solid var(--color-pre-u);
    }
    &.quimica {
      background: linear-gradient(135deg, rgba(8, 119, 153, 0.1), rgba(24, 226, 162, 0.1));
      border-left: 4px solid var(--color-profes);
    }
  }

  .course-label {
    font-weight: 600;
    color: ${props => props.$isDark ? '#e2e8f0' : '#2d3748'};
    font-size: 0.875rem;
  }

  .course-desc {
    color: ${props => props.$isDark ? '#a0aec0' : '#718096'};
    font-size: 0.75rem;
  }

  .stats-section {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1.5rem;
  }

  .stat {
    text-align: center;
    .stat-number {
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-profes);
    }
    .stat-label {
      font-size: 0.75rem;
      color: ${props => props.$isDark ? '#a0aec0' : '#718096'};
    }
  }

  .progress-courses {
    margin-bottom: 1.5rem;
  }

  .course-progress {
    margin-bottom: 1rem;
    .course-name {
      font-size: 0.875rem;
      color: ${props => props.$isDark ? '#e2e8f0' : '#2d3748'};
      margin-bottom: 0.5rem;
    }
    .progress-bar {
      background: ${props => props.$isDark ? '#4a5568' : '#e2e8f0'};
      height: 8px;
      border-radius: 4px;
      overflow: hidden;
      position: relative;
    }
    .progress-fill {
      background: linear-gradient(90deg, var(--color-e-kids), var(--color-bachillerato));
      height: 100%;
      border-radius: 4px;
      transition: width 0.3s ease;
    }
    .progress-text {
      font-size: 0.75rem;
      color: var(--color-profes);
      margin-top: 0.25rem;
      font-weight: 600;
    }
  }

  .simulacros-options {
    margin-bottom: 1.5rem;
  }

  .simulacro-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    background: ${props => props.$isDark ? '#4a5568' : '#f7fafc'};
    border-radius: 8px;
    color: ${props => props.$isDark ? '#e2e8f0' : '#2d3748'};
    font-size: 0.875rem;

    .icon {
      font-size: 1.25rem;
    }
  }

  .action-button {
    width: 100%;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &.primary {
      background: linear-gradient(135deg, var(--color-profes), var(--color-secondary));
      color: white;
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(8, 119, 153, 0.3);
      }
    }

    &.secondary {
      background: ${props => props.$isDark ? '#4a5568' : '#e2e8f0'};
      color: ${props => props.$isDark ? '#e2e8f0' : '#2d3748'};
      &:hover {
        background: ${props => props.$isDark ? '#5a6578' : '#cbd5e0'};
      }
    }
  }

  .news-section {
    background: ${props => props.$isDark 
      ? 'rgba(30, 30, 60, 0.8)' 
      : 'rgba(255, 255, 255, 0.9)'
    };
    backdrop-filter: blur(20px);
    border-radius: 16px;
    padding: 1.5rem;
    border: 1px solid ${props => props.$isDark ? '#333660' : '#e1e5e9'};
  }

  .news-title {
    color: ${props => props.$isDark ? '#e2e8f0' : '#2d3748'};
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .news-item {
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    background: ${props => props.$isDark ? '#4a5568' : '#f7fafc'};

    h3 {
      color: ${props => props.$isDark ? '#e2e8f0' : '#2d3748'};
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
    p {
      color: ${props => props.$isDark ? '#a0aec0' : '#718096'};
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }
    small {
      color: ${props => props.$isDark ? '#a0aec0' : '#718096'};
      font-size: 0.75rem;
    }
  }

  @media (max-width: 768px) {
    .main-sections {
      grid-template-columns: 1fr;
    }
    .header {
      padding: 1rem;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .user-info {
      display: none;
    }
  }
`;

export default StudentDashboard;
};

const StyledWrapper = styled.div`
  &#student-dashboard-wrapper {
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

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
      overflow-x: hidden;
      margin: 0 !important;
      padding: 0 !important;
      max-width: none !important;
      transition: background 0.3s ease;
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
    box-shadow: ${props => props.$isDark 
      ? '0 2px 10px rgba(0,0,0,0.3)'
      : '0 2px 10px rgba(0,0,0,0.1)'
    };
    width: 100vw !important;
    margin: 0 !important;
    max-width: none !important;
    position: relative;
    transition: all 0.3s ease;
  }

  .header-center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    gap: 2rem;

    .nav-button {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 0.5rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }

      &.back {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }

    .page-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: white;
      margin: 0;
      text-align: center;
    }
  }

  .logo-section {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    position: relative;
    
    .logo-image {
      height: 45px;
      width: auto;
      filter: brightness(1.1) contrast(1.1);
    }
    
    .logo-fallback {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }

  .logo {
    font-size: 1.8rem;
    font-weight: 300;
    letter-spacing: 2px;
  }

  .academy {
    font-size: 0.9rem;
    font-weight: 600;
    color: #ecf0f1;
  }

  .perfil-badge {
    background: linear-gradient(135deg, #18e2a2 0%, #15c78a 100%);
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 15px;
    font-size: 0.7rem;
    font-weight: bold;
    margin-left: 1rem;
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
    font-weight: bold;
    font-size: 1rem;
    color: white;
  }

  .user-email {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.8);
  }

  .edit-profile {
    font-size: 0.8rem;
    color: #18e2a2;
    cursor: pointer;
    margin-top: 0.2rem;
    transition: color 0.3s ease;

    &:hover {
      color: #15c78a;
    }
  }

  .profile-icon, .notification-icon {
    width: 40px;
    height: 40px;
    background: ${props => props.$isDark 
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(255, 255, 255, 0.2)'
    };
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: ${props => props.$isDark 
        ? 'rgba(255, 255, 255, 0.2)'
        : 'rgba(255, 255, 255, 0.3)'
      };
    }
  }
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    cursor: pointer;
  }

  .main-content {
    padding: 2rem;
    width: 100% !important;
    max-width: 1400px;
    margin: 0 auto !important;
    box-sizing: border-box;
  }

  .main-sections {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-bottom: 2rem;
    width: 100% !important;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    justify-items: center;
  }

  .section-card {
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.6) 100%)'
      : 'rgba(255, 255, 255, 0.9)'
    };
    backdrop-filter: blur(10px);
    border: ${props => props.$isDark 
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(255, 255, 255, 0.2)'
    };
    border-radius: 20px;
    padding: 2rem;
    box-shadow: ${props => props.$isDark 
      ? '0 8px 32px rgba(0,0,0,0.3)'
      : '0 8px 32px rgba(0,0,0,0.1)'
    };
    transition: all 0.3s ease;
    min-height: 400px;
    width: 100%;
    max-width: 380px;
    display: flex;
    flex-direction: column;
    justify-self: center;
  }

  .section-card:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.$isDark 
      ? '0 12px 48px rgba(0,0,0,0.4)'
      : '0 12px 48px rgba(0,0,0,0.15)'
    };
  }

  .card-header h2 {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
  }
    color: #2c3e50;
  }

  .card-header p {
    color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }

  .oferta-academica {
    border-left: 5px solid #087799;
  }

  .course-list {
    flex: 1;
    margin-bottom: 1.5rem;
  }

  .course-item {
    padding: 1rem;
    margin-bottom: 0.8rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .matematicas { 
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, #5a5aa8 0%, #4b4b94 100%)'
      : 'linear-gradient(135deg, #6969bc 0%, #5a5aa8 100%)'
    }; 
    color: white; 
  }
  .fisica { 
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, #e6690a 0%, #d55d09 100%)'
      : 'linear-gradient(135deg, #F7750b 0%, #e6690a 100%)'
    }; 
    color: white; 
  }
  .quimica { 
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, #076687 0%, #065575 100%)'
      : 'linear-gradient(135deg, #087799 0%, #076687 100%)'
    }; 
    color: white; 
  }

  .course-label {
    font-weight: bold;
    font-size: 1rem;
  }

  .course-desc {
    font-size: 0.85rem;
    opacity: 0.9;
  }

  .mis-cursos {
    border-left: 5px solid #1abc9c;
    background: linear-gradient(135deg, #f0fff4 0%, #e8f8f5 100%);
  }

  .stats-section {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: white;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  }

  .stat {
    text-align: center;
  }

  .stat-number {
    font-size: 2rem;
    font-weight: bold;
    color: #1abc9c;
  }

  .stat-label {
    font-size: 0.9rem;
    color: #7f8c8d;
  }

  .progress-courses {
    flex: 1;
    margin-bottom: 1.5rem;
  }

  .course-progress {
    margin-bottom: 1rem;
    padding: 1rem;
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }

  .course-name {
    font-size: 0.9rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .progress-bar {
    width: 100%;
    height: 8px;
    background-color: #ecf0f1;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 0.3rem;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #1abc9c 0%, #16a085 100%);
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.8rem;
    color: #1abc9c;
    font-weight: bold;
    text-align: right;
  }

  .simulacros {
    border-left: 5px solid #e74c3c;
  }

  .simulacros-options {
    flex: 1;
    margin-bottom: 1.5rem;
  }

  .simulacro-option {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    margin-bottom: 0.8rem;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 10px;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .simulacro-option:hover {
    background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
    color: white;
    transform: translateX(5px);
  }

  .simulacro-option .icon {
    font-size: 1.5rem;
  }

  .action-button {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
  }

  .action-button.primary {
    background: linear-gradient(135deg, #18e2a2 0%, #15c78a 100%);
    color: white;
  }

  .action-button.secondary {
    background: linear-gradient(135deg, #087799 0%, #076687 100%);
    color: white;
  }

  .action-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }

  .news-section {
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.6) 100%)'
      : 'rgba(255, 255, 255, 0.9)'
    };
    backdrop-filter: blur(10px);
    border: ${props => props.$isDark 
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(255, 255, 255, 0.2)'
    };
    border-radius: 20px;
    padding: 2rem;
    box-shadow: ${props => props.$isDark 
      ? '0 8px 32px rgba(0,0,0,0.3)'
      : '0 8px 32px rgba(0,0,0,0.1)'
    };
    border-left: 5px solid #F7750b;
    width: 100% !important;
    max-width: 1200px;
    margin: 0 auto !important;
    box-sizing: border-box;
  }

  .news-title {
    color: ${props => props.$isDark ? '#F7750b' : '#F7750b'};
    font-size: 1.8rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2rem;
  }

  .news-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .news-item {
    padding: 1.5rem;
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, rgba(51, 65, 85, 0.5) 0%, rgba(30, 41, 59, 0.5) 100%)'
      : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
    };
    border-radius: 15px;
    border-left: 4px solid #18e2a2;
  }

  .news-item h3 {
    color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
    font-size: 1.1rem;
    margin-bottom: 0.8rem;
  }

  .news-item p {
    color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 0.5rem;
  }

  .news-item small {
    color: ${props => props.$isDark ? '#64748b' : '#94a3b8'};
    font-size: 0.8rem;
  }

  @media (max-width: 1200px) {
    .main-sections {
      grid-template-columns: repeat(2, 1fr);
      max-width: 800px;
    }
    
    .section-card {
      max-width: 100%;
    }
  }

  @media (max-width: 768px) {
    .main-content {
      padding: 1rem;
    }
    
    .main-sections {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      max-width: 400px;
    }
    
    .section-card {
      padding: 1.5rem;
      max-width: 100%;
    }
    
    .dashboard-header {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
      padding: 1rem;
    }
    
    .user-profile {
      justify-content: center;
    }

    .logo-section {
      justify-content: center;
      
      .logo-image {
        height: 35px;
      }
    }
    
    .news-section {
      padding: 1.5rem;
      max-width: 400px;
    }
  }

  @media (max-width: 480px) {
    .main-content {
      padding: 0.5rem;
    }
    
    .section-card {
      padding: 1rem;
      min-height: 350px;
    }
    
    .dashboard-header {
      padding: 0.5rem;
    }
  }
`;

export default StudentDashboard;
