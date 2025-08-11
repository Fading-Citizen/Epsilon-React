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
    ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
    : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
  };
  margin: 0;
  padding: 0;
  transition: background 0.3s ease;

  .oferta-container {
    width: 100%;
    padding: 1rem 2rem 2rem 2rem;
    margin: 0;
  }

  .filters-section {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    align-items: center;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1.5rem;

    .search-bar {
      position: relative;
      flex: 1;
      max-width: 500px;

      svg {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: #7f8c8d;
      }

      input {
        width: 100%;
        padding: 0.75rem 1rem 0.75rem 3rem;
        border: ${props => props.$isDark 
          ? '2px solid rgba(255, 255, 255, 0.2)'
          : '2px solid rgba(255, 255, 255, 0.3)'
        };
        border-radius: 8px;
        font-size: 1rem;
        background: ${props => props.$isDark 
          ? 'rgba(51, 65, 85, 0.8)'
          : 'rgba(255, 255, 255, 0.9)'
        };
        color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;

        &:focus {
          outline: none;
          border-color: #087799;
          background: ${props => props.$isDark 
            ? 'rgba(51, 65, 85, 1)'
            : 'white'
          };
        }

        &::placeholder {
          color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
        }
      }
    }

    .category-filter {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      svg {
        color: rgba(255, 255, 255, 0.8);
      }

      select {
        padding: 0.75rem 1rem;
        border: ${props => props.$isDark 
          ? '2px solid rgba(255, 255, 255, 0.2)'
          : '2px solid rgba(255, 255, 255, 0.3)'
        };
        border-radius: 8px;
        font-size: 1rem;
        background: ${props => props.$isDark 
          ? 'rgba(51, 65, 85, 0.8)'
          : 'rgba(255, 255, 255, 0.9)'
        };
        color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
        backdrop-filter: blur(10px);
        cursor: pointer;
        transition: all 0.3s ease;

        &:focus {
          outline: none;
          border-color: #087799;
          background: ${props => props.$isDark 
            ? 'rgba(51, 65, 85, 1)'
            : 'white'
          };
        }
      }
    }
  }

  .stats-bar {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    color: ${props => props.$isDark ? 'rgba(248, 250, 252, 0.8)' : 'rgba(30, 41, 59, 0.8)'};
    font-size: 0.9rem;
    justify-content: center;
    text-shadow: ${props => props.$isDark 
      ? '0 1px 2px rgba(0, 0, 0, 0.3)'
      : '0 1px 2px rgba(0, 0, 0, 0.1)'
    };
  }

  .cursos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
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
  }

  .curso-image {
    position: relative;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;

    .image-placeholder {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      padding: 1rem;
      backdrop-filter: blur(10px);
    }

    .nivel-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      color: white;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    /* Gradientes por categoría */
    &.matematicas {
      background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, #5a5aa8 0%, #4b4b94 100%)'
        : 'linear-gradient(135deg, #6969bc 0%, #5a5aa8 100%)'
      };
    }

    &.fisica {
      background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, #e6690a 0%, #d55d09 100%)'
        : 'linear-gradient(135deg, #F7750b 0%, #e6690a 100%)'
      };
    }

    &.quimica {
      background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, #076687 0%, #065575 100%)'
        : 'linear-gradient(135deg, #087799 0%, #076687 100%)'
      };
    }

    &.programacion {
      background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, #15c78a 0%, #12b172 100%)'
        : 'linear-gradient(135deg, #18e2a2 0%, #15c78a 100%)'
      };
    }

    &.historia {
      background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, #d9cb35 0%, #c2b42e 100%)'
        : 'linear-gradient(135deg, #F0E23D 0%, #d9cb35 100%)'
      };
    }

    &.biologia {
      background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, #15c78a 0%, #d9cb35 100%)'
        : 'linear-gradient(135deg, #18e2a2 0%, #F0E23D 100%)'
      };
    }
  }

  .curso-content {
    padding: 1.5rem;

    h3 {
      font-size: 1.3rem;
      font-weight: 600;
      color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
      margin-bottom: 0.5rem;
    }

    .descripcion {
      color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
      margin-bottom: 1rem;
      line-height: 1.5;
    }

    .curso-meta {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
        font-size: 0.9rem;

        svg {
          flex-shrink: 0;
        }
      }
    }

    .instructor {
      color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
      font-size: 0.9rem;
      margin-bottom: 1rem;

      strong {
        color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
      }
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;

      .tag {
        background: ${props => props.$isDark 
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(0, 0, 0, 0.05)'
        };
        color: ${props => props.$isDark ? '#cbd5e1' : '#475569'};
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.8rem;
      }
    }

    .curso-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .precio {
        font-size: 1.1rem;
        font-weight: 600;
        color: #18e2a2;
      }

      .inscribir-btn {
        background: linear-gradient(135deg, #087799, #076687);
        color: white;
        border: none;
        padding: 0.5rem 1.5rem;
        border-radius: 6px;
        font-weight: 500;
        cursor: pointer;
        transition: transform 0.2s;

        &:hover {
          transform: translateY(-1px);
        }
      }
    }
  }

  .no-results {
    text-align: center;
    padding: 4rem 2rem;

    h3 {
      color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
      margin-bottom: 0.5rem;
    }

    p {
      color: ${props => props.$isDark ? '#64748b' : '#94a3b8'};
    }
  }

  @media (max-width: 768px) {
    .oferta-container {
      padding: 1rem;
    }

    .filters-section {
      flex-direction: column;
      align-items: stretch;
    }

    .cursos-grid {
      grid-template-columns: 1fr;
    }

    .header h1 {
      font-size: 2rem;
    }
  }
`;

export default OfertaAcademica;
