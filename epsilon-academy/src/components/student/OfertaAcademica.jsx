import React, { useState } from 'react';
import styled from 'styled-components';
import { BookOpen, Clock, Users, Star, Search, Filter } from 'lucide-react';
import { useTheme } from '../../themes/ThemeContext';

const OfertaAcademica = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { theme, isDarkMode, getGradient } = useTheme();

  // Datos de ejemplo de cursos disponibles
  const cursos = [
    {
      id: 1,
      titulo: 'Matemáticas Básicas',
      descripcion: 'Fundamentos de álgebra y geometría',
      categoria: 'matematicas',
      nivel: 'Básico',
      duracion: '8 semanas',
      instructor: 'Prof. Ana García',
      estudiantes: 156,
      rating: 4.8,
      precio: 'Gratuito',
      imagen: '/assets/images/curso-matematicas.jpg',
      tags: ['Álgebra', 'Geometría', 'Números']
    },
    {
      id: 2,
      titulo: 'Física Mecánica',
      descripcion: 'Conceptos fundamentales de mecánica clásica',
      categoria: 'fisica',
      nivel: 'Intermedio',
      duracion: '10 semanas',
      instructor: 'Prof. Carlos Ruiz',
      estudiantes: 89,
      rating: 4.6,
      precio: 'Gratuito',
      imagen: '/assets/images/curso-fisica.jpg',
      tags: ['Mecánica', 'Cinemática', 'Dinámica']
    },
    {
      id: 3,
      titulo: 'Química Orgánica',
      descripcion: 'Introducción a los compuestos orgánicos',
      categoria: 'quimica',
      nivel: 'Avanzado',
      duracion: '12 semanas',
      instructor: 'Prof. María López',
      estudiantes: 67,
      rating: 4.9,
      precio: 'Gratuito',
      imagen: '/assets/images/curso-quimica.jpg',
      tags: ['Compuestos', 'Reacciones', 'Moléculas']
    },
    {
      id: 4,
      titulo: 'Programación Python',
      descripcion: 'Aprende Python desde cero',
      categoria: 'programacion',
      nivel: 'Básico',
      duracion: '6 semanas',
      instructor: 'Prof. Juan Pérez',
      estudiantes: 234,
      rating: 4.7,
      precio: 'Gratuito',
      imagen: '/assets/images/curso-python.jpg',
      tags: ['Python', 'Programación', 'Algoritmos']
    },
    {
      id: 5,
      titulo: 'Historia Universal',
      descripcion: 'Grandes civilizaciones y eventos históricos',
      categoria: 'historia',
      nivel: 'Intermedio',
      duracion: '8 semanas',
      instructor: 'Prof. Elena Torres',
      estudiantes: 123,
      rating: 4.5,
      precio: 'Gratuito',
      imagen: '/assets/images/curso-historia.jpg',
      tags: ['Civilizaciones', 'Eventos', 'Cultura']
    },
    {
      id: 6,
      titulo: 'Biología Celular',
      descripción: 'Estructura y función de las células',
      categoria: 'biologia',
      nivel: 'Intermedio',
      duracion: '9 semanas',
      instructor: 'Prof. Roberto Silva',
      estudiantes: 98,
      rating: 4.8,
      precio: 'Gratuito',
      imagen: '/assets/images/curso-biologia.jpg',
      tags: ['Células', 'Organelos', 'Metabolismo']
    }
  ];

  const categorias = [
    { id: 'all', nombre: 'Todos los cursos' },
    { id: 'matematicas', nombre: 'Matemáticas' },
    { id: 'fisica', nombre: 'Física' },
    { id: 'quimica', nombre: 'Química' },
    { id: 'programacion', nombre: 'Programación' },
    { id: 'historia', nombre: 'Historia' },
    { id: 'biologia', nombre: 'Biología' }
  ];

  const cursosFilteredFiltrados = cursos.filter(curso => {
    const matchesSearch = curso.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         curso.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         curso.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || curso.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDificultadColor = (nivel) => {
    switch (nivel) {
      case 'Básico': return '#27ae60';
      case 'Intermedio': return '#f39c12';
      case 'Avanzado': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const inscribirse = (cursoId) => {
    console.log(`Inscribirse en curso ${cursoId}`);
    // Aquí implementarías la lógica de inscripción
  };

  return (
    <StyledWrapper $isDark={isDarkMode}>
      <div className="oferta-container">
        <div className="filters-section">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Buscar cursos, temas o instructores..."
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

        <div className="stats-bar">
          <span>{cursosFilteredFiltrados.length} cursos encontrados</span>
          <span>•</span>
          <span>{cursos.reduce((total, curso) => total + curso.estudiantes, 0)} estudiantes activos</span>
        </div>

        <div className="cursos-grid">
          {cursosFilteredFiltrados.map(curso => (
            <div key={curso.id} className="curso-card">
              <div className={`curso-image ${curso.categoria}`}>
                <div className="image-placeholder">
                  <BookOpen size={40} color="white" />
                </div>
                <div className="nivel-badge" style={{ backgroundColor: getDificultadColor(curso.nivel) }}>
                  {curso.nivel}
                </div>
              </div>

              <div className="curso-content">
                <h3>{curso.titulo}</h3>
                <p className="descripcion">{curso.descripcion}</p>
                
                <div className="curso-meta">
                  <div className="meta-item">
                    <Clock size={16} />
                    <span>{curso.duracion}</span>
                  </div>
                  <div className="meta-item">
                    <Users size={16} />
                    <span>{curso.estudiantes} estudiantes</span>
                  </div>
                  <div className="meta-item">
                    <Star size={16} fill="#f39c12" color="#f39c12" />
                    <span>{curso.rating}</span>
                  </div>
                </div>

                <div className="instructor">
                  Por: <strong>{curso.instructor}</strong>
                </div>

                <div className="tags">
                  {curso.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>

                <div className="curso-footer">
                  <span className="precio">{curso.precio}</span>
                  <button 
                    className="inscribir-btn"
                    onClick={() => inscribirse(curso.id)}
                  >
                    Inscribirse
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cursosFilteredFiltrados.length === 0 && (
          <div className="no-results">
            <BookOpen size={64} color="#bdc3c7" />
            <h3>No se encontraron cursos</h3>
            <p>Intenta con otros términos de búsqueda o cambia los filtros</p>
          </div>
        )}
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
      ? 'radial-gradient(circle at 20% 80%, rgba(8, 119, 153, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(247, 117, 11, 0.1) 0%, transparent 50%)'
      : 'radial-gradient(circle at 20% 80%, rgba(8, 119, 153, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(247, 117, 11, 0.05) 0%, transparent 50%)'
    };
    animation: backgroundShift 15s ease-in-out infinite alternate;
    pointer-events: none;
  }

  @keyframes backgroundShift {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(-10px, -10px) scale(1.02); }
  }

  .oferta-container {
    width: 100%;
    padding: 2rem;
    margin: 0;
    position: relative;
    z-index: 1;
  }

  .filters-section {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 2rem;
    align-items: center;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.8) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)'
    };
    backdrop-filter: blur(25px);
    border-radius: 20px;
    border: 1px solid ${props => props.$isDark 
      ? 'rgba(71, 85, 105, 0.3)' 
      : 'rgba(226, 232, 240, 0.5)'
    };
    box-shadow: ${props => props.$isDark 
      ? '0 10px 30px rgba(0, 0, 0, 0.3)' 
      : '0 10px 30px rgba(0, 0, 0, 0.1)'
    };

    .search-bar {
      position: relative;
      flex: 1;
      max-width: 500px;

      svg {
        position: absolute;
        left: 1.2rem;
        top: 50%;
        transform: translateY(-50%);
        color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
        transition: color 0.3s ease;
        z-index: 2;
      }

      input {
        width: 100%;
        padding: 1rem 1.2rem 1rem 3.5rem;
        border: 2px solid ${props => props.$isDark 
          ? 'rgba(71, 85, 105, 0.3)'
          : 'rgba(226, 232, 240, 0.5)'
        };
        border-radius: 15px;
        font-size: 1rem;
        background: ${props => props.$isDark 
          ? 'linear-gradient(135deg, rgba(51, 65, 85, 0.8) 0%, rgba(71, 85, 105, 0.6) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)'
        };
        color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
        backdrop-filter: blur(15px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: ${props => props.$isDark 
          ? '0 4px 15px rgba(0, 0, 0, 0.2)'
          : '0 4px 15px rgba(0, 0, 0, 0.1)'
        };

        &:focus {
          outline: none;
          border-color: var(--color-profes);
          background: ${props => props.$isDark 
            ? 'linear-gradient(135deg, rgba(51, 65, 85, 1) 0%, rgba(71, 85, 105, 0.8) 100%)'
            : 'linear-gradient(135deg, white 0%, rgba(248, 250, 252, 0.95) 100%)'
          };
          transform: translateY(-2px);
          box-shadow: ${props => props.$isDark 
            ? '0 8px 25px rgba(8, 119, 153, 0.3)'
            : '0 8px 25px rgba(8, 119, 153, 0.2)'
          };
        }

        &:focus + svg {
          color: var(--color-profes);
        }

        &::placeholder {
          color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
        }
      }
    }

    .category-filter {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      
      svg {
        color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
        transition: color 0.3s ease;
      }

      select {
        padding: 1rem 1.2rem;
        border: 2px solid ${props => props.$isDark 
          ? 'rgba(71, 85, 105, 0.3)'
          : 'rgba(226, 232, 240, 0.5)'
        };
        border-radius: 15px;
        font-size: 1rem;
        background: ${props => props.$isDark 
          ? 'linear-gradient(135deg, rgba(51, 65, 85, 0.8) 0%, rgba(71, 85, 105, 0.6) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)'
        };
        color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
        backdrop-filter: blur(15px);
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: ${props => props.$isDark 
          ? '0 4px 15px rgba(0, 0, 0, 0.2)'
          : '0 4px 15px rgba(0, 0, 0, 0.1)'
        };

        &:focus {
          outline: none;
          border-color: var(--color-profes);
          background: ${props => props.$isDark 
            ? 'linear-gradient(135deg, rgba(51, 65, 85, 1) 0%, rgba(71, 85, 105, 0.8) 100%)'
            : 'linear-gradient(135deg, white 0%, rgba(248, 250, 252, 0.95) 100%)'
          };
          transform: translateY(-2px);
          box-shadow: ${props => props.$isDark 
            ? '0 8px 25px rgba(8, 119, 153, 0.3)'
            : '0 8px 25px rgba(8, 119, 153, 0.2)'
          };
        }

        option {
          background: ${props => props.$isDark ? '#1e293b' : '#ffffff'};
          color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
        }
      }
    }
  }

  .stats-bar {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2.5rem;
    color: ${props => props.$isDark ? 'rgba(248, 250, 252, 0.8)' : 'rgba(30, 41, 59, 0.8)'};
    font-size: 1rem;
    font-weight: 600;
    justify-content: center;
    text-shadow: ${props => props.$isDark 
      ? '0 2px 4px rgba(0, 0, 0, 0.3)'
      : '0 2px 4px rgba(0, 0, 0, 0.1)'
    };
    padding: 1rem;
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, rgba(51, 65, 85, 0.5) 0%, rgba(71, 85, 105, 0.3) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.6) 100%)'
    };
    backdrop-filter: blur(15px);
    border-radius: 15px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2.5rem;
  }

  .cursos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
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

      .inscribir-btn {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(8, 119, 153, 0.4);
      }
    }
  }

  .curso-image {
    position: relative;
    height: 200px;
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

    .nivel-badge {
      position: absolute;
      top: 1.2rem;
      right: 1.2rem;
      padding: 0.4rem 1rem;
      border-radius: 25px;
      color: white;
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    /* Enhanced gradients by category */
    &.matematicas {
      background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, #5a5aa8 0%, #4b4b94 50%, #3a3a7a 100%)'
        : 'linear-gradient(135deg, #6969bc 0%, #5a5aa8 50%, #4b4b94 100%)'
      };
    }

    &.fisica {
      background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, #e6690a 0%, #d55d09 50%, #c45208 100%)'
        : 'linear-gradient(135deg, #F7750b 0%, #e6690a 50%, #d55d09 100%)'
      };
    }

    &.quimica {
      background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, #076687 0%, #065575 50%, #054463 100%)'
        : 'linear-gradient(135deg, #087799 0%, #076687 50%, #065575 100%)'
      };
    }

    &.programacion {
      background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, #15c78a 0%, #12b172 50%, #0f9b5a 100%)'
        : 'linear-gradient(135deg, #18e2a2 0%, #15c78a 50%, #12b172 100%)'
      };
    }

    &.historia {
      background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, #d9cb35 0%, #c2b42e 50%, #ab9d27 100%)'
        : 'linear-gradient(135deg, #F0E23D 0%, #d9cb35 50%, #c2b42e 100%)'
      };
    }

    &.biologia {
      background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, #15c78a 0%, #d9cb35 50%, #F7750b 100%)'
        : 'linear-gradient(135deg, #18e2a2 0%, #F0E23D 50%, #F7750b 100%)'
      };
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

    .descripcion {
      color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
      margin-bottom: 1.5rem;
      line-height: 1.6;
      font-size: 1rem;
    }

    .curso-meta {
      display: flex;
      gap: 1.2rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
        font-size: 0.9rem;
        font-weight: 500;
        padding: 0.3rem 0.6rem;
        background: ${props => props.$isDark 
          ? 'rgba(71, 85, 105, 0.3)' 
          : 'rgba(248, 250, 252, 0.8)'
        };
        border-radius: 8px;
        transition: all 0.3s ease;

        &:hover {
          transform: scale(1.05);
          background: ${props => props.$isDark 
            ? 'rgba(71, 85, 105, 0.5)' 
            : 'rgba(226, 232, 240, 0.8)'
          };
        }

        svg {
          flex-shrink: 0;
        }
      }
    }

    .instructor {
      color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
      font-size: 1rem;
      margin-bottom: 1.5rem;
      padding: 1rem;
      background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, rgba(51, 65, 85, 0.5) 0%, rgba(71, 85, 105, 0.3) 100%)'
        : 'linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.6) 100%)'
      };
      border-radius: 12px;
      border-left: 4px solid var(--color-secondary);

      strong {
        color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
        font-weight: 700;
      }
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      margin-bottom: 1.5rem;

      .tag {
        background: ${props => props.$isDark 
          ? 'linear-gradient(135deg, rgba(71, 85, 105, 0.5) 0%, rgba(94, 113, 132, 0.3) 100%)'
          : 'linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(226, 232, 240, 0.6) 100%)'
        };
        color: ${props => props.$isDark ? '#cbd5e1' : '#475569'};
        padding: 0.4rem 0.8rem;
        border-radius: 8px;
        font-size: 0.8rem;
        font-weight: 600;
        transition: all 0.3s ease;
        border: 1px solid ${props => props.$isDark 
          ? 'rgba(203, 213, 225, 0.1)' 
          : 'rgba(71, 85, 105, 0.1)'
        };

        &:hover {
          transform: translateY(-2px);
          background: ${props => props.$isDark 
            ? 'linear-gradient(135deg, rgba(8, 119, 153, 0.3) 0%, rgba(24, 226, 162, 0.2) 100%)'
            : 'linear-gradient(135deg, rgba(8, 119, 153, 0.1) 0%, rgba(24, 226, 162, 0.1) 100%)'
          };
          color: var(--color-profes);
          box-shadow: 0 4px 12px rgba(8, 119, 153, 0.2);
        }
      }
    }

    .curso-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .precio {
        font-size: 1.3rem;
        font-weight: 800;
        background: linear-gradient(135deg, var(--color-secondary), var(--color-profes));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
      }

      .inscribir-btn {
        background: linear-gradient(135deg, var(--color-profes) 0%, var(--color-secondary) 100%);
        color: white;
        border: none;
        padding: 0.8rem 2rem;
        border-radius: 12px;
        font-weight: 700;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 6px 20px rgba(8, 119, 153, 0.3);
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

        &:hover {
          transform: translateY(-3px);
          background: linear-gradient(135deg, #0a8db5 0%, #20f5c7 100%);
          box-shadow: 0 10px 30px rgba(8, 119, 153, 0.4);
        }
      }
    }
  }

  .no-results {
    text-align: center;
    padding: 4rem 2rem;
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(51, 65, 85, 0.3) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.6) 100%)'
    };
    backdrop-filter: blur(15px);
    border-radius: 20px;
    border: 1px solid ${props => props.$isDark 
      ? 'rgba(71, 85, 105, 0.3)' 
      : 'rgba(226, 232, 240, 0.5)'
    };
    max-width: 600px;
    margin: 2rem auto;

    svg {
      margin-bottom: 1.5rem;
      opacity: 0.6;
    }

    h3 {
      color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
      margin-bottom: 1rem;
      font-size: 1.5rem;
      font-weight: 600;
    }

    p {
      color: ${props => props.$isDark ? '#64748b' : '#94a3b8'};
      font-size: 1.1rem;
      line-height: 1.5;
    }
  }

  /* Enhanced Responsive Design */
  @media (max-width: 1200px) {
    .cursos-grid {
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.5rem;
    }
  }

  @media (max-width: 768px) {
    .oferta-container {
      padding: 1rem;
    }

    .filters-section {
      flex-direction: column;
      align-items: stretch;
      padding: 1.2rem;
    }

    .search-bar {
      max-width: none !important;
    }

    .cursos-grid {
      grid-template-columns: 1fr;
    }

    .curso-content {
      padding: 1.5rem;
    }

    .curso-image {
      height: 160px;
    }
  }

  @media (max-width: 480px) {
    .oferta-container {
      padding: 0.5rem;
    }

    .filters-section {
      padding: 1rem;
    }

    .curso-content {
      padding: 1.2rem;
    }

    .curso-meta {
      gap: 0.8rem;
    }

    .tags {
      gap: 0.4rem;
    }
  }
`;

export default OfertaAcademica;
