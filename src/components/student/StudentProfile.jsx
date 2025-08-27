import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  User, 
  Camera, 
  Edit3, 
  Save, 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  BookOpen, 
  Award, 
  Clock, 
  Target,
  Settings,
  Eye,
  EyeOff
} from 'lucide-react';

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [profileData, setProfileData] = useState({
    // Información Personal
    firstName: 'Juan Carlos',
    lastName: 'González Pérez',
    email: 'juan.gonzalez@email.com',
    phone: '+57 300 123 4567',
    birthDate: '1995-03-15',
    gender: 'Masculino',
    identification: '1234567890',
    
    // Dirección
    address: 'Calle 45 #12-34',
    city: 'Bogotá',
    state: 'Cundinamarca',
    country: 'Colombia',
    postalCode: '110111',
    
    // Información Académica
    institution: 'Universidad Nacional de Colombia',
    career: 'Ingeniería de Sistemas',
    semester: '8° Semestre',
    
    // Configuraciones
    notifications: {
      email: true,
      push: true,
      courses: true,
      evaluations: true,
      marketing: false
    },
    
    // Imagen de perfil
    profileImage: null
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Estadísticas del estudiante
  const studentStats = {
    coursesCompleted: 12,
    coursesInProgress: 3,
    totalHours: 240,
    averageScore: 87,
    certificates: 8,
    simulacrosCompleted: 25
  };

  const handleInputChange = (field, value, section = null) => {
    if (section) {
      setProfileData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          profileImage: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Aquí iría la lógica para guardar en el backend
    console.log('Guardando perfil:', profileData);
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      alert('Las contraseñas nuevas no coinciden');
      return;
    }
    if (passwords.new.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    // Aquí iría la lógica para cambiar contraseña
    console.log('Cambiando contraseña');
    setPasswords({ current: '', new: '', confirm: '' });
    setShowChangePassword(false);
    alert('Contraseña actualizada exitosamente');
  };

  const renderPersonalInfo = () => (
    <div className="info-section">
      <div className="section-header">
        <h3>Información Personal</h3>
        {!isEditing && (
          <button 
            className="edit-btn"
            onClick={() => setIsEditing(true)}
          >
            <Edit3 size={16} />
            Editar
          </button>
        )}
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Nombres</label>
          {isEditing ? (
            <input
              type="text"
              value={profileData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
            />
          ) : (
            <span className="info-value">{profileData.firstName}</span>
          )}
        </div>

        <div className="form-group">
          <label>Apellidos</label>
          {isEditing ? (
            <input
              type="text"
              value={profileData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
            />
          ) : (
            <span className="info-value">{profileData.lastName}</span>
          )}
        </div>

        <div className="form-group">
          <label>Email</label>
          {isEditing ? (
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          ) : (
            <span className="info-value">
              <Mail size={16} />
              {profileData.email}
            </span>
          )}
        </div>

        <div className="form-group">
          <label>Teléfono</label>
          {isEditing ? (
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          ) : (
            <span className="info-value">
              <Phone size={16} />
              {profileData.phone}
            </span>
          )}
        </div>

        <div className="form-group">
          <label>Fecha de Nacimiento</label>
          {isEditing ? (
            <input
              type="date"
              value={profileData.birthDate}
              onChange={(e) => handleInputChange('birthDate', e.target.value)}
            />
          ) : (
            <span className="info-value">
              <Calendar size={16} />
              {new Date(profileData.birthDate).toLocaleDateString()}
            </span>
          )}
        </div>

        <div className="form-group">
          <label>Género</label>
          {isEditing ? (
            <select
              value={profileData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
            >
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
              <option value="Prefiero no decir">Prefiero no decir</option>
            </select>
          ) : (
            <span className="info-value">{profileData.gender}</span>
          )}
        </div>

        <div className="form-group">
          <label>Documento de Identidad</label>
          {isEditing ? (
            <input
              type="text"
              value={profileData.identification}
              onChange={(e) => handleInputChange('identification', e.target.value)}
            />
          ) : (
            <span className="info-value">{profileData.identification}</span>
          )}
        </div>
      </div>

      {/* Dirección */}
      <div className="subsection">
        <h4>Dirección</h4>
        <div className="form-grid">
          <div className="form-group full-width">
            <label>Dirección</label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Calle, carrera, número"
              />
            ) : (
              <span className="info-value">
                <MapPin size={16} />
                {profileData.address}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Ciudad</label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
              />
            ) : (
              <span className="info-value">{profileData.city}</span>
            )}
          </div>

          <div className="form-group">
            <label>Departamento/Estado</label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
              />
            ) : (
              <span className="info-value">{profileData.state}</span>
            )}
          </div>

          <div className="form-group">
            <label>País</label>
            {isEditing ? (
              <select
                value={profileData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
              >
                <option value="Colombia">Colombia</option>
                <option value="México">México</option>
                <option value="Argentina">Argentina</option>
                <option value="Chile">Chile</option>
                <option value="Perú">Perú</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Venezuela">Venezuela</option>
                <option value="España">España</option>
                <option value="Estados Unidos">Estados Unidos</option>
                <option value="Otro">Otro</option>
              </select>
            ) : (
              <span className="info-value">{profileData.country}</span>
            )}
          </div>

          <div className="form-group">
            <label>Código Postal</label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.postalCode}
                onChange={(e) => handleInputChange('postalCode', e.target.value)}
              />
            ) : (
              <span className="info-value">{profileData.postalCode}</span>
            )}
          </div>
        </div>
      </div>

      {/* Información Académica */}
      <div className="subsection">
        <h4>Información Académica</h4>
        <div className="form-grid">
          <div className="form-group">
            <label>Institución Educativa</label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.institution}
                onChange={(e) => handleInputChange('institution', e.target.value)}
              />
            ) : (
              <span className="info-value">
                <BookOpen size={16} />
                {profileData.institution}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Carrera/Programa</label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.career}
                onChange={(e) => handleInputChange('career', e.target.value)}
              />
            ) : (
              <span className="info-value">{profileData.career}</span>
            )}
          </div>

          <div className="form-group">
            <label>Semestre/Nivel</label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.semester}
                onChange={(e) => handleInputChange('semester', e.target.value)}
              />
            ) : (
              <span className="info-value">{profileData.semester}</span>
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="form-actions">
          <button 
            className="save-btn"
            onClick={handleSave}
          >
            <Save size={16} />
            Guardar Cambios
          </button>
          <button 
            className="cancel-btn"
            onClick={() => setIsEditing(false)}
          >
            <X size={16} />
            Cancelar
          </button>
        </div>
      )}
    </div>
  );

  const renderStats = () => (
    <div className="stats-section">
      <h3>Mis Estadísticas</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon completed">
            <Award size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-number">{studentStats.coursesCompleted}</span>
            <span className="stat-label">Cursos Completados</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon progress">
            <BookOpen size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-number">{studentStats.coursesInProgress}</span>
            <span className="stat-label">Cursos en Progreso</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon hours">
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-number">{studentStats.totalHours}h</span>
            <span className="stat-label">Horas de Estudio</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon score">
            <Target size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-number">{studentStats.averageScore}%</span>
            <span className="stat-label">Promedio General</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon certificates">
            <Award size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-number">{studentStats.certificates}</span>
            <span className="stat-label">Certificados</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon simulacros">
            <Target size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-number">{studentStats.simulacrosCompleted}</span>
            <span className="stat-label">Simulacros Realizados</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="settings-section">
      <h3>Configuraciones</h3>
      
      {/* Cambio de Contraseña */}
      <div className="setting-group">
        <div className="setting-header">
          <h4>Seguridad</h4>
        </div>
        
        <div className="setting-item">
          <button 
            className="change-password-btn"
            onClick={() => setShowChangePassword(!showChangePassword)}
          >
            <Settings size={16} />
            Cambiar Contraseña
          </button>
        </div>

        {showChangePassword && (
          <div className="password-change-form">
            <div className="form-group">
              <label>Contraseña Actual</label>
              <div className="password-input">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  value={passwords.current}
                  onChange={(e) => setPasswords(prev => ({...prev, current: e.target.value}))}
                  placeholder="Ingresa tu contraseña actual"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(prev => ({...prev, current: !prev.current}))}
                  className="password-toggle"
                >
                  {showPasswords.current ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Nueva Contraseña</label>
              <div className="password-input">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  value={passwords.new}
                  onChange={(e) => setPasswords(prev => ({...prev, new: e.target.value}))}
                  placeholder="Mínimo 6 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(prev => ({...prev, new: !prev.new}))}
                  className="password-toggle"
                >
                  {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Confirmar Nueva Contraseña</label>
              <div className="password-input">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwords.confirm}
                  onChange={(e) => setPasswords(prev => ({...prev, confirm: e.target.value}))}
                  placeholder="Repite la nueva contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(prev => ({...prev, confirm: !prev.confirm}))}
                  className="password-toggle"
                >
                  {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="form-actions">
              <button 
                className="save-btn"
                onClick={handlePasswordChange}
                disabled={!passwords.current || !passwords.new || !passwords.confirm}
              >
                Actualizar Contraseña
              </button>
              <button 
                className="cancel-btn"
                onClick={() => {
                  setShowChangePassword(false);
                  setPasswords({current: '', new: '', confirm: ''});
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Notificaciones */}
      <div className="setting-group">
        <div className="setting-header">
          <h4>Notificaciones</h4>
        </div>
        
        <div className="notifications-grid">
          <div className="notification-item">
            <div className="notification-info">
              <span className="notification-title">Notificaciones por Email</span>
              <span className="notification-desc">Recibir actualizaciones importantes por correo</span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={profileData.notifications.email}
                onChange={(e) => handleInputChange('email', e.target.checked, 'notifications')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="notification-item">
            <div className="notification-info">
              <span className="notification-title">Notificaciones Push</span>
              <span className="notification-desc">Alertas en tiempo real en el navegador</span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={profileData.notifications.push}
                onChange={(e) => handleInputChange('push', e.target.checked, 'notifications')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="notification-item">
            <div className="notification-info">
              <span className="notification-title">Actualizaciones de Cursos</span>
              <span className="notification-desc">Nuevas lecciones y contenido disponible</span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={profileData.notifications.courses}
                onChange={(e) => handleInputChange('courses', e.target.checked, 'notifications')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="notification-item">
            <div className="notification-info">
              <span className="notification-title">Recordatorios de Evaluaciones</span>
              <span className="notification-desc">Fechas límite de quiz y exámenes</span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={profileData.notifications.evaluations}
                onChange={(e) => handleInputChange('evaluations', e.target.checked, 'notifications')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="notification-item">
            <div className="notification-info">
              <span className="notification-title">Marketing y Promociones</span>
              <span className="notification-desc">Ofertas especiales y nuevos cursos</span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={profileData.notifications.marketing}
                onChange={(e) => handleInputChange('marketing', e.target.checked, 'notifications')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <StyledWrapper>
      <div className="profile-container">
        {/* Header del Perfil */}
        <div className="profile-header">
          <div className="profile-image-section">
            <div className="profile-image-container">
              {profileData.profileImage ? (
                <img 
                  src={profileData.profileImage} 
                  alt="Foto de perfil" 
                  className="profile-image"
                />
              ) : (
                <div className="default-avatar">
                  <User size={48} />
                </div>
              )}
              
              <label className="image-upload-btn">
                <Camera size={16} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </div>

          <div className="profile-info">
            <h1>{profileData.firstName} {profileData.lastName}</h1>
            <p className="profile-email">{profileData.email}</p>
            <p className="profile-career">{profileData.career} - {profileData.semester}</p>
          </div>
        </div>

        {/* Navegación de Pestañas */}
        <div className="profile-tabs">
          <button 
            className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            <User size={16} />
            Información Personal
          </button>
          <button 
            className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            <Award size={16} />
            Estadísticas
          </button>
          <button 
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={16} />
            Configuraciones
          </button>
        </div>

        {/* Contenido de las Pestañas */}
        <div className="profile-content">
          {activeTab === 'personal' && renderPersonalInfo()}
          {activeTab === 'stats' && renderStats()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .profile-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .profile-header {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16px;
    color: white;
    margin-bottom: 2rem;
  }

  .profile-image-section {
    flex-shrink: 0;
  }

  .profile-image-container {
    position: relative;
    width: 120px;
    height: 120px;
  }

  .profile-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid rgba(255, 255, 255, 0.3);
  }

  .default-avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 4px solid rgba(255, 255, 255, 0.3);
  }

  .image-upload-btn {
    position: absolute;
    bottom: 8px;
    right: 8px;
    background: #2196f3;
    color: white;
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  .image-upload-btn:hover {
    background: #1976d2;
    transform: scale(1.1);
  }

  .profile-info h1 {
    margin: 0 0 0.5rem 0;
    font-size: 2rem;
    font-weight: 600;
  }

  .profile-email {
    margin: 0 0 0.25rem 0;
    opacity: 0.9;
    font-size: 1.1rem;
  }

  .profile-career {
    margin: 0;
    opacity: 0.8;
    font-size: 1rem;
  }

  .profile-tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid #e0e0e0;
  }

  .tab-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    color: #666;
    border-bottom: 3px solid transparent;
    transition: all 0.3s ease;
  }

  .tab-btn:hover {
    color: #2196f3;
    background: rgba(33, 150, 243, 0.1);
  }

  .tab-btn.active {
    color: #2196f3;
    border-bottom-color: #2196f3;
    background: rgba(33, 150, 243, 0.1);
  }

  .profile-content {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }

  /* Información Personal */
  .info-section {
    h3 {
      margin: 0 0 1.5rem 0;
      color: #333;
      font-size: 1.5rem;
    }
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .edit-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: #2196f3;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .edit-btn:hover {
    background: #1976d2;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
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
    color: #333;
    font-size: 0.9rem;
  }

  .form-group input,
  .form-group select {
    padding: 0.75rem;
    border: 2px solid #e0e0e0;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
  }

  .form-group input:focus,
  .form-group select:focus {
    outline: none;
    border-color: #2196f3;
  }

  .info-value {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background: #f5f5f5;
    border-radius: 6px;
    color: #333;
  }

  .subsection {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #e0e0e0;
  }

  .subsection h4 {
    margin: 0 0 1rem 0;
    color: #555;
    font-size: 1.2rem;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #e0e0e0;
  }

  .save-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: #4caf50;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .save-btn:hover {
    background: #388e3c;
  }

  .save-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  .cancel-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: #f44336;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .cancel-btn:hover {
    background: #d32f2f;
  }

  /* Estadísticas */
  .stats-section h3 {
    margin: 0 0 2rem 0;
    color: #333;
    font-size: 1.5rem;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .stat-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 12px;
    transition: transform 0.3s ease;
  }

  .stat-card:hover {
    transform: translateY(-4px);
  }

  .stat-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .stat-icon.completed {
    background: linear-gradient(135deg, #4caf50, #388e3c);
  }

  .stat-icon.progress {
    background: linear-gradient(135deg, #2196f3, #1976d2);
  }

  .stat-icon.hours {
    background: linear-gradient(135deg, #ff9800, #f57c00);
  }

  .stat-icon.score {
    background: linear-gradient(135deg, #9c27b0, #7b1fa2);
  }

  .stat-icon.certificates {
    background: linear-gradient(135deg, #ffc107, #ffa000);
  }

  .stat-icon.simulacros {
    background: linear-gradient(135deg, #e91e63, #c2185b);
  }

  .stat-info {
    display: flex;
    flex-direction: column;
  }

  .stat-number {
    font-size: 2rem;
    font-weight: 700;
    color: #333;
    line-height: 1;
  }

  .stat-label {
    font-size: 0.9rem;
    color: #666;
    margin-top: 0.25rem;
  }

  /* Configuraciones */
  .settings-section h3 {
    margin: 0 0 2rem 0;
    color: #333;
    font-size: 1.5rem;
  }

  .setting-group {
    margin-bottom: 2rem;
    padding: 1.5rem;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
  }

  .setting-header h4 {
    margin: 0 0 1rem 0;
    color: #333;
    font-size: 1.2rem;
  }

  .change-password-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: #ff9800;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .change-password-btn:hover {
    background: #f57c00;
  }

  .password-change-form {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #e0e0e0;
  }

  .password-input {
    position: relative;
    display: flex;
    align-items: center;
  }

  .password-input input {
    flex: 1;
    padding-right: 3rem;
  }

  .password-toggle {
    position: absolute;
    right: 0.75rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .password-toggle:hover {
    color: #333;
  }

  .notifications-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .notification-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #f9f9f9;
    border-radius: 8px;
  }

  .notification-info {
    display: flex;
    flex-direction: column;
  }

  .notification-title {
    font-weight: 600;
    color: #333;
    margin-bottom: 0.25rem;
  }

  .notification-desc {
    font-size: 0.9rem;
    color: #666;
  }

  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 28px;
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
    transition: .4s;
    border-radius: 28px;
  }

  .toggle-slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }

  input:checked + .toggle-slider {
    background-color: #2196f3;
  }

  input:checked + .toggle-slider:before {
    transform: translateX(22px);
  }

  @media (max-width: 768px) {
    .profile-container {
      padding: 1rem;
    }

    .profile-header {
      flex-direction: column;
      text-align: center;
      gap: 1rem;
    }

    .profile-tabs {
      flex-direction: column;
    }

    .form-grid {
      grid-template-columns: 1fr;
    }

    .stats-grid {
      grid-template-columns: 1fr;
    }

    .form-actions {
      flex-direction: column;
    }
  }
`;

export default StudentProfile;
