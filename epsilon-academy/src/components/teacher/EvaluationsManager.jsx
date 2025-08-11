import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Plus, 
  Timer, 
  Award, 
  Edit3, 
  Trash2, 
  Play, 
  Users, 
  Clock, 
  Target,
  BookOpen,
  Search,
  Filter,
  BarChart3,
  CheckCircle,
  Globe
} from 'lucide-react';
import QuizBuilder from './QuizBuilder';

const EvaluationsManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showQuizBuilder, setShowQuizBuilder] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [evaluationType, setEvaluationType] = useState('quiz');
  const [evaluationsList, setEvaluationsList] = useState([
    {
      id: 1,
      title: 'Quiz: Introducción al Cálculo',
      type: 'quiz',
      course: 'Cálculo Diferencial Avanzado',
      courseId: 1,
      isIndependent: false,
      timeLimit: 15,
      attempts: 3,
      passingGrade: 70,
      questions: 5,
      students: 25,
      completed: 18,
      averageScore: 82,
      status: 'active',
      createdAt: '2024-02-10',
      dueDate: '2024-02-20'
    },
    {
      id: 2,
      title: 'Simulacro Final: Cálculo Completo',
      type: 'exam',
      course: 'Cálculo Diferencial Avanzado',
      courseId: 1,
      isIndependent: false,
      timeLimit: 120,
      attempts: 2,
      passingGrade: 75,
      questions: 20,
      students: 25,
      completed: 12,
      averageScore: 78,
      status: 'active',
      createdAt: '2024-02-15',
      dueDate: '2024-02-25'
    },
    {
      id: 3,
      title: 'Quiz Libre: Conceptos de Matemática',
      type: 'quiz',
      course: 'Acceso Libre',
      courseId: null,
      isIndependent: true,
      timeLimit: 20,
      attempts: 5,
      passingGrade: 60,
      questions: 8,
      students: 45,
      completed: 32,
      averageScore: 75,
      status: 'active',
      createdAt: '2024-02-05',
      dueDate: null
    },
    {
      id: 4,
      title: 'Simulacro Público: Física General',
      type: 'exam',
      course: 'Acceso Libre',
      courseId: null,
      isIndependent: true,
      timeLimit: 90,
      attempts: 3,
      passingGrade: 70,
      questions: 15,
      students: 67,
      completed: 43,
      averageScore: 68,
      status: 'active',
      createdAt: '2024-02-12',
      dueDate: null
    }
  ]);

  // Datos de cursos disponibles
  const availableCourses = [
    { id: 0, title: 'Acceso Libre (Sin curso específico)' },
    { id: 1, title: 'Cálculo Diferencial Avanzado' },
    { id: 2, title: 'Álgebra Linear Aplicada' },
    { id: 3, title: 'Física Cuántica Básica' }
  ];

  // Formulario de evaluación
  const [evaluationForm, setEvaluationForm] = useState({
    title: '',
    type: 'quiz',
    courseId: '',
    course: '',
    isIndependent: false,
    timeLimit: 15,
    attempts: 3,
    passingGrade: 70,
    questions: 0,
    dueDate: ''
  });

  const filteredEvaluations = evaluationsList.filter(evaluation => {
    const matchesSearch = evaluation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evaluation.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || evaluation.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getTypeIcon = (type) => {
    return type === 'quiz' ? <Timer size={16} /> : <Award size={16} />;
  };

  const getTypeColor = (type) => {
    return type === 'quiz' ? '#3b82f6' : '#10b981';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'completed': return '#6b7280';
      case 'draft': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'completed': return 'Completado';
      case 'draft': return 'Borrador';
      default: return status;
    }
  };

  const getCompletionPercentage = (completed, total) => {
    return Math.round((completed / total) * 100);
  };

  // Estadísticas generales
  const totalEvaluations = evaluationsList.length;
  const activeEvaluations = evaluationsList.filter(e => e.status === 'active').length;
  const totalQuizzes = evaluationsList.filter(e => e.type === 'quiz').length;
  const totalExams = evaluationsList.filter(e => e.type === 'exam').length;
  const averageCompletion = totalEvaluations > 0 ? Math.round(
    evaluationsList.reduce((acc, e) => acc + getCompletionPercentage(e.completed, e.students), 0) / totalEvaluations
  ) : 0;

  // Funciones CRUD
  const handleCreateEvaluation = (type) => {
    // Ir directamente al QuizBuilder
    setEvaluationType(type);
    setSelectedEvaluation(null);
    setShowQuizBuilder(true);
  };

  const handleEditEvaluation = (evaluation) => {
    setSelectedEvaluation(evaluation);
    setEvaluationType(evaluation.type);
    setShowQuizBuilder(true);
  };

  const handleDeleteEvaluation = (evaluation) => {
    setSelectedEvaluation(evaluation);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setEvaluationsList(prev => prev.filter(e => e.id !== selectedEvaluation.id));
    setShowDeleteModal(false);
    setSelectedEvaluation(null);
  };

  const handleFormChange = (field, value) => {
    setEvaluationForm(prev => ({ ...prev, [field]: value }));
    
    // Si cambió el curso, actualizar el nombre del curso y el estado independiente
    if (field === 'courseId') {
      const course = availableCourses.find(c => c.id === parseInt(value));
      const isIndependent = parseInt(value) === 0;
      setEvaluationForm(prev => ({ 
        ...prev, 
        courseId: value,
        course: course ? course.title : '',
        isIndependent: isIndependent,
        dueDate: isIndependent ? '' : prev.dueDate // Limpiar fecha si es independiente
      }));
    }
  };

  const handleSaveEvaluation = () => {
    if (!evaluationForm.title || !evaluationForm.courseId) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    // Validar fecha límite solo si no es independiente
    if (!evaluationForm.isIndependent && !evaluationForm.dueDate) {
      alert('Las evaluaciones vinculadas a cursos requieren una fecha límite');
      return;
    }

    const newEvaluation = {
      id: selectedEvaluation ? selectedEvaluation.id : Date.now(),
      ...evaluationForm,
      courseId: evaluationForm.isIndependent ? null : evaluationForm.courseId,
      course: evaluationForm.isIndependent ? 'Acceso Libre' : evaluationForm.course,
      dueDate: evaluationForm.isIndependent ? null : evaluationForm.dueDate,
      students: selectedEvaluation ? selectedEvaluation.students : 0,
      completed: selectedEvaluation ? selectedEvaluation.completed : 0,
      averageScore: selectedEvaluation ? selectedEvaluation.averageScore : 0,
      status: 'active',
      createdAt: selectedEvaluation ? selectedEvaluation.createdAt : new Date().toISOString().split('T')[0]
    };

    if (selectedEvaluation) {
      // Editar existente
      setEvaluationsList(prev => prev.map(e => e.id === selectedEvaluation.id ? newEvaluation : e));
    } else {
      // Crear nuevo
      setEvaluationsList(prev => [...prev, newEvaluation]);
    }

    setShowCreateModal(false);
    setShowEditModal(false);
    setSelectedEvaluation(null);
  };

  const resetForm = () => {
    setEvaluationForm({
      title: '',
      type: 'quiz',
      courseId: '',
      course: '',
      isIndependent: false,
      timeLimit: 15,
      attempts: 3,
      passingGrade: 70,
      questions: 0,
      dueDate: ''
    });
  };

  const handleQuizBuilderSave = (quizData) => {
    // Guardar el quiz/simulacro desde QuizBuilder
    const newEvaluation = {
      id: selectedEvaluation ? selectedEvaluation.id : Date.now(),
      title: quizData.title,
      type: quizData.type,
      course: quizData.isIndependent ? 'Acceso Libre' : quizData.course,
      courseId: quizData.isIndependent ? null : quizData.courseId,
      isIndependent: quizData.isIndependent,
      timeLimit: quizData.timeLimit,
      attempts: quizData.attempts,
      passingGrade: quizData.passingGrade,
      questions: quizData.questions.length,
      students: selectedEvaluation ? selectedEvaluation.students : 0,
      completed: selectedEvaluation ? selectedEvaluation.completed : 0,
      averageScore: selectedEvaluation ? selectedEvaluation.averageScore : 0,
      status: 'active',
      createdAt: selectedEvaluation ? selectedEvaluation.createdAt : new Date().toISOString().split('T')[0],
      dueDate: quizData.isIndependent ? null : quizData.dueDate
    };

    if (selectedEvaluation) {
      setEvaluationsList(prev => prev.map(e => e.id === selectedEvaluation.id ? newEvaluation : e));
    } else {
      setEvaluationsList(prev => [...prev, newEvaluation]);
    }

    setShowQuizBuilder(false);
    setSelectedEvaluation(null);
  };

  const handleQuizBuilderCancel = () => {
    setShowQuizBuilder(false);
    setSelectedEvaluation(null);
  };

  // Si estamos en QuizBuilder, mostrar ese componente
  if (showQuizBuilder) {
    return (
      <QuizBuilder
        type={evaluationType}
        quiz={selectedEvaluation}
        onSave={handleQuizBuilderSave}
        onCancel={handleQuizBuilderCancel}
      />
    );
  }

  return (
    <StyledWrapper>
      <div className="evaluations-manager">
        {/* Header */}
        <div className="manager-header">
          <div className="header-left">
            <h2>Gestión de Evaluaciones</h2>
            <p>Administra quizzes y simulacros de todos tus cursos</p>
          </div>
          <div className="header-actions">
            <button 
              className="create-btn quiz"
              onClick={() => handleCreateEvaluation('quiz')}
            >
              <Timer size={16} />
              Nuevo Quiz
            </button>
            <button 
              className="create-btn exam"
              onClick={() => handleCreateEvaluation('exam')}
            >
              <Award size={16} />
              Nuevo Simulacro
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="stats-overview">
          <div className="stat-card">
            <div className="stat-icon total">
              <BarChart3 size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-number">{totalEvaluations}</span>
              <span className="stat-label">Total Evaluaciones</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon active">
              <CheckCircle size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-number">{activeEvaluations}</span>
              <span className="stat-label">Activas</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon quiz">
              <Timer size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-number">{totalQuizzes}</span>
              <span className="stat-label">Quizzes</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon exam">
              <Award size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-number">{totalExams}</span>
              <span className="stat-label">Simulacros</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon completion">
              <Target size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-number">{averageCompletion}%</span>
              <span className="stat-label">Completado Promedio</span>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="filters-section">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Buscar evaluaciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-dropdown">
            <Filter size={20} />
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">Todos los tipos</option>
              <option value="quiz">Solo Quizzes</option>
              <option value="exam">Solo Simulacros</option>
            </select>
          </div>
        </div>

        {/* Evaluations Grid */}
        <div className="evaluations-grid">
          {filteredEvaluations.map(evaluation => (
            <div key={evaluation.id} className={`evaluation-card ${evaluation.type}`}>
              <div className="card-header">
                <div className="evaluation-type">
                  <div 
                    className="type-badge"
                    style={{ backgroundColor: getTypeColor(evaluation.type) }}
                  >
                    {getTypeIcon(evaluation.type)}
                    {evaluation.type === 'quiz' ? 'Quiz' : 'Simulacro'}
                  </div>
                  <div 
                    className="status-badge"
                    style={{ color: getStatusColor(evaluation.status) }}
                  >
                    {getStatusText(evaluation.status)}
                  </div>
                </div>
                <div className="card-actions">
                  <button 
                    className="action-btn edit" 
                    title="Editar"
                    onClick={() => handleEditEvaluation(evaluation)}
                  >
                    <Edit3 size={16} />
                  </button>
                  <button className="action-btn play" title="Vista previa">
                    <Play size={16} />
                  </button>
                  <button 
                    className="action-btn delete" 
                    title="Eliminar"
                    onClick={() => handleDeleteEvaluation(evaluation)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="card-content">
                <h3 className="evaluation-title">{evaluation.title}</h3>
                <div className="course-info">
                  {evaluation.isIndependent ? (
                    <>
                      <Globe size={14} />
                      <span className="independent-label">Acceso Libre</span>
                    </>
                  ) : (
                    <>
                      <BookOpen size={14} />
                      <span>{evaluation.course}</span>
                    </>
                  )}
                </div>

                <div className="evaluation-stats">
                  <div className="stat-row">
                    <div className="stat-item">
                      <Clock size={14} />
                      <span>{evaluation.timeLimit} min</span>
                    </div>
                    <div className="stat-item">
                      <Target size={14} />
                      <span>{evaluation.questions} preguntas</span>
                    </div>
                  </div>
                  <div className="stat-row">
                    <div className="stat-item">
                      <Users size={14} />
                      <span>{evaluation.students} estudiantes</span>
                    </div>
                    <div className="stat-item completion">
                      <CheckCircle size={14} />
                      <span>{evaluation.completed} completados</span>
                    </div>
                  </div>
                </div>

                <div className="progress-section">
                  <div className="progress-header">
                    <span>Progreso</span>
                    <span>{getCompletionPercentage(evaluation.completed, evaluation.students)}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${getCompletionPercentage(evaluation.completed, evaluation.students)}%`,
                        backgroundColor: getTypeColor(evaluation.type)
                      }}
                    />
                  </div>
                </div>

                <div className="score-section">
                  <div className="average-score">
                    <span className="score-label">Puntuación promedio:</span>
                    <span className="score-value">{evaluation.averageScore}%</span>
                  </div>
                </div>

                <div className="dates-section">
                  <div className="date-item">
                    <span>Creado: {new Date(evaluation.createdAt).toLocaleDateString()}</span>
                  </div>
                  {evaluation.dueDate ? (
                    <div className="date-item">
                      <span>Fecha límite: {new Date(evaluation.dueDate).toLocaleDateString()}</span>
                    </div>
                  ) : (
                    <div className="date-item">
                      <span className="no-deadline">Sin fecha límite</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvaluations.length === 0 && (
          <div className="empty-state">
            <Award size={64} />
            <h3>No se encontraron evaluaciones</h3>
            <p>No hay evaluaciones que coincidan con los filtros seleccionados</p>
          </div>
        )}

        {/* Modal de Crear/Editar Evaluación */}
        {(showCreateModal || showEditModal) && (
          <div className="modal-overlay" onClick={() => { setShowCreateModal(false); setShowEditModal(false); }}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{selectedEvaluation ? 'Editar Evaluación' : 'Crear Nueva Evaluación'}</h3>
                <button 
                  className="modal-close"
                  onClick={() => { setShowCreateModal(false); setShowEditModal(false); resetForm(); }}
                >
                  ×
                </button>
              </div>

              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Título *</label>
                    <input
                      type="text"
                      value={evaluationForm.title}
                      onChange={(e) => handleFormChange('title', e.target.value)}
                      placeholder="Título de la evaluación"
                    />
                  </div>

                  <div className="form-group">
                    <label>Tipo *</label>
                    <select 
                      value={evaluationForm.type}
                      onChange={(e) => handleFormChange('type', e.target.value)}
                    >
                      <option value="quiz">Quiz (Evaluación corta)</option>
                      <option value="exam">Simulacro (Evaluación completa)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Curso *</label>
                    <select 
                      value={evaluationForm.courseId}
                      onChange={(e) => handleFormChange('courseId', e.target.value)}
                    >
                      <option value="">Seleccionar curso</option>
                      {availableCourses.map(course => (
                        <option key={course.id} value={course.id}>
                          {course.title}
                        </option>
                      ))}
                    </select>
                    {evaluationForm.isIndependent && (
                      <small className="independent-note">
                        Esta evaluación será de acceso libre para todos los estudiantes
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Tiempo límite (minutos) *</label>
                    <input
                      type="number"
                      value={evaluationForm.timeLimit}
                      onChange={(e) => handleFormChange('timeLimit', parseInt(e.target.value))}
                      min="1"
                      max="300"
                    />
                  </div>

                  <div className="form-group">
                    <label>Intentos permitidos *</label>
                    <input
                      type="number"
                      value={evaluationForm.attempts}
                      onChange={(e) => handleFormChange('attempts', parseInt(e.target.value))}
                      min="1"
                      max="10"
                    />
                  </div>

                  <div className="form-group">
                    <label>Nota mínima (%) *</label>
                    <input
                      type="number"
                      value={evaluationForm.passingGrade}
                      onChange={(e) => handleFormChange('passingGrade', parseInt(e.target.value))}
                      min="0"
                      max="100"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Fecha límite 
                      {!evaluationForm.isIndependent && ' *'}
                      {evaluationForm.isIndependent && ' (Opcional)'}
                    </label>
                    <input
                      type="date"
                      value={evaluationForm.dueDate}
                      onChange={(e) => handleFormChange('dueDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      disabled={evaluationForm.isIndependent}
                    />
                    {evaluationForm.isIndependent && (
                      <small className="independent-note">
                        Las evaluaciones de acceso libre no requieren fecha límite
                      </small>
                    )}
                  </div>
                </div>

                <div className="form-info">
                  <div className="info-card">
                    <h4>
                      {evaluationForm.type === 'quiz' ? (
                        <>
                          <Timer size={16} />
                          Quiz - Evaluación Corta
                        </>
                      ) : (
                        <>
                          <Award size={16} />
                          Simulacro - Evaluación Completa
                        </>
                      )}
                    </h4>
                    <p>
                      {evaluationForm.type === 'quiz' 
                        ? 'Ideal para evaluar temas específicos o lecciones individuales. Generalmente más corto y con menos preguntas.'
                        : 'Perfecto para exámenes finales o evaluaciones comprehensivas. Cubre múltiples temas y requiere más tiempo.'
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  className="btn-secondary"
                  onClick={() => { setShowCreateModal(false); setShowEditModal(false); resetForm(); }}
                >
                  Cancelar
                </button>
                <button 
                  className="btn-primary"
                  onClick={handleSaveEvaluation}
                >
                  {selectedEvaluation ? 'Guardar Cambios' : 'Crear Evaluación'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Confirmación de Eliminación */}
        {showDeleteModal && (
          <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
            <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Confirmar Eliminación</h3>
                <button 
                  className="modal-close"
                  onClick={() => setShowDeleteModal(false)}
                >
                  ×
                </button>
              </div>

              <div className="modal-body">
                <div className="delete-warning">
                  <div className="warning-icon">
                    <Trash2 size={48} />
                  </div>
                  <h4>¿Estás seguro de que quieres eliminar esta evaluación?</h4>
                  <p><strong>"{selectedEvaluation?.title}"</strong></p>
                  <p>Esta acción no se puede deshacer. Se perderán todos los datos asociados con esta evaluación.</p>
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  className="btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancelar
                </button>
                <button 
                  className="btn-danger"
                  onClick={confirmDelete}
                >
                  Eliminar Evaluación
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .evaluations-manager {
    padding: 0;
  }

  /* Header */
  .manager-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
    gap: 2rem;
  }

  .header-left h2 {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }

  .header-left p {
    color: #64748b;
    font-size: 1rem;
  }

  .header-actions {
    display: flex;
    gap: 1rem;
  }

  .create-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    color: white;
  }

  .create-btn.quiz {
    background: #3b82f6;
  }

  .create-btn.quiz:hover {
    background: #2563eb;
    transform: translateY(-2px);
  }

  .create-btn.exam {
    background: #10b981;
  }

  .create-btn.exam:hover {
    background: #059669;
    transform: translateY(-2px);
  }

  /* Stats Overview */
  .stats-overview {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: all 0.3s ease;
  }

  .stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1);
  }

  .stat-icon {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .stat-icon.total { background: #6366f1; }
  .stat-icon.active { background: #10b981; }
  .stat-icon.quiz { background: #3b82f6; }
  .stat-icon.exam { background: #10b981; }
  .stat-icon.completion { background: #f59e0b; }

  .stat-content {
    display: flex;
    flex-direction: column;
  }

  .stat-number {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1e293b;
  }

  .stat-label {
    font-size: 0.9rem;
    color: #64748b;
  }

  /* Filters */
  .filters-section {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    align-items: center;
  }

  .search-box {
    position: relative;
    flex: 1;
    max-width: 400px;
  }

  .search-box svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
  }

  .search-box input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 3rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .search-box input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .filter-dropdown {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .filter-dropdown svg {
    color: #64748b;
  }

  .filter-dropdown select {
    padding: 0.75rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: white;
    cursor: pointer;
  }

  /* Evaluations Grid */
  .evaluations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 1.5rem;
  }

  .evaluation-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border: 2px solid transparent;
  }

  .evaluation-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }

  .evaluation-card.quiz {
    border-left: 4px solid #3b82f6;
  }

  .evaluation-card.exam {
    border-left: 4px solid #10b981;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
  }

  .evaluation-type {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .type-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    color: white;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .status-badge {
    font-size: 0.8rem;
    font-weight: 600;
  }

  .card-actions {
    display: flex;
    gap: 0.5rem;
  }

  .action-btn {
    padding: 0.5rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: none;
  }

  .action-btn:hover {
    background: #f1f5f9;
  }

  .action-btn.edit { color: #3b82f6; }
  .action-btn.play { color: #10b981; }
  .action-btn.delete { color: #ef4444; }

  .card-content {
    padding: 1.5rem;
  }

  .evaluation-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }

  .course-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #64748b;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .independent-label {
    color: #10b981;
    font-weight: 600;
  }

  .no-deadline {
    color: #10b981;
    font-style: italic;
  }

  .independent-note {
    color: #10b981;
    font-size: 0.8rem;
    margin-top: 0.25rem;
    display: block;
  }

  .evaluation-stats {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .stat-row {
    display: flex;
    gap: 1.5rem;
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: #64748b;
  }

  .stat-item.completion {
    color: #10b981;
  }

  .progress-section {
    margin-bottom: 1rem;
  }

  .progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: #64748b;
  }

  .progress-bar {
    height: 8px;
    background: #f1f5f9;
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    transition: width 0.3s ease;
  }

  .score-section {
    margin-bottom: 1rem;
    padding: 0.75rem;
    background: #f8fafc;
    border-radius: 8px;
  }

  .average-score {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .score-label {
    font-size: 0.9rem;
    color: #64748b;
  }

  .score-value {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1e293b;
  }

  .dates-section {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .date-item {
    font-size: 0.8rem;
    color: #9ca3af;
  }

  /* Empty State */
  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: #64748b;
  }

  .empty-state svg {
    color: #cbd5e1;
    margin-bottom: 1rem;
  }

  .empty-state h3 {
    margin: 0 0 0.5rem 0;
    color: #475569;
  }

  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
  }

  .modal-content {
    background: white;
    border-radius: 12px;
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }

  .modal-content.delete-modal {
    max-width: 400px;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid #e2e8f0;
  }

  .modal-header h3 {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 600;
    color: #1e293b;
  }

  .modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #64748b;
    padding: 0.5rem;
    border-radius: 6px;
    transition: all 0.3s ease;
  }

  .modal-close:hover {
    background: #f1f5f9;
    color: #1e293b;
  }

  .modal-body {
    padding: 2rem;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group label {
    font-weight: 600;
    color: #374151;
    font-size: 0.9rem;
  }

  .form-group input,
  .form-group select {
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .form-group input:focus,
  .form-group select:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .form-info {
    margin-top: 1rem;
  }

  .info-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1.5rem;
  }

  .info-card h4 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0 0 0.5rem 0;
    color: #1e293b;
    font-size: 1rem;
  }

  .info-card p {
    margin: 0;
    color: #64748b;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1.5rem 2rem;
    border-top: 1px solid #e2e8f0;
    background: #f8fafc;
  }

  .btn-primary,
  .btn-secondary,
  .btn-danger {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
  }

  .btn-primary {
    background: #3b82f6;
    color: white;
  }

  .btn-primary:hover {
    background: #2563eb;
  }

  .btn-secondary {
    background: #f1f5f9;
    color: #64748b;
    border: 1px solid #e2e8f0;
  }

  .btn-secondary:hover {
    background: #e2e8f0;
  }

  .btn-danger {
    background: #ef4444;
    color: white;
  }

  .btn-danger:hover {
    background: #dc2626;
  }

  /* Delete Modal Specific Styles */
  .delete-warning {
    text-align: center;
    padding: 1rem 0;
  }

  .warning-icon {
    color: #ef4444;
    margin-bottom: 1rem;
  }

  .delete-warning h4 {
    margin: 0 0 1rem 0;
    color: #1e293b;
    font-size: 1.1rem;
  }

  .delete-warning p {
    margin: 0.5rem 0;
    color: #64748b;
  }

  .delete-warning p strong {
    color: #1e293b;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .manager-header {
      flex-direction: column;
      align-items: stretch;
    }

    .header-actions {
      justify-content: stretch;
    }

    .stats-overview {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }

    .filters-section {
      flex-direction: column;
      align-items: stretch;
    }

    .evaluations-grid {
      grid-template-columns: 1fr;
    }

    .stat-row {
      flex-direction: column;
      gap: 0.5rem;
    }

    .modal-content {
      margin: 1rem;
      max-width: none;
    }

    .form-grid {
      grid-template-columns: 1fr;
    }

    .modal-footer {
      flex-direction: column;
    }
  }
`;

export default EvaluationsManager;
