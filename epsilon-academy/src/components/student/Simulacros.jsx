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
  .simulacros-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem 2rem 2rem;
    background: ${({ $isDark }) => 
      $isDark 
        ? 'linear-gradient(135deg, rgba(16, 20, 31, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)'
    };
    backdrop-filter: blur(20px);
    border-radius: 20px;
    border: ${({ $isDark }) => 
      $isDark 
        ? '1px solid rgba(255, 255, 255, 0.1)'
        : '1px solid rgba(0, 0, 0, 0.05)'
    };
  }

  .stats-overview {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;

    .stat-card {
      background: ${({ $isDark }) => 
        $isDark 
          ? 'rgba(30, 41, 59, 0.6)'
          : 'rgba(255, 255, 255, 0.8)'
      };
      backdrop-filter: blur(10px);
      border: ${({ $isDark }) => 
        $isDark 
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid rgba(0, 0, 0, 0.05)'
      };
      border-radius: 12px;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      box-shadow: ${({ $isDark }) => 
        $isDark 
          ? '0 8px 32px rgba(0, 0, 0, 0.3)'
          : '0 4px 20px rgba(0, 0, 0, 0.1)'
      };

      .stat-icon {
        width: 50px;
        height: 50px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;

        &.disponibles {
          background: linear-gradient(135deg, #087799, #0891b2);
        }

        &.completados {
          background: linear-gradient(135deg, #18e2a2, #10b981);
        }

        &.programados {
          background: linear-gradient(135deg, #F7750b, #ea580c);
        }

        &.promedio {
          background: linear-gradient(135deg, #6969bc, #5b21b6);
        }
      }

      .stat-content {
        display: flex;
        flex-direction: column;

        .stat-number {
          font-size: 1.8rem;
          font-weight: 700;
          color: ${({ $isDark }) => 
            $isDark ? '#f1f5f9' : '#2c3e50'
          };
        }

        .stat-label {
          font-size: 0.9rem;
          color: ${({ $isDark }) => 
            $isDark ? '#94a3b8' : '#7f8c8d'
          };
        }
      }
    }
  }

  .filters-section {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    align-items: center;

    .search-bar {
      position: relative;
      flex: 1;
      max-width: 400px;

      svg {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: ${({ $isDark }) => 
          $isDark ? '#94a3b8' : '#7f8c8d'
        };
      }

      input {
        width: 100%;
        padding: 0.75rem 1rem 0.75rem 3rem;
        border: ${({ $isDark }) => 
          $isDark 
            ? '2px solid rgba(255, 255, 255, 0.1)'
            : '2px solid #ecf0f1'
        };
        background: ${({ $isDark }) => 
          $isDark 
            ? 'rgba(30, 41, 59, 0.6)'
            : 'rgba(255, 255, 255, 0.8)'
        };
        color: ${({ $isDark }) => 
          $isDark ? '#f1f5f9' : '#2c3e50'
        };
        border-radius: 8px;
        font-size: 1rem;
        backdrop-filter: blur(10px);

        &:focus {
          outline: none;
          border-color: #087799;
          box-shadow: 0 0 0 3px rgba(8, 119, 153, 0.1);
        }

        &::placeholder {
          color: ${({ $isDark }) => 
            $isDark ? '#64748b' : '#94a3b8'
          };
        }
      }
    }

    .category-filter {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      select {
        padding: 0.75rem 1rem;
        border: ${({ $isDark }) => 
          $isDark 
            ? '2px solid rgba(255, 255, 255, 0.1)'
            : '2px solid #ecf0f1'
        };
        background: ${({ $isDark }) => 
          $isDark 
            ? 'rgba(30, 41, 59, 0.6)'
            : 'rgba(255, 255, 255, 0.8)'
        };
        color: ${({ $isDark }) => 
          $isDark ? '#f1f5f9' : '#2c3e50'
        };
        border-radius: 8px;
        font-size: 1rem;
        cursor: pointer;
        backdrop-filter: blur(10px);

        &:focus {
          outline: none;
          border-color: #087799;
          box-shadow: 0 0 0 3px rgba(8, 119, 153, 0.1);
        }
      }
    }
  }

  .tabs-nav {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
    border-bottom: ${({ $isDark }) => 
      $isDark 
        ? '2px solid rgba(255, 255, 255, 0.1)'
        : '2px solid #ecf0f1'
    };

    .tab {
      background: none;
      border: none;
      padding: 1rem 1.5rem;
      cursor: pointer;
      border-radius: 8px 8px 0 0;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
      color: ${({ $isDark }) => 
        $isDark ? '#94a3b8' : '#7f8c8d'
      };

      &:hover {
        background: ${({ $isDark }) => 
          $isDark 
            ? 'rgba(8, 119, 153, 0.2)'
            : 'rgba(8, 119, 153, 0.1)'
        };
        color: #087799;
      }

      &.active {
        background: linear-gradient(135deg, #087799, #0891b2);
        color: white;
        border-bottom: 2px solid #087799;
      }
    }
  }

  .simulacros-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 2rem;
  }

  .simulacro-card {
    background: ${({ $isDark }) => 
      $isDark 
        ? 'rgba(30, 41, 59, 0.6)'
        : 'rgba(255, 255, 255, 0.8)'
    };
    backdrop-filter: blur(10px);
    border: ${({ $isDark }) => 
      $isDark 
        ? '1px solid rgba(255, 255, 255, 0.1)'
        : '1px solid rgba(0, 0, 0, 0.05)'
    };
    border-radius: 12px;
    box-shadow: ${({ $isDark }) => 
      $isDark 
        ? '0 8px 32px rgba(0, 0, 0, 0.3)'
        : '0 4px 20px rgba(0, 0, 0, 0.1)'
    };
    transition: transform 0.3s, box-shadow 0.3s;
    overflow: hidden;

    &:hover {
      transform: translateY(-4px);
      box-shadow: ${({ $isDark }) => 
        $isDark 
          ? '0 12px 40px rgba(0, 0, 0, 0.4)'
          : '0 8px 30px rgba(0, 0, 0, 0.15)'
      };
    }

    &.disponibles {
      border-left: 4px solid #087799;
    }

    &.completados {
      border-left: 4px solid #18e2a2;
    }

    &.programados {
      border-left: 4px solid #F7750b;
    }
  }

  .simulacro-header {
    padding: 1.5rem;
    position: relative;
    display: flex;
    gap: 1rem;
    align-items: flex-start;

    .tipo-icon {
      width: 50px;
      height: 50px;
      border-radius: 10px;
      background: linear-gradient(135deg, #6969bc 0%, #5b21b6 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;
    }

    .header-content {
      flex: 1;

      h3 {
        font-size: 1.2rem;
        font-weight: 600;
        color: ${({ $isDark }) => 
          $isDark ? '#f1f5f9' : '#2c3e50'
        };
        margin-bottom: 0.5rem;
      }

      p {
        color: ${({ $isDark }) => 
          $isDark ? '#94a3b8' : '#7f8c8d'
        };
        font-size: 0.9rem;
        margin: 0;
        line-height: 1.4;
      }
    }

    .importante-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: #e74c3c;
      color: white;
      border-radius: 50%;
      padding: 0.5rem;
    }
  }

  .simulacro-details {
    padding: 0 1.5rem;

    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: ${({ $isDark }) => 
        $isDark 
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid #ecf0f1'
      };

      &:last-child {
        border-bottom: none;
      }

      .label {
        color: ${({ $isDark }) => 
          $isDark ? '#94a3b8' : '#7f8c8d'
        };
        font-size: 0.9rem;
      }

      .dificultad-badge {
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
      }

      .score {
        font-weight: 600;
        color: ${({ $isDark }) => 
          $isDark ? '#f1f5f9' : '#2c3e50'
        };
      }

      .calificacion {
        font-weight: 600;
        color: #18e2a2;
      }
    }
  }

  .tags {
    padding: 1rem 1.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    .tag {
      background: ${({ $isDark }) => 
        $isDark 
          ? 'rgba(255, 255, 255, 0.1)'
          : '#ecf0f1'
      };
      color: ${({ $isDark }) => 
        $isDark ? '#cbd5e1' : '#7f8c8d'
      };
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
      backdrop-filter: blur(5px);
    }
  }

  .simulacro-footer {
    padding: 1.5rem;

    .action-btn {
      border: none;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      transition: transform 0.2s;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      justify-content: center;

      &:hover:not(:disabled) {
        transform: translateY(-1px);
      }

      &.iniciar {
        width: 100%;
        padding: 0.75rem;
        background: linear-gradient(135deg, #087799, #0891b2);
        color: white;
      }

      &.resultados {
        padding: 0.5rem 1rem;
        background: #18e2a2;
        color: white;
      }

      &.programado {
        padding: 0.5rem 1rem;
        background: ${({ $isDark }) => 
          $isDark ? '#475569' : '#95a5a6'
        };
        color: white;
        cursor: not-allowed;

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
        font-size: 0.9rem;
        color: ${({ $isDark }) => 
          $isDark ? '#94a3b8' : '#7f8c8d'
        };
      }
    }
  }

  .no-results {
    text-align: center;
    padding: 4rem 2rem;

    h3 {
      color: ${({ $isDark }) => 
        $isDark ? '#94a3b8' : '#7f8c8d'
      };
      margin-bottom: 0.5rem;
    }

    p {
      color: ${({ $isDark }) => 
        $isDark ? '#64748b' : '#bdc3c7'
      };
    }
  }

  @media (max-width: 768px) {
    .simulacros-container {
      padding: 1rem;
    }

    .stats-overview {
      grid-template-columns: repeat(2, 1fr);
    }

    .filters-section {
      flex-direction: column;
      align-items: stretch;
    }

    .tabs-nav {
      flex-direction: column;

      .tab {
        border-radius: 6px;
      }
    }

    .simulacros-grid {
      grid-template-columns: 1fr;
    }

    .header h1 {
      font-size: 2rem;
    }
  }
`;

export default Simulacros;
