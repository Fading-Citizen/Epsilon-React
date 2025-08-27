import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  ArrowLeft,
  Edit3, 
  Mail, 
  Phone, 
  Calendar,
  BookOpen,
  Award,
  Users,
  Plus,
  Minus,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';

const StudentDetail = ({ studentId, onBack, onEdit }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);

  // Datos de ejemplo del estudiante
  const student = {
    id: studentId,
    name: 'Ana García López',
    email: 'ana.garcia@email.com',
    phone: '+34 612 345 678',
    avatar: '/api/placeholder/150/150',
    status: 'active',
    joinDate: '2024-01-15',
    lastActivity: '2024-03-10',
    gpa: 8.5,
    totalCourses: 5,
    completedCourses: 2,
    inProgressCourses: 3,
    address: 'Calle Mayor 123, Madrid, España',
    birthDate: '1995-06-15',
    emergencyContact: 'María López - +34 612 987 654'
  };

  // Cursos del estudiante
  const studentCourses = [
    {
      id: 1,
      title: 'Cálculo Diferencial',
      progress: 85,
      status: 'in-progress',
      grade: 8.5,
      enrollDate: '2024-01-15',
      lastAccess: '2024-03-10',
      timeSpent: '45h 30m',
      lessonsCompleted: 18,
      totalLessons: 22
    },
    {
      id: 2,
      title: 'Álgebra Linear',
      progress: 100,
      status: 'completed',
      grade: 9.2,
      enrollDate: '2024-01-20',
      completedDate: '2024-02-28',
      timeSpent: '32h 15m',
      lessonsCompleted: 16,
      totalLessons: 16
    },
    {
      id: 3,
      title: 'Estadística Básica',
      progress: 60,
      status: 'in-progress',
      grade: 7.8,
      enrollDate: '2024-02-01',
      lastAccess: '2024-03-08',
      timeSpent: '28h 45m',
      lessonsCompleted: 12,
      totalLessons: 20
    }
  ];

  // Grupos del estudiante
  const studentGroups = [
    {
      id: 1,
      name: 'Matemáticas Avanzadas',
      color: '#3b82f6',
      joinDate: '2024-01-15',
      permissions: ['Contenido avanzado', 'Descargar materiales', 'Foros']
    },
    {
      id: 2,
      name: 'Grupo A',
      color: '#10b981',
      joinDate: '2024-01-15',
      permissions: ['Descargar materiales', 'Foros', 'Tareas']
    }
  ];

  // Actividad reciente
  const recentActivity = [
    {
      id: 1,
      type: 'lesson_completed',
      description: 'Completó la lección "Derivadas Parciales"',
      course: 'Cálculo Diferencial',
      date: '2024-03-10',
      time: '14:30'
    },
    {
      id: 2,
      type: 'assignment_submitted',
      description: 'Entregó tarea "Ejercicios de Límites"',
      course: 'Cálculo Diferencial',
      date: '2024-03-09',
      time: '16:45'
    },
    {
      id: 3,
      type: 'quiz_completed',
      description: 'Completó quiz "Matrices y Determinantes" - 9.0/10',
      course: 'Álgebra Linear',
      date: '2024-03-08',
      time: '10:15'
    }
  ];

  // Cursos disponibles para asignar
  const availableCourses = [
    { id: 4, title: 'Geometría Analítica', category: 'Matemáticas' },
    { id: 5, title: 'Probabilidad Avanzada', category: 'Estadística' },
    { id: 6, title: 'Matemáticas Discretas', category: 'Matemáticas' }
  ];

  // Grupos disponibles
  const availableGroups = [
    { id: 3, name: 'Grupo B', color: '#f59e0b' },
    { id: 4, name: 'Estudiantes VIP', color: '#8b5cf6' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'in-progress': return '#f59e0b';
      case 'not-started': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'in-progress': return 'En Progreso';
      case 'not-started': return 'No Iniciado';
      default: return status;
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'lesson_completed': return <CheckCircle size={16} />;
      case 'assignment_submitted': return <BookOpen size={16} />;
      case 'quiz_completed': return <Award size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const CourseModal = () => (
    <div className="modal-overlay" onClick={() => setShowCourseModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Asignar Cursos</h3>
          <button className="modal-close" onClick={() => setShowCourseModal(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <div className="available-items">
            {availableCourses.map(course => (
              <div key={course.id} className="item-option">
                <div>
                  <h4>{course.title}</h4>
                  <p>{course.category}</p>
                </div>
                <button className="btn-add">
                  <Plus size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={() => setShowCourseModal(false)}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );

  const GroupModal = () => (
    <div className="modal-overlay" onClick={() => setShowGroupModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Asignar a Grupos</h3>
          <button className="modal-close" onClick={() => setShowGroupModal(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <div className="available-items">
            {availableGroups.map(group => (
              <div key={group.id} className="item-option">
                <div className="group-info">
                  <div 
                    className="group-color-indicator" 
                    style={{ backgroundColor: group.color }}
                  ></div>
                  <h4>{group.name}</h4>
                </div>
                <button className="btn-add">
                  <Plus size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={() => setShowGroupModal(false)}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <StyledWrapper>
      <div className="student-detail">
        {/* Header */}
        <div className="detail-header">
          <button className="back-btn" onClick={onBack}>
            <ArrowLeft size={20} />
            Volver a Estudiantes
          </button>
          
          <div className="student-info-header">
            <div className="student-avatar-large">
              <img src={student.avatar} alt={student.name} />
              <div className="status-indicator active"></div>
            </div>
            <div className="student-details">
              <h1>{student.name}</h1>
              <div className="contact-info">
                <div className="info-item">
                  <Mail size={16} />
                  <span>{student.email}</span>
                </div>
                <div className="info-item">
                  <Phone size={16} />
                  <span>{student.phone}</span>
                </div>
                <div className="info-item">
                  <Calendar size={16} />
                  <span>Miembro desde {student.joinDate}</span>
                </div>
              </div>
            </div>
            <div className="header-actions">
              <button className="btn-edit" onClick={() => onEdit(student.id)}>
                <Edit3 size={20} />
                Editar
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon courses">
              <BookOpen size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{student.totalCourses}</div>
              <div className="stat-label">Cursos Totales</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon completed">
              <CheckCircle size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{student.completedCourses}</div>
              <div className="stat-label">Completados</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon gpa">
              <Award size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{student.gpa}</div>
              <div className="stat-label">Promedio GPA</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon groups">
              <Users size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{studentGroups.length}</div>
              <div className="stat-label">Grupos</div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="tabs-nav">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Resumen
          </button>
          <button 
            className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            Cursos
          </button>
          <button 
            className={`tab-btn ${activeTab === 'groups' ? 'active' : ''}`}
            onClick={() => setActiveTab('groups')}
          >
            Grupos
          </button>
          <button 
            className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            Actividad
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-content">
              <div className="content-grid">
                <div className="info-section">
                  <h3>Información Personal</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Fecha de Nacimiento</label>
                      <span>{student.birthDate}</span>
                    </div>
                    <div className="info-item">
                      <label>Dirección</label>
                      <span>{student.address}</span>
                    </div>
                    <div className="info-item">
                      <label>Contacto de Emergencia</label>
                      <span>{student.emergencyContact}</span>
                    </div>
                    <div className="info-item">
                      <label>Última Actividad</label>
                      <span>{student.lastActivity}</span>
                    </div>
                  </div>
                </div>

                <div className="activity-summary">
                  <h3>Actividad Reciente</h3>
                  <div className="activity-list">
                    {recentActivity.slice(0, 5).map(activity => (
                      <div key={activity.id} className="activity-item">
                        <div className="activity-icon">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="activity-content">
                          <p>{activity.description}</p>
                          <div className="activity-meta">
                            <span>{activity.course}</span>
                            <span>{activity.date} - {activity.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="courses-content">
              <div className="section-header">
                <h3>Cursos del Estudiante</h3>
                <button className="btn-assign" onClick={() => setShowCourseModal(true)}>
                  <Plus size={16} />
                  Asignar Curso
                </button>
              </div>
              
              <div className="courses-list">
                {studentCourses.map(course => (
                  <div key={course.id} className="course-item">
                    <div className="course-info">
                      <h4>{course.title}</h4>
                      <div className="course-meta">
                        <span className="course-status" style={{ color: getStatusColor(course.status) }}>
                          {getStatusText(course.status)}
                        </span>
                        <span>Calificación: {course.grade}/10</span>
                        <span>Tiempo: {course.timeSpent}</span>
                      </div>
                    </div>
                    
                    <div className="course-progress">
                      <div className="progress-info">
                        <span>Progreso: {course.progress}%</span>
                        <span>{course.lessonsCompleted}/{course.totalLessons} lecciones</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="course-actions">
                      <button className="btn-remove">
                        <Minus size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'groups' && (
            <div className="groups-content">
              <div className="section-header">
                <h3>Grupos del Estudiante</h3>
                <button className="btn-assign" onClick={() => setShowGroupModal(true)}>
                  <Plus size={16} />
                  Asignar a Grupo
                </button>
              </div>
              
              <div className="groups-list">
                {studentGroups.map(group => (
                  <div key={group.id} className="group-item">
                    <div className="group-header">
                      <div className="group-color" style={{ backgroundColor: group.color }}></div>
                      <div className="group-info">
                        <h4>{group.name}</h4>
                        <p>Miembro desde {group.joinDate}</p>
                      </div>
                    </div>
                    
                    <div className="group-permissions">
                      <h5>Permisos:</h5>
                      <div className="permissions-list">
                        {group.permissions.map((permission, index) => (
                          <span key={index} className="permission-tag">
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="group-actions">
                      <button className="btn-remove">
                        <Minus size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="activity-content">
              <h3>Historial de Actividad</h3>
              <div className="activity-timeline">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="timeline-item">
                    <div className="timeline-marker">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="timeline-content">
                      <h4>{activity.description}</h4>
                      <div className="timeline-meta">
                        <span className="course-name">{activity.course}</span>
                        <span className="activity-time">{activity.date} - {activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modals */}
        {showCourseModal && <CourseModal />}
        {showGroupModal && <GroupModal />}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .student-detail {
    padding: 0;
  }

  .detail-header {
    margin-bottom: 2rem;
  }

  .back-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    color: #3b82f6;
    cursor: pointer;
    font-weight: 500;
    margin-bottom: 1.5rem;
    transition: color 0.3s ease;
  }

  .back-btn:hover {
    color: #2563eb;
  }

  .student-info-header {
    display: flex;
    gap: 2rem;
    align-items: flex-start;
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .student-avatar-large {
    position: relative;
  }

  .student-avatar-large img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
  }

  .status-indicator {
    position: absolute;
    bottom: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 4px solid white;
  }

  .status-indicator.active {
    background: #10b981;
  }

  .student-details {
    flex: 1;
  }

  .student-details h1 {
    color: #2c3e50;
    margin-bottom: 1rem;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .info-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #64748b;
    font-size: 0.95rem;
  }

  .info-item svg {
    color: #3b82f6;
  }

  .header-actions {
    display: flex;
    align-items: flex-start;
  }

  .btn-edit {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-edit:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }

  /* Stats Grid */
  .stats-grid {
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
  .stat-icon.completed { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
  .stat-icon.gpa { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
  .stat-icon.groups { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }

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

  /* Tabs */
  .tabs-nav {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid #e2e8f0;
  }

  .tab-btn {
    padding: 1rem 2rem;
    background: none;
    border: none;
    cursor: pointer;
    font-weight: 500;
    color: #64748b;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;
  }

  .tab-btn.active {
    color: #3b82f6;
    border-bottom-color: #3b82f6;
  }

  .tab-btn:hover {
    color: #3b82f6;
  }

  .tab-content {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  /* Overview Content */
  .content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .info-section h3,
  .activity-summary h3 {
    color: #2c3e50;
    margin-bottom: 1.5rem;
  }

  .info-grid {
    display: grid;
    gap: 1rem;
  }

  .info-grid .info-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .info-grid .info-item label {
    font-weight: 600;
    color: #374151;
  }

  .info-grid .info-item span {
    color: #64748b;
  }

  .activity-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .activity-item {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 8px;
  }

  .activity-icon {
    color: #3b82f6;
    flex-shrink: 0;
    margin-top: 0.25rem;
  }

  .activity-content p {
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .activity-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.85rem;
    color: #64748b;
  }

  /* Courses Content */
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .section-header h3 {
    color: #2c3e50;
    margin: 0;
  }

  .btn-assign {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-assign:hover {
    background: #2563eb;
    transform: translateY(-2px);
  }

  .courses-list,
  .groups-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .course-item,
  .group-item {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 12px;
    border: 2px solid transparent;
    transition: all 0.3s ease;
  }

  .course-item:hover,
  .group-item:hover {
    background: #f1f5f9;
    border-color: #3b82f6;
  }

  .course-info {
    flex: 1;
  }

  .course-info h4 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .course-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.9rem;
    color: #64748b;
  }

  .course-status {
    font-weight: 600;
  }

  .course-progress {
    flex: 1;
  }

  .progress-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: #64748b;
  }

  .progress-bar {
    height: 8px;
    background: #e2e8f0;
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #3b82f6, #10b981);
    transition: width 0.3s ease;
  }

  .course-actions,
  .group-actions {
    display: flex;
    gap: 0.5rem;
  }

  .btn-remove {
    padding: 0.5rem;
    background: #fee2e2;
    color: #ef4444;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-remove:hover {
    background: #fecaca;
  }

  /* Groups Content */
  .group-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
  }

  .group-color {
    width: 4px;
    height: 40px;
    border-radius: 2px;
  }

  .group-info h4 {
    color: #2c3e50;
    margin-bottom: 0.25rem;
  }

  .group-info p {
    color: #64748b;
    font-size: 0.9rem;
  }

  .group-permissions {
    flex: 1;
  }

  .group-permissions h5 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .permissions-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .permission-tag {
    background: #e2e8f0;
    color: #475569;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  /* Activity Timeline */
  .activity-timeline {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .timeline-item {
    display: flex;
    gap: 1.5rem;
  }

  .timeline-marker {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    background: #3b82f6;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .timeline-content {
    flex: 1;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e2e8f0;
  }

  .timeline-content h4 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .timeline-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.9rem;
    color: #64748b;
  }

  .course-name {
    font-weight: 500;
  }

  /* Modals */
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
  }

  .modal-content {
    background: white;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #e2e8f0;
  }

  .modal-header h3 {
    color: #2c3e50;
    margin: 0;
  }

  .modal-close {
    background: none;
    border: none;
    cursor: pointer;
    color: #64748b;
    transition: color 0.3s ease;
  }

  .modal-close:hover {
    color: #374151;
  }

  .modal-body {
    padding: 1.5rem;
  }

  .available-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .item-option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 8px;
    transition: background 0.3s ease;
  }

  .item-option:hover {
    background: #f1f5f9;
  }

  .item-option h4 {
    color: #2c3e50;
    margin-bottom: 0.25rem;
  }

  .item-option p {
    color: #64748b;
    font-size: 0.9rem;
  }

  .group-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .group-color-indicator {
    width: 16px;
    height: 16px;
    border-radius: 50%;
  }

  .btn-add {
    padding: 0.5rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-add:hover {
    background: #2563eb;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1.5rem;
    border-top: 1px solid #e2e8f0;
  }

  .btn-cancel {
    padding: 0.75rem 1.5rem;
    background: #f8fafc;
    color: #475569;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-cancel:hover {
    background: #e2e8f0;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .student-info-header {
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      text-align: center;
    }

    .content-grid {
      grid-template-columns: 1fr;
    }

    .course-item,
    .group-item {
      flex-direction: column;
      align-items: stretch;
      gap: 1rem;
    }

    .course-meta {
      flex-direction: column;
      gap: 0.5rem;
    }

    .tabs-nav {
      overflow-x: auto;
      white-space: nowrap;
    }

    .tab-btn {
      flex-shrink: 0;
    }
  }
`;

export default StudentDetail;
