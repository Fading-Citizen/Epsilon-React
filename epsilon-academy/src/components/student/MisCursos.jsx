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
    ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
    : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
  };
  margin: 0;
  padding: 0;
  transition: background 0.3s ease;

  .mis-cursos-container {
    width: 100%;
    padding: 2rem;
    margin: 0;
  }

  .stats-overview {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;

    .stat-card {
      background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.6) 100%)'
        : 'rgba(255, 255, 255, 0.9)'
      };
      backdrop-filter: blur(10px);
      border: ${props => props.$isDark 
        ? '1px solid rgba(255, 255, 255, 0.1)'
        : '1px solid rgba(255, 255, 255, 0.2)'
      };
      border-radius: 12px;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      box-shadow: ${props => props.$isDark 
        ? '0 4px 20px rgba(0, 0, 0, 0.3)'
        : '0 4px 20px rgba(0, 0, 0, 0.1)'
      };
      transition: all 0.3s ease;

      .stat-icon {
        width: 50px;
        height: 50px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;

        &.en-progreso {
          background: linear-gradient(135deg, #087799, #076687);
        }

        &.completados {
          background: linear-gradient(135deg, #18e2a2, #15c78a);
        }

        &.favoritos {
          background: linear-gradient(135deg, #F7750b, #e6690a);
        }

        &.certificados {
          background: linear-gradient(135deg, #6969bc, #5a5aa8);
        }
      }

      .stat-content {
        display: flex;
        flex-direction: column;

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
          line-height: 1;
        }

        .stat-label {
          font-size: 0.9rem;
          color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
          margin-top: 0.25rem;
        }
      }
    }
  }

  .tabs-nav {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    justify-content: center;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;

    .tab {
      background: ${props => props.$isDark 
        ? 'rgba(51, 65, 85, 0.7)'
        : 'rgba(255, 255, 255, 0.7)'
      };
      border: ${props => props.$isDark 
        ? '1px solid rgba(255, 255, 255, 0.2)'
        : '1px solid rgba(255, 255, 255, 0.3)'
      };
      padding: 0.75rem 1.5rem;
      cursor: pointer;
      border-radius: 8px;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
      color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
      backdrop-filter: blur(10px);

      &:hover {
        background: ${props => props.$isDark 
          ? 'rgba(8, 119, 153, 0.3)'
          : 'rgba(8, 119, 153, 0.2)'
        };
        color: #087799;
        border-color: #087799;
      }

      &.active {
        background: #087799;
        color: white;
        border-color: #087799;
        box-shadow: 0 4px 12px rgba(8, 119, 153, 0.3);
      }
    }
  }

  .cursos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
    gap: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .curso-card {
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.6) 100%)'
      : 'rgba(255, 255, 255, 0.9)'
    };
    backdrop-filter: blur(10px);
    border: ${props => props.$isDark 
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(255, 255, 255, 0.2)'
    };
    border-radius: 12px;
    box-shadow: ${props => props.$isDark 
      ? '0 4px 20px rgba(0, 0, 0, 0.3)'
      : '0 4px 20px rgba(0, 0, 0, 0.1)'
    };
    transition: all 0.3s ease;
    overflow: hidden;

    &:hover {
      transform: translateY(-4px);
      box-shadow: ${props => props.$isDark 
        ? '0 8px 30px rgba(0, 0, 0, 0.4)'
        : '0 8px 30px rgba(0, 0, 0, 0.15)'
      };
    }
    transition: transform 0.3s, box-shadow 0.3s;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.2);

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    }
  }

  .curso-image {
    position: relative;
    height: 160px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;

    .image-placeholder {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      padding: 1rem;
      backdrop-filter: blur(10px);
    }

    .progress-overlay {
      position: absolute;
      top: 1rem;
      right: 1rem;

      .circular-progress {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        color: #2c3e50;
        font-size: 0.9rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }

    .completed-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: #27ae60;
      border-radius: 50%;
      padding: 0.75rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .favorite-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: #f39c12;
      border-radius: 50%;
      padding: 0.75rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
  }

  .curso-content {
    padding: 1.5rem;

    h3 {
      font-size: 1.3rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .instructor {
      color: #7f8c8d;
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }

    .descripcion {
      color: #7f8c8d;
      margin-bottom: 1rem;
      line-height: 1.5;
    }

    .progress-info {
      margin-bottom: 1rem;

      .progress-bar {
        width: 100%;
        height: 8px;
        background: #ecf0f1;
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 0.5rem;

        .progress-fill {
          height: 100%;
          transition: width 0.3s;
        }
      }

      .progress-text {
        font-size: 0.9rem;
        color: #7f8c8d;
      }
    }

    .curso-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 1rem;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        color: #7f8c8d;
        font-size: 0.9rem;
      }
    }

    .next-lesson {
      background: rgba(52, 152, 219, 0.1);
      padding: 0.75rem;
      border-radius: 6px;
      margin-bottom: 1rem;
      font-size: 0.9rem;
      color: #2c3e50;
    }

    .completion-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      .completion-badge {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: #27ae60;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
      }

      .completion-date {
        color: #7f8c8d;
        font-size: 0.9rem;
      }
    }

    .final-grade {
      margin-bottom: 1rem;
      color: #27ae60;
      font-size: 1.1rem;
    }

    .curso-stats {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      font-size: 0.9rem;
      color: #7f8c8d;
    }

    .continue-btn, .enroll-btn {
      width: 100%;
      background: linear-gradient(135deg, #3498db, #2980b9);
      color: white;
      border: none;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      font-size: 0.95rem;

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
      }
    }

    .curso-actions {
      display: flex;
      gap: 0.5rem;

      .review-btn {
        flex: 1;
        background: #95a5a6;
        color: white;
        border: none;
        padding: 0.75rem;
        border-radius: 6px;
        font-weight: 500;
        cursor: pointer;
      }

      .certificate-btn {
        background: #9b59b6;
        color: white;
        border: none;
        padding: 0.75rem 1rem;
        border-radius: 6px;
        font-weight: 500;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }
  }

  @media (max-width: 768px) {
    .mis-cursos-container {
      padding: 1rem;
    }

    .stats-overview {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }

    .tabs-nav {
      flex-direction: column;
      gap: 0.5rem;

      .tab {
        border-radius: 8px;
        padding: 0.5rem 1rem;
      }
    }

    .cursos-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .curso-image {
      height: 140px;
    }
  }

  @media (max-width: 480px) {
    .stats-overview {
      grid-template-columns: 1fr;
    }

    .tabs-nav {
      margin-bottom: 1rem;
    }
  }
`;

export default MisCursos;
