import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Users, 
  PlayCircle,
  Clock,
  DollarSign,
  Star,
  Search,
  Filter
} from 'lucide-react';

const CourseManager = ({ onCreateCourse, onEditCourse }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Datos de ejemplo de cursos
  const courses = [
    {
      id: 1,
      title: 'Cálculo Diferencial Avanzado',
      description: 'Curso completo de cálculo diferencial con aplicaciones prácticas',
      image: '/api/placeholder/300/200',
      category: 'Matemáticas',
      status: 'published',
      students: 125,
      rating: 4.8,
      lessons: 24,
      duration: '8 semanas',
      createdAt: '2024-01-15',
      lastUpdated: '2024-02-10'
    },
    {
      id: 2,
      title: 'Álgebra Linear Aplicada',
      description: 'Fundamentos de álgebra linear con enfoque en aplicaciones',
      image: '/api/placeholder/300/200',
      category: 'Matemáticas',
      status: 'draft',
      students: 0,
      rating: 0,
      lessons: 18,
      duration: '6 semanas',
      createdAt: '2024-02-01',
      lastUpdated: '2024-02-15'
    },
    {
      id: 3,
      title: 'Física Cuántica Básica',
      description: 'Introducción a los conceptos fundamentales de la física cuántica',
      image: '/api/placeholder/300/200',
      category: 'Física',
      status: 'published',
      students: 89,
      rating: 4.6,
      lessons: 30,
      duration: '10 semanas',
      createdAt: '2024-01-20',
      lastUpdated: '2024-02-08'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || course.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return '#10b981';
      case 'draft': return '#f59e0b';
      case 'archived': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'published': return 'Publicado';
      case 'draft': return 'Borrador';
      case 'archived': return 'Archivado';
      default: return status;
    }
  };

  return (
    <StyledWrapper>
      <div className="course-manager">
        {/* Header */}
        <div className="manager-header">
          <div className="header-left">
            <h2>Gestión de Cursos</h2>
            <p>Administra todos tus cursos desde aquí</p>
          </div>
          <button className="create-course-btn" onClick={onCreateCourse}>
            <Plus size={20} />
            Crear Nuevo Curso
          </button>
        </div>

        {/* Filters and Search */}
        <div className="filters-section">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Buscar cursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-dropdown">
            <Filter size={20} />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">Todos los estados</option>
              <option value="published">Publicados</option>
              <option value="draft">Borradores</option>
              <option value="archived">Archivados</option>
            </select>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="courses-grid">
          {filteredCourses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-image">
                <img src={course.image} alt={course.title} />
                <div className="course-status">
                  <span 
                    className="status-badge" 
                    style={{ backgroundColor: getStatusColor(course.status) }}
                  >
                    {getStatusText(course.status)}
                  </span>
                </div>
              </div>

              <div className="course-content">
                <div className="course-header">
                  <h3>{course.title}</h3>
                  <span className="course-category">{course.category}</span>
                </div>

                <p className="course-description">{course.description}</p>

                <div className="course-stats">
                  <div className="stat-item">
                    <Users size={16} />
                    <span>{course.students} estudiantes</span>
                  </div>
                  <div className="stat-item">
                    <PlayCircle size={16} />
                    <span>{course.lessons} lecciones</span>
                  </div>
                  <div className="stat-item">
                    <Clock size={16} />
                    <span>{course.duration}</span>
                  </div>
                  {course.rating > 0 && (
                    <div className="stat-item">
                      <Star size={16} />
                      <span>{course.rating}</span>
                    </div>
                  )}
                </div>

                <div className="course-info">
                  <span className="last-updated">
                    Actualizado: {new Date(course.lastUpdated).toLocaleDateString()}
                  </span>
                </div>

                <div className="course-actions">
                  <button 
                    className="action-btn edit"
                    onClick={() => onEditCourse(course.id)}
                    title="Editar curso"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button 
                    className="action-btn preview"
                    title="Vista previa"
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    className="action-btn delete"
                    title="Eliminar curso"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>No se encontraron cursos</h3>
            <p>
              {searchTerm || filterStatus !== 'all' 
                ? 'Intenta cambiar los filtros de búsqueda'
                : 'Comienza creando tu primer curso'
              }
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <button className="create-first-course" onClick={onCreateCourse}>
                <Plus size={20} />
                Crear mi primer curso
              </button>
            )}
          </div>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .course-manager {
    max-width: 1200px;
    margin: 0 auto;
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

  .create-course-btn {
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
    transition: all 0.3s ease;
  }

  .create-course-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(26, 188, 156, 0.3);
  }

  /* Filters Section */
  .filters-section {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .search-box, .filter-dropdown {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: white;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    color: #64748b;
  }

  .search-box {
    flex: 1;
    max-width: 400px;
  }

  .search-box input {
    border: none;
    outline: none;
    flex: 1;
    background: transparent;
    color: #2c3e50;
  }

  .filter-dropdown select {
    border: none;
    outline: none;
    background: transparent;
    color: #2c3e50;
    cursor: pointer;
  }

  /* Courses Grid */
  .courses-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .course-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border: 1px solid #e2e8f0;
  }

  .course-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    border-color: #1abc9c;
  }

  .course-image {
    position: relative;
    height: 200px;
    overflow: hidden;
  }

  .course-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .course-status {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .status-badge {
    background: #10b981;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .course-content {
    padding: 1.5rem;
  }

  .course-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .course-header h3 {
    color: #2c3e50;
    margin: 0;
    line-height: 1.3;
  }

  .course-category {
    background: #f1f5f9;
    color: #475569;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .course-description {
    color: #64748b;
    margin-bottom: 1rem;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .course-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #64748b;
    font-size: 0.9rem;
  }

  .course-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #e2e8f0;
  }

  .last-updated {
    font-size: 0.8rem;
    color: #94a3b8;
  }

  .course-actions {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
  }

  .action-btn {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .action-btn.edit {
    background: #3b82f6;
    color: white;
  }

  .action-btn.preview {
    background: #f59e0b;
    color: white;
  }

  .action-btn.delete {
    background: #ef4444;
    color: white;
  }

  .action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }

  /* Empty State */
  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
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

  .create-first-course {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, #1abc9c 0%, #16a085 100%);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .create-first-course:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(26, 188, 156, 0.3);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .manager-header {
      flex-direction: column;
      align-items: stretch;
      gap: 1rem;
    }

    .filters-section {
      flex-direction: column;
    }

    .courses-grid {
      grid-template-columns: 1fr;
    }

    .course-header {
      flex-direction: column;
      align-items: stretch;
      gap: 0.5rem;
    }

    .course-stats {
      justify-content: space-between;
    }
  }
`;

export default CourseManager;
