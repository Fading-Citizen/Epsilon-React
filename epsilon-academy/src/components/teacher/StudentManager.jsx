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

const StudentManager = ({ onCreateStudent, onEditStudent, onViewStudent, onManageGroups }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterGroup, setFilterGroup] = useState('all');

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
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    const matchesGroup = filterGroup === 'all' || student.groups.some(group => group === filterGroup);
    
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

  const stats = {
    total: students.length,
    active: students.filter(s => s.status === 'active').length,
    inactive: students.filter(s => s.status === 'inactive').length,
    pending: students.filter(s => s.status === 'pending').length
  };

  return (
    <StyledWrapper>
      <div className="student-manager">
        {/* Header */}
        <div className="manager-header">
          <div className="header-left">
            <h2>Gestión de Estudiantes</h2>
            <p>Administra estudiantes, grupos y permisos</p>
          </div>
          <div className="header-actions">
            <button className="create-group-btn" onClick={onManageGroups}>
              <Users size={20} />
              Gestionar Grupos
            </button>
            <button className="create-student-btn" onClick={onCreateStudent}>
              <Plus size={20} />
              Nuevo Estudiante
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon total">
              <Users size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Total Estudiantes</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon active">
              <UserPlus size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.active}</div>
              <div className="stat-label">Activos</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon inactive">
              <UserMinus size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.inactive}</div>
              <div className="stat-label">Inactivos</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon pending">
              <Calendar size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.pending}</div>
              <div className="stat-label">Pendientes</div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="filters-section">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Buscar estudiantes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filters">
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
              <option value="pending">Pendientes</option>
            </select>

            <select 
              value={filterGroup} 
              onChange={(e) => setFilterGroup(e.target.value)}
              className="filter-select"
            >
              <option value="all">Todos los grupos</option>
              {groups.map(group => (
                <option key={group.id} value={group.name}>{group.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Students Grid */}
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
                  className="btn-groups"
                  title="Gestionar grupos"
                >
                  <Users size={16} />
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

        {filteredStudents.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <h3>No se encontraron estudiantes</h3>
            <p>
              {searchTerm || filterStatus !== 'all' || filterGroup !== 'all'
                ? 'Intenta cambiar los filtros de búsqueda'
                : 'Comienza agregando tu primer estudiante'
              }
            </p>
            {!searchTerm && filterStatus === 'all' && filterGroup === 'all' && (
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

  .manager-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e2e8f0;
  }

  .header-left h2 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .header-left p {
    color: #64748b;
    margin: 0;
  }

  .header-actions {
    display: flex;
    gap: 1rem;
  }

  .create-student-btn, .create-group-btn {
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

  .create-student-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .create-group-btn {
    background: #f8fafc;
    color: #475569;
    border: 1px solid #e2e8f0;
  }

  .create-student-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }

  .create-group-btn:hover {
    background: #e2e8f0;
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

  .stat-icon.total { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
  .stat-icon.active { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
  .stat-icon.inactive { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
  .stat-icon.pending { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }

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
  .students-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
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

  .btn-groups {
    background: #fef3c7;
    color: #f59e0b;
  }

  .btn-groups:hover {
    background: #fde68a;
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
    .manager-header {
      flex-direction: column;
      gap: 1rem;
      align-items: stretch;
    }

    .header-actions {
      justify-content: stretch;
    }

    .header-actions button {
      flex: 1;
    }

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
`;

export default StudentManager;
