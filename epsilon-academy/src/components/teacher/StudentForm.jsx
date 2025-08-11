import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  ArrowLeft,
  Save,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Users,
  BookOpen,
  Upload,
  X
} from 'lucide-react';

const StudentForm = ({ studentId, onBack, onSave }) => {
  const isEdit = !!studentId;
  
  const [formData, setFormData] = useState({
    // Información básica
    firstName: isEdit ? 'Ana' : '',
    lastName: isEdit ? 'García López' : '',
    email: isEdit ? 'ana.garcia@email.com' : '',
    phone: isEdit ? '+34 612 345 678' : '',
    birthDate: isEdit ? '1995-06-15' : '',
    
    // Información de contacto
    address: isEdit ? 'Calle Mayor 123' : '',
    city: isEdit ? 'Madrid' : '',
    country: isEdit ? 'España' : '',
    postalCode: isEdit ? '28001' : '',
    
    // Información académica
    studentId: isEdit ? 'EST-2024-001' : '',
    enrollmentDate: isEdit ? '2024-01-15' : '',
    status: isEdit ? 'active' : 'pending',
    
    // Contacto de emergencia
    emergencyContactName: isEdit ? 'María López' : '',
    emergencyContactPhone: isEdit ? '+34 612 987 654' : '',
    emergencyContactRelation: isEdit ? 'Madre' : '',
    
    // Configuración de cuenta
    sendWelcomeEmail: !isEdit,
    giveBasicPermissions: true,
    
    // Grupos y cursos iniciales
    initialGroups: isEdit ? ['1', '2'] : [],
    initialCourses: isEdit ? ['1', '2'] : []
  });

  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState('basic');

  // Datos para seleccionar
  const availableGroups = [
    { id: '1', name: 'Matemáticas Avanzadas', color: '#3b82f6' },
    { id: '2', name: 'Grupo A', color: '#10b981' },
    { id: '3', name: 'Grupo B', color: '#f59e0b' },
    { id: '4', name: 'Estudiantes VIP', color: '#8b5cf6' }
  ];

  const availableCourses = [
    { id: '1', title: 'Cálculo Diferencial', category: 'Matemáticas' },
    { id: '2', title: 'Álgebra Linear', category: 'Matemáticas' },
    { id: '3', title: 'Estadística Básica', category: 'Estadística' },
    { id: '4', title: 'Geometría Analítica', category: 'Matemáticas' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Activo', color: '#10b981' },
    { value: 'inactive', label: 'Inactivo', color: '#ef4444' },
    { value: 'pending', label: 'Pendiente', color: '#f59e0b' },
    { value: 'suspended', label: 'Suspendido', color: '#64748b' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleArrayChange = (field, value, isChecked) => {
    setFormData(prev => ({
      ...prev,
      [field]: isChecked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validaciones básicas
    if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es requerido';
    if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es requerido';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.phone.trim()) newErrors.phone = 'El teléfono es requerido';
    if (!formData.birthDate) newErrors.birthDate = 'La fecha de nacimiento es requerida';

    // Validar edad mínima (16 años)
    if (formData.birthDate) {
      const today = new Date();
      const birthDate = new Date(formData.birthDate);
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 16) newErrors.birthDate = 'El estudiante debe tener al menos 16 años';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const sections = [
    { id: 'basic', label: 'Información Básica', icon: User },
    { id: 'contact', label: 'Contacto', icon: MapPin },
    { id: 'academic', label: 'Información Académica', icon: BookOpen },
    { id: 'emergency', label: 'Contacto de Emergencia', icon: Phone },
    { id: 'assignments', label: 'Asignaciones', icon: Users }
  ];

  return (
    <StyledWrapper>
      <div className="student-form">
        {/* Header */}
        <div className="form-header">
          <button className="back-btn" onClick={onBack}>
            <ArrowLeft size={20} />
            Volver a Estudiantes
          </button>
          
          <div className="form-title">
            <h1>{isEdit ? 'Editar Estudiante' : 'Nuevo Estudiante'}</h1>
            <p>{isEdit ? 'Modifica la información del estudiante' : 'Completa la información para crear un nuevo estudiante'}</p>
          </div>
        </div>

        <div className="form-container">
          {/* Sidebar Navigation */}
          <div className="form-sidebar">
            <div className="section-nav">
              {sections.map(section => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    className={`section-btn ${activeSection === section.id ? 'active' : ''}`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    <Icon size={20} />
                    <span>{section.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <div className="form-content">
            <form onSubmit={handleSubmit}>
              {/* Información Básica */}
              {activeSection === 'basic' && (
                <div className="form-section">
                  <h2>Información Básica</h2>
                  
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="firstName">Nombre *</label>
                      <input
                        type="text"
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={errors.firstName ? 'error' : ''}
                        placeholder="Ingresa el nombre"
                      />
                      {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName">Apellidos *</label>
                      <input
                        type="text"
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={errors.lastName ? 'error' : ''}
                        placeholder="Ingresa los apellidos"
                      />
                      {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={errors.email ? 'error' : ''}
                        placeholder="ejemplo@email.com"
                      />
                      {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Teléfono *</label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={errors.phone ? 'error' : ''}
                        placeholder="+34 612 345 678"
                      />
                      {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="birthDate">Fecha de Nacimiento *</label>
                      <input
                        type="date"
                        id="birthDate"
                        value={formData.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        className={errors.birthDate ? 'error' : ''}
                      />
                      {errors.birthDate && <span className="error-message">{errors.birthDate}</span>}
                    </div>
                  </div>
                </div>
              )}

              {/* Información de Contacto */}
              {activeSection === 'contact' && (
                <div className="form-section">
                  <h2>Información de Contacto</h2>
                  
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label htmlFor="address">Dirección</label>
                      <input
                        type="text"
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Calle, número, piso..."
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="city">Ciudad</label>
                      <input
                        type="text"
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Madrid"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="postalCode">Código Postal</label>
                      <input
                        type="text"
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        placeholder="28001"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="country">País</label>
                      <input
                        type="text"
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        placeholder="España"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Información Académica */}
              {activeSection === 'academic' && (
                <div className="form-section">
                  <h2>Información Académica</h2>
                  
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="studentId">ID de Estudiante</label>
                      <input
                        type="text"
                        id="studentId"
                        value={formData.studentId}
                        onChange={(e) => handleInputChange('studentId', e.target.value)}
                        placeholder="EST-2024-001"
                      />
                      <small>Se generará automáticamente si se deja vacío</small>
                    </div>

                    <div className="form-group">
                      <label htmlFor="enrollmentDate">Fecha de Inscripción</label>
                      <input
                        type="date"
                        id="enrollmentDate"
                        value={formData.enrollmentDate}
                        onChange={(e) => handleInputChange('enrollmentDate', e.target.value)}
                      />
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="status">Estado del Estudiante</label>
                      <select
                        id="status"
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="status-select"
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Contacto de Emergencia */}
              {activeSection === 'emergency' && (
                <div className="form-section">
                  <h2>Contacto de Emergencia</h2>
                  
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="emergencyContactName">Nombre del Contacto</label>
                      <input
                        type="text"
                        id="emergencyContactName"
                        value={formData.emergencyContactName}
                        onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                        placeholder="María López"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="emergencyContactPhone">Teléfono del Contacto</label>
                      <input
                        type="tel"
                        id="emergencyContactPhone"
                        value={formData.emergencyContactPhone}
                        onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                        placeholder="+34 612 987 654"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="emergencyContactRelation">Relación</label>
                      <select
                        id="emergencyContactRelation"
                        value={formData.emergencyContactRelation}
                        onChange={(e) => handleInputChange('emergencyContactRelation', e.target.value)}
                      >
                        <option value="">Selecciona una relación</option>
                        <option value="Padre">Padre</option>
                        <option value="Madre">Madre</option>
                        <option value="Hermano/a">Hermano/a</option>
                        <option value="Cónyuge">Cónyuge</option>
                        <option value="Amigo/a">Amigo/a</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Asignaciones */}
              {activeSection === 'assignments' && (
                <div className="form-section">
                  <h2>Asignaciones Iniciales</h2>
                  
                  {/* Grupos */}
                  <div className="assignment-section">
                    <h3>Grupos</h3>
                    <div className="assignment-grid">
                      {availableGroups.map(group => (
                        <label key={group.id} className="assignment-item">
                          <input
                            type="checkbox"
                            checked={formData.initialGroups.includes(group.id)}
                            onChange={(e) => handleArrayChange('initialGroups', group.id, e.target.checked)}
                          />
                          <div className="assignment-content">
                            <div 
                              className="group-color" 
                              style={{ backgroundColor: group.color }}
                            ></div>
                            <span>{group.name}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Cursos */}
                  <div className="assignment-section">
                    <h3>Cursos Iniciales</h3>
                    <div className="assignment-grid">
                      {availableCourses.map(course => (
                        <label key={course.id} className="assignment-item">
                          <input
                            type="checkbox"
                            checked={formData.initialCourses.includes(course.id)}
                            onChange={(e) => handleArrayChange('initialCourses', course.id, e.target.checked)}
                          />
                          <div className="assignment-content">
                            <div>
                              <div className="course-title">{course.title}</div>
                              <div className="course-category">{course.category}</div>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Configuración adicional */}
                  <div className="assignment-section">
                    <h3>Configuración de Cuenta</h3>
                    <div className="config-options">
                      <label className="config-item">
                        <input
                          type="checkbox"
                          checked={formData.sendWelcomeEmail}
                          onChange={(e) => handleInputChange('sendWelcomeEmail', e.target.checked)}
                        />
                        <span>Enviar email de bienvenida</span>
                      </label>
                      
                      <label className="config-item">
                        <input
                          type="checkbox"
                          checked={formData.giveBasicPermissions}
                          onChange={(e) => handleInputChange('giveBasicPermissions', e.target.checked)}
                        />
                        <span>Otorgar permisos básicos</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={onBack}>
                  Cancelar
                </button>
                <button type="submit" className="btn-save">
                  <Save size={20} />
                  {isEdit ? 'Guardar Cambios' : 'Crear Estudiante'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .student-form {
    padding: 0;
  }

  .form-header {
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

  .form-title h1 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .form-title p {
    color: #64748b;
    margin: 0;
  }

  .form-container {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  /* Sidebar */
  .form-sidebar {
    background: #f8fafc;
    padding: 2rem 0;
    border-right: 1px solid #e2e8f0;
  }

  .section-nav {
    display: flex;
    flex-direction: column;
  }

  .section-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #64748b;
    font-weight: 500;
    text-align: left;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
  }

  .section-btn:hover {
    background: #f1f5f9;
    color: #374151;
  }

  .section-btn.active {
    background: #dbeafe;
    color: #3b82f6;
    border-left-color: #3b82f6;
  }

  /* Form Content */
  .form-content {
    padding: 2rem;
  }

  .form-section {
    margin-bottom: 2rem;
  }

  .form-section h2 {
    color: #2c3e50;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e2e8f0;
  }

  .form-section h3 {
    color: #374151;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group.full-width {
    grid-column: 1 / -1;
  }

  .form-group label {
    font-weight: 600;
    color: #374151;
  }

  .form-group input,
  .form-group select {
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
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

  .form-group input.error {
    border-color: #ef4444;
  }

  .form-group small {
    color: #64748b;
    font-size: 0.85rem;
  }

  .error-message {
    color: #ef4444;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .status-select {
    background: white;
    cursor: pointer;
  }

  /* Assignments */
  .assignment-section {
    margin-bottom: 2rem;
  }

  .assignment-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
  }

  .assignment-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
  }

  .assignment-item:hover {
    background: #f1f5f9;
    border-color: #3b82f6;
  }

  .assignment-item input[type="checkbox"] {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .assignment-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
  }

  .group-color {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .course-title {
    font-weight: 600;
    color: #2c3e50;
  }

  .course-category {
    font-size: 0.85rem;
    color: #64748b;
  }

  .config-options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .config-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background: #f8fafc;
    border-radius: 8px;
    cursor: pointer;
  }

  .config-item input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  /* Form Actions */
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding-top: 2rem;
    border-top: 1px solid #e2e8f0;
    margin-top: 2rem;
  }

  .btn-cancel,
  .btn-save {
    padding: 0.75rem 2rem;
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

  .btn-save {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
  }

  .btn-save:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .form-container {
      grid-template-columns: 1fr;
    }

    .form-sidebar {
      padding: 1rem 0;
    }

    .section-nav {
      flex-direction: row;
      overflow-x: auto;
      padding: 0 1rem;
    }

    .section-btn {
      flex-shrink: 0;
      border-left: none;
      border-bottom: 3px solid transparent;
      padding: 1rem 1.5rem;
    }

    .section-btn.active {
      border-left: none;
      border-bottom-color: #3b82f6;
    }
  }

  @media (max-width: 768px) {
    .form-grid {
      grid-template-columns: 1fr;
    }

    .assignment-grid {
      grid-template-columns: 1fr;
    }

    .form-actions {
      flex-direction: column-reverse;
    }

    .form-actions button {
      width: 100%;
    }
  }
`;

export default StudentForm;
