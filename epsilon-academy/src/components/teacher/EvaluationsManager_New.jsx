import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Calendar, 
  Clock, 
  Users, 
  FileText, 
  Award, 
  TrendingUp, 
  Edit, 
  Trash2, 
  Eye, 
  MoreVertical, 
  Play, 
  Pause, 
  Copy,
  Download,
  Share2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus
} from 'lucide-react';
import { useTheme } from '../../themes/ThemeContext';

const EvaluationsManager = ({ viewMode = 'cards', filters = {} }) => {
  const { isDarkMode } = useTheme();
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [showActions, setShowActions] = useState(null);

  // Datos de ejemplo para evaluaciones
  const evaluations = [
    {
      id: 1,
      title: "Examen Parcial - Cálculo I",
      type: "exam",
      course: "Cálculo Diferencial",
      date: "2024-02-15",
      time: "14:00",
      duration: 120,
      totalQuestions: 25,
      participants: 45,
      completed: 38,
      status: "active",
      description: "Evaluación parcial sobre límites y derivadas",
      averageScore: 78.5,
      createdAt: "2024-01-20"
    },
    {
      id: 2,
      title: "Quiz - Vectores y Matrices",
      type: "quiz",
      course: "Álgebra Lineal",
      date: "2024-02-20",
      time: "10:00",
      duration: 45,
      totalQuestions: 15,
      participants: 32,
      completed: 32,
      status: "completed",
      description: "Evaluación rápida sobre operaciones vectoriales",
      averageScore: 85.2,
      createdAt: "2024-02-05"
    },
    {
      id: 3,
      title: "Tarea - Integrales Definidas",
      type: "assignment",
      course: "Cálculo Integral",
      date: "2024-02-25",
      time: "23:59",
      duration: null,
      totalQuestions: 10,
      participants: 28,
      completed: 15,
      status: "scheduled",
      description: "Problemas prácticos de integración",
      averageScore: null,
      createdAt: "2024-02-10"
    },
    {
      id: 4,
      title: "Examen Final - Física Cuántica",
      type: "exam",
      course: "Física Avanzada",
      date: "2024-03-01",
      time: "09:00",
      duration: 180,
      totalQuestions: 40,
      participants: 22,
      completed: 0,
      status: "scheduled",
      description: "Evaluación integral del curso",
      averageScore: null,
      createdAt: "2024-02-01"
    },
    {
      id: 5,
      title: "Quiz - Derivadas Parciales",
      type: "quiz",
      course: "Cálculo Multivariable",
      date: "2024-02-12",
      time: "16:00",
      duration: 30,
      totalQuestions: 8,
      participants: 35,
      completed: 35,
      status: "completed",
      description: "Evaluación de conceptos básicos",
      averageScore: 92.1,
      createdAt: "2024-02-01"
    },
    {
      id: 6,
      title: "Proyecto Final - Machine Learning",
      type: "assignment",
      course: "Inteligencia Artificial",
      date: "2024-03-15",
      time: "23:59",
      duration: null,
      totalQuestions: 1,
      participants: 18,
      completed: 5,
      status: "active",
      description: "Desarrollo de algoritmo de clasificación",
      averageScore: null,
      createdAt: "2024-01-15"
    }
  ];

  // Filtrar evaluaciones
  const filteredEvaluations = evaluations.filter(evaluation => {
    const matchesSearch = !filters.search || 
      evaluation.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      evaluation.course.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesType = !filters.type || filters.type === 'all' || evaluation.type === filters.type;
    const matchesStatus = !filters.status || filters.status === 'all' || evaluation.status === filters.status;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Ordenar evaluaciones
  const sortedEvaluations = [...filteredEvaluations].sort((a, b) => {
    switch (filters.sortBy) {
      case 'name':
        return a.title.localeCompare(b.title);
      case 'course':
        return a.course.localeCompare(b.course);
      case 'date':
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'exam':
        return <FileText size={20} />;
      case 'quiz':
        return <Award size={20} />;
      case 'assignment':
        return <Edit size={20} />;
      default:
        return <FileText size={20} />;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'exam':
        return 'Examen';
      case 'quiz':
        return 'Quiz';
      case 'assignment':
        return 'Tarea';
      default:
        return 'Evaluación';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <Play size={16} />;
      case 'completed':
        return <CheckCircle size={16} />;
      case 'scheduled':
        return <Clock size={16} />;
      default:
        return <AlertCircle size={16} />;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return 'Activa';
      case 'completed':
        return 'Completada';
      case 'scheduled':
        return 'Programada';
      default:
        return 'Desconocido';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2024-01-01T${timeString}`).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleActionClick = (evaluationId, action) => {
    console.log(`${action} evaluation ${evaluationId}`);
    setShowActions(null);
  };

  // Vista de tarjetas
  const CardsView = () => (
    <CardsGrid>
      {sortedEvaluations.map(evaluation => (
        <EvaluationCard key={evaluation.id} $isDark={isDarkMode}>
          <CardHeader>
            <div className="evaluation-type">
              {getTypeIcon(evaluation.type)}
              <span>{getTypeLabel(evaluation.type)}</span>
            </div>
            <div className="actions-menu">
              <button 
                className="menu-trigger"
                onClick={() => setShowActions(showActions === evaluation.id ? null : evaluation.id)}
              >
                <MoreVertical size={16} />
              </button>
              {showActions === evaluation.id && (
                <ActionsDropdown $isDark={isDarkMode}>
                  <button onClick={() => handleActionClick(evaluation.id, 'view')}>
                    <Eye size={14} />
                    Ver detalles
                  </button>
                  <button onClick={() => handleActionClick(evaluation.id, 'edit')}>
                    <Edit size={14} />
                    Editar
                  </button>
                  <button onClick={() => handleActionClick(evaluation.id, 'copy')}>
                    <Copy size={14} />
                    Duplicar
                  </button>
                  <button onClick={() => handleActionClick(evaluation.id, 'download')}>
                    <Download size={14} />
                    Descargar
                  </button>
                  <button onClick={() => handleActionClick(evaluation.id, 'share')}>
                    <Share2 size={14} />
                    Compartir
                  </button>
                  <div className="divider"></div>
                  <button 
                    className="danger"
                    onClick={() => handleActionClick(evaluation.id, 'delete')}
                  >
                    <Trash2 size={14} />
                    Eliminar
                  </button>
                </ActionsDropdown>
              )}
            </div>
          </CardHeader>

          <CardContent>
            <h3>{evaluation.title}</h3>
            <p className="course">{evaluation.course}</p>
            <p className="description">{evaluation.description}</p>

            <div className="evaluation-meta">
              <div className="meta-item">
                <Calendar size={14} />
                <span>{formatDate(evaluation.date)}</span>
              </div>
              {evaluation.time && (
                <div className="meta-item">
                  <Clock size={14} />
                  <span>{formatTime(evaluation.time)}</span>
                </div>
              )}
              {evaluation.duration && (
                <div className="meta-item">
                  <Clock size={14} />
                  <span>{evaluation.duration} min</span>
                </div>
              )}
            </div>

            <div className="stats-row">
              <div className="stat">
                <FileText size={14} />
                <span>{evaluation.totalQuestions} preguntas</span>
              </div>
              <div className="stat">
                <Users size={14} />
                <span>{evaluation.participants} estudiantes</span>
              </div>
            </div>

            <div className="progress-section">
              <div className="progress-header">
                <span>Completado: {evaluation.completed}/{evaluation.participants}</span>
                <span>{Math.round((evaluation.completed / evaluation.participants) * 100)}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${(evaluation.completed / evaluation.participants) * 100}%` }}
                ></div>
              </div>
            </div>

            {evaluation.averageScore && (
              <div className="score-section">
                <TrendingUp size={14} />
                <span>Promedio: {evaluation.averageScore}%</span>
              </div>
            )}
          </CardContent>

          <CardFooter>
            <div className="status-badge" data-status={evaluation.status}>
              {getStatusIcon(evaluation.status)}
              <span>{getStatusLabel(evaluation.status)}</span>
            </div>
            <div className="card-actions">
              <button className="btn-secondary">
                <Eye size={16} />
                Ver
              </button>
              <button className="btn-primary">
                <Edit size={16} />
                Editar
              </button>
            </div>
          </CardFooter>
        </EvaluationCard>
      ))}
    </CardsGrid>
  );

  // Vista de lista
  const ListView = () => (
    <ListContainer $isDark={isDarkMode}>
      <TableHeader>
        <div className="col-title">Evaluación</div>
        <div className="col-course">Curso</div>
        <div className="col-type">Tipo</div>
        <div className="col-date">Fecha</div>
        <div className="col-participants">Participantes</div>
        <div className="col-progress">Progreso</div>
        <div className="col-score">Promedio</div>
        <div className="col-status">Estado</div>
        <div className="col-actions">Acciones</div>
      </TableHeader>

      <TableBody>
        {sortedEvaluations.map(evaluation => (
          <TableRow key={evaluation.id} $isDark={isDarkMode}>
            <div className="col-title">
              <div className="evaluation-info">
                {getTypeIcon(evaluation.type)}
                <div>
                  <h4>{evaluation.title}</h4>
                  <p>{evaluation.description}</p>
                </div>
              </div>
            </div>
            
            <div className="col-course">
              <span className="course-name">{evaluation.course}</span>
            </div>
            
            <div className="col-type">
              <span className="type-badge" data-type={evaluation.type}>
                {getTypeLabel(evaluation.type)}
              </span>
            </div>
            
            <div className="col-date">
              <div className="date-info">
                <span className="date">{formatDate(evaluation.date)}</span>
                {evaluation.time && (
                  <span className="time">{formatTime(evaluation.time)}</span>
                )}
              </div>
            </div>
            
            <div className="col-participants">
              <div className="participants-info">
                <Users size={14} />
                <span>{evaluation.participants}</span>
              </div>
            </div>
            
            <div className="col-progress">
              <div className="progress-container">
                <div className="progress-bar-small">
                  <div 
                    className="progress-fill-small"
                    style={{ width: `${(evaluation.completed / evaluation.participants) * 100}%` }}
                  ></div>
                </div>
                <span className="progress-text">
                  {evaluation.completed}/{evaluation.participants}
                </span>
              </div>
            </div>
            
            <div className="col-score">
              {evaluation.averageScore ? (
                <div className="score-display">
                  <TrendingUp size={14} />
                  <span>{evaluation.averageScore}%</span>
                </div>
              ) : (
                <span className="no-data">-</span>
              )}
            </div>
            
            <div className="col-status">
              <div className="status-badge-small" data-status={evaluation.status}>
                {getStatusIcon(evaluation.status)}
                <span>{getStatusLabel(evaluation.status)}</span>
              </div>
            </div>
            
            <div className="col-actions">
              <div className="actions-row">
                <button 
                  className="action-btn view"
                  onClick={() => handleActionClick(evaluation.id, 'view')}
                >
                  <Eye size={16} />
                </button>
                <button 
                  className="action-btn edit"
                  onClick={() => handleActionClick(evaluation.id, 'edit')}
                >
                  <Edit size={16} />
                </button>
                <button 
                  className="action-btn menu"
                  onClick={() => setShowActions(showActions === evaluation.id ? null : evaluation.id)}
                >
                  <MoreVertical size={16} />
                </button>
                {showActions === evaluation.id && (
                  <ActionsDropdownSmall $isDark={isDarkMode}>
                    <button onClick={() => handleActionClick(evaluation.id, 'copy')}>
                      <Copy size={14} />
                      Duplicar
                    </button>
                    <button onClick={() => handleActionClick(evaluation.id, 'download')}>
                      <Download size={14} />
                      Descargar
                    </button>
                    <button onClick={() => handleActionClick(evaluation.id, 'share')}>
                      <Share2 size={14} />
                      Compartir
                    </button>
                    <div className="divider"></div>
                    <button 
                      className="danger"
                      onClick={() => handleActionClick(evaluation.id, 'delete')}
                    >
                      <Trash2 size={14} />
                      Eliminar
                    </button>
                  </ActionsDropdownSmall>
                )}
              </div>
            </div>
          </TableRow>
        ))}
      </TableBody>
    </ListContainer>
  );

  if (sortedEvaluations.length === 0) {
    return (
      <EmptyState $isDark={isDarkMode}>
        <div className="empty-icon">
          <Award size={48} />
        </div>
        <h3>No hay evaluaciones</h3>
        <p>
          {filters.search || filters.type !== 'all' || filters.status !== 'all'
            ? 'No se encontraron evaluaciones que coincidan con los filtros.'
            : 'Comienza creando tu primera evaluación.'
          }
        </p>
        <button className="create-btn">
          <Plus size={20} />
          Crear Evaluación
        </button>
      </EmptyState>
    );
  }

  return viewMode === 'cards' ? <CardsView /> : <ListView />;
};

