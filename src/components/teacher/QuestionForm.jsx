import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  Upload, 
  Play, 
  Video, 
  Image as ImageIcon,
  FileText,
  HelpCircle,
  CheckCircle,
  X
} from 'lucide-react';
import VideoEmbed from './VideoEmbed';

const QuestionForm = ({ question, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    type: 'multiple-choice',
    title: '',
    content: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    points: 10,
    explanation: '',
    media: null,
    videoUrl: '',
    videoTitle: '',
    requireVideoCompletion: false,
    imageUrl: '',
    imageAlt: '',
    allowPartialCredit: false,
    timeLimit: null, // tiempo específico para esta pregunta
    tags: []
  });

  const [showVideoEmbed, setShowVideoEmbed] = useState(false);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (question) {
      setFormData({ ...question });
    }
  }, [question]);

  const questionTypes = [
    { 
      value: 'multiple-choice', 
      label: 'Opción múltiple', 
      icon: <HelpCircle size={16} />,
      description: 'Pregunta con varias opciones donde solo una es correcta'
    },
    { 
      value: 'true-false', 
      label: 'Verdadero/Falso', 
      icon: <CheckCircle size={16} />,
      description: 'Pregunta con dos opciones: verdadero o falso'
    },
    { 
      value: 'short-answer', 
      label: 'Respuesta corta', 
      icon: <FileText size={16} />,
      description: 'Pregunta de respuesta abierta y corta'
    },
    { 
      value: 'video-question', 
      label: 'Pregunta con video', 
      icon: <Video size={16} />,
      description: 'Pregunta que incluye un video que el estudiante debe ver'
    },
    { 
      value: 'image-question', 
      label: 'Pregunta con imagen', 
      icon: <ImageIcon size={16} />,
      description: 'Pregunta que incluye una imagen de referencia'
    }
  ];

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTypeChange = (newType) => {
    let newOptions = [];
    let correctAnswer = 0;

    switch (newType) {
      case 'multiple-choice':
        newOptions = ['', '', '', ''];
        break;
      case 'true-false':
        newOptions = ['Verdadero', 'Falso'];
        break;
      case 'short-answer':
      case 'video-question':
      case 'image-question':
        newOptions = [];
        break;
    }

    setFormData(prev => ({
      ...prev,
      type: newType,
      options: newOptions,
      correctAnswer: correctAnswer
    }));
  };

  const addOption = () => {
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  const removeOption = (index) => {
    if (formData.options.length <= 2) return;
    
    setFormData(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
      correctAnswer: prev.correctAnswer >= index && prev.correctAnswer > 0 
        ? prev.correctAnswer - 1 
        : prev.correctAnswer
    }));
  };

  const updateOption = (index, value) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.map((option, i) => i === index ? value : option)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleVideoSelect = (videoData) => {
    setFormData(prev => ({
      ...prev,
      videoUrl: videoData.url,
      videoTitle: videoData.title
    }));
    setShowVideoEmbed(false);
  };

  const handleSave = () => {
    // Validación
    if (!formData.title.trim()) {
      alert('El título de la pregunta es requerido');
      return;
    }

    if (!formData.content.trim()) {
      alert('El contenido de la pregunta es requerido');
      return;
    }

    if ((formData.type === 'multiple-choice' || formData.type === 'true-false') && 
        formData.options.some(option => !option.trim())) {
      alert('Todas las opciones deben tener contenido');
      return;
    }

    if (formData.type === 'video-question' && !formData.videoUrl) {
      alert('Debe seleccionar un video para este tipo de pregunta');
      return;
    }

    if (formData.type === 'image-question' && !formData.imageUrl) {
      alert('Debe agregar una imagen para este tipo de pregunta');
      return;
    }

    onSave(formData);
  };

  const selectedType = questionTypes.find(type => type.value === formData.type);

  if (showVideoEmbed) {
    return (
      <VideoEmbed
        onSelect={handleVideoSelect}
        onCancel={() => setShowVideoEmbed(false)}
      />
    );
  }

  return (
    <StyledWrapper>
      <div className="question-form">
        {/* Header */}
        <div className="form-header">
          <div className="header-left">
            <button className="back-btn" onClick={onCancel}>
              <ArrowLeft size={20} />
              Volver
            </button>
            <div className="form-info">
              <h1>{question ? 'Editar' : 'Crear'} Pregunta</h1>
              <span className="question-type-badge">
                {selectedType?.icon}
                {selectedType?.label}
              </span>
            </div>
          </div>
          <button className="save-btn" onClick={handleSave}>
            <Save size={20} />
            Guardar Pregunta
          </button>
        </div>

        {/* Content */}
        <div className="form-content">
          {/* Question Type Selection */}
          <div className="form-section">
            <h3>Tipo de Pregunta</h3>
            <div className="question-types">
              {questionTypes.map(type => (
                <div 
                  key={type.value}
                  className={`question-type-card ${formData.type === type.value ? 'active' : ''}`}
                  onClick={() => handleTypeChange(type.value)}
                >
                  <div className="type-icon">{type.icon}</div>
                  <div className="type-info">
                    <h4>{type.label}</h4>
                    <p>{type.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Basic Question Info */}
          <div className="form-section">
            <h3>Información Básica</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Título de la pregunta *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                  placeholder="Ej: ¿Qué es un límite matemático?"
                />
              </div>
              <div className="form-group">
                <label>Puntuación *</label>
                <input
                  type="number"
                  value={formData.points}
                  onChange={(e) => handleFormChange('points', parseInt(e.target.value) || 0)}
                  min="1"
                  max="100"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Contenido de la pregunta *</label>
              <textarea
                value={formData.content}
                onChange={(e) => handleFormChange('content', e.target.value)}
                placeholder="Describe tu pregunta aquí..."
                rows="4"
              />
            </div>
          </div>

          {/* Media Section */}
          {(formData.type === 'video-question' || formData.type === 'image-question') && (
            <div className="form-section">
              <h3>
                {formData.type === 'video-question' ? 'Video' : 'Imagen'}
              </h3>
              
              {formData.type === 'video-question' && (
                <div className="video-section">
                  {formData.videoUrl ? (
                    <div className="video-selected">
                      <div className="video-info">
                        <Video size={20} />
                        <div>
                          <h4>{formData.videoTitle || 'Video seleccionado'}</h4>
                          <p>{formData.videoUrl}</p>
                        </div>
                      </div>
                      <div className="video-actions">
                        <button 
                          className="change-video"
                          onClick={() => setShowVideoEmbed(true)}
                        >
                          Cambiar Video
                        </button>
                        <button 
                          className="remove-video"
                          onClick={() => handleFormChange('videoUrl', '')}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button 
                      className="add-video-btn"
                      onClick={() => setShowVideoEmbed(true)}
                    >
                      <Video size={20} />
                      Agregar Video
                    </button>
                  )}

                  {formData.videoUrl && (
                    <div className="video-settings">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.requireVideoCompletion}
                          onChange={(e) => handleFormChange('requireVideoCompletion', e.target.checked)}
                        />
                        Requerir ver el video completo antes de responder
                      </label>
                    </div>
                  )}
                </div>
              )}

              {formData.type === 'image-question' && (
                <div className="image-section">
                  <div className="form-group">
                    <label>URL de la imagen *</label>
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => handleFormChange('imageUrl', e.target.value)}
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                  </div>
                  <div className="form-group">
                    <label>Texto alternativo</label>
                    <input
                      type="text"
                      value={formData.imageAlt}
                      onChange={(e) => handleFormChange('imageAlt', e.target.value)}
                      placeholder="Descripción de la imagen"
                    />
                  </div>
                  {formData.imageUrl && (
                    <div className="image-preview">
                      <img src={formData.imageUrl} alt={formData.imageAlt} />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Options Section */}
          {(formData.type === 'multiple-choice' || formData.type === 'true-false') && (
            <div className="form-section">
              <h3>Opciones de Respuesta</h3>
              <div className="options-list">
                {formData.options.map((option, index) => (
                  <div key={index} className="option-item">
                    <div className="option-input">
                      <input
                        type="radio"
                        name="correct-answer"
                        checked={formData.correctAnswer === index}
                        onChange={() => handleFormChange('correctAnswer', index)}
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder={`Opción ${index + 1}`}
                        disabled={formData.type === 'true-false'}
                      />
                    </div>
                    {formData.type === 'multiple-choice' && formData.options.length > 2 && (
                      <button 
                        className="remove-option"
                        onClick={() => removeOption(index)}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {formData.type === 'multiple-choice' && formData.options.length < 6 && (
                <button className="add-option-btn" onClick={addOption}>
                  <Plus size={16} />
                  Agregar Opción
                </button>
              )}

              <div className="correct-answer-info">
                <p>
                  <strong>Respuesta correcta:</strong> 
                  {formData.options[formData.correctAnswer] || 'No seleccionada'}
                </p>
              </div>
            </div>
          )}

          {/* Short Answer Section */}
          {formData.type === 'short-answer' && (
            <div className="form-section">
              <h3>Configuración de Respuesta Abierta</h3>
              <div className="form-group">
                <label>Respuesta modelo/sugerida</label>
                <textarea
                  value={formData.modelAnswer || ''}
                  onChange={(e) => handleFormChange('modelAnswer', e.target.value)}
                  placeholder="Proporciona una respuesta modelo para orientar la calificación..."
                  rows="3"
                />
              </div>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.allowPartialCredit}
                  onChange={(e) => handleFormChange('allowPartialCredit', e.target.checked)}
                />
                Permitir calificación parcial
              </label>
            </div>
          )}

          {/* Explanation Section */}
          <div className="form-section">
            <h3>Explicación (Opcional)</h3>
            <div className="form-group">
              <label>Explicación de la respuesta</label>
              <textarea
                value={formData.explanation}
                onChange={(e) => handleFormChange('explanation', e.target.value)}
                placeholder="Explica por qué esta es la respuesta correcta..."
                rows="3"
              />
              <small>Esta explicación se mostrará al estudiante después de responder (si está habilitado).</small>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="form-section">
            <h3>Configuración Avanzada</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Tiempo límite específico (minutos)</label>
                <input
                  type="number"
                  value={formData.timeLimit || ''}
                  onChange={(e) => handleFormChange('timeLimit', e.target.value ? parseInt(e.target.value) : null)}
                  placeholder="Heredar del quiz"
                  min="1"
                />
                <small>Deja vacío para usar el tiempo límite general del quiz</small>
              </div>
            </div>

            {/* Tags */}
            <div className="form-group">
              <label>Etiquetas/Categorías</label>
              <div className="tags-input">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Agregar etiqueta"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <button type="button" onClick={addTag}>
                  <Plus size={16} />
                </button>
              </div>
              <div className="tags-list">
                {formData.tags.map(tag => (
                  <span key={tag} className="tag">
                    {tag}
                    <button onClick={() => removeTag(tag)}>
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="form-section">
            <h3>Vista Previa</h3>
            <div className="question-preview">
              <div className="preview-header">
                <span className="preview-points">{formData.points} pts</span>
                <span className="preview-type">{selectedType?.label}</span>
              </div>
              <h4>{formData.title || 'Título de la pregunta'}</h4>
              <p>{formData.content || 'Contenido de la pregunta'}</p>
              
              {formData.type === 'video-question' && formData.videoUrl && (
                <div className="preview-video">
                  <Video size={16} />
                  <span>Video: {formData.videoTitle || 'Video adjunto'}</span>
                </div>
              )}

              {formData.type === 'image-question' && formData.imageUrl && (
                <div className="preview-image">
                  <img src={formData.imageUrl} alt={formData.imageAlt} />
                </div>
              )}

              {(formData.type === 'multiple-choice' || formData.type === 'true-false') && (
                <div className="preview-options">
                  {formData.options.map((option, index) => (
                    <div key={index} className="preview-option">
                      <input type="radio" disabled />
                      <span>{option || `Opción ${index + 1}`}</span>
                    </div>
                  ))}
                </div>
              )}

              {formData.type === 'short-answer' && (
                <div className="preview-textarea">
                  <textarea placeholder="El estudiante escribirá su respuesta aquí..." disabled />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .question-form {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  /* Header */
  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid #e2e8f0;
    background: #f8fafc;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .back-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: 1px solid #e2e8f0;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    color: #64748b;
    transition: all 0.3s ease;
  }

  .back-btn:hover {
    background: #f1f5f9;
  }

  .form-info h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 0.5rem 0;
  }

  .question-type-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.75rem;
    background: #3b82f6;
    color: white;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .save-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #10b981;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .save-btn:hover {
    background: #059669;
  }

  /* Content */
  .form-content {
    padding: 2rem;
    max-height: calc(100vh - 200px);
    overflow-y: auto;
  }

  .form-section {
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #f1f5f9;
  }

  .form-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }

  .form-section h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 1.5rem 0;
  }

  /* Question Type Selection */
  .question-types {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }

  .question-type-card {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.5rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .question-type-card:hover {
    border-color: #3b82f6;
    background: #f8fafc;
  }

  .question-type-card.active {
    border-color: #3b82f6;
    background: #dbeafe;
  }

  .type-icon {
    color: #3b82f6;
    padding: 0.5rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .type-info h4 {
    margin: 0 0 0.5rem 0;
    color: #1e293b;
    font-size: 1rem;
  }

  .type-info p {
    margin: 0;
    color: #64748b;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  /* Form Elements */
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .form-group label {
    font-weight: 600;
    color: #374151;
    font-size: 0.9rem;
  }

  .form-group small {
    color: #64748b;
    font-size: 0.8rem;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  /* Video Section */
  .video-selected {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  .video-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .video-info h4 {
    margin: 0;
    color: #1e293b;
  }

  .video-info p {
    margin: 0;
    color: #64748b;
    font-size: 0.9rem;
  }

  .video-actions {
    display: flex;
    gap: 0.5rem;
  }

  .change-video {
    padding: 0.5rem 1rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
  }

  .remove-video {
    padding: 0.5rem;
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  .add-video-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 1.5rem;
    background: #f8fafc;
    border: 2px dashed #d1d5db;
    border-radius: 8px;
    cursor: pointer;
    color: #64748b;
    transition: all 0.3s ease;
    width: 100%;
  }

  .add-video-btn:hover {
    border-color: #3b82f6;
    color: #3b82f6;
  }

  .video-settings {
    margin-top: 1rem;
  }

  /* Image Section */
  .image-preview {
    margin-top: 1rem;
  }

  .image-preview img {
    max-width: 100%;
    max-height: 200px;
    object-fit: contain;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
  }

  /* Options Section */
  .options-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .option-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .option-input {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
  }

  .option-input input[type="radio"] {
    width: 1.2rem;
    height: 1.2rem;
    accent-color: #10b981;
  }

  .option-input input[type="text"] {
    flex: 1;
    margin: 0;
  }

  .remove-option {
    padding: 0.5rem;
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .remove-option:hover {
    background: #dc2626;
  }

  .add-option-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: #f8fafc;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    cursor: pointer;
    color: #64748b;
    transition: all 0.3s ease;
  }

  .add-option-btn:hover {
    background: #f1f5f9;
    border-color: #3b82f6;
    color: #3b82f6;
  }

  .correct-answer-info {
    margin-top: 1rem;
    padding: 1rem;
    background: #d1fae5;
    border-radius: 8px;
    color: #065f46;
  }

  .correct-answer-info p {
    margin: 0;
  }

  /* Checkbox Label */
  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    padding: 0.75rem;
    background: #f8fafc;
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  .checkbox-label:hover {
    background: #f1f5f9;
  }

  .checkbox-label input[type="checkbox"] {
    width: 1.2rem;
    height: 1.2rem;
    accent-color: #3b82f6;
  }

  /* Tags */
  .tags-input {
    display: flex;
    gap: 0.5rem;
  }

  .tags-input input {
    flex: 1;
  }

  .tags-input button {
    padding: 0.75rem;
    background: #10b981;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  .tags-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .tag {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.75rem;
    background: #dbeafe;
    color: #1e40af;
    border-radius: 12px;
    font-size: 0.8rem;
  }

  .tag button {
    background: none;
    border: none;
    color: #1e40af;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
  }

  /* Preview Section */
  .question-preview {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 1.5rem;
  }

  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .preview-points {
    background: #10b981;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .preview-type {
    color: #64748b;
    font-size: 0.9rem;
  }

  .question-preview h4 {
    margin: 0 0 0.5rem 0;
    color: #1e293b;
    font-size: 1.1rem;
  }

  .question-preview p {
    margin: 0 0 1rem 0;
    color: #64748b;
    line-height: 1.5;
  }

  .preview-video {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background: #dbeafe;
    border-radius: 8px;
    color: #1e40af;
    margin-bottom: 1rem;
  }

  .preview-image {
    margin-bottom: 1rem;
  }

  .preview-image img {
    max-width: 200px;
    max-height: 150px;
    object-fit: contain;
    border-radius: 8px;
  }

  .preview-options {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .preview-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
  }

  .preview-textarea textarea {
    width: 100%;
    min-height: 80px;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 0.75rem;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .form-header {
      flex-direction: column;
      gap: 1rem;
      align-items: stretch;
    }

    .question-types {
      grid-template-columns: 1fr;
    }

    .form-grid {
      grid-template-columns: 1fr;
    }

    .question-type-card {
      flex-direction: column;
      text-align: center;
    }

    .video-selected {
      flex-direction: column;
      gap: 1rem;
      align-items: stretch;
    }

    .preview-header {
      flex-direction: column;
      gap: 0.5rem;
      align-items: stretch;
    }
  }
`;

export default QuestionForm;
