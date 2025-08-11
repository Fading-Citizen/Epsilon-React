import React, { useState } from 'react';
import styled from 'styled-components';
import CourseManager from './CourseManager';
import CourseEditor from './CourseEditor';
import StudentManager from './StudentManager';
import StudentDetail from './StudentDetail';
import StudentForm from './StudentForm';
import GroupManager from './GroupManager';
import EvaluationsManager from './EvaluationsManager';
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
  Calendar
} from 'lucide-react';

const TeacherDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [editingCourse, setEditingCourse] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [showGroupManager, setShowGroupManager] = useState(false);

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
    { title: 'Reunión con coordinación', date: '15 Nov 10:00', type: 'meeting' }
  ];

  return (
    <StyledWrapper>
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="logo-section">
              <img 
                src="/assets/images/LogotipoBlanco.png" 
                alt="Epsilon Academy" 
                className="logo-image"
                onError={(e) => {
                  console.log('Error loading teacher dashboard logo');
                  e.target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.innerHTML = '<span class="logo">epsilon</span><span class="academy">ACADEMY</span>';
                  fallback.className = 'logo-fallback';
                  e.target.parentElement.insertBefore(fallback, e.target);
                }}
                onLoad={() => console.log('Teacher dashboard logo loaded successfully')}
              />
            </div>
            <div className="role-badge">PROFESOR</div>
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
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Header */}
          <header className="content-header">
            <div className="header-left">
              <h1>Bienvenido, Prof. Demo</h1>
              <p>Gestiona tus cursos y estudiantes desde aquí</p>
            </div>
            <div className="header-right">
              <div className="notification-icon">
                <Bell size={20} />
                <span className="notification-badge">3</span>
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
          </header>

          {/* Content Area */}
          <div className="content-area">
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
                      <Award size={20} />
                      Nueva Evaluación
                    </button>
                    <button className="action-btn secondary">
                      <MessageSquare size={20} />
                      Enviar Mensaje
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'courses' && (
              <CourseManager 
                onEditCourse={(courseId) => {
                  setEditingCourse(courseId);
                  setActiveSection('editor');
                }}
                onCreateCourse={() => {
                  setEditingCourse(null);
                  setActiveSection('editor');
                }}
              />
            )}

            {activeSection === 'students' && !selectedStudent && !showStudentForm && !showGroupManager && (
              <StudentManager 
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
            )}

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
                  // Aquí iría la lógica para guardar el estudiante
                }}
              />
            )}

            {activeSection === 'students' && showGroupManager && (
              <GroupManager 
                onBack={() => setShowGroupManager(false)}
              />
            )}

            {activeSection === 'editor' && (
              <CourseEditor 
                courseId={editingCourse}
                onBack={() => setActiveSection('courses')}
                onSave={() => setActiveSection('courses')}
              />
            )}

            {activeSection === 'evaluations' && (
              <EvaluationsManager />
            )}

            {/* Otros tabs serán implementados en componentes separados */}
            {activeSection !== 'overview' && 
             activeSection !== 'courses' && 
             activeSection !== 'editor' && 
             activeSection !== 'students' && 
             activeSection !== 'evaluations' &&
             activeSection !== 'student-detail' &&
             activeSection !== 'student-form' &&
             activeSection !== 'groups' && (
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
  .dashboard-container {
    display: flex;
    min-height: 100vh;
    background: #f8fafc;
  }

  /* Sidebar Styles */
  .sidebar {
    width: 280px;
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    color: white;
    display: flex;
    flex-direction: column;
  }

  .sidebar-header {
    padding: 2rem 1.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }

  .logo-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
    
    .logo-image {
      height: 50px;
      width: auto;
      filter: brightness(1.1) contrast(1.1);
      margin-bottom: 0.5rem;
    }
    
    .logo-fallback {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .logo {
    font-size: 1.8rem;
    font-weight: 300;
    letter-spacing: 2px;
  }

  .academy {
    font-size: 0.8rem;
    font-weight: 600;
    color: #ecf0f1;
    letter-spacing: 1px;
  }

  .role-badge {
    background: #1abc9c;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: bold;
    text-align: center;
  }

  .sidebar-nav {
    flex: 1;
    padding: 1rem 0;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
  }

  .nav-item:hover {
    background: rgba(255,255,255,0.1);
    border-left-color: #1abc9c;
  }

  .nav-item.active {
    background: rgba(26,188,156,0.2);
    border-left-color: #1abc9c;
    color: #1abc9c;
  }

  /* Main Content Styles */
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .content-header {
    background: white;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-left h1 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .header-left p {
    color: #64748b;
    margin: 0;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .notification-icon {
    position: relative;
    padding: 0.5rem;
    border-radius: 50%;
    background: #f1f5f9;
    cursor: pointer;
  }

  .notification-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #ef4444;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .profile-section {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .profile-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3498db, #2980b9);
    display: flex;
    align-items: center;
    justify-content: center;
    object-fit: cover;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }

  .profile-info {
    display: flex;
    flex-direction: column;
  }

  .profile-name {
    font-weight: 600;
    color: #2c3e50;
  }

  .profile-role {
    font-size: 0.8rem;
    color: #64748b;
  }

  /* Content Area */
  .content-area {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
  }

  /* Stats Grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
  }

  .stat-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .stat-icon.courses { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
  .stat-icon.students { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
  .stat-icon.completion { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }

  .stat-content {
    display: flex;
    flex-direction: column;
  }

  .stat-number {
    font-size: 2rem;
    font-weight: bold;
    color: #2c3e50;
  }

  .stat-label {
    color: #64748b;
    font-size: 0.9rem;
  }

  /* Dashboard Grid */
  .dashboard-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .activity-section, .events-section {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .activity-section h3, .events-section h3 {
    margin-bottom: 1rem;
    color: #2c3e50;
  }

  .activity-list, .events-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .activity-item {
    padding: 1rem;
    border-radius: 8px;
    border-left: 4px solid #e2e8f0;
  }

  .activity-item.new_student { border-left-color: #10b981; }
  .activity-item.assignment { border-left-color: #f59e0b; }
  .activity-item.course_completed { border-left-color: #8b5cf6; }
  .activity-item.message { border-left-color: #06b6d4; }

  .event-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 8px;
    background: #f8fafc;
  }

  .event-icon {
    background: #1abc9c;
    color: white;
    padding: 0.5rem;
    border-radius: 6px;
  }

  /* Quick Actions */
  .quick-actions {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .quick-actions h3 {
    margin-bottom: 1rem;
    color: #2c3e50;
  }

  .action-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .action-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .action-btn.primary {
    background: linear-gradient(135deg, #1abc9c 0%, #16a085 100%);
    color: white;
  }

  .action-btn.secondary {
    background: #f1f5f9;
    color: #475569;
    border: 1px solid #e2e8f0;
  }

  .action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  /* Courses Content */
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .create-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, #1abc9c 0%, #16a085 100%);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
  }

  /* Placeholder Content */
  .placeholder-content {
    background: white;
    padding: 3rem;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  /* Responsive */
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
      border-bottom: 3px solid transparent;
    }
    
    .content-header {
      flex-direction: column;
      gap: 1rem;
      align-items: stretch;
    }
    
    .dashboard-grid {
      grid-template-columns: 1fr;
    }
  }
`;

export default TeacherDashboard;
