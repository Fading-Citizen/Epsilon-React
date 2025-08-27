import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Users, 
  BookOpen,
  Search,
  User,
  Filter,
  Mail,
  Phone,
  Calendar,
  Award,
  Settings,
  UserPlus,
  UserMinus
} from 'lucide-react';

const StudentManager = ({ viewMode = 'cards', filters = {}, onCreateStudent, onEditStudent, onViewStudent, onManageGroups }) => {
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Datos de ejemplo de estudiantes
  const students = [
    {
      id: 1,
      name: 'Ana García López',
      email: 'ana.garcia@email.com',
      phone: '+34 612 345 678',
      avatar: '/api/placeholder/100/100',
      status: 'active',
      enrolledCourses: 3,
      completedCourses: 1,
      groups: ['Matemáticas Avanzadas', 'Grupo A'],
      progress: 75,
      joinDate: '2024-01-15',
      lastActivity: '2024-03-10',
      gpa: 8.5
    },
    {
      id: 2,
      name: 'Carlos Rodríguez Silva',
      email: 'carlos.rodriguez@email.com',
      phone: '+34 623 456 789',
      avatar: '/api/placeholder/100/100',
      status: 'active',
      enrolledCourses: 2,
      completedCourses: 2,
      groups: ['Grupo B'],
      progress: 90,
      joinDate: '2024-02-01',
      lastActivity: '2024-03-12',
      gpa: 9.2
    },
    {
      id: 3,
      name: 'María Fernández Torres',
      email: 'maria.fernandez@email.com',
      phone: '+34 634 567 890',
      avatar: '/api/placeholder/100/100',
      status: 'inactive',
      enrolledCourses: 1,
      completedCourses: 0,
      groups: ['Grupo A'],
      progress: 25,
      joinDate: '2024-01-20',
      lastActivity: '2024-02-28',
      gpa: 6.5
    },
    {
      id: 4,
      name: 'David López Martín',
      email: 'david.lopez@email.com',
      phone: '+34 645 678 901',
      avatar: '/api/placeholder/100/100',
      status: 'pending',
      enrolledCourses: 0,
      completedCourses: 0,
      groups: [],
      progress: 0,
      joinDate: '2024-03-01',
      lastActivity: '2024-03-01',
      gpa: 0
    }
  ];

  // Datos de ejemplo de grupos
  const groups = [
    { id: 1, name: 'Matemáticas Avanzadas', studentCount: 25, color: '#3b82f6' },
    { id: 2, name: 'Grupo A', studentCount: 15, color: '#10b981' },
    { id: 3, name: 'Grupo B', studentCount: 18, color: '#f59e0b' }
  ];

  const filteredStudents = students.filter(student => {
    const searchText = filters.search || '';
    const statusFilter = filters.status || 'all';
    const groupFilter = filters.group || 'all';
    
    const matchesSearch = student.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    const matchesGroup = groupFilter === 'all' || student.groups.some(group => group === groupFilter);
    
    return matchesSearch && matchesStatus && matchesGroup;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'inactive': return '#ef4444';
      case 'pending': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'inactive': return 'Inactivo';
      case 'pending': return 'Pendiente';
      default: return status;
    }
  };

  return (
    <StyledWrapper>
      <div className="student-manager">
        {/* Students Display */}
        <div className={`students-container ${viewMode}`}>
          {viewMode === 'cards' ? (
            // Vista de Tarjetas
            <div className="students-grid">
              {filteredStudents.map(student => (
                <div key={student.id} className="student-card">
                  <div className="student-header">
                    <div className="student-avatar">
                      <User size={24} color="white" />
                      <div 
                        className="status-indicator" 
                        style={{ backgroundColor: getStatusColor(student.status) }}
                      ></div>
                    </div>
                    <div className="student-info">
                      <h4>{student.name}</h4>
                      <p className="student-email">{student.email}</p>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(student.status) }}
                  >
                    {getStatusText(student.status)}
                  </span>
                </div>
              </div>

              <div className="student-stats">
                <div className="stat-item">
                  <BookOpen size={16} />
                  <span>{student.enrolledCourses} cursos</span>
                </div>
                <div className="stat-item">
                  <Award size={16} />
                  <span>GPA: {student.gpa}</span>
                </div>
                <div className="stat-item">
                  <Users size={16} />
                  <span>{student.groups.length} grupos</span>
                </div>
              </div>

              <div className="progress-section">
                <div className="progress-label">
                  <span>Progreso General</span>
                  <span>{student.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${student.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="student-groups">
                {student.groups.map((group, index) => (
                  <span key={index} className="group-tag">
                    {group}
                  </span>
                ))}
              </div>

              <div className="student-actions">
                <button 
                  className="btn-view"
                  onClick={() => onViewStudent(student.id)}
                  title="Ver detalles"
                >
                  <Eye size={16} />
                </button>
                <button 
                  className="btn-edit"
                  onClick={() => onEditStudent(student.id)}
                  title="Editar estudiante"
                >
                  <Edit3 size={16} />
                </button>
                <button 
                  className="btn-courses"
                  title="Gestionar cursos"
                >
                  <BookOpen size={16} />
                </button>
                <button 
                  className="btn-delete"
                  title="Eliminar estudiante"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
          ) : (
            // Vista de Lista
            <div className="students-list">
              <div className="list-header">
                <div className="col-student">Estudiante</div>
                <div className="col-email">Email</div>
                <div className="col-courses">Cursos</div>
                <div className="col-progress">Progreso</div>
                <div className="col-gpa">GPA</div>
                <div className="col-status">Estado</div>
                <div className="col-actions">Acciones</div>
              </div>
              {filteredStudents.map(student => (
                <div key={student.id} className={`list-row ${student.status}`}>
                  <div className="col-student">
                    <div className="student-info-compact">
                      <div className="student-avatar small">
                        <User size={16} color="white" />
                        <div 
                          className="status-indicator small" 
                          style={{ backgroundColor: getStatusColor(student.status) }}
                        ></div>
                      </div>
                      <div>
                        <h4>{student.name}</h4>
                        <span className="join-date">
                          {new Date(student.joinDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-email">{student.email}</div>
                  <div className="col-courses">
                    <div className="courses-info">
                      <BookOpen size={14} />
                      <span>{student.enrolledCourses}</span>
                    </div>
                  </div>
                  <div className="col-progress">
                    <div className="progress-compact">
                      <div className="progress-bar small">
                        <div 
                          className="progress-fill"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="progress-text">{student.progress}%</span>
                    </div>
                  </div>
                  <div className="col-gpa">
                    <span className="gpa-badge">{student.gpa}</span>
                  </div>
                  <div className="col-status">
                    <span 
                      className="status-badge compact"
                      style={{ backgroundColor: getStatusColor(student.status) }}
                    >
                      {getStatusText(student.status)}
                    </span>
                  </div>
                  <div className="col-actions">
                    <div className="action-buttons">
                      <button 
                        className="action-btn view"
                        onClick={() => onViewStudent && onViewStudent(student)}
                        title="Ver detalles"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        className="action-btn edit"
                        onClick={() => onEditStudent && onEditStudent(student)}
                        title="Editar"
                      >
                        <Edit3 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {filteredStudents.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <h3>No se encontraron estudiantes</h3>
            <p>
              {filters.search || filters.status !== 'all' || filters.group !== 'all'
                ? 'Intenta cambiar los filtros de búsqueda'
                : 'Comienza agregando tu primer estudiante'
              }
            </p>
            {!filters.search && filters.status === 'all' && filters.group === 'all' && (
              <button className="create-first-student" onClick={onCreateStudent}>
                <Plus size={20} />
                Agregar primer estudiante
              </button>
            )}
          </div>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .student-manager {
    padding: 0;
  }

  /* Filters */
  .filters-section {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .search-box {
    flex: 1;
    min-width: 300px;
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-box svg {
    position: absolute;
    left: 1rem;
    color: #64748b;
    z-index: 1;
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

  .filters {
    display: flex;
    gap: 1rem;
  }

  .filter-select {
    padding: 0.75rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: white;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .filter-select:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  /* Students Grid */
  .student-manager .students-container.cards .students-grid {
    display: grid !important;
    gap: 1.5rem !important;
    width: 100% !important;
  }

  

  .student-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border: 2px solid transparent;
  }

  .student-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    border-color: #3b82f6;
  }

  .student-header {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .student-avatar {
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3498db, #2980b9);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .student-avatar img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }

  .status-indicator {
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid white;
  }

  .student-info {
    flex: 1;
  }

  .student-info h4 {
    margin-bottom: 0.25rem;
    color: #2c3e50;
  }

  .student-email {
    color: #64748b;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .status-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    color: white;
  }

  .student-stats {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #64748b;
    font-size: 0.9rem;
  }

  .progress-section {
    margin-bottom: 1rem;
  }

  .progress-label {
    display: flex;
    justify-content: space-between;
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
    background: linear-gradient(90deg, #3b82f6, #10b981);
    transition: width 0.3s ease;
  }

  .student-groups {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .group-tag {
    background: #f1f5f9;
    color: #475569;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .student-actions {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
  }

  .student-actions button {
    padding: 0.5rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-view {
    background: #f1f5f9;
    color: #475569;
  }

  .btn-view:hover {
    background: #e2e8f0;
  }

  .btn-edit {
    background: #dbeafe;
    color: #3b82f6;
  }

  .btn-edit:hover {
    background: #bfdbfe;
  }

  .btn-courses {
    background: #d1fae5;
    color: #10b981;
  }

  .btn-courses:hover {
    background: #a7f3d0;
  }

  .btn-delete {
    background: #fee2e2;
    color: #ef4444;
  }

  .btn-delete:hover {
    background: #fecaca;
  }

  /* Empty State */
  .empty-state {
    text-align: center;
    padding: 3rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .empty-state h3 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .empty-state p {
    color: #64748b;
    margin-bottom: 2rem;
  }

  .create-first-student {
    display: inline-flex;
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

  .create-first-student:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .filters-section {
      flex-direction: column;
    }

    .filters {
      flex-direction: column;
    }

    .students-grid {
      grid-template-columns: 1fr;
    }

    .student-stats {
      justify-content: space-between;
    }

    .student-actions {
      justify-content: center;
    }
  }

  /* Vista de Lista */
  .students-container.list .students-list {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .list-header {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr 1fr 1fr 1fr 1fr;
    gap: 1rem;
    padding: 1rem 1.5rem;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    font-weight: 600;
    color: #2c3e50;
    font-size: 0.9rem;
  }

  .list-row {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr 1fr 1fr 1fr 1fr;
    gap: 1rem;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #f1f5f9;
    align-items: center;
    transition: background 0.2s ease;
  }

  .list-row:hover {
    background: #f8fafc;
  }

  .list-row:last-child {
    border-bottom: none;
  }

  .student-info-compact {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .student-avatar.small {
    width: 40px;
    height: 40px;
  }

  .student-info-compact h4 {
    margin: 0 0 0.25rem 0;
    font-size: 0.95rem;
    color: #2c3e50;
  }

  .student-info-compact .join-date {
    font-size: 0.8rem;
    color: #64748b;
  }

  .status-indicator.small {
    width: 8px;
    height: 8px;
  }

  .courses-info {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: #64748b;
  }

  .progress-compact {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .progress-bar.small {
    height: 6px;
    flex: 1;
    min-width: 60px;
  }

  .progress-text {
    font-size: 0.8rem;
    color: #64748b;
    min-width: 35px;
  }

  .gpa-badge {
    background: #e0f2fe;
    color: #0369a1;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .status-badge.compact {
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    color: white;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .action-buttons {
    display: flex;
    gap: 0.25rem;
  }

  .action-btn {
    padding: 0.5rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .action-btn:hover {
    background: #f1f5f9;
  }

  .action-btn.view { color: #3b82f6; }
  .action-btn.edit { color: #f59e0b; }

  /* Responsive para vista de lista */
  @media (max-width: 768px) {
    .list-header,
    .list-row {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }

    .list-header {
      display: none;
    }

    .list-row {
      display: block;
      padding: 1rem;
    }

    .student-manager .students-container.cards .students-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;

export default StudentManager;
