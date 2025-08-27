import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Save,
  Eye,
  ArrowLeft,
  Plus,
  Trash2,
  GripVertical,
  Video,
  FileText,
  Image,
  HelpCircle,
  Settings,
  Upload,
  ClipboardCheck,
  Timer,
  Award,
  Brain
} from 'lucide-react';

const CourseEditor = ({ courseId, onBack, onSave }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [course, setCourse] = useState({
    title: courseId ? 'Cálculo Diferencial Avanzado' : '',
    description: courseId ? 'Curso completo de cálculo diferencial con aplicaciones prácticas en ingeniería y ciencias.' : '',
    shortDescription: courseId ? 'Aprende cálculo diferencial desde cero hasta nivel avanzado' : '',
    category: courseId ? 'matematicas' : '',
    level: courseId ? 'intermedio' : 'principiante',
    duration: courseId ? '8' : '',
    requirements: courseId ? ['Álgebra básica', 'Trigonometría'] : [''],
    whatYouLearn: courseId ? ['Derivadas', 'Límites', 'Aplicaciones'] : [''],
    image: null,
    status: courseId ? 'published' : 'draft'
  });

  const [sections, setSections] = useState(courseId ? [
    {
      id: 1,
      title: 'Introducción al Cálculo',
      description: 'Conceptos básicos y fundamentos',
      lessons: [
        { id: 1, title: 'Qué es el cálculo diferencial', type: 'video', duration: '15:30', content: '' },
        { id: 2, title: 'Historia del cálculo', type: 'text', duration: '10:00', content: '' },
        { id: 3, title: 'Quiz: Conceptos básicos', type: 'quiz', duration: '5:00', content: '' }
      ]
    },
    {
      id: 2,
      title: 'Límites',
      description: 'Teoría y aplicaciones de límites',
      lessons: [
        { id: 4, title: 'Definición de límite', type: 'video', duration: '20:15', content: '' },
        { id: 5, title: 'Cálculo de límites', type: 'video', duration: '25:45', content: '' }
      ]
    }
  ] : []);

  // Estado para evaluaciones
  const [evaluations, setEvaluations] = useState(courseId ? [
    {
      id: 1,
      title: 'Quiz: Introducción al Cálculo',
      type: 'quiz',
      sectionId: 1,
      lessonId: 3,
      timeLimit: 10,
      attempts: 3,
      passingGrade: 70,
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          question: '¿Qué es el cálculo diferencial?',
          options: ['Estudio de límites', 'Estudio de derivadas', 'Estudio de integrales', 'Todas las anteriores'],
          correctAnswer: 1,
          points: 10
        }
      ]
    },
    {
      id: 2,
      title: 'Simulacro Final: Cálculo Completo',
      type: 'exam',
      sectionId: null,
      lessonId: null,
      timeLimit: 120,
      attempts: 2,
      passingGrade: 75,
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          question: 'Calcule la derivada de f(x) = x²',
          options: ['x', '2x', 'x²', '2x²'],
          correctAnswer: 1,
          points: 20
        },
        {
          id: 2,
          type: 'open-ended',
          question: 'Explique el concepto de límite con sus propias palabras',
          points: 30
        }
      ]
    }
  ] : []);

  const handleCourseChange = (field, value) => {
    setCourse(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayFieldChange = (field, index, value) => {
    setCourse(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayField = (field) => {
    setCourse(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayField = (field, index) => {
    setCourse(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const addSection = () => {
    const newSection = {
      id: Date.now(),
      title: 'Nueva Sección',
      description: '',
      lessons: []
    };
    setSections(prev => [...prev, newSection]);
  };

  const updateSection = (sectionId, field, value) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId ? { ...section, [field]: value } : section
    ));
  };

  const addLesson = (sectionId) => {
    const newLesson = {
      id: Date.now(),
      title: 'Nueva Lección',
      type: 'video',
      duration: '0:00',
      content: ''
    };
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, lessons: [...section.lessons, newLesson] }
        : section
    ));
  };

  // Funciones para manejar evaluaciones
  const addEvaluation = (type) => {
    const newEvaluation = {
      id: Date.now(),
      title: type === 'quiz' ? 'Nuevo Quiz' : 'Nuevo Simulacro',
      type: type,
      sectionId: type === 'quiz' ? (sections[0]?.id || null) : null,
      lessonId: null,
      timeLimit: type === 'quiz' ? 15 : 120,
      attempts: type === 'quiz' ? 3 : 2,
      passingGrade: type === 'quiz' ? 70 : 75,
      questions: []
    };
    setEvaluations(prev => [...prev, newEvaluation]);
  };

  const updateEvaluation = (evaluationId, field, value) => {
    setEvaluations(prev => prev.map(evaluation => 
      evaluation.id === evaluationId ? { ...evaluation, [field]: value } : evaluation
    ));
  };

  const deleteEvaluation = (evaluationId) => {
    setEvaluations(prev => prev.filter(evaluation => evaluation.id !== evaluationId));
  };

  const addQuestion = (evaluationId) => {
    const newQuestion = {
      id: Date.now(),
      type: 'multiple-choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      points: 10
    };
    setEvaluations(prev => prev.map(evaluation => 
      evaluation.id === evaluationId 
        ? { ...evaluation, questions: [...evaluation.questions, newQuestion] }
        : evaluation
    ));
  };

  const updateQuestion = (evaluationId, questionId, field, value) => {
    setEvaluations(prev => prev.map(evaluation => 
      evaluation.id === evaluationId 
        ? {
            ...evaluation, 
            questions: evaluation.questions.map(question => 
              question.id === questionId ? { ...question, [field]: value } : question
            )
          }
        : evaluation
    ));
  };

  const deleteQuestion = (evaluationId, questionId) => {
    setEvaluations(prev => prev.map(evaluation => 
      evaluation.id === evaluationId 
        ? { ...evaluation, questions: evaluation.questions.filter(q => q.id !== questionId) }
        : evaluation
    ));
  };

  const handleSave = () => {
    const courseData = {
      ...course,
      sections,
      evaluations
    };
    onSave(courseData);
  };

  const getLessonIcon = (type) => {
    switch (type) {
      case 'video': return <Video size={16} />;
      case 'text': return <FileText size={16} />;
      case 'quiz': return <HelpCircle size={16} />;
      case 'image': return <Image size={16} />;
      default: return <FileText size={16} />;
    }
  };

  return (
    <StyledWrapper>
      <div className="course-editor">
        {/* Header */}
        <div className="editor-header">
          <div className="header-left">
            <button className="back-btn" onClick={onBack}>
              <ArrowLeft size={20} />
              Volver a Cursos
            </button>
            <div className="course-info">
              <h1>{courseId ? 'Editar Curso' : 'Crear Nuevo Curso'}</h1>
              <span className="course-status">{course.status === 'published' ? 'Publicado' : 'Borrador'}</span>
            </div>
          </div>
          <div className="header-actions">
            <button className="preview-btn">
              <Eye size={20} />
              Vista Previa
            </button>
            <button className="save-btn" onClick={handleSave}>
              <Save size={20} />
              Guardar
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="editor-tabs">
          <button 
            className={`tab ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            Información General
          </button>
          <button 
            className={`tab ${activeTab === 'content' ? 'active' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            Contenido
          </button>
          <button 
            className={`tab ${activeTab === 'evaluations' ? 'active' : ''}`}
            onClick={() => setActiveTab('evaluations')}
          >
            <ClipboardCheck size={16} />
            Evaluaciones
          </button>
          <button 
            className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Configuración
          </button>
        </div>

        {/* Content */}
        <div className="editor-content">
          {activeTab === 'general' && (
            <div className="general-tab">
              <div className="form-grid">
                <div className="form-section">
                  <h3>Información Básica</h3>
                  
                  <div className="form-group">
                    <label>Título del Curso *</label>
                    <input
                      type="text"
                      value={course.title}
                      onChange={(e) => handleCourseChange('title', e.target.value)}
                      placeholder="Ej: Cálculo Diferencial Avanzado"
                    />
                  </div>

                  <div className="form-group">
                    <label>Descripción Corta *</label>
                    <input
                      type="text"
                      value={course.shortDescription}
                      onChange={(e) => handleCourseChange('shortDescription', e.target.value)}
                      placeholder="Descripción que aparecerá en las tarjetas de curso"
                    />
                  </div>

                  <div className="form-group">
                    <label>Descripción Completa *</label>
                    <textarea
                      value={course.description}
                      onChange={(e) => handleCourseChange('description', e.target.value)}
                      placeholder="Describe detalladamente de qué trata el curso..."
                      rows={5}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Categoría *</label>
                      <select
                        value={course.category}
                        onChange={(e) => handleCourseChange('category', e.target.value)}
                      >
                        <option value="">Seleccionar categoría</option>
                        <option value="matematicas">Matemáticas</option>
                        <option value="fisica">Física</option>
                        <option value="quimica">Química</option>
                        <option value="biologia">Biología</option>
                        <option value="programacion">Programación</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Nivel *</label>
                      <select
                        value={course.level}
                        onChange={(e) => handleCourseChange('level', e.target.value)}
                      >
                        <option value="principiante">Principiante</option>
                        <option value="intermedio">Intermedio</option>
                        <option value="avanzado">Avanzado</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Duración (semanas)</label>
                      <input
                        type="number"
                        value={course.duration}
                        onChange={(e) => handleCourseChange('duration', e.target.value)}
                        placeholder="8"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Imagen del Curso</h3>
                  <div className="image-upload">
                    <div className="upload-area">
                      <Upload size={48} />
                      <p>Arrastra una imagen aquí o haz clic para seleccionar</p>
                      <span>Recomendado: 1200x675px (16:9)</span>
                      <input type="file" accept="image/*" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Requisitos</h3>
                <div className="array-field">
                  {course.requirements.map((req, index) => (
                    <div key={index} className="array-item">
                      <input
                        type="text"
                        value={req}
                        onChange={(e) => handleArrayFieldChange('requirements', index, e.target.value)}
                        placeholder="Ej: Conocimientos básicos de álgebra"
                      />
                      <button 
                        type="button" 
                        onClick={() => removeArrayField('requirements', index)}
                        className="remove-btn"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button 
                    type="button" 
                    onClick={() => addArrayField('requirements')}
                    className="add-btn"
                  >
                    <Plus size={16} />
                    Agregar Requisito
                  </button>
                </div>
              </div>

              <div className="form-section">
                <h3>¿Qué aprenderán?</h3>
                <div className="array-field">
                  {course.whatYouLearn.map((item, index) => (
                    <div key={index} className="array-item">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleArrayFieldChange('whatYouLearn', index, e.target.value)}
                        placeholder="Ej: Resolver derivadas complejas"
                      />
                      <button 
                        type="button" 
                        onClick={() => removeArrayField('whatYouLearn', index)}
                        className="remove-btn"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button 
                    type="button" 
                    onClick={() => addArrayField('whatYouLearn')}
                    className="add-btn"
                  >
                    <Plus size={16} />
                    Agregar Beneficio
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="content-tab">
              <div className="content-header">
                <h3>Estructura del Curso</h3>
                <button className="add-section-btn" onClick={addSection}>
                  <Plus size={20} />
                  Agregar Sección
                </button>
              </div>

              <div className="sections-list">
                {sections.map((section, sectionIndex) => (
                  <div key={section.id} className="section-card">
                    <div className="section-header">
                      <div className="section-drag">
                        <GripVertical size={20} />
                      </div>
                      <div className="section-info">
                        <input
                          type="text"
                          value={section.title}
                          onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                          className="section-title-input"
                        />
                        <input
                          type="text"
                          value={section.description}
                          onChange={(e) => updateSection(section.id, 'description', e.target.value)}
                          placeholder="Descripción de la sección"
                          className="section-description-input"
                        />
                      </div>
                      <div className="section-actions">
                        <button 
                          className="add-lesson-btn"
                          onClick={() => addLesson(section.id)}
                        >
                          <Plus size={16} />
                          Lección
                        </button>
                      </div>
                    </div>

                    <div className="lessons-list">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <div key={lesson.id} className="lesson-item">
                          <div className="lesson-drag">
                            <GripVertical size={16} />
                          </div>
                          <div className="lesson-type">
                            {getLessonIcon(lesson.type)}
                          </div>
                          <div className="lesson-content">
                            <input
                              type="text"
                              value={lesson.title}
                              placeholder="Título de la lección"
                              className="lesson-title-input"
                            />
                            <div className="lesson-meta">
                              <select value={lesson.type} className="lesson-type-select">
                                <option value="video">Video</option>
                                <option value="text">Texto</option>
                                <option value="quiz">Quiz</option>
                                <option value="assignment">Tarea</option>
                              </select>
                              <input
                                type="text"
                                value={lesson.duration}
                                placeholder="0:00"
                                className="lesson-duration-input"
                              />
                            </div>
                          </div>
                          <div className="lesson-actions">
                            <button className="edit-lesson-btn">
                              <Settings size={16} />
                            </button>
                            <button className="delete-lesson-btn">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {sections.length === 0 && (
                <div className="empty-content">
                  <div className="empty-icon">📚</div>
                  <h3>No hay contenido aún</h3>
                  <p>Comienza agregando tu primera sección al curso</p>
                  <button className="create-first-section" onClick={addSection}>
                    <Plus size={20} />
                    Crear Primera Sección
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-tab">
              <div className="form-section">
                <h3>Configuración del Curso</h3>
                
                <div className="form-group">
                  <label>Estado del Curso</label>
                  <select
                    value={course.status}
                    onChange={(e) => handleCourseChange('status', e.target.value)}
                  >
                    <option value="draft">Borrador</option>
                    <option value="published">Publicado</option>
                    <option value="archived">Archivado</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'evaluations' && (
            <div className="evaluations-tab">
              <div className="evaluations-header">
                <h3>Gestión de Evaluaciones</h3>
                <div className="evaluation-types">
                  <button 
                    className="create-evaluation-btn quiz"
                    onClick={() => addEvaluation('quiz')}
                  >
                    <Timer size={16} />
                    Crear Quiz
                  </button>
                  <button 
                    className="create-evaluation-btn exam"
                    onClick={() => addEvaluation('exam')}
                  >
                    <Award size={16} />
                    Crear Simulacro
                  </button>
                </div>
              </div>

              <div className="evaluations-grid">
                {evaluations.map(evaluation => (
                  <div key={evaluation.id} className={`evaluation-card ${evaluation.type}`}>
                    <div className="evaluation-header">
                      <div className="evaluation-type-badge">
                        {evaluation.type === 'quiz' ? (
                          <>
                            <Timer size={16} />
                            Quiz
                          </>
                        ) : (
                          <>
                            <Award size={16} />
                            Simulacro
                          </>
                        )}
                      </div>
                      <button 
                        className="delete-evaluation"
                        onClick={() => deleteEvaluation(evaluation.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="evaluation-content">
                      <div className="form-group">
                        <label>Título</label>
                        <input
                          type="text"
                          value={evaluation.title}
                          onChange={(e) => updateEvaluation(evaluation.id, 'title', e.target.value)}
                          placeholder="Título de la evaluación"
                        />
                      </div>

                      <div className="evaluation-config">
                        <div className="config-row">
                          <div className="form-group">
                            <label>Tiempo límite (min)</label>
                            <input
                              type="number"
                              value={evaluation.timeLimit}
                              onChange={(e) => updateEvaluation(evaluation.id, 'timeLimit', parseInt(e.target.value))}
                              min="1"
                            />
                          </div>
                          <div className="form-group">
                            <label>Intentos permitidos</label>
                            <input
                              type="number"
                              value={evaluation.attempts}
                              onChange={(e) => updateEvaluation(evaluation.id, 'attempts', parseInt(e.target.value))}
                              min="1"
                            />
                          </div>
                          <div className="form-group">
                            <label>Nota mínima (%)</label>
                            <input
                              type="number"
                              value={evaluation.passingGrade}
                              onChange={(e) => updateEvaluation(evaluation.id, 'passingGrade', parseInt(e.target.value))}
                              min="0"
                              max="100"
                            />
                          </div>
                        </div>

                        {evaluation.type === 'quiz' && (
                          <div className="form-group">
                            <label>Asociar a sección</label>
                            <select 
                              value={evaluation.sectionId || ''}
                              onChange={(e) => updateEvaluation(evaluation.id, 'sectionId', parseInt(e.target.value) || null)}
                            >
                              <option value="">Seleccionar sección</option>
                              {sections.map(section => (
                                <option key={section.id} value={section.id}>
                                  {section.title}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>

                      <div className="questions-section">
                        <div className="questions-header">
                          <h4>Preguntas ({evaluation.questions.length})</h4>
                          <button 
                            className="add-question-btn"
                            onClick={() => addQuestion(evaluation.id)}
                          >
                            <Plus size={16} />
                            Agregar Pregunta
                          </button>
                        </div>

                        <div className="questions-list">
                          {evaluation.questions.map((question, index) => (
                            <div key={question.id} className="question-item">
                              <div className="question-header">
                                <span className="question-number">#{index + 1}</span>
                                <select 
                                  value={question.type}
                                  onChange={(e) => updateQuestion(evaluation.id, question.id, 'type', e.target.value)}
                                  className="question-type-select"
                                >
                                  <option value="multiple-choice">Opción múltiple</option>
                                  <option value="true-false">Verdadero/Falso</option>
                                  <option value="open-ended">Respuesta abierta</option>
                                </select>
                                <input
                                  type="number"
                                  value={question.points}
                                  onChange={(e) => updateQuestion(evaluation.id, question.id, 'points', parseInt(e.target.value))}
                                  className="question-points"
                                  min="1"
                                  placeholder="Pts"
                                />
                                <button 
                                  className="delete-question"
                                  onClick={() => deleteQuestion(evaluation.id, question.id)}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>

                              <div className="question-content">
                                <textarea
                                  value={question.question}
                                  onChange={(e) => updateQuestion(evaluation.id, question.id, 'question', e.target.value)}
                                  placeholder="Escriba su pregunta aquí..."
                                  rows="2"
                                />

                                {question.type === 'multiple-choice' && (
                                  <div className="options-list">
                                    {question.options.map((option, optionIndex) => (
                                      <div key={optionIndex} className="option-item">
                                        <input
                                          type="radio"
                                          name={`question-${question.id}`}
                                          checked={question.correctAnswer === optionIndex}
                                          onChange={() => updateQuestion(evaluation.id, question.id, 'correctAnswer', optionIndex)}
                                        />
                                        <input
                                          type="text"
                                          value={option}
                                          onChange={(e) => {
                                            const newOptions = [...question.options];
                                            newOptions[optionIndex] = e.target.value;
                                            updateQuestion(evaluation.id, question.id, 'options', newOptions);
                                          }}
                                          placeholder={`Opción ${optionIndex + 1}`}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {question.type === 'true-false' && (
                                  <div className="true-false-options">
                                    <label>
                                      <input
                                        type="radio"
                                        name={`question-${question.id}`}
                                        checked={question.correctAnswer === 0}
                                        onChange={() => updateQuestion(evaluation.id, question.id, 'correctAnswer', 0)}
                                      />
                                      Verdadero
                                    </label>
                                    <label>
                                      <input
                                        type="radio"
                                        name={`question-${question.id}`}
                                        checked={question.correctAnswer === 1}
                                        onChange={() => updateQuestion(evaluation.id, question.id, 'correctAnswer', 1)}
                                      />
                                      Falso
                                    </label>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {evaluation.questions.length === 0 && (
                          <div className="empty-questions">
                            <Brain size={48} />
                            <h4>No hay preguntas aún</h4>
                            <p>Comienza agregando la primera pregunta a esta evaluación</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {evaluations.length === 0 && (
                <div className="empty-evaluations">
                  <ClipboardCheck size={64} />
                  <h3>No hay evaluaciones creadas</h3>
                  <p>Crea quizzes cortos para lecciones específicas o simulacros completos para evaluar todo el curso</p>
                  <div className="empty-actions">
                    <button 
                      className="create-evaluation-btn quiz"
                      onClick={() => addEvaluation('quiz')}
                    >
                      <Timer size={16} />
                      Crear primer Quiz
                    </button>
                    <button 
                      className="create-evaluation-btn exam"
                      onClick={() => addEvaluation('exam')}
                    >
                      <Award size={16} />
                      Crear primer Simulacro
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .course-editor {
    max-width: 1200px;
    margin: 0 auto;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  /* Header */
  .editor-header {
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
    border-color: #cbd5e1;
  }

  .course-info h1 {
    margin: 0;
    color: #2c3e50;
  }

  .course-status {
    background: #10b981;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .header-actions {
    display: flex;
    gap: 1rem;
  }

  .preview-btn, .save-btn {
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

  .preview-btn {
    background: #f1f5f9;
    color: #475569;
    border: 1px solid #e2e8f0;
  }

  .save-btn {
    background: linear-gradient(135deg, #1abc9c 0%, #16a085 100%);
    color: white;
  }

  .preview-btn:hover, .save-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }

  /* Tabs */
  .editor-tabs {
    display: flex;
    border-bottom: 1px solid #e2e8f0;
    background: white;
  }

  .tab {
    padding: 1rem 1.5rem;
    border: none;
    background: none;
    color: #64748b;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    transition: all 0.3s ease;
  }

  .tab.active {
    color: #1abc9c;
    border-bottom-color: #1abc9c;
  }

  .tab:hover {
    background: #f8fafc;
  }

  /* Content */
  .editor-content {
    padding: 2rem;
  }

  /* General Tab */
  .form-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .form-section {
    margin-bottom: 2rem;
  }

  .form-section h3 {
    color: #2c3e50;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e2e8f0;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #374151;
    font-weight: 500;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 0.9rem;
    transition: border-color 0.3s ease;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #1abc9c;
    box-shadow: 0 0 0 3px rgba(26, 188, 156, 0.1);
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  /* Image Upload */
  .image-upload {
    position: relative;
  }

  .upload-area {
    border: 2px dashed #cbd5e1;
    border-radius: 8px;
    padding: 2rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .upload-area:hover {
    border-color: #1abc9c;
    background: #f0fff4;
  }

  .upload-area input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
  }

  .upload-area p {
    margin: 0.5rem 0;
    color: #64748b;
  }

  .upload-area span {
    font-size: 0.8rem;
    color: #94a3b8;
  }

  /* Array Fields */
  .array-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .array-item {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .array-item input {
    flex: 1;
  }

  .remove-btn {
    background: #ef4444;
    color: white;
    border: none;
    padding: 0.5rem;
    border-radius: 4px;
    cursor: pointer;
  }

  .add-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #f1f5f9;
    color: #475569;
    border: 1px dashed #cbd5e1;
    padding: 0.75rem;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 0.5rem;
  }

  /* Content Tab */
  .content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .add-section-btn {
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

  .sections-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .section-card {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: #f8fafc;
  }

  .section-header {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
    border-bottom: 1px solid #e2e8f0;
  }

  .section-drag {
    cursor: grab;
    color: #94a3b8;
    padding: 0.5rem 0;
  }

  .section-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .section-title-input {
    font-size: 1.1rem;
    font-weight: 600;
    border: none;
    background: transparent;
    padding: 0.25rem 0;
  }

  .section-description-input {
    font-size: 0.9rem;
    color: #64748b;
    border: none;
    background: transparent;
    padding: 0.25rem 0;
  }

  .add-lesson-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #3b82f6;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.8rem;
    cursor: pointer;
  }

  .lessons-list {
    padding: 0 1rem 1rem;
  }

  .lesson-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    margin-bottom: 0.5rem;
  }

  .lesson-drag {
    cursor: grab;
    color: #94a3b8;
  }

  .lesson-type {
    color: #64748b;
  }

  .lesson-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .lesson-title-input {
    border: none;
    background: transparent;
    font-weight: 500;
    padding: 0.25rem 0;
  }

  .lesson-meta {
    display: flex;
    gap: 1rem;
  }

  .lesson-type-select,
  .lesson-duration-input {
    border: none;
    background: #f8fafc;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
  }

  .lesson-duration-input {
    width: 60px;
  }

  .lesson-actions {
    display: flex;
    gap: 0.5rem;
  }

  .edit-lesson-btn,
  .delete-lesson-btn {
    background: none;
    border: none;
    padding: 0.5rem;
    border-radius: 4px;
    cursor: pointer;
    color: #64748b;
  }

  .delete-lesson-btn:hover {
    color: #ef4444;
    background: #fef2f2;
  }

  .edit-lesson-btn:hover {
    color: #3b82f6;
    background: #eff6ff;
  }

  /* Empty State */
  .empty-content {
    text-align: center;
    padding: 4rem 2rem;
  }

  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .empty-content h3 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .empty-content p {
    color: #64748b;
    margin-bottom: 2rem;
  }

  .create-first-section {
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
  }

  /* Evaluations Tab */
  .evaluations-tab {
    padding: 2rem;
  }

  .evaluations-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .evaluations-header h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
  }

  .evaluation-types {
    display: flex;
    gap: 1rem;
  }

  .create-evaluation-btn {
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

  .create-evaluation-btn.quiz {
    background: #3b82f6;
    color: white;
  }

  .create-evaluation-btn.quiz:hover {
    background: #2563eb;
    transform: translateY(-2px);
  }

  .create-evaluation-btn.exam {
    background: #10b981;
    color: white;
  }

  .create-evaluation-btn.exam:hover {
    background: #059669;
    transform: translateY(-2px);
  }

  .evaluations-grid {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .evaluation-card {
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .evaluation-card.quiz {
    border-left: 4px solid #3b82f6;
  }

  .evaluation-card.exam {
    border-left: 4px solid #10b981;
  }

  .evaluation-card:hover {
    box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1);
  }

  .evaluation-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
  }

  .evaluation-type-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .evaluation-card.quiz .evaluation-type-badge {
    background: #dbeafe;
    color: #1e40af;
  }

  .evaluation-card.exam .evaluation-type-badge {
    background: #d1fae5;
    color: #065f46;
  }

  .delete-evaluation {
    background: none;
    border: none;
    color: #ef4444;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 6px;
    transition: all 0.3s ease;
  }

  .delete-evaluation:hover {
    background: #fef2f2;
  }

  .evaluation-content {
    padding: 1.5rem;
  }

  .evaluation-config {
    margin: 1rem 0;
  }

  .config-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .questions-section {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e2e8f0;
  }

  .questions-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .questions-header h4 {
    margin: 0;
    color: #1e293b;
  }

  .add-question-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #f59e0b;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .add-question-btn:hover {
    background: #d97706;
  }

  .questions-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .question-item {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1rem;
  }

  .question-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }

  .question-number {
    background: #64748b;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 600;
    min-width: 30px;
    text-align: center;
  }

  .question-type-select {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background: white;
  }

  .question-points {
    width: 80px;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    text-align: center;
  }

  .delete-question {
    background: none;
    border: none;
    color: #ef4444;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    transition: all 0.3s ease;
  }

  .delete-question:hover {
    background: #fef2f2;
  }

  .question-content textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-family: inherit;
    resize: vertical;
    margin-bottom: 1rem;
  }

  .options-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .option-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .option-item input[type="text"] {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
  }

  .true-false-options {
    display: flex;
    gap: 2rem;
  }

  .true-false-options label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  .empty-questions, .empty-evaluations {
    text-align: center;
    padding: 3rem 2rem;
    color: #64748b;
  }

  .empty-questions svg, .empty-evaluations svg {
    color: #cbd5e1;
    margin-bottom: 1rem;
  }

  .empty-questions h4, .empty-evaluations h3 {
    margin: 0 0 0.5rem 0;
    color: #475569;
  }

  .empty-questions p, .empty-evaluations p {
    margin: 0 0 2rem 0;
    color: #64748b;
  }

  .empty-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .editor-header {
      flex-direction: column;
      gap: 1rem;
      align-items: stretch;
    }

    .header-left {
      justify-content: space-between;
    }

    .form-grid {
      grid-template-columns: 1fr;
    }

    .editor-tabs {
      overflow-x: auto;
    }

    .tab {
      flex-shrink: 0;
    }

    .section-header {
      flex-direction: column;
      align-items: stretch;
    }

    .lesson-meta {
      flex-direction: column;
    }
  }
`;

export default CourseEditor;
