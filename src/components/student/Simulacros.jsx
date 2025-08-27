import React, { useState } from 'react';
import styled from 'styled-components';
import { Brain, Clock, Trophy, Play, BarChart3, Target, CheckCircle, Calendar, Filter, Search } from 'lucide-react';
import { useTheme } from '../../themes/ThemeContext';

const Simulacros = () => {
  const [activeTab, setActiveTab] = useState('disponibles');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { isDarkMode } = useTheme();

  // Datos de ejemplo de simulacros
  const simulacros = {
    'disponibles': [
      {
        id: 1,
        titulo: 'Simulacro Matemáticas - Álgebra Básica',
        descripcion: 'Evaluación de conceptos fundamentales de álgebra',
        categoria: 'matematicas',
        dificultad: 'Básico',
        preguntas: 25,
        duracion: 45,
        puntajeMaximo: 100,
        fechaCreacion: '2024-12-01',
        intentosPermitidos: 3,
        tipoSimulacro: 'practica',
        tags: ['Álgebra', 'Ecuaciones', 'Factorización']
      },
      {
        id: 2,
        titulo: 'Examen Física - Mecánica Clásica',
        descripcion: 'Evaluación integral de mecánica y cinemática',
        categoria: 'fisica',
        dificultad: 'Intermedio',
        preguntas: 30,
        duracion: 60,
        puntajeMaximo: 120,
        fechaCreacion: '2024-11-28',
        intentosPermitidos: 2,
        tipoSimulacro: 'evaluacion',
        tags: ['Cinemática', 'Dinámica', 'Energía']
      },
      {
        id: 3,
        titulo: 'Quiz Programación Python - Funciones',
        descripcion: 'Evaluación rápida sobre funciones en Python',
        categoria: 'programacion',
        dificultad: 'Básico',
        preguntas: 15,
        duracion: 30,
        puntajeMaximo: 75,
        fechaCreacion: '2024-12-05',
        intentosPermitidos: 5,
        tipoSimulacro: 'quiz',
        tags: ['Python', 'Funciones', 'Parámetros']
      },
      {
        id: 4,
        titulo: 'Simulacro Química Orgánica - Compuestos',
        descripcion: 'Evaluación avanzada de compuestos orgánicos',
        categoria: 'quimica',
        dificultad: 'Avanzado',
        preguntas: 40,
        duracion: 90,
        puntajeMaximo: 150,
        fechaCreacion: '2024-11-25',
        intentosPermitidos: 2,
        tipoSimulacro: 'evaluacion',
        tags: ['Compuestos', 'Reacciones', 'Nomenclatura']
      }
    ],
    'completados': [
      {
        id: 5,
        titulo: 'Quiz Historia - Civilizaciones Antiguas',
        descripcion: 'Evaluación sobre civilizaciones del mundo antiguo',
        categoria: 'historia',
        dificultad: 'Intermedio',
        preguntas: 20,
        duracion: 40,
        puntajeObtenido: 85,
        puntajeMaximo: 100,
        fechaCompletado: '2024-12-08',
        tiempo: 32,
        intentos: 1,
        tipoSimulacro: 'quiz',
        calificacion: 'Excelente'
      },
      {
        id: 6,
        titulo: 'Examen Biología - Célula',
        descripcion: 'Evaluación integral sobre estructura celular',
        categoria: 'biologia',
        dificultad: 'Intermedio',
        preguntas: 25,
        duracion: 50,
        puntajeObtenido: 92,
        puntajeMaximo: 125,
        fechaCompletado: '2024-12-03',
        tiempo: 47,
        intentos: 2,
        tipoSimulacro: 'evaluacion',
        calificacion: 'Sobresaliente'
      }
    ],
    'programados': [
      {
        id: 7,
        titulo: 'Examen Final - Matemáticas Avanzadas',
        descripcion: 'Evaluación final del curso de matemáticas',
        categoria: 'matematicas',
        dificultad: 'Avanzado',
        preguntas: 50,
        duracion: 120,
        puntajeMaximo: 200,
        fechaProgramada: '2024-12-20',
        horaProgramada: '10:00',
        tipoSimulacro: 'examen-final',
        importante: true
      },
      {
        id: 8,
        titulo: 'Evaluación Parcial - Programación',
        descripcion: 'Examen parcial del curso de Python',
        categoria: 'programacion',
        dificultad: 'Intermedio',
        preguntas: 35,
        duracion: 75,
        puntajeMaximo: 140,
        fechaProgramada: '2024-12-18',
        horaProgramada: '14:30',
        tipoSimulacro: 'parcial',
        importante: false
      }
    ]
  };

  const categorias = [
    { id: 'all', nombre: 'Todas las materias' },
    { id: 'matematicas', nombre: 'Matemáticas' },
    { id: 'fisica', nombre: 'Física' },
    { id: 'quimica', nombre: 'Química' },
    { id: 'programacion', nombre: 'Programación' },
    { id: 'historia', nombre: 'Historia' },
    { id: 'biologia', nombre: 'Biología' }
  ];

  const getSimulacrosFiltrados = () => {
    const simulacrosActivos = simulacros[activeTab] || [];
    return simulacrosActivos.filter(simulacro => {
      const matchesSearch = simulacro.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           simulacro.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || simulacro.categoria === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const getDificultadColor = (dificultad) => {
    switch (dificultad) {
      case 'Básico': return '#27ae60';
      case 'Intermedio': return '#f39c12';
      case 'Avanzado': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getTipoIcon = (tipo) => {
    switch (tipo) {
      case 'quiz': return <Target size={20} />;
      case 'practica': return <Play size={20} />;
      case 'evaluacion': return <BarChart3 size={20} />;
      case 'examen-final': return <Trophy size={20} />;
      case 'parcial': return <CheckCircle size={20} />;
      default: return <Brain size={20} />;
    }
  };

  const iniciarSimulacro = (simulacroId) => {
    console.log(`Iniciar simulacro ${simulacroId}`);
    // Aquí implementarías la navegación al simulacro
  };

  const verResultados = (simulacroId) => {
    console.log(`Ver resultados del simulacro ${simulacroId}`);
    // Aquí implementarías la visualización de resultados
  };

  const calcularPorcentaje = (obtenido, maximo) => {
    return Math.round((obtenido / maximo) * 100);
  };

  return (
    <StyledWrapper $isDark={isDarkMode}>
      <div className="simulacros-container">
        <div className="stats-overview">
          <div className="stat-card">
            <div className="stat-icon disponibles">
              <Brain size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-number">{simulacros['disponibles'].length}</span>
              <span className="stat-label">Disponibles</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon completados">
              <CheckCircle size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-number">{simulacros['completados'].length}</span>
              <span className="stat-label">Completados</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon programados">
              <Calendar size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-number">{simulacros['programados'].length}</span>
              <span className="stat-label">Programados</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon promedio">
              <Trophy size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-number">
                {simulacros['completados'].length > 0 
                  ? Math.round(simulacros['completados'].reduce((acc, s) => acc + calcularPorcentaje(s.puntajeObtenido, s.puntajeMaximo), 0) / simulacros['completados'].length)
                  : 0}%
              </span>
              <span className="stat-label">Promedio</span>
            </div>
          </div>
        </div>

        {activeTab === 'disponibles' && (
          <div className="filters-section">
            <div className="search-bar">
              <Search size={20} />
              <input
                type="text"
                placeholder="Buscar simulacros..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="category-filter">
              <Filter size={20} />
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categorias.map(categoria => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="tabs-nav">
          <button 
            className={`tab ${activeTab === 'disponibles' ? 'active' : ''}`}
            onClick={() => setActiveTab('disponibles')}
          >
            <Brain size={20} />
            Disponibles ({simulacros['disponibles'].length})
          </button>
          <button 
            className={`tab ${activeTab === 'completados' ? 'active' : ''}`}
            onClick={() => setActiveTab('completados')}
          >
            <CheckCircle size={20} />
            Completados ({simulacros['completados'].length})
          </button>
          <button 
            className={`tab ${activeTab === 'programados' ? 'active' : ''}`}
            onClick={() => setActiveTab('programados')}
          >
            <Calendar size={20} />
            Programados ({simulacros['programados'].length})
          </button>
        </div>

        <div className="simulacros-content">
          <div className="simulacros-grid">
            {getSimulacrosFiltrados().map(simulacro => (
              <div key={simulacro.id} className={`simulacro-card ${activeTab}`}>
                <div className="simulacro-header">
                  <div className="tipo-icon">
                    {getTipoIcon(simulacro.tipoSimulacro)}
                  </div>
                  <div className="header-content">
                    <h3>{simulacro.titulo}</h3>
                    <p>{simulacro.descripcion}</p>
                  </div>
                  {simulacro.importante && (
                    <div className="importante-badge">
                      <Trophy size={16} />
                    </div>
                  )}
                </div>

                <div className="simulacro-details">
                  <div className="detail-row">
                    <span className="label">Dificultad:</span>
                    <span 
                      className="dificultad-badge" 
                      style={{ backgroundColor: getDificultadColor(simulacro.dificultad) }}
                    >
                      {simulacro.dificultad}
                    </span>
                  </div>

                  <div className="detail-row">
                    <span className="label">Preguntas:</span>
                    <span>{simulacro.preguntas}</span>
                  </div>

                  <div className="detail-row">
                    <span className="label">Duración:</span>
                    <span>{simulacro.duracion} min</span>
                  </div>

                  {activeTab === 'disponibles' && (
                    <>
                      <div className="detail-row">
                        <span className="label">Intentos:</span>
                        <span>{simulacro.intentosPermitidos}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Puntos:</span>
                        <span>{simulacro.puntajeMaximo}</span>
                      </div>
                    </>
                  )}

                  {activeTab === 'completados' && (
                    <>
                      <div className="detail-row">
                        <span className="label">Puntaje:</span>
                        <span className="score">
                          {simulacro.puntajeObtenido}/{simulacro.puntajeMaximo} 
                          ({calcularPorcentaje(simulacro.puntajeObtenido, simulacro.puntajeMaximo)}%)
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Tiempo:</span>
                        <span>{simulacro.tiempo} min</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Calificación:</span>
                        <span className="calificacion">{simulacro.calificacion}</span>
                      </div>
                    </>
                  )}

                  {activeTab === 'programados' && (
                    <>
                      <div className="detail-row">
                        <span className="label">Fecha:</span>
                        <span>{new Date(simulacro.fechaProgramada).toLocaleDateString()}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Hora:</span>
                        <span>{simulacro.horaProgramada}</span>
                      </div>
                    </>
                  )}
                </div>

                {simulacro.tags && (
                  <div className="tags">
                    {simulacro.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                )}

                <div className="simulacro-footer">
                  {activeTab === 'disponibles' && (
                    <button 
                      className="action-btn iniciar"
                      onClick={() => iniciarSimulacro(simulacro.id)}
                    >
                      <Play size={16} />
                      Iniciar Simulacro
                    </button>
                  )}

                  {activeTab === 'completados' && (
                    <div className="footer-actions">
                      <span className="completion-date">
                        Completado: {new Date(simulacro.fechaCompletado).toLocaleDateString()}
                      </span>
                      <button 
                        className="action-btn resultados"
                        onClick={() => verResultados(simulacro.id)}
                      >
                        Ver Resultados
                      </button>
                    </div>
                  )}

                  {activeTab === 'programados' && (
                    <div className="footer-actions">
                      <span className="countdown">
                        {simulacro.importante ? '⚠️ Examen Importante' : '📅 Próximamente'}
                      </span>
                      <button className="action-btn programado" disabled>
                        Programado
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {getSimulacrosFiltrados().length === 0 && (
            <div className="no-results">
              <Brain size={64} color="#bdc3c7" />
              <h3>No se encontraron simulacros</h3>
              <p>Intenta con otros términos de búsqueda o cambia los filtros</p>
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
      ? 'radial-gradient(circle at 20% 80%, rgba(105, 105, 188, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(8, 119, 153, 0.15) 0%, transparent 50%)'
      : 'radial-gradient(circle at 20% 80%, rgba(105, 105, 188, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(8, 119, 153, 0.08) 0%, transparent 50%)'
    };
    animation: backgroundFloat 25s ease-in-out infinite alternate;
    pointer-events: none;
  }

  @keyframes backgroundFloat {
    0% { transform: translate(0, 0) rotate(0deg); }
    100% { transform: translate(15px, -15px) rotate(2deg); }
  }

  .simulacros-container {
    width: 100%;
    padding: 2.5rem 2rem;
    margin: 0;
    position: relative;
    z-index: 1;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
  }

  .stats-overview {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;

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
        background: linear-gradient(90deg, var(--color-profes), var(--color-secondary), var(--color-pre-u));
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
        width: 70px;
        height: 70px;
        border-radius: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        transition: transform 0.3s ease;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        position: relative;
        overflow: hidden;

        &::after {
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

        &:hover::after {
          width: 100px;
          height: 100px;
        }

        &.disponibles {
          background: linear-gradient(135deg, var(--color-profes) 0%, #065575 100%);
        }

        &.completados {
          background: linear-gradient(135deg, var(--color-secondary) 0%, #12b172 100%);
        }

        &.programados {
          background: linear-gradient(135deg, var(--color-bachillerato) 0%, #d55d09 100%);
        }

        &.promedio {
          background: linear-gradient(135deg, var(--color-pre-u) 0%, #4b4b94 100%);
        }
      }

      .stat-content {
        display: flex;
        flex-direction: column;

        .stat-number {
          font-size: 2.2rem;
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

  .filters-section {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 3rem;
    align-items: center;
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.6) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)'
    };
    backdrop-filter: blur(20px);
    padding: 1.5rem;
    border-radius: 20px;
    border: 1px solid ${props => props.$isDark 
      ? 'rgba(71, 85, 105, 0.3)' 
      : 'rgba(226, 232, 240, 0.5)'
    };
    box-shadow: ${props => props.$isDark 
      ? '0 8px 25px rgba(0, 0, 0, 0.2)'
      : '0 8px 25px rgba(0, 0, 0, 0.1)'
    };

    .search-bar {
      position: relative;
      flex: 1;
      max-width: 500px;

      svg {
        position: absolute;
        left: 1.5rem;
        top: 50%;
        transform: translateY(-50%);
        color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
        z-index: 1;
      }

      input {
        width: 100%;
        padding: 1rem 1.5rem 1rem 4rem;
        border: 2px solid ${props => props.$isDark 
          ? 'rgba(71, 85, 105, 0.3)'
          : 'rgba(226, 232, 240, 0.5)'
        };
        background: ${props => props.$isDark 
          ? 'rgba(51, 65, 85, 0.6)'
          : 'rgba(255, 255, 255, 0.8)'
        };
        color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
        border-radius: 15px;
        font-size: 1rem;
        backdrop-filter: blur(15px);
        transition: all 0.3s ease;

        &:focus {
          outline: none;
          border-color: var(--color-profes);
          box-shadow: 0 0 0 4px rgba(8, 119, 153, 0.15);
          transform: translateY(-2px);
        }

        &::placeholder {
          color: ${props => props.$isDark ? '#64748b' : '#94a3b8'};
        }
      }
    }

    .category-filter {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      
      svg {
        color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
      }
      
      select {
        padding: 1rem 1.5rem;
        border: 2px solid ${props => props.$isDark 
          ? 'rgba(71, 85, 105, 0.3)'
          : 'rgba(226, 232, 240, 0.5)'
        };
        background: ${props => props.$isDark 
          ? 'rgba(51, 65, 85, 0.6)'
          : 'rgba(255, 255, 255, 0.8)'
        };
        color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
        border-radius: 15px;
        font-size: 1rem;
        cursor: pointer;
        backdrop-filter: blur(15px);
        transition: all 0.3s ease;

        &:focus {
          outline: none;
          border-color: var(--color-profes);
          box-shadow: 0 0 0 4px rgba(8, 119, 153, 0.15);
          transform: translateY(-2px);
        }
      }
    }
  }

  .tabs-nav {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 3rem;
    justify-content: center;
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.6) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)'
    };
    backdrop-filter: blur(20px);
    padding: 1rem;
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
          ? 'linear-gradient(135deg, rgba(8, 119, 153, 0.4) 0%, rgba(105, 105, 188, 0.2) 100%)'
          : 'linear-gradient(135deg, rgba(8, 119, 153, 0.2) 0%, rgba(105, 105, 188, 0.1) 100%)'
        };
        color: var(--color-profes);
        border-color: var(--color-profes);
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(8, 119, 153, 0.3);
      }

      &.active {
        background: linear-gradient(135deg, var(--color-profes) 0%, var(--color-pre-u) 100%);
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

  .simulacros-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
    gap: 2rem;
  }

  .simulacro-card {
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

      .tipo-icon {
        transform: scale(1.1) rotate(10deg);
      }
    }

    &.disponibles {
      border-left: 4px solid var(--color-profes);
    }

    &.completados {
      border-left: 4px solid var(--color-secondary);
    }

    &.programados {
      border-left: 4px solid var(--color-bachillerato);
    }
  }

  .simulacro-header {
    padding: 2rem;
    position: relative;
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;

    .tipo-icon {
      width: 60px;
      height: 60px;
      border-radius: 15px;
      background: linear-gradient(135deg, var(--color-pre-u) 0%, #4b4b94 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;
      transition: transform 0.3s ease;
      box-shadow: 0 8px 25px rgba(105, 105, 188, 0.3);
      position: relative;
      overflow: hidden;

      &::after {
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

      &:hover::after {
        width: 80px;
        height: 80px;
      }
    }

    .header-content {
      flex: 1;

      h3 {
        font-size: 1.3rem;
        font-weight: 700;
        color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
        margin-bottom: 0.8rem;
        text-shadow: ${props => props.$isDark 
          ? '1px 1px 2px rgba(0, 0, 0, 0.3)' 
          : '1px 1px 2px rgba(0, 0, 0, 0.1)'
        };
      }

      p {
        color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
        font-size: 1rem;
        margin: 0;
        line-height: 1.5;
        font-weight: 500;
      }
    }

    .importante-badge {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      background: linear-gradient(135deg, #dc2626, #b91c1c);
      color: white;
      border-radius: 50%;
      padding: 0.8rem;
      box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
  }

  .simulacro-details {
    padding: 0 2rem;

    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
      border-bottom: 1px solid ${props => props.$isDark 
        ? 'rgba(71, 85, 105, 0.3)' 
        : 'rgba(226, 232, 240, 0.5)'
      };
      transition: all 0.3s ease;

      &:hover {
        background: ${props => props.$isDark 
          ? 'rgba(71, 85, 105, 0.1)' 
          : 'rgba(248, 250, 252, 0.5)'
        };
        margin: 0 -1rem;
        padding-left: 1rem;
        padding-right: 1rem;
        border-radius: 10px;
      }

      &:last-child {
        border-bottom: none;
      }

      .label {
        color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
        font-size: 1rem;
        font-weight: 600;
      }

      .dificultad-badge {
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 25px;
        font-size: 0.9rem;
        font-weight: 700;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }

      .score {
        font-weight: 700;
        color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
        font-size: 1rem;
      }

      .calificacion {
        font-weight: 700;
        color: var(--color-secondary);
        font-size: 1.1rem;
      }
    }
  }

  .tags {
    padding: 1.5rem 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;

    .tag {
      background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, rgba(71, 85, 105, 0.4) 0%, rgba(51, 65, 85, 0.3) 100%)'
        : 'linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(226, 232, 240, 0.6) 100%)'
      };
      color: ${props => props.$isDark ? '#e2e8f0' : '#64748b'};
      padding: 0.5rem 1rem;
      border-radius: 12px;
      font-size: 0.9rem;
      font-weight: 600;
      backdrop-filter: blur(10px);
      border: 1px solid ${props => props.$isDark 
        ? 'rgba(71, 85, 105, 0.3)' 
        : 'rgba(226, 232, 240, 0.4)'
      };
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.05);
        background: ${props => props.$isDark 
          ? 'linear-gradient(135deg, rgba(8, 119, 153, 0.4) 0%, rgba(24, 226, 162, 0.2) 100%)'
          : 'linear-gradient(135deg, rgba(8, 119, 153, 0.2) 0%, rgba(24, 226, 162, 0.1) 100%)'
        };
        color: var(--color-profes);
        border-color: var(--color-profes);
      }
    }
  }

  .simulacro-footer {
    padding: 2rem;

    .action-btn {
      border: none;
      border-radius: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      gap: 0.8rem;
      justify-content: center;
      font-size: 1rem;
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

      &:hover:not(:disabled) {
        transform: translateY(-3px);
      }

      &.iniciar {
        width: 100%;
        padding: 1rem 1.5rem;
        background: linear-gradient(135deg, var(--color-profes) 0%, var(--color-secondary) 100%);
        color: white;
        box-shadow: 0 8px 25px rgba(8, 119, 153, 0.3);

        &:hover {
          background: linear-gradient(135deg, #0a8db5 0%, #20f5c7 100%);
          box-shadow: 0 12px 35px rgba(8, 119, 153, 0.4);
        }
      }

      &.resultados {
        padding: 0.8rem 1.5rem;
        background: linear-gradient(135deg, var(--color-secondary) 0%, #12b172 100%);
        color: white;
        box-shadow: 0 6px 20px rgba(24, 226, 162, 0.3);

        &:hover {
          background: linear-gradient(135deg, #20f5c7 0%, #0ea572 100%);
          box-shadow: 0 10px 30px rgba(24, 226, 162, 0.4);
        }
      }

      &.programado {
        padding: 0.8rem 1.5rem;
        background: ${props => props.$isDark 
          ? 'linear-gradient(135deg, #64748b 0%, #475569 100%)'
          : 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)'
        };
        color: white;
        cursor: not-allowed;
        box-shadow: 0 4px 15px rgba(100, 116, 139, 0.3);

        &:disabled {
          opacity: 0.7;
        }
      }
    }

    .footer-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .completion-date, .countdown {
        font-size: 1rem;
        color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
        font-weight: 600;
        padding: 0.5rem 1rem;
        background: ${props => props.$isDark 
          ? 'rgba(71, 85, 105, 0.3)' 
          : 'rgba(248, 250, 252, 0.8)'
        };
        border-radius: 10px;
        backdrop-filter: blur(10px);
      }
    }
  }

  .no-results {
    text-align: center;
    padding: 4rem 2rem;
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(51, 65, 85, 0.4) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.6) 100%)'
    };
    backdrop-filter: blur(20px);
    border-radius: 20px;
    border: 1px solid ${props => props.$isDark 
      ? 'rgba(71, 85, 105, 0.3)' 
      : 'rgba(226, 232, 240, 0.5)'
    };

    h3 {
      color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
      margin-bottom: 1rem;
      font-size: 1.5rem;
      font-weight: 700;
    }

    p {
      color: ${props => props.$isDark ? '#64748b' : '#94a3b8'};
      font-size: 1.1rem;
      font-weight: 500;
    }
  }

  /* Enhanced Responsive Design */
  @media (max-width: 1200px) {
    .simulacros-grid {
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    }

    .stats-overview {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .simulacros-container {
      padding: 1.5rem 1rem;
    }

    .stats-overview {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .filters-section {
      flex-direction: column;
      align-items: stretch;
      gap: 1rem;
    }

    .tabs-nav {
      flex-direction: column;
      gap: 0.8rem;

      .tab {
        border-radius: 12px;
        padding: 0.8rem 1.5rem;
      }
    }

    .simulacros-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .simulacro-header {
      padding: 1.5rem;
      gap: 1rem;
    }

    .simulacro-details {
      padding: 0 1.5rem;
    }

    .tags {
      padding: 1rem 1.5rem;
    }

    .simulacro-footer {
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

    .simulacros-grid {
      grid-template-columns: 1fr;
    }

    .simulacro-header {
      padding: 1.2rem;
    }

    .simulacro-details {
      padding: 0 1.2rem;
    }

    .tags {
      padding: 1rem 1.2rem;
    }

    .simulacro-footer {
      padding: 1.2rem;
    }
  }
`;

export default Simulacros;
