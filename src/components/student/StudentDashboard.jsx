import React, { useState } from 'react';
import styled from 'styled-components';
import { User, Bell } from 'lucide-react';
import { useTheme } from '../../themes/ThemeContext';
import ThemeToggle from '../common/ThemeToggle';
import OfertaAcademica from './OfertaAcademica';
import MisCursos from './MisCursos';
import Simulacros from './Simulacros';
import StudentProfile from './StudentProfile';
import { getAssetPath } from '../../utils/paths';

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
      case 'perfil':
        return <StudentProfile />;
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
              src={isDarkMode ? getAssetPath("/assets/images/LogotipoBlanco.png") : getAssetPath("/assets/images/LogotipoGrisOscuro.png")}
              alt="Epsilon Akdemy" 
              className="logo-image"
              style={{ transition: 'opacity 0.3s ease' }}
              onError={(e) => {
                // Si LogotipoGrisOscuro no existe, intentar con otra opción
                if (!isDarkMode && e.target.src.includes('LogotipoGrisOscuro')) {
                  e.target.src = getAssetPath("/assets/images/IsotipoNegro.png");
                  return;
                }
                e.target.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.innerHTML = '<span class="logo">epsilon</span><span class="academy">AKDEMY</span>';
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
                {currentPage === 'perfil' && 'Mi Perfil'}
              </h1>
            )}
          </div>
          
          <div className="user-profile">
            <ThemeToggle />
            <div className="notification-icon">
              <Bell size={20} color={isDarkMode ? "#cbd5e1" : "#2c3e50"} />
            </div>
            <div 
              className="user-info"
              onClick={() => navegarA('perfil')}
              style={{ cursor: 'pointer' }}
            >
              <div className="user-name">Demo Student</div>
              <div className="user-email">demo@epsilonacademy.com</div>
              <div className="edit-profile">Ver mi perfil</div>
            </div>
            <div 
              className="profile-icon"
              onClick={() => navegarA('perfil')}
              style={{ cursor: 'pointer' }}
            >
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
    ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1a1a2e 100%)' 
    : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #c3cfe2 100%)'
  };
  position: relative;
  overflow-x: hidden;

  /* CSS Variables for consistent theming */
  --color-e-kids: #f0e23d;
  --color-bachillerato: #f7750b;
  --color-pre-u: #6969bc;
  --color-profes: #087799;
  --color-secondary: #18e2a2;

  .container {
    max-width: 100%;
    padding: 0;
    min-height: 100vh;
  }

  /* Enhanced Header Styling */
  .header {
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)' 
      : 'linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)'
    };
    backdrop-filter: blur(20px);
    border-bottom: 1px solid ${props => props.$isDark ? 'rgba(51, 65, 85, 0.5)' : 'rgba(226, 232, 240, 0.8)'};
    padding: 1.2rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: ${props => props.$isDark 
      ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
      : '0 4px 20px rgba(0, 0, 0, 0.1)'
    };
    transition: all 0.3s ease;
  }

  .logo-section {
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  .logo-image {
    height: 42px;
    width: auto;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    transition: filter 0.3s ease;
  }

  .logo-fallback {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    .logo {
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--color-e-kids);
      text-transform: lowercase;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }
    .academy {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--color-profes);
      margin-left: 0.3rem;
      letter-spacing: 1px;
    }
  }

  .perfil-badge {
    background: linear-gradient(135deg, var(--color-e-kids) 0%, var(--color-bachillerato) 100%);
    color: white;
    padding: 0.4rem 0.8rem;
    border-radius: 15px;
    font-size: 0.75rem;
    font-weight: 700;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    box-shadow: 0 2px 8px rgba(247, 117, 11, 0.3);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(247, 117, 11, 0.4);
    }
  }

  .header-center {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  .nav-button {
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, #334155 0%, #475569 100%)' 
      : 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%)'
    };
    color: ${props => props.$isDark ? '#f1f5f9' : '#1e293b'};
    border: 1px solid ${props => props.$isDark ? '#475569' : '#cbd5e0'};
    padding: 0.6rem 1.2rem;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
      background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, #475569 0%, #64748b 100%)' 
        : 'linear-gradient(135deg, #cbd5e0 0%, #94a3b8 100%)'
      };
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .page-title {
    color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
    font-size: 1.6rem;
    font-weight: 700;
    margin: 0;
    text-shadow: ${props => props.$isDark 
      ? '2px 2px 4px rgba(0, 0, 0, 0.3)' 
      : '1px 1px 2px rgba(0, 0, 0, 0.1)'
    };
  }

  .user-profile {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  .notification-icon {
    padding: 0.6rem;
    border-radius: 12px;
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, #334155 0%, #475569 100%)' 
      : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
    };
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

    &:hover {
      background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, #475569 0%, #64748b 100%)' 
        : 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%)'
      };
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    }
  }

  .user-info {
    text-align: right;
    transition: all 0.3s ease;
    
    .user-name {
      font-weight: 700;
      color: ${props => props.$isDark ? '#f1f5f9' : '#1e293b'};
      font-size: 0.9rem;
      margin-bottom: 0.2rem;
    }
    .user-email {
      font-size: 0.75rem;
      color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
      margin-bottom: 0.3rem;
    }
    .edit-profile {
      font-size: 0.75rem;
      color: var(--color-profes);
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
      
      &:hover {
        color: var(--color-secondary);
        text-decoration: underline;
        transform: scale(1.05);
      }
    }
  }

  .profile-icon {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--color-pre-u) 0%, var(--color-profes) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(8, 119, 153, 0.3);

    &:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 6px 20px rgba(8, 119, 153, 0.4);
    }
  }

  /* Enhanced Main Content */
  .main-content {
    padding: 2.5rem 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  .main-sections {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
    gap: 2.5rem;
    margin-bottom: 3rem;
  }

  .section-card {
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.8) 100%)' 
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)'
    };
    backdrop-filter: blur(25px);
    border-radius: 20px;
    padding: 2rem;
    border: 1px solid ${props => props.$isDark 
      ? 'rgba(71, 85, 105, 0.3)' 
      : 'rgba(226, 232, 240, 0.5)'
    };
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    box-shadow: ${props => props.$isDark 
      ? '0 10px 30px rgba(0, 0, 0, 0.3)' 
      : '0 10px 30px rgba(0, 0, 0, 0.1)'
    };

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--color-e-kids), var(--color-bachillerato), var(--color-pre-u), var(--color-profes));
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover {
      transform: translateY(-8px);
      box-shadow: ${props => props.$isDark 
        ? '0 20px 50px rgba(0, 0, 0, 0.4)' 
        : '0 20px 50px rgba(0, 0, 0, 0.15)'
      };

      &::before {
        opacity: 1;
      }
    }

    &.oferta-academica {
      border-left: 4px solid var(--color-profes);
      
      &:hover {
        box-shadow: 0 20px 50px rgba(8, 119, 153, 0.2);
      }
    }

    &.mis-cursos {
      border-left: 4px solid var(--color-secondary);
      
      &:hover {
        box-shadow: 0 20px 50px rgba(24, 226, 162, 0.2);
      }
    }

    &.simulacros {
      border-left: 4px solid var(--color-bachillerato);
      
      &:hover {
        box-shadow: 0 20px 50px rgba(247, 117, 11, 0.2);
      }
    }
  }

  .card-header {
    margin-bottom: 2rem;
    
    h2 {
      color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 0.6rem;
      text-shadow: ${props => props.$isDark 
        ? '1px 1px 2px rgba(0, 0, 0, 0.3)' 
        : '1px 1px 2px rgba(0, 0, 0, 0.1)'
      };
    }
    
    p {
      color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
      font-size: 0.9rem;
      line-height: 1.5;
    }
  }

  .course-list {
    margin-bottom: 2rem;
  }

  .course-item {
    padding: 1rem;
    border-radius: 12px;
    margin-bottom: 0.8rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s ease;
    }

    &:hover::before {
      left: 100%;
    }

    &:hover {
      transform: translateX(8px);
    }

    &.matematicas {
      background: linear-gradient(135deg, 
        rgba(240, 226, 61, 0.15) 0%, 
        rgba(247, 117, 11, 0.15) 100%
      );
      border-left: 4px solid var(--color-e-kids);
      box-shadow: 0 4px 15px rgba(240, 226, 61, 0.2);
    }
    
    &.fisica {
      background: linear-gradient(135deg, 
        rgba(105, 105, 188, 0.15) 0%, 
        rgba(8, 119, 153, 0.15) 100%
      );
      border-left: 4px solid var(--color-pre-u);
      box-shadow: 0 4px 15px rgba(105, 105, 188, 0.2);
    }
    
    &.quimica {
      background: linear-gradient(135deg, 
        rgba(8, 119, 153, 0.15) 0%, 
        rgba(24, 226, 162, 0.15) 100%
      );
      border-left: 4px solid var(--color-profes);
      box-shadow: 0 4px 15px rgba(8, 119, 153, 0.2);
    }
  }

  .course-label {
    font-weight: 700;
    color: ${props => props.$isDark ? '#f1f5f9' : '#1e293b'};
    font-size: 0.95rem;
  }

  .course-desc {
    color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
    font-size: 0.8rem;
    line-height: 1.4;
  }

  .stats-section {
    display: flex;
    justify-content: space-around;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, rgba(51, 65, 85, 0.5) 0%, rgba(71, 85, 105, 0.3) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.6) 100%)'
    };
    border-radius: 15px;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  .stat {
    text-align: center;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
    
    .stat-number {
      font-size: 2.2rem;
      font-weight: 800;
      background: linear-gradient(135deg, var(--color-profes), var(--color-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .stat-label {
      font-size: 0.8rem;
      color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
      font-weight: 600;
      margin-top: 0.3rem;
    }
  }

  .progress-courses {
    margin-bottom: 2rem;
  }

  .course-progress {
    margin-bottom: 1.2rem;
    padding: 1rem;
    background: ${props => props.$isDark 
      ? 'rgba(51, 65, 85, 0.3)' 
      : 'rgba(248, 250, 252, 0.8)'
    };
    border-radius: 12px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
    
    .course-name {
      font-size: 0.9rem;
      color: ${props => props.$isDark ? '#f1f5f9' : '#1e293b'};
      margin-bottom: 0.8rem;
      font-weight: 600;
    }
    
    .progress-bar {
      background: ${props => props.$isDark ? '#334155' : '#e2e8f0'};
      height: 10px;
      border-radius: 6px;
      overflow: hidden;
      position: relative;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .progress-fill {
      background: linear-gradient(90deg, 
        var(--color-e-kids) 0%, 
        var(--color-bachillerato) 50%, 
        var(--color-secondary) 100%
      );
      height: 100%;
      border-radius: 6px;
      transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        animation: shimmer 2s infinite;
      }
    }
    
    .progress-text {
      font-size: 0.8rem;
      color: var(--color-profes);
      margin-top: 0.5rem;
      font-weight: 700;
      text-align: right;
    }
  }

  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  .simulacros-options {
    margin-bottom: 2rem;
  }

  .simulacro-option {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    margin-bottom: 0.8rem;
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, rgba(51, 65, 85, 0.5) 0%, rgba(71, 85, 105, 0.3) 100%)'
      : 'linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.6) 100%)'
    };
    border-radius: 12px;
    color: ${props => props.$isDark ? '#f1f5f9' : '#1e293b'};
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid ${props => props.$isDark ? 'rgba(71, 85, 105, 0.3)' : 'rgba(226, 232, 240, 0.5)'};

    &:hover {
      background: linear-gradient(135deg, var(--color-bachillerato), #e65b00);
      color: white;
      transform: translateX(8px);
      box-shadow: 0 8px 25px rgba(247, 117, 11, 0.3);
    }

    .icon {
      font-size: 1.4rem;
      transition: transform 0.3s ease;
    }

    &:hover .icon {
      transform: scale(1.2);
    }
  }

  .action-button {
    width: 100%;
    padding: 1rem 1.5rem;
    border: none;
    border-radius: 12px;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transition: width 0.6s, height 0.6s;
      transform: translate(-50%, -50%);
    }

    &:active::before {
      width: 300px;
      height: 300px;
    }

    &.primary {
      background: linear-gradient(135deg, var(--color-profes) 0%, var(--color-secondary) 100%);
      color: white;
      box-shadow: 0 6px 20px rgba(8, 119, 153, 0.3);
      
      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(8, 119, 153, 0.4);
        background: linear-gradient(135deg, #0a8db5 0%, #20f5c7 100%);
      }
    }

    &.secondary {
      background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, #334155 0%, #475569 100%)' 
        : 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%)'
      };
      color: ${props => props.$isDark ? '#f1f5f9' : '#1e293b'};
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      
      &:hover {
        background: ${props => props.$isDark 
          ? 'linear-gradient(135deg, #475569 0%, #64748b 100%)' 
          : 'linear-gradient(135deg, #cbd5e0 0%, #94a3b8 100%)'
        };
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      }
    }
  }

  .news-section {
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.8) 100%)' 
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)'
    };
    backdrop-filter: blur(25px);
    border-radius: 20px;
    padding: 2rem;
    border: 1px solid ${props => props.$isDark 
      ? 'rgba(71, 85, 105, 0.3)' 
      : 'rgba(226, 232, 240, 0.5)'
    };
    box-shadow: ${props => props.$isDark 
      ? '0 10px 30px rgba(0, 0, 0, 0.3)' 
      : '0 10px 30px rgba(0, 0, 0, 0.1)'
    };
    border-left: 4px solid var(--color-bachillerato);
  }

  .news-title {
    color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    text-align: center;
    background: linear-gradient(135deg, var(--color-bachillerato), var(--color-e-kids));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .news-content {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  .news-item {
    padding: 1.5rem;
    border-radius: 15px;
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, rgba(51, 65, 85, 0.5) 0%, rgba(71, 85, 105, 0.3) 100%)'
      : 'linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.6) 100%)'
    };
    transition: all 0.3s ease;
    border-left: 4px solid var(--color-secondary);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(24, 226, 162, 0.2);
    }

    h3 {
      color: ${props => props.$isDark ? '#f1f5f9' : '#1e293b'};
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 0.8rem;
    }
    
    p {
      color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
      font-size: 0.9rem;
      line-height: 1.6;
      margin-bottom: 0.8rem;
    }
    
    small {
      color: ${props => props.$isDark ? '#64748b' : '#94a3b8'};
      font-size: 0.8rem;
      font-weight: 500;
    }
  }

  /* Enhanced Responsive Design */
  @media (max-width: 1200px) {
    .main-sections {
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }
  }

  @media (max-width: 768px) {
    .main-content {
      padding: 1.5rem 1rem;
    }
    
    .main-sections {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .section-card {
      padding: 1.5rem;
    }
    
    .header {
      padding: 1rem;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    .logo-section {
      order: 1;
    }
    
    .header-center {
      order: 3;
      width: 100%;
      justify-content: center;
    }
    
    .user-profile {
      order: 2;
    }
    
    .user-info {
      display: none;
    }
    
    .news-section {
      padding: 1.5rem;
    }

    .stats-section {
      padding: 1rem;
    }

    .stat .stat-number {
      font-size: 1.8rem;
    }
  }

  @media (max-width: 480px) {
    .main-content {
      padding: 1rem 0.5rem;
    }
    
    .section-card {
      padding: 1.2rem;
    }
    
    .header {
      padding: 0.8rem;
    }
    
    .logo-image {
      height: 35px;
    }
    
    .news-section {
      padding: 1.2rem;
    }

    .course-item {
      padding: 0.8rem;
    }

    .simulacro-option {
      padding: 0.8rem;
    }
  }
`;

export default StudentDashboard;