const CardsGrid = styled.div`
  display: grid !important;
  gap: 1.5rem !important;
  padding: 1rem 0;
  width: 100% !important;
`;

const EvaluationCard = styled.div`
  background: ${props => props.$isDark 
    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.9) 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)'
  };
  backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid ${props => props.$isDark 
    ? 'rgba(71, 85, 105, 0.3)' 
    : 'rgba(148, 163, 184, 0.3)'
  };
  box-shadow: ${props => props.$isDark 
    ? '0 8px 32px rgba(0, 0, 0, 0.3)'
    : '0 8px 32px rgba(71, 85, 105, 0.1)'
  };
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: ${props => props.$isDark 
      ? '0 16px 48px rgba(0, 0, 0, 0.4)'
      : '0 16px 48px rgba(71, 85, 105, 0.15)'
    };
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #1abc9c, #087799, #34495e);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 0.5rem;

  .evaluation-type {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #1abc9c;
    font-weight: 600;
    font-size: 0.9rem;

    svg {
      flex-shrink: 0;
    }
  }

  .actions-menu {
    position: relative;

    .menu-trigger {
      background: none;
      border: none;
      padding: 0.5rem;
      border-radius: 8px;
      cursor: pointer;
      color: inherit;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(148, 163, 184, 0.1);
      }
    }
  }
`;

