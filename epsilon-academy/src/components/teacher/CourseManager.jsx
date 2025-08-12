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

const CourseManager = ({ viewMode = 'cards', filters = {}, onCreateCourse, onEditCourse }) => {
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

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
    const searchText = filters.search || '';
    const statusFilter = filters.status || 'all';
    const categoryFilter = filters.category || 'all';
    
    const matchesSearch = course.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || course.category.toLowerCase().includes(categoryFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesCategory;
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
        {/* Courses Display */}
        <div className={`courses-container ${viewMode}`}>
          {viewMode === 'cards' ? (
            // Vista de Tarjetas
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
          ) : (
            // Vista de Lista
            <div className="courses-list">
              <div className="list-header">
                <div className="col-course">Curso</div>
                <div className="col-category">Categoría</div>
                <div className="col-students">Estudiantes</div>
                <div className="col-lessons">Lecciones</div>
                <div className="col-price">Precio</div>
                <div className="col-status">Estado</div>
                <div className="col-actions">Acciones</div>
              </div>
              {filteredCourses.map(course => (
                <div key={course.id} className={`list-row ${course.status}`}>
                  <div className="col-course">
                    <div className="course-info-compact">
                      <div className="course-thumbnail">
                        <img src={course.image} alt={course.title} />
                      </div>
                      <div>
                        <h4>{course.title}</h4>
                        <span className="creation-date">
                          {new Date(course.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-category">{course.category}</div>
                  <div className="col-students">
                    <div className="students-info">
                      <Users size={14} />
                      <span>{course.students}</span>
                    </div>
                  </div>
                  <div className="col-lessons">
                    <div className="lessons-info">
                      <PlayCircle size={14} />
                      <span>{course.lessons}</span>
                    </div>
                  </div>
                  <div className="col-price">
                    <span className="price-badge">${course.price}</span>
                  </div>
                  <div className="col-status">
                    <span 
                      className="status-badge compact"
                      style={{ backgroundColor: getStatusColor(course.status) }}
                    >
                      {getStatusText(course.status)}
                    </span>
                  </div>
                  <div className="col-actions">
                    <div className="action-buttons">
                      <button 
                        className="action-btn edit"
                        onClick={() => onEditCourse(course.id)}
                        title="Editar"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button 
                        className="action-btn preview"
                        title="Vista previa"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {filteredCourses.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>No se encontraron cursos</h3>
            <p>
              {filters.search || filters.status !== 'all' 
                ? 'Intenta cambiar los filtros de búsqueda'
                : 'Comienza creando tu primer curso'
              }
            </p>
            {!filters.search && filters.status === 'all' && (
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
    display: grid !important;
    gap: 1.5rem !important;
    margin-bottom: 2rem;
    width: 100% !important;
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

    svg {
      flex-shrink: 0;
    }
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

    svg {
      flex-shrink: 0;
    }
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

  /* Vista de Lista */
  .courses-container.list .courses-list {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .list-header {
    display: grid;
    grid-template-columns: 2.5fr 1fr 1fr 1fr 1fr 1fr 1fr;
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
    grid-template-columns: 2.5fr 1fr 1fr 1fr 1fr 1fr 1fr;
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

  .course-info-compact {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .course-thumbnail {
    width: 50px;
    height: 35px;
    border-radius: 6px;
    overflow: hidden;
  }

  .course-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .course-info-compact h4 {
    margin: 0 0 0.25rem 0;
    font-size: 0.95rem;
    color: #2c3e50;
  }

  .course-info-compact .creation-date {
    font-size: 0.8rem;
    color: #64748b;
  }

  .students-info, .lessons-info {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: #64748b;
  }

  .price-badge {
    background: #dcfce7;
    color: #166534;
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

    svg {
      flex-shrink: 0;
    }
  }

  .action-btn:hover {
    background: #f1f5f9;
  }

  .action-btn.edit { color: #f59e0b; }
  .action-btn.preview { color: #3b82f6; }

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

    .courses-container.cards .courses-grid {
      grid-template-columns: 1fr;
    }
  }
`;

export default CourseManager;
