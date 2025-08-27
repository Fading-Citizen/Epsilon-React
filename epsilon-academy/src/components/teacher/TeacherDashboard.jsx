import React, { useState } from 'react';
import styled from 'styled-components';
import CourseManager from './CourseManager';
import CourseEditor from './CourseEditor';
import StudentManager from './StudentManager';
import StudentDetail from './StudentDetail';
import StudentForm from './StudentForm';
import GroupManager from './GroupManager';
import EvaluationsManager from './EvaluationsManager_New';
import QuizBuilder from './QuizBuilder';
import { 
  User, 
  BookOpen, 
  Users, 
  BarChart3, 
  Settings, 
  Plus,
  Bell,
  MessageSquare,
  TrendingUp,
  Award,
  Calendar,
  Search,
  Filter,
  Grid3X3,
  List,
  SortAsc,
  ChevronDown,
  FileText
} from 'lucide-react';
import { useTheme } from '../../themes/ThemeContext';
import ThemeToggle from '../common/ThemeToggle';

const TeacherDashboard = () => {
  // Estados básicos
  const [activeSection, setActiveSection] = useState('overview');
  const [editingCourse, setEditingCourse] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [showGroupManager, setShowGroupManager] = useState(false);
  
  // Estados para evaluaciones
  const [showQuizBuilder, setShowQuizBuilder] = useState(false);
  const [showSimulacroBuilder, setShowSimulacroBuilder] = useState(false);
  const [editingEvaluation, setEditingEvaluation] = useState(null);
  
  // Estados para filtros y visualización
  const [studentsViewMode, setStudentsViewMode] = useState('list');
  const [coursesViewMode, setCoursesViewMode] = useState('list');
  const [evaluationsViewMode, setEvaluationsViewMode] = useState('list');
  
  const [studentsFilter, setStudentsFilter] = useState({
    search: '',
    status: 'all',
    course: 'all',
    sortBy: 'name'
  });
  
  const [coursesFilter, setCoursesFilter] = useState({
    search: '',
    category: 'all',
    status: 'all',
    sortBy: 'name'
  });
  
  const [evaluationsFilter, setEvaluationsFilter] = useState({
    search: '',
    type: 'all',
    status: 'all',
    course: 'all',
    sortBy: 'date'
  });
  
  const { isDarkMode } = useTheme();

  // Datos de ejemplo
  const stats = {
    totalCourses: 12,
    activeStudents: 340,
    completionRate: '87%'
  };

  const recentActivities = [
    { type: 'new_student', message: 'Juan Pérez se inscribió en "Cálculo Avanzado"', time: '2 min ago' },
    { type: 'assignment', message: 'Nueva tarea entregada en "Física Cuántica"', time: '15 min ago' },
    { type: 'course_completed', message: 'María García completó "Álgebra Linear"', time: '1 hora ago' },
    { type: 'message', message: 'Nuevo mensaje de Carlos López', time: '2 horas ago' }
  ];

  const upcomingEvents = [
    { title: 'Clase virtual: Matemáticas', date: 'Hoy 14:00', type: 'class' },
    { title: 'Entrega de proyecto final', date: 'Mañana 23:59', type: 'deadline' },
    { title: 'Reunión de profesores', date: 'Viernes 10:00', type: 'meeting' }
  ];

  // Funciones para manejar evaluaciones
  const handleCreateQuiz = () => {
    setEditingEvaluation(null);
    setShowQuizBuilder(true);
    console.log('Creando nuevo quiz');
  };

  const handleCreateSimulacro = () => {
    setEditingEvaluation(null);
    setShowSimulacroBuilder(true);
    console.log('Creando nuevo simulacro');
  };

  // Componente para el header de sección con filtros
  const SectionHeader = ({ title, description, onCreateNew, createButtonText, additionalButtons = [], showFilters = false, viewMode, onViewModeChange, filters, onFilterChange, filterOptions = {} }) => (
    <div className="section-header">
      <div className="header-left">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="header-actions">
          {onCreateNew && (
            <button className="action-btn primary" onClick={onCreateNew}>
              <Plus size={20} />
              {createButtonText}
            </button>
          )}
          {additionalButtons.map((button, index) => (
            <button 
              key={index}
              className={`action-btn ${button.variant || 'secondary'}`} 
              onClick={button.onClick}
            >
              {button.icon}
              {button.text}
            </button>
          ))}
        </div>
      </div>
      
      {showFilters && (
        <div className="filters-section">
          <div className="filters-row">
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder={`Buscar ${title.toLowerCase()}...`}
                value={filters.search}
                onChange={(e) => onFilterChange({...filters, search: e.target.value})}
              />
            </div>
            
            <div className="filter-controls">
              {filterOptions.status && (
                <div className="filter-dropdown">
                  <Filter size={16} />
                  <select
                    value={filters.status}
                    onChange={(e) => onFilterChange({...filters, status: e.target.value})}
                  >
                    {filterOptions.status.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} />
                </div>
              )}

              {filterOptions.category && (
                <div className="filter-dropdown">
                  <BookOpen size={16} />
                  <select
                    value={filters.category}
                    onChange={(e) => onFilterChange({...filters, category: e.target.value})}
                  >
                    {filterOptions.category.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} />
                </div>
              )}

              {filterOptions.type && (
                <div className="filter-dropdown">
                  <Filter size={16} />
                  <select
                    value={filters.type}
                    onChange={(e) => onFilterChange({...filters, type: e.target.value})}
                  >
                    {filterOptions.type.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} />
                </div>
              )}

              <div className="filter-dropdown">
                <SortAsc size={16} />
                <select
                  value={filters.sortBy}
                  onChange={(e) => onFilterChange({...filters, sortBy: e.target.value})}
                >
                  {filterOptions.sortBy?.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <ChevronDown size={16} />
              </div>
            </div>

            <div className="view-toggle">
              <button
                className={`view-btn ${viewMode === 'cards' ? 'active' : ''}`}
                onClick={() => onViewModeChange('cards')}
              >
                <Grid3X3 size={20} />
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => onViewModeChange('list')}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <StyledWrapper $isDark={isDarkMode}>
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="logo-section">
              <img 
                src={isDarkMode 
                  ? "/assets/images/LogotipoBlanco.png" 
                  : "/assets/images/LogotipoGrisOscuro.png"
                } 
                alt="Epsilon Academy" 
                className="logo-image"
              />
            </div>
            <div className="profile-section">
              <div className="profile-image">
                <User size={20} color="white" />
              </div>
              <div className="profile-info">
                <span className="profile-name">Prof. Demo</span>
                <span className="profile-role">Matemáticas</span>
              </div>
            </div>
          </div>

          <nav className="sidebar-nav">
            <div 
              className={`nav-item ${activeSection === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveSection('overview')}
            >
              <BarChart3 size={20} />
              <span>Dashboard</span>
            </div>
            <div 
              className={`nav-item ${activeSection === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveSection('courses')}
            >
              <BookOpen size={20} />
              <span>Mis Cursos</span>
            </div>
            <div 
              className={`nav-item ${activeSection === 'students' ? 'active' : ''}`}
              onClick={() => setActiveSection('students')}
            >
              <Users size={20} />
              <span>Estudiantes</span>
            </div>
            <div 
              className={`nav-item ${activeSection === 'evaluations' ? 'active' : ''}`}
              onClick={() => setActiveSection('evaluations')}
            >
              <Award size={20} />
              <span>Evaluaciones</span>
            </div>
            <div 
              className={`nav-item ${activeSection === 'messages' ? 'active' : ''}`}
              onClick={() => setActiveSection('messages')}
            >
              <MessageSquare size={20} />
              <span>Mensajes</span>
            </div>
            <div 
              className={`nav-item ${activeSection === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveSection('reports')}
            >
              <TrendingUp size={20} />
              <span>Reportes</span>
            </div>
            <div 
              className={`nav-item ${activeSection === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveSection('profile')}
            >
              <Settings size={20} />
              <span>Perfil</span>
            </div>
          </nav>

          <div className="theme-toggle-container">
            <ThemeToggle />
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Content Area */}
          <div className="content-area">
            {/* Overview Section */}
            {activeSection === 'overview' && (
              <div className="overview-content">
                {/* Stats Cards */}
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon courses">
                      <BookOpen size={24} />
                    </div>
                    <div className="stat-content">
                      <span className="stat-number">{stats.totalCourses}</span>
                      <span className="stat-label">Cursos Activos</span>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon students">
                      <Users size={24} />
                    </div>
                    <div className="stat-content">
                      <span className="stat-number">{stats.activeStudents}</span>
                      <span className="stat-label">Estudiantes</span>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon completion">
                      <Award size={24} />
                    </div>
                    <div className="stat-content">
                      <span className="stat-number">{stats.completionRate}</span>
                      <span className="stat-label">Tasa Completado</span>
                    </div>
                  </div>
                </div>

                {/* Recent Activity & Upcoming Events */}
                <div className="dashboard-grid">
                  <div className="activity-section">
                    <h3>Actividad Reciente</h3>
                    <div className="activity-list">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className={`activity-item ${activity.type}`}>
                          <div className="activity-content">
                            <p>{activity.message}</p>
                            <small>{activity.time}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="events-section">
                    <h3>Próximos Eventos</h3>
                    <div className="events-list">
                      {upcomingEvents.map((event, index) => (
                        <div key={index} className={`event-item ${event.type}`}>
                          <div className="event-icon">
                            <Calendar size={16} />
                          </div>
                          <div className="event-content">
                            <h4>{event.title}</h4>
                            <span>{event.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="quick-actions">
                  <h3>Acciones Rápidas</h3>
                  <div className="action-buttons">
                    <button className="action-btn primary">
                      <Plus size={20} />
                      Crear Nuevo Curso
                    </button>
                    <button className="action-btn secondary">
                      <MessageSquare size={20} />
                      Enviar Mensaje
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Courses Section */}
            {activeSection === 'courses' && (
              <div className="courses-section">
                <SectionHeader
                  title="Gestión de Cursos"
                  description="Administra tu catálogo de cursos y contenido educativo"
                  onCreateNew={() => {
                    setEditingCourse(null);
                    setActiveSection('editor');
                  }}
                  createButtonText="Nuevo Curso"
                  showFilters={true}
                  viewMode={coursesViewMode}
                  onViewModeChange={setCoursesViewMode}
                  filters={coursesFilter}
                  onFilterChange={setCoursesFilter}
                  filterOptions={{
                    status: [
                      { value: 'all', label: 'Todos los estados' },
                      { value: 'active', label: 'Activos' },
                      { value: 'draft', label: 'Borrador' },
                      { value: 'completed', label: 'Completados' }
                    ],
                    category: [
                      { value: 'all', label: 'Todas las categorías' },
                      { value: 'math', label: 'Matemáticas' },
                      { value: 'physics', label: 'Física' },
                      { value: 'chemistry', label: 'Química' }
                    ],
                    sortBy: [
                      { value: 'name', label: 'Ordenar por nombre' },
                      { value: 'date', label: 'Fecha de creación' },
                      { value: 'students', label: 'Número de estudiantes' }
                    ]
                  }}
                />

                <div className={`courses-content ${coursesViewMode}`}>
                  <CourseManager 
                    viewMode={coursesViewMode}
                    filters={coursesFilter}
                    onEditCourse={(courseId) => {
                      setEditingCourse(courseId);
                      setActiveSection('editor');
                    }}
                    onCreateCourse={() => {
                      setEditingCourse(null);
                      setActiveSection('editor');
                    }}
                  />
                </div>
              </div>
            )}

            {/* Students Section */}
            {activeSection === 'students' && !selectedStudent && !showStudentForm && !showGroupManager && (
              <div className="students-section">
                <SectionHeader
                  title="Gestión de Estudiantes"
                  description="Administra estudiantes, grupos y seguimiento académico"
                  onCreateNew={() => {
                    setEditingStudent(null);
                    setShowStudentForm(true);
                  }}
                  createButtonText="Nuevo Estudiante"
                  additionalButtons={[
                    {
                      text: "Gestionar Grupos",
                      icon: <Users size={20} />,
                      variant: "secondary",
                      onClick: () => setShowGroupManager(true)
                    }
                  ]}
                  showFilters={true}
                  viewMode={studentsViewMode}
                  onViewModeChange={setStudentsViewMode}
                  filters={studentsFilter}
                  onFilterChange={setStudentsFilter}
                  filterOptions={{
                    status: [
                      { value: 'all', label: 'Todos los estados' },
                      { value: 'active', label: 'Activos' },
                      { value: 'inactive', label: 'Inactivos' },
                      { value: 'pending', label: 'Pendientes' }
                    ],
                    sortBy: [
                      { value: 'name', label: 'Ordenar por nombre' },
                      { value: 'date', label: 'Fecha de registro' },
                      { value: 'progress', label: 'Progreso' }
                    ]
                  }}
                />

                <div className={`students-content ${studentsViewMode}`}>
                  <StudentManager 
                    viewMode={studentsViewMode}
                    filters={studentsFilter}
                    onCreateStudent={() => {
                      setEditingStudent(null);
                      setShowStudentForm(true);
                    }}
                    onEditStudent={(studentId) => {
                      setEditingStudent(studentId);
                      setShowStudentForm(true);
                    }}
                    onViewStudent={(studentId) => {
                      setSelectedStudent(studentId);
                    }}
                    onManageGroups={() => {
                      setShowGroupManager(true);
                    }}
                  />
                </div>
              </div>
            )}

            {/* Student Detail */}
            {activeSection === 'students' && selectedStudent && !showStudentForm && (
              <StudentDetail 
                studentId={selectedStudent}
                onBack={() => setSelectedStudent(null)}
                onEdit={(studentId) => {
                  setEditingStudent(studentId);
                  setSelectedStudent(null);
                  setShowStudentForm(true);
                }}
              />
            )}

            {/* Student Form */}
            {activeSection === 'students' && showStudentForm && (
              <StudentForm 
                studentId={editingStudent}
                onBack={() => {
                  setShowStudentForm(false);
                  setEditingStudent(null);
                }}
                onSave={(studentData) => {
                  console.log('Saving student:', studentData);
                  setShowStudentForm(false);
                  setEditingStudent(null);
                }}
              />
            )}

            {/* Group Manager */}
            {activeSection === 'students' && showGroupManager && (
              <GroupManager 
                onBack={() => setShowGroupManager(false)}
              />
            )}

            {/* Evaluations Section */}
            {activeSection === 'evaluations' && !showQuizBuilder && !showSimulacroBuilder && (
              <div className="evaluations-section">
                <SectionHeader
                  title="Gestión de Evaluaciones"
                  description="Administra exámenes, tareas y seguimiento académico"
                  additionalButtons={[
                    {
                      text: "Crear Quiz",
                      icon: <Award size={20} />,
                      variant: "secondary",
                      onClick: handleCreateQuiz
                    },
                    {
                      text: "Crear Simulacro",
                      icon: <FileText size={20} />,
                      variant: "secondary", 
                      onClick: handleCreateSimulacro
                    }
                  ]}
                  showFilters={true}
                  viewMode={evaluationsViewMode}
                  onViewModeChange={setEvaluationsViewMode}
                  filters={evaluationsFilter}
                  onFilterChange={setEvaluationsFilter}
                  filterOptions={{
                    type: [
                      { value: 'all', label: 'Todos los tipos' },
                      { value: 'quiz', label: 'Quiz' },
                      { value: 'exam', label: 'Examen' },
                      { value: 'assignment', label: 'Tarea' }
                    ],
                    status: [
                      { value: 'all', label: 'Todos los estados' },
                      { value: 'active', label: 'Activas' },
                      { value: 'scheduled', label: 'Programadas' },
                      { value: 'completed', label: 'Completadas' }
                    ],
                    sortBy: [
                      { value: 'date', label: 'Fecha de evaluación' },
                      { value: 'name', label: 'Nombre' },
                      { value: 'course', label: 'Curso' }
                    ]
                  }}
                />

                <div className={`evaluations-content ${evaluationsViewMode}`}>
                  <EvaluationsManager 
                    viewMode={evaluationsViewMode}
                    filters={evaluationsFilter}
                  />
                </div>
              </div>
            )}

            {/* Quiz Builder */}
            {activeSection === 'evaluations' && showQuizBuilder && (
              <QuizBuilder
                type="quiz"
                quiz={editingEvaluation}
                onSave={(quizData) => {
                  console.log('Quiz guardado:', quizData);
                  setShowQuizBuilder(false);
                  setEditingEvaluation(null);
                }}
                onCancel={() => {
                  setShowQuizBuilder(false);
                  setEditingEvaluation(null);
                }}
              />
            )}

            {/* Simulacro Builder */}
            {activeSection === 'evaluations' && showSimulacroBuilder && (
              <QuizBuilder
                type="simulacro"
                quiz={editingEvaluation ? { ...editingEvaluation, isIndependent: true } : { isIndependent: true }}
                onSave={(simulacroData) => {
                  console.log('Simulacro guardado:', simulacroData);
                  setShowSimulacroBuilder(false);
                  setEditingEvaluation(null);
                }}
                onCancel={() => {
                  setShowSimulacroBuilder(false);
                  setEditingEvaluation(null);
                }}
              />
            )}

            {/* Course Editor */}
            {activeSection === 'editor' && (
              <CourseEditor 
                courseId={editingCourse}
                onBack={() => setActiveSection('courses')}
                onSave={() => setActiveSection('courses')}
              />
            )}

            {/* Placeholder for other sections */}
            {!['overview', 'courses', 'students', 'evaluations', 'editor'].includes(activeSection) && (
              <div className="placeholder-content">
                <h2>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h2>
                <p>Contenido de {activeSection} será implementado próximamente...</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* Variables CSS */
  --color-teal: #1abc9c;
  --color-profes: #087799;
  --color-secondary: #34495e;
  --bg-primary: ${props => props.$isDark ? '#0f172a' : '#ffffff'};
  --bg-secondary: ${props => props.$isDark ? '#1e293b' : '#f8fafc'};
  --text-primary: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
  --text-secondary: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
  --border-color: ${props => props.$isDark ? '#334155' : '#e2e8f0'};

  width: 100vw;
  min-height: 100vh;
  background: ${props => props.$isDark 
    ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
    : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
  };
  color: var(--text-primary);
  position: relative;
  overflow-x: hidden;

  /* Fondo animado */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.$isDark 
      ? 'radial-gradient(circle at 25% 25%, rgba(26, 188, 156, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(8, 119, 153, 0.15) 0%, transparent 50%)'
      : 'radial-gradient(circle at 25% 25%, rgba(26, 188, 156, 0.06) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(71, 85, 105, 0.04) 0%, transparent 50%), linear-gradient(135deg, rgba(248, 250, 252, 0.5) 0%, rgba(241, 245, 249, 0.3) 100%)'
    };
    animation: backgroundFloat 30s ease-in-out infinite alternate;
    pointer-events: none;
  }

  @keyframes backgroundFloat {
    0% { transform: translate(0, 0) rotate(0deg); }
    100% { transform: translate(20px, -20px) rotate(3deg); }
  }

  .dashboard-container {
    display: flex;
    min-height: 100vh;
    position: relative;
    z-index: 1;
  }

  /* Sidebar */
  .sidebar {
    width: 280px;
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.9) 100%)'
      : 'linear-gradient(135deg, rgba(248, 250, 252, 0.98) 0%, rgba(241, 245, 249, 0.95) 100%)'
    };
    backdrop-filter: blur(25px);
    border-right: 1px solid ${props => props.$isDark 
      ? 'rgba(71, 85, 105, 0.3)' 
      : 'rgba(148, 163, 184, 0.3)'
    };
    display: flex;
    flex-direction: column;
    box-shadow: ${props => props.$isDark 
      ? '4px 0 25px rgba(0, 0, 0, 0.3)'
      : '4px 0 25px rgba(71, 85, 105, 0.15)'
    };
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${props => props.$isDark 
        ? 'linear-gradient(45deg, rgba(26, 188, 156, 0.05) 0%, transparent 50%)'
        : 'linear-gradient(45deg, rgba(26, 188, 156, 0.03) 0%, rgba(71, 85, 105, 0.02) 50%)'
      };
      pointer-events: none;
    }
  }

  .sidebar-header {
    padding: 2rem 1.5rem;
    border-bottom: 1px solid ${props => props.$isDark 
      ? 'rgba(71, 85, 105, 0.3)' 
      : 'rgba(148, 163, 184, 0.4)'
    };
    position: relative;
    z-index: 1;
  }

  .logo-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1.5rem;
    
    .logo-image {
      height: 60px;
      width: auto;
      filter: brightness(1.1) contrast(1.1);
      margin-bottom: 0.8rem;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  .sidebar-header .profile-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    
    .profile-image {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, var(--color-teal) 0%, var(--color-profes) 100%)'
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      };
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: ${props => props.$isDark 
        ? '0 4px 15px rgba(26, 188, 156, 0.3)'
        : '0 6px 20px rgba(102, 126, 234, 0.4)'
      };
      border: 3px solid ${props => props.$isDark 
        ? 'rgba(26, 188, 156, 0.2)'
        : 'rgba(102, 126, 234, 0.2)'
      };
    }

    .profile-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .profile-name {
        font-size: 0.9rem;
        font-weight: 600;
        color: ${props => props.$isDark ? '#f1f5f9' : '#2c3e50'};
        margin-bottom: 0.2rem;
      }

      .profile-role {
        font-size: 0.8rem;
        color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
        font-weight: 500;
      }
    }
  }

  .sidebar-nav {
    flex: 1;
    padding: 1rem 0;
    position: relative;
    z-index: 1;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-left: 4px solid transparent;
    margin: 0.3rem 0;
    color: ${props => props.$isDark ? '#e2e8f0' : '#475569'};
    font-weight: 600;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(26, 188, 156, 0.1), transparent);
      transition: left 0.5s ease;
    }

    &:hover::before {
      left: 100%;
    }

    &:hover {
      background: ${props => props.$isDark 
        ? 'rgba(26, 188, 156, 0.15)'
        : 'rgba(26, 188, 156, 0.1)'
      };
      border-left-color: var(--color-teal);
      transform: translateX(5px);
      color: var(--color-teal);

      svg {
        transform: scale(1.1);
      }
    }

    &.active {
      background: ${props => props.$isDark 
        ? 'linear-gradient(135deg, rgba(26, 188, 156, 0.2) 0%, rgba(8, 119, 153, 0.1) 100%)'
        : 'linear-gradient(135deg, rgba(26, 188, 156, 0.15) 0%, rgba(8, 119, 153, 0.08) 100%)'
      };
      border-left-color: var(--color-teal);
      color: var(--color-teal);
      transform: translateX(5px);

      svg {
        transform: scale(1.1);
      }
    }

    svg {
      transition: transform 0.3s ease;
    }

    span {
      font-size: 0.95rem;
    }
  }

  .theme-toggle-container {
    padding: 1rem 1.5rem;
    border-top: 1px solid ${props => props.$isDark 
      ? 'rgba(71, 85, 105, 0.3)' 
      : 'rgba(148, 163, 184, 0.3)'
    };
  }

  /* Main Content */
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
  }

  .content-header {
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.8) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)'
    };
    backdrop-filter: blur(25px);
    padding: 2rem;
    border-bottom: 1px solid ${props => props.$isDark 
      ? 'rgba(71, 85, 105, 0.3)' 
      : 'rgba(148, 163, 184, 0.4)'
    };
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: ${props => props.$isDark 
      ? '0 4px 25px rgba(0, 0, 0, 0.2)'
      : '0 4px 25px rgba(71, 85, 105, 0.15)'
    };

    .header-left {
      h1 {
        color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
        margin-bottom: 0.8rem;
        font-size: 2rem;
        font-weight: 800;
        background: linear-gradient(135deg, var(--color-teal), var(--color-profes));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      p {
        color: ${props => props.$isDark ? '#94a3b8' : '#475569'};
        margin: 0;
        font-size: 1.1rem;
        font-weight: 600;
      }
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 2rem;

      .notification-icon {
        position: relative;
        padding: 1rem;
        border-radius: 50%;
        background: ${props => props.$isDark 
          ? 'rgba(71, 85, 105, 0.4)' 
          : 'rgba(241, 245, 249, 0.9)'
        };
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid ${props => props.$isDark 
          ? 'rgba(71, 85, 105, 0.3)' 
          : 'rgba(148, 163, 184, 0.3)'
        };

        &:hover {
          transform: scale(1.1);
          background: ${props => props.$isDark 
            ? 'rgba(26, 188, 156, 0.2)' 
            : 'rgba(26, 188, 156, 0.1)'
          };
          color: var(--color-teal);
        }

        .notification-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          color: white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      }

      .profile-section {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.8rem 1.5rem;
        background: ${props => props.$isDark 
          ? 'rgba(71, 85, 105, 0.4)' 
          : 'rgba(241, 245, 249, 0.9)'
        };
        border-radius: 15px;
        backdrop-filter: blur(10px);
        border: 1px solid ${props => props.$isDark 
          ? 'rgba(71, 85, 105, 0.3)' 
          : 'rgba(148, 163, 184, 0.3)'
        };
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .profile-image {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-teal), var(--color-profes));
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-info {
          display: flex;
          flex-direction: column;

          .profile-name {
            font-weight: 600;
            color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
          }

        }
      }
    }
  }

  .content-area {
    flex: 1;
    padding: 2.5rem;
    overflow-y: auto;
    background: ${props => props.$isDark 
      ? 'transparent'
      : 'linear-gradient(135deg, rgba(248, 250, 252, 0.5) 0%, rgba(241, 245, 249, 0.3) 100%)'
    };
  }

  /* Stats Grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .stat-card {
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.8) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)'
    };
    backdrop-filter: blur(25px);
    padding: 2rem;
    border-radius: 20px;
    box-shadow: ${props => props.$isDark 
      ? '0 10px 30px rgba(0, 0, 0, 0.3)'
      : '0 10px 30px rgba(71, 85, 105, 0.15)'
    };
    display: flex;
    align-items: center;
    gap: 1.5rem;
    border: 1px solid ${props => props.$isDark 
      ? 'rgba(71, 85, 105, 0.3)' 
      : 'rgba(148, 163, 184, 0.3)'
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
      background: linear-gradient(90deg, var(--color-teal), var(--color-profes), var(--color-secondary));
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
      transition: transform 0.3s ease;

      &.courses {
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        color: white;
      }

      &.students {
        background: linear-gradient(135deg, #10b981, #047857);
        color: white;
      }

      &.completion {
        background: linear-gradient(135deg, #f59e0b, #d97706);
        color: white;
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
        margin-bottom: 0.5rem;
      }

      .stat-label {
        font-size: 1rem;
        color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
        font-weight: 600;
      }
    }
  }

  /* Dashboard Grid */
  .dashboard-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .activity-section, .events-section {
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.8) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)'
    };
    backdrop-filter: blur(25px);
    padding: 2rem;
    border-radius: 20px;
    box-shadow: ${props => props.$isDark 
      ? '0 10px 30px rgba(0, 0, 0, 0.3)'
      : '0 10px 30px rgba(71, 85, 105, 0.15)'
    };
    border: 1px solid ${props => props.$isDark 
      ? 'rgba(71, 85, 105, 0.3)' 
      : 'rgba(148, 163, 184, 0.3)'
    };

    h3 {
      color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
      margin-bottom: 1.5rem;
      font-size: 1.3rem;
      font-weight: 700;
    }
  }

  .activity-list, .events-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .activity-item, .event-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 12px;
    background: ${props => props.$isDark 
      ? 'rgba(71, 85, 105, 0.3)' 
      : 'rgba(241, 245, 249, 0.8)'
    };
    transition: all 0.3s ease;

    &:hover {
      transform: translateX(5px);
      background: ${props => props.$isDark 
        ? 'rgba(26, 188, 156, 0.1)' 
        : 'rgba(26, 188, 156, 0.05)'
      };
    }

    .activity-content, .event-content {
      flex: 1;

      p, h4 {
        margin: 0 0 0.5rem 0;
        color: ${props => props.$isDark ? '#e2e8f0' : '#334155'};
        font-weight: 600;
      }

      small, span {
        color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
        font-size: 0.9rem;
      }
    }

    .event-icon {
      color: var(--color-teal);
    }
  }

  /* Quick Actions */
  .quick-actions {
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.8) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)'
    };
    backdrop-filter: blur(25px);
    padding: 2rem;
    border-radius: 20px;
    box-shadow: ${props => props.$isDark 
      ? '0 10px 30px rgba(0, 0, 0, 0.3)'
      : '0 10px 30px rgba(71, 85, 105, 0.15)'
    };
    border: 1px solid ${props => props.$isDark 
      ? 'rgba(71, 85, 105, 0.3)' 
      : 'rgba(148, 163, 184, 0.3)'
    };

    h3 {
      color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
      margin-bottom: 1.5rem;
      font-size: 1.3rem;
      font-weight: 700;
    }

    .action-buttons {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
  }

  /* Action Buttons */
  .action-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 0.95rem;
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
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
    }

    &.primary {
      background: linear-gradient(135deg, var(--color-teal), var(--color-profes));
      color: white;
      box-shadow: 0 8px 25px rgba(26, 188, 156, 0.3);

      &:hover {
        box-shadow: 0 15px 35px rgba(26, 188, 156, 0.4);
      }
    }

    &.secondary {
      background: ${props => props.$isDark 
        ? 'rgba(71, 85, 105, 0.5)' 
        : 'rgba(241, 245, 249, 0.9)'
      };
      color: ${props => props.$isDark ? '#e2e8f0' : '#475569'};
      border: 1px solid ${props => props.$isDark 
        ? 'rgba(71, 85, 105, 0.5)' 
        : 'rgba(148, 163, 184, 0.3)'
      };

      &:hover {
        background: ${props => props.$isDark 
          ? 'rgba(26, 188, 156, 0.15)' 
          : 'rgba(26, 188, 156, 0.1)'
        };
        color: var(--color-teal);
        border-color: var(--color-teal);
      }
    }
  }

  /* Section Headers con filtros */
  .section-header {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid ${props => props.$isDark 
      ? 'rgba(71, 85, 105, 0.3)' 
      : 'rgba(148, 163, 184, 0.3)'
    };

    .header-left {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      div {
        h2 {
          color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
          margin: 0 0 0.5rem 0;
          font-size: 1.8rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--color-teal), var(--color-profes));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        p {
          color: ${props => props.$isDark ? '#94a3b8' : '#475569'};
          margin: 0;
          font-size: 1rem;
        }
      }

      .header-actions {
        display: flex;
        gap: 1rem;
      }
    }
  }

  .filters-section {
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.8) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)'
    };
    backdrop-filter: blur(25px);
    border-radius: 20px;
    padding: 1.5rem;
    border: 1px solid ${props => props.$isDark 
      ? 'rgba(71, 85, 105, 0.3)' 
      : 'rgba(148, 163, 184, 0.3)'
    };
    box-shadow: ${props => props.$isDark 
      ? '0 8px 25px rgba(0, 0, 0, 0.2)'
      : '0 8px 25px rgba(71, 85, 105, 0.1)'
    };

    .filters-row {
      display: flex;
      gap: 1.5rem;
      align-items: center;
      flex-wrap: wrap;
    }

    .search-box {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: ${props => props.$isDark 
        ? 'rgba(71, 85, 105, 0.4)' 
        : 'rgba(241, 245, 249, 0.9)'
      };
      border: 1px solid ${props => props.$isDark 
        ? 'rgba(71, 85, 105, 0.5)' 
        : 'rgba(148, 163, 184, 0.4)'
      };
      border-radius: 12px;
      padding: 0.75rem 1rem;
      min-width: 280px;
      transition: all 0.3s ease;

      svg {
        color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
        flex-shrink: 0;
      }

      input {
        border: none;
        background: transparent;
        color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
        font-size: 0.95rem;
        width: 100%;
        
        &::placeholder {
          color: ${props => props.$isDark ? '#64748b' : '#94a3b8'};
        }

        &:focus {
          outline: none;
        }
      }

      &:focus-within {
        border-color: var(--color-teal);
        box-shadow: 0 0 0 3px rgba(26, 188, 156, 0.1);
      }
    }

    .filter-controls {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .filter-dropdown {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: ${props => props.$isDark 
        ? 'rgba(71, 85, 105, 0.4)' 
        : 'rgba(241, 245, 249, 0.9)'
      };
      border: 1px solid ${props => props.$isDark 
        ? 'rgba(71, 85, 105, 0.5)' 
        : 'rgba(148, 163, 184, 0.4)'
      };
      border-radius: 10px;
      padding: 0.6rem 0.8rem;
      position: relative;
      transition: all 0.3s ease;

      svg {
        color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
        flex-shrink: 0;
      }

      select {
        border: none;
        background: transparent;
        color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
        font-size: 0.9rem;
        min-width: 140px;
        cursor: pointer;
        appearance: none;
        
        &:focus {
          outline: none;
        }
      }

      &:hover {
        border-color: var(--color-teal);
      }
    }

    .view-toggle {
      display: flex;
      background: ${props => props.$isDark 
        ? 'rgba(71, 85, 105, 0.4)' 
        : 'rgba(241, 245, 249, 0.9)'
      };
      border: 1px solid ${props => props.$isDark 
        ? 'rgba(71, 85, 105, 0.5)' 
        : 'rgba(148, 163, 184, 0.4)'
      };
      border-radius: 10px;
      padding: 0.25rem;
      margin-left: auto;

      .view-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.6rem;
        border: none;
        background: transparent;
        color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background: ${props => props.$isDark 
            ? 'rgba(26, 188, 156, 0.15)' 
            : 'rgba(26, 188, 156, 0.1)'
          };
          color: var(--color-teal);
        }

        &.active {
          background: var(--color-teal);
          color: white;
          box-shadow: 0 4px 12px rgba(26, 188, 156, 0.3);
        }
      }
    }
  }

  /* Contenido adaptativo según modo de vista */
  .students-content, .courses-content, .evaluations-content {
    &.cards {
      display: grid;
      gap: 1.5rem;
    }

    &.list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }

  /* Placeholder Content */
  .placeholder-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 400px;
    text-align: center;
    color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};

    h2 {
      color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
      margin-bottom: 1rem;
    }
  }

  /* Media Queries */
  @media (max-width: 768px) {
    .dashboard-container {
      flex-direction: column;
    }
    
    .sidebar {
      width: 100%;
      height: auto;
    }
    
    .sidebar-nav {
      display: flex;
      overflow-x: auto;
      padding: 0;
    }
    
    .nav-item {
      flex-shrink: 0;
      border-left: none;
      border-bottom: 4px solid transparent;
      transform: none;

      &:hover,
      &.active {
        transform: none;
      }
    }
    
    .content-header {
      flex-direction: column;
      gap: 1rem;
      align-items: stretch;
      padding: 1.5rem;
    }
    
    .content-area {
      padding: 1.5rem;
    }

    .stats-grid {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .dashboard-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .action-buttons {
      flex-direction: column;
    }

    /* Responsive para filtros */
    .section-header {
      .header-left {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
      }
    }

    .filters-section {
      padding: 1rem;

      .filters-row {
        flex-direction: column;
        gap: 1rem;
      }

      .search-box {
        min-width: unset;
        width: 100%;
      }

      .filter-controls {
        flex-direction: column;
        gap: 0.75rem;
      }

      .filter-dropdown {
        width: 100%;
        
        select {
          min-width: unset;
          width: 100%;
        }
      }

      .view-toggle {
        margin-left: 0;
        align-self: center;
      }
    }

    .students-content, .courses-content, .evaluations-content {
      &.cards {
        grid-template-columns: 1fr;
      }
    }
  }

  @media (max-width: 480px) {
    .content-area {
      padding: 1rem;
    }

    .stats-grid {
      grid-template-columns: 1fr;
    }

    .stat-card {
      padding: 1.5rem;
    }

    .action-btn {
      padding: 0.75rem 1rem;
      font-size: 0.9rem;
    }
  }

  /* Quiz & Simulacro Builders */
  .quiz-builder-section,
  .simulacro-builder-section {
    padding: 2rem;
    background: ${props => props.$isDark 
      ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.9) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)'
    };
    backdrop-filter: blur(25px);
    border-radius: 20px;
    border: 1px solid ${props => props.$isDark 
      ? 'rgba(71, 85, 105, 0.3)' 
      : 'rgba(148, 163, 184, 0.2)'
    };
    box-shadow: ${props => props.$isDark 
      ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
      : '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
    };
  }

  .builder-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${props => props.$isDark 
      ? 'rgba(71, 85, 105, 0.3)' 
      : 'rgba(148, 163, 184, 0.2)'
    };
  }

  .back-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: ${props => props.$isDark 
      ? 'rgba(71, 85, 105, 0.5)' 
      : 'rgba(241, 245, 249, 0.9)'
    };
    color: ${props => props.$isDark ? '#e2e8f0' : '#475569'};
    border: 1px solid ${props => props.$isDark 
      ? 'rgba(71, 85, 105, 0.5)' 
      : 'rgba(148, 163, 184, 0.3)'
    };
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
  }

  .back-btn:hover {
    background: ${props => props.$isDark 
      ? 'rgba(26, 188, 156, 0.15)' 
      : 'rgba(26, 188, 156, 0.1)'
    };
    border-color: var(--color-teal);
    color: var(--color-teal);
  }

  .builder-header h2 {
    color: ${props => props.$isDark ? '#f8fafc' : '#1e293b'};
    margin: 0;
  }

  .builder-content {
    background: ${props => props.$isDark 
      ? 'rgba(30, 41, 59, 0.8)' 
      : 'rgba(255, 255, 255, 0.9)'
    };
    border-radius: 12px;
    padding: 2rem;
    border: 1px solid ${props => props.$isDark 
      ? 'rgba(71, 85, 105, 0.3)' 
      : 'rgba(148, 163, 184, 0.2)'
    };
    color: ${props => props.$isDark ? '#e2e8f0' : '#475569'};
  }

  .builder-content p {
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
`;

export default TeacherDashboard;
