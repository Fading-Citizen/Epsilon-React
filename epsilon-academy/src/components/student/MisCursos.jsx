import React, { useState } from 'react';
import styled from 'styled-components';
import { BookOpen, Clock, Play, CheckCircle, BookmarkCheck, Calendar, BarChart3, Award } from 'lucide-react';
import { useTheme } from '../../themes/ThemeContext';

const MisCursos = () => {
  const [activeTab, setActiveTab] = useState('en-progreso');
  const { isDarkMode } = useTheme();

  // Datos de ejemplo de cursos del estudiante
  const misCursos = {
    'en-progreso': [
      {
        id: 1,
        titulo: 'Matemáticas Básicas',
        instructor: 'Prof. Ana García',
        progreso: 65,
        totalLecciones: 24,
        leccionesCompletadas: 16,
        ultimaActividad: '2024-12-10',
        tiempoEstimado: '2 semanas restantes',
        categoria: 'matematicas',
        imagen: '/assets/images/curso-matematicas.jpg',
        proximaLeccion: 'Ecuaciones Cuadráticas',
        calificacion: 85
      },
      {
        id: 2,
        titulo: 'Programación Python',
        instructor: 'Prof. Juan Pérez',
        progreso: 40,
        totalLecciones: 18,
        leccionesCompletadas: 7,
        ultimaActividad: '2024-12-08',
        tiempoEstimado: '3 semanas restantes',
        categoria: 'programacion',
        imagen: '/assets/images/curso-python.jpg',
        proximaLeccion: 'Funciones y Parámetros',
        calificacion: 92
      },
      {
        id: 3,
        titulo: 'Física Mecánica',
        instructor: 'Prof. Carlos Ruiz',
        progreso: 20,
        totalLecciones: 30,
        leccionesCompletadas: 6,
        ultimaActividad: '2024-12-05',
        tiempoEstimado: '5 semanas restantes',
        categoria: 'fisica',
        imagen: '/assets/images/curso-fisica.jpg',
        proximaLeccion: 'Leyes de Newton',
        calificacion: 78
      }
    ],
    'completados': [
      {
        id: 4,
        titulo: 'Química Orgánica',
        instructor: 'Prof. María López',
        progreso: 100,
        totalLecciones: 20,
        leccionesCompletadas: 20,
        fechaCompletado: '2024-11-15',
        calificacionFinal: 94,
        certificado: true,
        categoria: 'quimica',
        imagen: '/assets/images/curso-quimica.jpg'
      },
      {
        id: 5,
        titulo: 'Historia Universal',
        instructor: 'Prof. Elena Torres',
        progreso: 100,
        totalLecciones: 16,
        leccionesCompletadas: 16,
        fechaCompletado: '2024-10-20',
        calificacionFinal: 88,
        certificado: true,
        categoria: 'historia',
        imagen: '/assets/images/curso-historia.jpg'
      }
    ],
    'favoritos': [
      {
        id: 6,
        titulo: 'Biología Celular',
        instructor: 'Prof. Roberto Silva',
        descripcion: 'Estructura y función de las células',
        categoria: 'biologia',
        imagen: '/assets/images/curso-biologia.jpg',
        rating: 4.8,
        estudiantes: 98
      }
    ]
  };

  const getProgressColor = (progreso) => {
    if (progreso >= 80) return '#27ae60';
    if (progreso >= 50) return '#f39c12';
    return '#e74c3c';
  };

  const continuarCurso = (cursoId) => {
    console.log(`Continuar curso ${cursoId}`);
    // Aquí implementarías la navegación al curso
  };

  const verCertificado = (cursoId) => {
    console.log(`Ver certificado del curso ${cursoId}`);
    // Aquí implementarías la visualización del certificado
  };

  const inscribirseEnFavorito = (cursoId) => {
    console.log(`Inscribirse en curso favorito ${cursoId}`);
    // Aquí implementarías la inscripción
  };

  return (
    <StyledWrapper $isDark={isDarkMode}>
      <div className="mis-cursos-container">
        <div className="stats-overview">
          <div className="stat-card">
            <div className="stat-icon en-progreso">
              <Play size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-number">{misCursos['en-progreso'].length}</span>
              <span className="stat-label">En Progreso</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon completados">
              <CheckCircle size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-number">{misCursos['completados'].length}</span>
              <span className="stat-label">Completados</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon favoritos">
              <BookmarkCheck size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-number">{misCursos['favoritos'].length}</span>
              <span className="stat-label">Favoritos</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon certificados">
              <Award size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-number">{misCursos['completados'].filter(c => c.certificado).length}</span>
              <span className="stat-label">Certificados</span>
            </div>
          </div>
        </div>

        <div className="tabs-nav">
          <button 
            className={`tab ${activeTab === 'en-progreso' ? 'active' : ''}`}
            onClick={() => setActiveTab('en-progreso')}
          >
            <Play size={20} />
            En Progreso ({misCursos['en-progreso'].length})
          </button>
          <button 
            className={`tab ${activeTab === 'completados' ? 'active' : ''}`}
            onClick={() => setActiveTab('completados')}
          >
            <CheckCircle size={20} />
            Completados ({misCursos['completados'].length})
          </button>
          <button 
            className={`tab ${activeTab === 'favoritos' ? 'active' : ''}`}
            onClick={() => setActiveTab('favoritos')}
          >
            <BookmarkCheck size={20} />
            Favoritos ({misCursos['favoritos'].length})
          </button>
        </div>

        <div className="cursos-content">
          {activeTab === 'en-progreso' && (
            <div className="cursos-grid">
              {misCursos['en-progreso'].map(curso => (
                <div key={curso.id} className="curso-card progreso">
                  <div className="curso-image">
                    <div className="image-placeholder">
                      <BookOpen size={40} color="#3498db" />
                    </div>
                    <div className="progress-overlay">
                      <div className="circular-progress">
                        <span>{curso.progreso}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="curso-content">
                    <h3>{curso.titulo}</h3>
                    <p className="instructor">Por: {curso.instructor}</p>

                    <div className="progress-info">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ 
                            width: `${curso.progreso}%`,
                            backgroundColor: getProgressColor(curso.progreso)
                          }}
                        ></div>
                      </div>
                      <span className="progress-text">
                        {curso.leccionesCompletadas}/{curso.totalLecciones} lecciones
                      </span>
                    </div>

                    <div className="curso-meta">
                      <div className="meta-item">
                        <Calendar size={16} />
                        <span>{new Date(curso.ultimaActividad).toLocaleDateString()}</span>
                      </div>
                      <div className="meta-item">
                        <Clock size={16} />
                        <span>{curso.tiempoEstimado}</span>
                      </div>
                      <div className="meta-item">
                        <BarChart3 size={16} />
                        <span>Promedio: {curso.calificacion}%</span>
                      </div>
                    </div>

                    <div className="next-lesson">
                      <strong>Próxima lección:</strong> {curso.proximaLeccion}
                    </div>

                    <button 
                      className="continue-btn"
                      onClick={() => continuarCurso(curso.id)}
                    >
                      Continuar Curso
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'completados' && (
            <div className="cursos-grid">
              {misCursos['completados'].map(curso => (
                <div key={curso.id} className="curso-card completado">
                  <div className="curso-image">
                    <div className="image-placeholder">
                      <BookOpen size={40} color="#27ae60" />
                    </div>
                    <div className="completed-badge">
                      <CheckCircle size={24} color="white" />
                    </div>
                  </div>

                  <div className="curso-content">
                    <h3>{curso.titulo}</h3>
                    <p className="instructor">Por: {curso.instructor}</p>

                    <div className="completion-info">
                      <div className="completion-badge">
                        <Award size={16} />
                        <span>Completado</span>
                      </div>
                      <span className="completion-date">
                        {new Date(curso.fechaCompletado).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="final-grade">
                      <strong>Calificación Final: {curso.calificacionFinal}%</strong>
                    </div>

                    <div className="curso-actions">
                      <button 
                        className="review-btn"
                        onClick={() => continuarCurso(curso.id)}
                      >
                        Revisar Curso
                      </button>
                      {curso.certificado && (
                        <button 
                          className="certificate-btn"
                          onClick={() => verCertificado(curso.id)}
                        >
                          <Award size={16} />
                          Ver Certificado
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'favoritos' && (
            <div className="cursos-grid">
              {misCursos['favoritos'].map(curso => (
                <div key={curso.id} className="curso-card favorito">
                  <div className="curso-image">
                    <div className="image-placeholder">
                      <BookOpen size={40} color="#f39c12" />
                    </div>
                    <div className="favorite-badge">
                      <BookmarkCheck size={24} color="white" />
                    </div>
                  </div>

                  <div className="curso-content">
                    <h3>{curso.titulo}</h3>
                    <p className="instructor">Por: {curso.instructor}</p>
                    <p className="descripcion">{curso.descripcion}</p>

                    <div className="curso-stats">
                      <span>⭐ {curso.rating}</span>
                      <span>👥 {curso.estudiantes} estudiantes</span>
                    </div>

                    <button 
                      className="enroll-btn"
                      onClick={() => inscribirseEnFavorito(curso.id)}
                    >
                      Inscribirse Ahora
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: ${props => props.$isDark 
    ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1a1a2e 100%)'
    : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #c3cfe2 100%)'
  };
  margin: 0;
  padding: 0;
  transition: background 0.3s ease;
  position: relative;
  overflow-x: hidden;

  /* CSS Variables for consistent theming */
  --color-e-kids: #f0e23d;
  --color-bachillerato: #f7750b;
  --color-pre-u: #6969bc;
  --color-profes: #087799;
  --color-secondary: #18e2a2;

  /* Enhanced Background Animation */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.$isDark 
      ? 'radial-gradient(circle at 30% 70%, rgba(24, 226, 162, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(105, 105, 188, 0.1) 0%, transparent 50%)'
      : 'radial-gradient(circle at 30% 70%, rgba(24, 226, 162, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(105, 105, 188, 0.05) 0%, transparent 50%)'
    };
    animation: backgroundFloat 20s ease-in-out infinite alternate;
    pointer-events: none;
  }

  @keyframes backgroundFloat {
    0% { transform: translate(0, 0) rotate(0deg); }
    100% { transform: translate(10px, -10px) rotate(1deg); }
  }

  .mis-cursos-container {
    width: 100%;
    padding: 2.5rem 2rem;
    margin: 0;
    position: relative;
    z-index: 1;
  }

  .stats-overview {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    margin-bottom: 3rem;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;

    .stat-card {
      background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.8) 100%)'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)'
      };
      backdrop-filter: blur(25px);
      border: 1px solid ${props => props.$isDark 
        ? 'rgba(71, 85, 105, 0.3)' 
        : 'rgba(226, 232, 240, 0.5)'
      };
      border-radius: 20px;
      padding: 2rem;
      display: flex;
      align-items: center;
      gap: 1.5rem;
      box-shadow: ${props => props.$isDark 
        ? '0 10px 30px rgba(0, 0, 0, 0.3)'
        : '0 10px 30px rgba(0, 0, 0, 0.1)'
      };
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;

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
        transform: translateY(-8px) scale(1.02);
        box-shadow: ${props => props.$isDark 
          ? '0 20px 50px rgba(0, 0, 0, 0.4)'
          : '0 20px 50px rgba(0, 0, 0, 0.15)'
        };

        &::before {
          opacity: 1;
        }

        .stat-icon {
          transform: scale(1.1) rotate(5deg);
        }
      }

      .stat-icon {
        width: 60px;
        height: 60px;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        transition: transform 0.3s ease;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);

        &.en-progreso {
          background: linear-gradient(135deg, var(--color-profes) 0%, #065575 100%);
        }

        &.completados {
          background: linear-gradient(135deg, var(--color-secondary) 0%, #12b172 100%);
        }

        &.favoritos {
          background: linear-gradient(135deg, var(--color-bachillerato) 0%, #d55d09 100%);
        }

        &.certificados {
          background: linear-gradient(135deg, var(--color-pre-u) 0%, #4b4b94 100%);
        }
      }

      .stat-content {
        display: flex;
        flex-direction: column;

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
          line-height: 1;
          background: linear-gradient(135deg, var(--color-profes), var(--color-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-label {
          font-size: 1rem;
          color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
          margin-top: 0.5rem;
          font-weight: 600;
        }
      }
    }
  }

  .tabs-nav {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 3rem;
    justify-content: center;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
    padding: 1rem;
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.6) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)'
    };
    backdrop-filter: blur(20px);
    border-radius: 20px;
    border: 1px solid ${props => props.$isDark 
      ? 'rgba(71, 85, 105, 0.3)' 
      : 'rgba(226, 232, 240, 0.5)'
    };
    box-shadow: ${props => props.$isDark 
      ? '0 8px 25px rgba(0, 0, 0, 0.2)'
      : '0 8px 25px rgba(0, 0, 0, 0.1)'
    };

    .tab {
      background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, rgba(51, 65, 85, 0.7) 0%, rgba(71, 85, 105, 0.5) 100%)'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.6) 100%)'
      };
      border: 2px solid ${props => props.$isDark 
        ? 'rgba(71, 85, 105, 0.3)'
        : 'rgba(226, 232, 240, 0.5)'
      };
      padding: 1rem 2rem;
      cursor: pointer;
      border-radius: 15px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      gap: 0.8rem;
      font-weight: 600;
      font-size: 1rem;
      color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
      backdrop-filter: blur(15px);
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
        background: ${props => props.$isDark 
          ? 'linear-gradient(135deg, rgba(8, 119, 153, 0.4) 0%, rgba(24, 226, 162, 0.2) 100%)'
          : 'linear-gradient(135deg, rgba(8, 119, 153, 0.2) 0%, rgba(24, 226, 162, 0.1) 100%)'
        };
        color: var(--color-profes);
        border-color: var(--color-profes);
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(8, 119, 153, 0.3);
      }

      &.active {
        background: linear-gradient(135deg, var(--color-profes) 0%, var(--color-secondary) 100%);
        color: white;
        border-color: var(--color-profes);
        box-shadow: 0 8px 30px rgba(8, 119, 153, 0.4);
        transform: translateY(-2px);

        svg {
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }
      }

      svg {
        transition: transform 0.3s ease;
      }

      &:hover svg,
      &.active svg {
        transform: scale(1.1);
      }
    }
  }

  .cursos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  .curso-card {
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.8) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)'
    };
    backdrop-filter: blur(25px);
    border: 1px solid ${props => props.$isDark 
      ? 'rgba(71, 85, 105, 0.3)' 
      : 'rgba(226, 232, 240, 0.5)'
    };
    border-radius: 20px;
    box-shadow: ${props => props.$isDark 
      ? '0 10px 30px rgba(0, 0, 0, 0.3)'
      : '0 10px 30px rgba(0, 0, 0, 0.1)'
    };
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    position: relative;

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
      transform: translateY(-8px) scale(1.02);
      box-shadow: ${props => props.$isDark 
        ? '0 20px 50px rgba(0, 0, 0, 0.4)'
        : '0 20px 50px rgba(0, 0, 0, 0.15)'
      };

      &::before {
        opacity: 1;
      }

      .curso-image {
        transform: scale(1.05);

        .image-placeholder {
          transform: rotate(10deg) scale(1.1);
        }
      }
    }

    &.progreso {
      border-left: 4px solid var(--color-profes);
    }

    &.completado {
      border-left: 4px solid var(--color-secondary);
    }

    &.favorito {
      border-left: 4px solid var(--color-bachillerato);
    }
  }

  .curso-image {
    position: relative;
    height: 200px;
    background: linear-gradient(135deg, var(--color-pre-u) 0%, var(--color-profes) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.4s ease;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.6s ease;
    }

    &:hover::after {
      left: 100%;
    }

    .image-placeholder {
      background: rgba(255, 255, 255, 0.25);
      border-radius: 50%;
      padding: 1.5rem;
      backdrop-filter: blur(15px);
      transition: transform 0.4s ease;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    }

    .progress-overlay {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;

      .circular-progress {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.9));
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        color: var(--color-profes);
        font-size: 1rem;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(15px);
        border: 2px solid rgba(255, 255, 255, 0.3);
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.1);
        }
      }
    }

    .completed-badge, .favorite-badge {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      border-radius: 50%;
      padding: 1rem;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(10px);
      border: 2px solid rgba(255, 255, 255, 0.2);
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.1) rotate(10deg);
      }
    }

    .completed-badge {
      background: linear-gradient(135deg, var(--color-secondary), #12b172);
    }

    .favorite-badge {
      background: linear-gradient(135deg, var(--color-bachillerato), #d55d09);
    }
  }

  .curso-content {
    padding: 2rem;

    h3 {
      font-size: 1.4rem;
      font-weight: 700;
      color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
      margin-bottom: 0.8rem;
      text-shadow: ${props => props.$isDark 
        ? '1px 1px 2px rgba(0, 0, 0, 0.3)' 
        : '1px 1px 2px rgba(0, 0, 0, 0.1)'
      };
    }

    .instructor {
      color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
      margin-bottom: 1.5rem;
      font-size: 1rem;
      font-weight: 600;
      padding: 0.8rem 1rem;
      background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, rgba(51, 65, 85, 0.5) 0%, rgba(71, 85, 105, 0.3) 100%)'
        : 'linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.6) 100%)'
      };
      border-radius: 12px;
      border-left: 4px solid var(--color-secondary);

      strong {
        color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
      }
    }

    .descripcion {
      color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
      margin-bottom: 1.5rem;
      line-height: 1.6;
      font-size: 1rem;
    }

    .progress-info {
      margin-bottom: 1.5rem;

      .progress-bar {
        width: 100%;
        height: 12px;
        background: ${props => props.$isDark ? '#334155' : '#e2e8f0'};
        border-radius: 8px;
        overflow: hidden;
        margin-bottom: 0.8rem;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, 
            var(--color-e-kids) 0%, 
            var(--color-bachillerato) 50%, 
            var(--color-secondary) 100%
          );
          border-radius: 8px;
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
      }

      .progress-text {
        font-size: 1rem;
        color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
        font-weight: 600;
      }
    }

    @keyframes shimmer {
      0% { left: -100%; }
      100% { left: 100%; }
    }

    .curso-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 1.5rem;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
        font-size: 0.9rem;
        font-weight: 500;
        padding: 0.5rem 0.8rem;
        background: ${props => props.$isDark 
          ? 'rgba(71, 85, 105, 0.3)' 
          : 'rgba(248, 250, 252, 0.8)'
        };
        border-radius: 10px;
        transition: all 0.3s ease;

        svg {
          flex-shrink: 0;
        }

        &:hover {
          transform: scale(1.05);
          background: ${props => props.$isDark 
            ? 'rgba(71, 85, 105, 0.5)' 
            : 'rgba(226, 232, 240, 0.8)'
          };
        }
      }
    }

    .next-lesson {
      background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, rgba(8, 119, 153, 0.2) 0%, rgba(24, 226, 162, 0.1) 100%)'
        : 'linear-gradient(135deg, rgba(8, 119, 153, 0.1) 0%, rgba(24, 226, 162, 0.05) 100%)'
      };
      padding: 1rem;
      border-radius: 12px;
      margin-bottom: 1.5rem;
      font-size: 1rem;
      font-weight: 600;
      color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
      border-left: 4px solid var(--color-profes);
      backdrop-filter: blur(10px);
    }

    .completion-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;

      .completion-badge {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        background: linear-gradient(135deg, var(--color-secondary), #12b172);
        color: white;
        padding: 0.8rem 1.5rem;
        border-radius: 25px;
        font-size: 1rem;
        font-weight: 700;
        box-shadow: 0 6px 20px rgba(24, 226, 162, 0.3);

        svg {
          flex-shrink: 0;
        }
      }

      .completion-date {
        color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
        font-size: 1rem;
        font-weight: 600;
      }
    }

    .final-grade {
      margin-bottom: 1.5rem;
      font-size: 1.3rem;
      font-weight: 800;
      background: linear-gradient(135deg, var(--color-secondary), var(--color-profes));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .curso-stats {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
      font-size: 1rem;
      font-weight: 600;
      color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
    }

    .continue-btn, .enroll-btn {
      width: 100%;
      background: linear-gradient(135deg, var(--color-profes) 0%, var(--color-secondary) 100%);
      color: white;
      border: none;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 6px 20px rgba(8, 119, 153, 0.3);
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;

      svg {
        flex-shrink: 0;
      }

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

      &:hover {
        transform: translateY(-3px);
        background: linear-gradient(135deg, #0a8db5 0%, #20f5c7 100%);
        box-shadow: 0 10px 30px rgba(8, 119, 153, 0.4);
      }
    }

    .curso-actions {
      display: flex;
      gap: 0.8rem;

      .review-btn {
        flex: 1;
        background: ${props => props.$isDark 
          ? 'linear-gradient(135deg, #64748b 0%, #475569 100%)'
          : 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)'
        };
        color: white;
        border: none;
        padding: 1rem;
        border-radius: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;

        svg {
          flex-shrink: 0;
        }

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(148, 163, 184, 0.3);
        }
      }

      .certificate-btn {
        background: linear-gradient(135deg, var(--color-pre-u), #4b4b94);
        color: white;
        border: none;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        transition: all 0.3s ease;
        box-shadow: 0 6px 20px rgba(105, 105, 188, 0.3);

        svg {
          flex-shrink: 0;
        }

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(105, 105, 188, 0.4);
        }
      }
    }
  }

  /* Enhanced Responsive Design */
  @media (max-width: 1200px) {
    .cursos-grid {
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    }

    .stats-overview {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .mis-cursos-container {
      padding: 1.5rem 1rem;
    }

    .stats-overview {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .tabs-nav {
      flex-direction: column;
      gap: 0.8rem;
      padding: 1rem;

      .tab {
        border-radius: 12px;
        padding: 0.8rem 1.5rem;
      }
    }

    .cursos-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .curso-image {
      height: 160px;
    }

    .curso-content {
      padding: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    .stats-overview {
      grid-template-columns: 1fr;
    }

    .tabs-nav {
      margin-bottom: 2rem;
    }

    .curso-content {
      padding: 1.2rem;
    }

    .curso-meta {
      gap: 0.8rem;
    }
  }
`;

export default MisCursos;