const CardContent = styled.div`
  padding: 0.5rem 1.5rem;

  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1.3;
    color: inherit;
  }

  .course {
    color: #1abc9c;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    font-size: 0.9rem;
  }

  .description {
    color: ${props => props.theme?.colors?.textSecondary || '#64748b'};
    margin: 0 0 1rem 0;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  .evaluation-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      color: ${props => props.theme?.colors?.textSecondary || '#64748b'};
      font-size: 0.85rem;

      svg {
        flex-shrink: 0;
      }
    }
  }

  .stats-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;

    .stat {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      color: ${props => props.theme?.colors?.textSecondary || '#64748b'};
      font-size: 0.85rem;

      svg {
        flex-shrink: 0;
      }
    }
  }

  .progress-section {
    margin-bottom: 1rem;

    .progress-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      font-size: 0.85rem;
      color: ${props => props.theme?.colors?.textSecondary || '#64748b'};
    }

    .progress-bar {
      height: 6px;
      background: ${props => props.theme?.colors?.border || 'rgba(148, 163, 184, 0.3)'};
      border-radius: 3px;
      overflow: hidden;

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #1abc9c, #087799);
        transition: width 0.3s ease;
      }
    }
  }

  .score-section {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #1abc9c;
    font-weight: 600;
    font-size: 0.9rem;
  }
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem 1.5rem;
  border-top: 1px solid ${props => props.theme?.colors?.border || 'rgba(148, 163, 184, 0.2)'};

  .status-badge {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;

    &[data-status="active"] {
      background: rgba(34, 197, 94, 0.1);
      color: #22c55e;
    }

    &[data-status="completed"] {
      background: rgba(59, 130, 246, 0.1);
      color: #3b82f6;
    }

    &[data-status="scheduled"] {
      background: rgba(251, 191, 36, 0.1);
      color: #fbbf24;
    }
  }

  .card-actions {
    display: flex;
    gap: 0.5rem;

    button {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.5rem 0.8rem;
      border: none;
      border-radius: 8px;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;

      svg {
        flex-shrink: 0;
      }

      &.btn-secondary {
        background: ${props => props.theme?.colors?.bgSecondary || 'rgba(148, 163, 184, 0.1)'};
        color: inherit;

        &:hover {
          background: rgba(148, 163, 184, 0.2);
        }
      }

      &.btn-primary {
        background: linear-gradient(135deg, #1abc9c, #087799);
        color: white;

        &:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(26, 188, 156, 0.3);
        }
      }
    }
  }
`;

const ActionsDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${props => props.$isDark 
    ? 'rgba(30, 41, 59, 0.98)' 
    : 'rgba(255, 255, 255, 0.98)'
  };
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.$isDark 
    ? 'rgba(71, 85, 105, 0.3)' 
    : 'rgba(148, 163, 184, 0.3)'
  };
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  padding: 0.5rem;
  min-width: 160px;
  z-index: 10;

  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.6rem 0.8rem;
    border: none;
    background: none;
    text-align: left;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.85rem;
    color: inherit;
    transition: background 0.2s ease;

    svg {
      flex-shrink: 0;
    }

    &:hover {
      background: ${props => props.$isDark 
        ? 'rgba(71, 85, 105, 0.3)' 
        : 'rgba(148, 163, 184, 0.1)'
      };
    }

    &.danger {
      color: #ef4444;

      &:hover {
        background: rgba(239, 68, 68, 0.1);
      }
    }
  }

  .divider {
    height: 1px;
    background: ${props => props.$isDark 
      ? 'rgba(71, 85, 105, 0.3)' 
      : 'rgba(148, 163, 184, 0.3)'
    };
    margin: 0.5rem 0;
  }
`;

const ListContainer = styled.div`
  background: ${props => props.$isDark 
    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.9) 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)'
  };
  backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid ${props => props.$isDark 
    ? 'rgba(71, 85, 105, 0.3)' 
    : 'rgba(148, 163, 184, 0.3)'
  };
  overflow: hidden;
  margin-top: 1rem;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 1.2fr 1fr 1.2fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: ${props => props.theme?.colors?.bgSecondary || 'rgba(148, 163, 184, 0.1)'};
  font-weight: 700;
  font-size: 0.85rem;
  color: ${props => props.theme?.colors?.textSecondary || '#64748b'};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TableBody = styled.div`
  /* Estilos para el cuerpo de la tabla */
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 1.2fr 1fr 1.2fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${props => props.$isDark 
    ? 'rgba(71, 85, 105, 0.2)' 
    : 'rgba(148, 163, 184, 0.2)'
  };
  align-items: center;
  transition: background 0.2s ease;
  position: relative;

  &:hover {
    background: ${props => props.$isDark 
      ? 'rgba(71, 85, 105, 0.1)' 
      : 'rgba(148, 163, 184, 0.05)'
    };
  }

  &:last-child {
    border-bottom: none;
  }

  .evaluation-info {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    svg {
      color: #1abc9c;
      flex-shrink: 0;
    }

    h4 {
      margin: 0 0 0.2rem 0;
      font-size: 0.95rem;
      font-weight: 600;
      color: inherit;
    }

    p {
      margin: 0;
      font-size: 0.8rem;
      color: ${props => props.theme?.colors?.textSecondary || '#64748b'};
      line-height: 1.3;
    }
  }

  .course-name {
    color: #1abc9c;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .type-badge {
    display: inline-flex;
    padding: 0.3rem 0.6rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;

    &[data-type="exam"] {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }

    &[data-type="quiz"] {
      background: rgba(34, 197, 94, 0.1);
      color: #22c55e;
    }

    &[data-type="assignment"] {
      background: rgba(59, 130, 246, 0.1);
      color: #3b82f6;
    }
  }

  .date-info {
    .date {
      display: block;
      font-weight: 600;
      margin-bottom: 0.2rem;
    }

    .time {
      display: block;
      font-size: 0.8rem;
      color: ${props => props.theme?.colors?.textSecondary || '#64748b'};
    }
  }

  .participants-info {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: ${props => props.theme?.colors?.textSecondary || '#64748b'};
    font-size: 0.9rem;
  }

  .progress-container {
    .progress-bar-small {
      height: 4px;
      background: ${props => props.theme?.colors?.border || 'rgba(148, 163, 184, 0.3)'};
      border-radius: 2px;
      margin-bottom: 0.3rem;
      overflow: hidden;

      .progress-fill-small {
        height: 100%;
        background: linear-gradient(90deg, #1abc9c, #087799);
        transition: width 0.3s ease;
      }
    }

    .progress-text {
      font-size: 0.8rem;
      color: ${props => props.theme?.colors?.textSecondary || '#64748b'};
    }
  }

  .score-display {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: #1abc9c;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .no-data {
    color: ${props => props.theme?.colors?.textSecondary || '#64748b'};
    font-style: italic;
  }

  .status-badge-small {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.2rem 0.6rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;

    &[data-status="active"] {
      background: rgba(34, 197, 94, 0.1);
      color: #22c55e;
    }

    &[data-status="completed"] {
      background: rgba(59, 130, 246, 0.1);
      color: #3b82f6;
    }

    &[data-status="scheduled"] {
      background: rgba(251, 191, 36, 0.1);
      color: #fbbf24;
    }
  }

  .actions-row {
    display: flex;
    gap: 0.3rem;
    position: relative;

    .action-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;

      svg {
        flex-shrink: 0;
      }

      &.view {
        background: rgba(59, 130, 246, 0.1);
        color: #3b82f6;

        &:hover {
          background: rgba(59, 130, 246, 0.2);
        }
      }

      &.edit {
        background: rgba(34, 197, 94, 0.1);
        color: #22c55e;

        &:hover {
          background: rgba(34, 197, 94, 0.2);
        }
      }

      &.menu {
        background: ${props => props.theme?.colors?.bgSecondary || 'rgba(148, 163, 184, 0.1)'};
        color: inherit;

        &:hover {
          background: rgba(148, 163, 184, 0.2);
        }
      }
    }
  }
`;

