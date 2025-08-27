import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Users, 
  UserPlus,
  UserMinus,
  Settings,
  Shield,
  BookOpen,
  Award,
  Search,
  X,
  Check
} from 'lucide-react';

const GroupManager = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('groups');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [showStudentsModal, setShowStudentsModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Datos de ejemplo de grupos
  const groups = [
    {
      id: 1,
      name: 'Matemáticas Avanzadas',
      description: 'Estudiantes de cursos de matemáticas de nivel avanzado',
      studentCount: 25,
      color: '#3b82f6',
      createdDate: '2024-01-15',
      permissions: {
        canAccessAdvancedContent: true,
        canDownloadMaterials: true,
        canParticipateInForums: true,
        canSubmitAssignments: true,
        canViewGrades: true,
        canAccessLiveClasses: true,
        canRequestTutoring: true,
        canAccessExtraResources: false
      },
      courses: ['Cálculo Diferencial', 'Álgebra Linear', 'Estadística']
    },
    {
      id: 2,
      name: 'Grupo A - Mañana',
      description: 'Estudiantes del turno mañana, grupo A',
      studentCount: 15,
      color: '#10b981',
      createdDate: '2024-02-01',
      permissions: {
        canAccessAdvancedContent: false,
        canDownloadMaterials: true,
        canParticipateInForums: true,
        canSubmitAssignments: true,
        canViewGrades: true,
        canAccessLiveClasses: true,
        canRequestTutoring: false,
        canAccessExtraResources: false
      },
      courses: ['Introducción a las Matemáticas']
    },
    {
      id: 3,
      name: 'Grupo B - Tarde',
      description: 'Estudiantes del turno tarde, grupo B',
      studentCount: 18,
      color: '#f59e0b',
      createdDate: '2024-02-01',
      permissions: {
        canAccessAdvancedContent: false,
        canDownloadMaterials: true,
        canParticipateInForums: true,
        canSubmitAssignments: true,
        canViewGrades: true,
        canAccessLiveClasses: false,
        canRequestTutoring: false,
        canAccessExtraResources: false
      },
      courses: ['Introducción a las Matemáticas', 'Geometría Básica']
    },
    {
      id: 4,
      name: 'Estudiantes VIP',
      description: 'Estudiantes con acceso premium y características especiales',
      studentCount: 8,
      color: '#8b5cf6',
      createdDate: '2024-01-10',
      permissions: {
        canAccessAdvancedContent: true,
        canDownloadMaterials: true,
        canParticipateInForums: true,
        canSubmitAssignments: true,
        canViewGrades: true,
        canAccessLiveClasses: true,
        canRequestTutoring: true,
        canAccessExtraResources: true
      },
      courses: ['Todos los cursos disponibles']
    }
  ];

  // Estudiantes disponibles para asignar
  const availableStudents = [
    {
      id: 1,
      name: 'Ana García López',
      email: 'ana.garcia@email.com',
      avatar: '/api/placeholder/50/50',
      currentGroups: [1, 2], // IDs de grupos actuales
      enrolledCourses: 3
    },
    {
      id: 2,
      name: 'Carlos Rodríguez Silva',
      email: 'carlos.rodriguez@email.com',
      avatar: '/api/placeholder/50/50',
      currentGroups: [2],
      enrolledCourses: 2
    },
    {
      id: 3,
      name: 'María Fernández Torres',
      email: 'maria.fernandez@email.com',
      avatar: '/api/placeholder/50/50',
      currentGroups: [2],
      enrolledCourses: 1
    },
    {
      id: 4,
      name: 'David López Martín',
      email: 'david.lopez@email.com',
      avatar: '/api/placeholder/50/50',
      currentGroups: [],
      enrolledCourses: 0
    },
    {
      id: 5,
      name: 'Sofia Ruiz García',
      email: 'sofia.ruiz@email.com',
      avatar: '/api/placeholder/50/50',
      currentGroups: [1],
      enrolledCourses: 2
    }
  ];

  const permissionLabels = {
    canAccessAdvancedContent: 'Acceder a contenido avanzado',
    canDownloadMaterials: 'Descargar materiales',
    canParticipateInForums: 'Participar en foros',
    canSubmitAssignments: 'Enviar tareas',
    canViewGrades: 'Ver calificaciones',
    canAccessLiveClasses: 'Acceder a clases en vivo',
    canRequestTutoring: 'Solicitar tutorías',
    canAccessExtraResources: 'Acceder a recursos extra'
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditPermissions = (group) => {
    setSelectedGroup(group);
    setShowPermissionsModal(true);
  };

  const handleManageStudents = (group) => {
    setSelectedGroup(group);
    setShowStudentsModal(true);
  };

  const handleAssignStudent = (studentId) => {
    if (selectedGroup) {
      console.log(`Asignando estudiante ${studentId} al grupo ${selectedGroup.id}`);
      // Aquí iría la lógica para asignar el estudiante al grupo
      // Por ahora solo mostramos en consola
    }
  };

  const handleRemoveStudent = (studentId) => {
    if (selectedGroup) {
      console.log(`Removiendo estudiante ${studentId} del grupo ${selectedGroup.id}`);
      // Aquí iría la lógica para remover el estudiante del grupo
    }
  };

  const getStudentsInGroup = (groupId) => {
    return availableStudents.filter(student => student.currentGroups.includes(groupId));
  };

  const getStudentsNotInGroup = (groupId) => {
    return availableStudents.filter(student => !student.currentGroups.includes(groupId));
  };

  const CreateGroupModal = () => (
    <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Crear Nuevo Grupo</h3>
          <button className="modal-close" onClick={() => setShowCreateModal(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Nombre del Grupo</label>
            <input type="text" placeholder="Ej: Matemáticas Nivel 1" />
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <textarea placeholder="Describe el propósito y características del grupo..."></textarea>
          </div>
          <div className="form-group">
            <label>Color del Grupo</label>
            <div className="color-picker">
              {['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06d6a0'].map(color => (
                <div 
                  key={color} 
                  className="color-option" 
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={() => setShowCreateModal(false)}>
            Cancelar
          </button>
          <button className="btn-create">
            Crear Grupo
          </button>
        </div>
      </div>
    </div>
  );

  const PermissionsModal = () => selectedGroup && (
    <div className="modal-overlay" onClick={() => setShowPermissionsModal(false)}>
      <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Permisos para "{selectedGroup.name}"</h3>
          <button className="modal-close" onClick={() => setShowPermissionsModal(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <div className="permissions-grid">
            {Object.entries(permissionLabels).map(([key, label]) => (
              <div key={key} className="permission-item">
                <div className="permission-info">
                  <span className="permission-label">{label}</span>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    defaultChecked={selectedGroup.permissions[key]}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={() => setShowPermissionsModal(false)}>
            Cancelar
          </button>
          <button className="btn-save">
            Guardar Permisos
          </button>
        </div>
      </div>
    </div>
  );

  const StudentsModal = () => selectedGroup && (
    <div className="modal-overlay" onClick={() => setShowStudentsModal(false)}>
      <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Estudiantes en "{selectedGroup.name}"</h3>
          <button className="modal-close" onClick={() => setShowStudentsModal(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <div className="students-section">
            {/* Estudiantes actuales en el grupo */}
            <div className="current-students">
              <h4>Estudiantes Actuales ({getStudentsInGroup(selectedGroup.id).length})</h4>
              <div className="students-list">
                {getStudentsInGroup(selectedGroup.id).map(student => (
                  <div key={student.id} className="student-item current">
                    <div className="student-info">
                      <img src={student.avatar} alt={student.name} className="student-avatar" />
                      <div className="student-details">
                        <h5>{student.name}</h5>
                        <p>{student.email}</p>
                        <span className="course-count">{student.enrolledCourses} cursos</span>
                      </div>
                    </div>
                    <button 
                      className="btn-remove-student"
                      onClick={() => handleRemoveStudent(student.id)}
                      title="Remover del grupo"
                    >
                      <UserMinus size={16} />
                    </button>
                  </div>
                ))}
                {getStudentsInGroup(selectedGroup.id).length === 0 && (
                  <div className="empty-students">
                    <p>No hay estudiantes asignados a este grupo</p>
                  </div>
                )}
              </div>
            </div>

            {/* Estudiantes disponibles para agregar */}
            <div className="available-students">
              <h4>Agregar Estudiantes ({getStudentsNotInGroup(selectedGroup.id).length} disponibles)</h4>
              <div className="students-list">
                {getStudentsNotInGroup(selectedGroup.id).map(student => (
                  <div key={student.id} className="student-item available">
                    <div className="student-info">
                      <img src={student.avatar} alt={student.name} className="student-avatar" />
                      <div className="student-details">
                        <h5>{student.name}</h5>
                        <p>{student.email}</p>
                        <span className="course-count">{student.enrolledCourses} cursos</span>
                        {student.currentGroups.length > 0 && (
                          <span className="current-groups">
                            En {student.currentGroups.length} grupo(s)
                          </span>
                        )}
                      </div>
                    </div>
                    <button 
                      className="btn-add-student"
                      onClick={() => handleAssignStudent(student.id)}
                      title="Agregar al grupo"
                    >
                      <UserPlus size={16} />
                    </button>
                  </div>
                ))}
                {getStudentsNotInGroup(selectedGroup.id).length === 0 && (
                  <div className="empty-students">
                    <p>Todos los estudiantes ya están en este grupo</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={() => setShowStudentsModal(false)}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <StyledWrapper>
      <div className="group-manager">
        {/* Header */}
        <div className="manager-header">
          <div className="header-left">
            <button className="back-btn" onClick={onBack}>
              ← Volver a Estudiantes
            </button>
            <h2>Gestión de Grupos</h2>
            <p>Organiza estudiantes en grupos y gestiona permisos masivos</p>
          </div>
          <button className="create-group-btn" onClick={() => setShowCreateModal(true)}>
            <Plus size={20} />
            Crear Grupo
          </button>
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-item">
            <Users size={24} />
            <div>
              <div className="stat-number">{groups.length}</div>
              <div className="stat-label">Total Grupos</div>
            </div>
          </div>
          <div className="stat-item">
            <UserPlus size={24} />
            <div>
              <div className="stat-number">{groups.reduce((acc, g) => acc + g.studentCount, 0)}</div>
              <div className="stat-label">Estudiantes Asignados</div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="search-section">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Buscar grupos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Groups Grid */}
        <div className="groups-grid">
          {filteredGroups.map(group => (
            <div key={group.id} className="group-card">
              <div className="group-header">
                <div 
                  className="group-color"
                  style={{ backgroundColor: group.color }}
                ></div>
                <div className="group-info">
                  <h4>{group.name}</h4>
                  <p>{group.description}</p>
                </div>
              </div>

              <div className="group-stats">
                <div className="stat">
                  <Users size={16} />
                  <span>{group.studentCount} estudiantes</span>
                </div>
                <div className="stat">
                  <BookOpen size={16} />
                  <span>{group.courses.length} cursos</span>
                </div>
              </div>

              <div className="permissions-preview">
                <h5>Permisos Activos:</h5>
                <div className="permissions-list">
                  {Object.entries(group.permissions)
                    .filter(([key, value]) => value)
                    .slice(0, 3)
                    .map(([key]) => (
                      <span key={key} className="permission-tag">
                        {permissionLabels[key]}
                      </span>
                    ))}
                  {Object.values(group.permissions).filter(Boolean).length > 3 && (
                    <span className="permission-tag more">
                      +{Object.values(group.permissions).filter(Boolean).length - 3} más
                    </span>
                  )}
                </div>
              </div>

              <div className="group-actions">
                <button 
                  className="btn-permissions"
                  onClick={() => handleEditPermissions(group)}
                >
                  <Shield size={16} />
                  Permisos
                </button>
                <button className="btn-edit">
                  <Edit3 size={16} />
                  Editar
                </button>
                <button 
                  className="btn-students"
                  onClick={() => handleManageStudents(group)}
                >
                  <UserPlus size={16} />
                  Estudiantes
                </button>
                <button className="btn-delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <h3>No se encontraron grupos</h3>
            <p>
              {searchTerm 
                ? 'Intenta cambiar el término de búsqueda'
                : 'Comienza creando tu primer grupo de estudiantes'
              }
            </p>
            {!searchTerm && (
              <button className="create-first-group" onClick={() => setShowCreateModal(true)}>
                <Plus size={20} />
                Crear primer grupo
              </button>
            )}
          </div>
        )}

        {/* Modals */}
        {showCreateModal && <CreateGroupModal />}
        {showPermissionsModal && <PermissionsModal />}
        {showStudentsModal && <StudentsModal />}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .group-manager {
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

  .back-btn {
    background: none;
    border: none;
    color: #3b82f6;
    cursor: pointer;
    font-weight: 500;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.3s ease;
  }

  .back-btn:hover {
    color: #2563eb;
  }

  .header-left h2 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .header-left p {
    color: #64748b;
    margin: 0;
  }

  .create-group-btn {
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

  .create-group-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }

  /* Stats Row */
  .stats-row {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .stat-item svg {
    color: #3b82f6;
  }

  .stat-number {
    font-size: 1.5rem;
    font-weight: bold;
    color: #2c3e50;
  }

  .stat-label {
    color: #64748b;
    font-size: 0.9rem;
  }

  /* Search */
  .search-section {
    margin-bottom: 2rem;
  }

  .search-box {
    position: relative;
    max-width: 400px;
  }

  .search-box svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
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

  /* Groups Grid */
  .groups-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 1.5rem;
  }

  .group-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border: 2px solid transparent;
  }

  .group-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    border-color: #3b82f6;
  }

  .group-header {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .group-color {
    width: 4px;
    border-radius: 2px;
    flex-shrink: 0;
  }

  .group-info h4 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .group-info p {
    color: #64748b;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  .group-stats {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1rem;
  }

  .stat {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #64748b;
    font-size: 0.9rem;
  }

  .permissions-preview {
    margin-bottom: 1.5rem;
  }

  .permissions-preview h5 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }

  .permissions-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .permission-tag {
    background: #f1f5f9;
    color: #475569;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .permission-tag.more {
    background: #e2e8f0;
    color: #64748b;
  }

  .group-actions {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
  }

  .group-actions button {
    padding: 0.5rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    gap: 0.25rem;
  }

  .btn-permissions {
    background: #ddd6fe;
    color: #8b5cf6;
  }

  .btn-permissions:hover {
    background: #c4b5fd;
  }

  .btn-edit {
    background: #dbeafe;
    color: #3b82f6;
  }

  .btn-edit:hover {
    background: #bfdbfe;
  }

  .btn-students {
    background: #d1fae5;
    color: #10b981;
  }

  .btn-students:hover {
    background: #a7f3d0;
  }

  .btn-delete {
    background: #fee2e2;
    color: #ef4444;
  }

  .btn-delete:hover {
    background: #fecaca;
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

  .modal-content.large {
    max-width: 700px;
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

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #2c3e50;
    font-weight: 500;
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .form-group textarea {
    resize: vertical;
    min-height: 100px;
  }

  .color-picker {
    display: flex;
    gap: 1rem;
  }

  .color-option {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .color-option:hover {
    transform: scale(1.1);
  }

  .permissions-grid {
    display: grid;
    gap: 1rem;
  }

  .permission-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 8px;
  }

  .permission-label {
    color: #2c3e50;
    font-weight: 500;
  }

  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
  }

  .toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 24px;
  }

  .toggle-slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .toggle-slider {
    background-color: #3b82f6;
  }

  input:checked + .toggle-slider:before {
    transform: translateX(26px);
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1.5rem;
    border-top: 1px solid #e2e8f0;
  }

  .btn-cancel,
  .btn-create,
  .btn-save {
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-cancel {
    background: #f8fafc;
    color: #475569;
    border: 1px solid #e2e8f0;
  }

  .btn-cancel:hover {
    background: #e2e8f0;
  }

  .btn-create,
  .btn-save {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
  }

  .btn-create:hover,
  .btn-save:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
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

  .create-first-group {
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

  .create-first-group:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }

  /* Students Modal Styles */
  .students-section {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .current-students,
  .available-students {
    background: #f8fafc;
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
  }

  .current-students h4,
  .available-students h4 {
    color: #2c3e50;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }

  .students-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-height: 300px;
    overflow-y: auto;
  }

  .student-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    border: 2px solid transparent;
    transition: all 0.3s ease;
  }

  .student-item:hover {
    border-color: #3b82f6;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .student-item.current {
    border-left: 4px solid #10b981;
  }

  .student-item.available {
    border-left: 4px solid #f59e0b;
  }

  .student-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
  }

  .student-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }

  .student-details h5 {
    color: #2c3e50;
    margin-bottom: 0.25rem;
    font-size: 1rem;
  }

  .student-details p {
    color: #64748b;
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }

  .course-count,
  .current-groups {
    font-size: 0.8rem;
    color: #6b7280;
    background: #f1f5f9;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    display: inline-block;
    margin-right: 0.5rem;
  }

  .current-groups {
    background: #fef3c7;
    color: #92400e;
  }

  .btn-add-student,
  .btn-remove-student {
    padding: 0.75rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-add-student {
    background: #d1fae5;
    color: #10b981;
  }

  .btn-add-student:hover {
    background: #a7f3d0;
    transform: scale(1.05);
  }

  .btn-remove-student {
    background: #fee2e2;
    color: #ef4444;
  }

  .btn-remove-student:hover {
    background: #fecaca;
    transform: scale(1.05);
  }

  .empty-students {
    text-align: center;
    padding: 2rem;
    color: #64748b;
    font-style: italic;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .manager-header {
      flex-direction: column;
      gap: 1rem;
      align-items: stretch;
    }

    .stats-row {
      flex-direction: column;
      gap: 1rem;
    }

    .groups-grid {
      grid-template-columns: 1fr;
    }

    .group-actions {
      justify-content: center;
      flex-wrap: wrap;
    }

    .modal-content {
      margin: 1rem;
      width: auto;
    }
  }
`;

export default GroupManager;