const ActionsDropdownSmall = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${props => props.$isDark 
    ? 'rgba(30, 41, 59, 0.98)' 
    : 'rgba(255, 255, 255, 0.98)'
  };
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.$isDark 
    ? 'rgba(71, 85, 105, 0.3)' 
    : 'rgba(148, 163, 184, 0.3)'
  };
  border-radius: 6px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  padding: 0.3rem;
  min-width: 130px;
  z-index: 10;

  button {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    width: 100%;
    padding: 0.5rem;
    border: none;
    background: none;
    text-align: left;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
    color: inherit;
    transition: background 0.2s ease;

    svg {
      flex-shrink: 0;
    }

    &:hover {
      background: ${props => props.$isDark 
        ? 'rgba(71, 85, 105, 0.3)' 
        : 'rgba(148, 163, 184, 0.1)'
      };
    }

    &.danger {
      color: #ef4444;

      &:hover {
        background: rgba(239, 68, 68, 0.1);
      }
    }
  }

  .divider {
    height: 1px;
    background: ${props => props.$isDark 
      ? 'rgba(71, 85, 105, 0.3)' 
      : 'rgba(148, 163, 184, 0.3)'
    };
    margin: 0.3rem 0;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};

  .empty-icon {
    margin-bottom: 1.5rem;
    opacity: 0.5;
  }

  h3 {
    color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
  }

  p {
    margin-bottom: 2rem;
    max-width: 400px;
    line-height: 1.5;
  }

  .create-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1.5rem;
    background: linear-gradient(135deg, #1abc9c, #087799);
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(26, 188, 156, 0.3);
    }
  }
`;

export default EvaluationsManager;
