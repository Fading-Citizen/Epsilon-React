import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  Plus, 
  Trash2, 
  Save, 
  Eye, 
  ArrowLeft,
  Timer,
  Award,
  Users,
  Settings,
  Play,
  Image,
  Video,
  FileText,
  Move,
  Copy,
  Edit3
} from 'lucide-react';
import QuestionForm from './QuestionForm';
import VideoEmbed from './VideoEmbed';

const QuizBuilder = ({ type, quiz, onSave, onCancel }) => {
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    type: type || 'quiz', // 'quiz', 'exam', 'simulacro'
    timeLimit: type === 'exam' ? 120 : type === 'simulacro' ? 180 : 15,
    attempts: type === 'exam' ? 2 : type === 'simulacro' ? 1 : 3,
    passingGrade: type === 'exam' ? 75 : type === 'simulacro' ? 80 : 70,
    randomizeQuestions: type === 'simulacro' ? true : false,
    showCorrectAnswers: type === 'simulacro' ? false : true,
    allowRetake: type === 'simulacro' ? false : true,
    isIndependent: type === 'simulacro' ? true : false, // Simulacros SÍ son independientes
    courseId: type === 'simulacro' ? 0 : '',
    course: type === 'simulacro' ? 'Independiente' : '',
    dueDate: '',
    assignedTo: [], // IDs de estudiantes/grupos
    assignedGroups: [], // IDs de grupos asignados (específico para simulacros)
    status: 'draft' // 'draft', 'published', 'archived'
  });

  const [questions, setQuestions] = useState([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [activeTab, setActiveTab] = useState('builder');
  const [showPreview, setShowPreview] = useState(false);

  // Datos de ejemplo para estudiantes y grupos
  const availableStudents = [
    { id: 1, name: 'Ana García', email: 'ana@email.com' },
    { id: 2, name: 'Luis Pérez', email: 'luis@email.com' },
    { id: 3, name: 'María López', email: 'maria@email.com' },
    { id: 4, name: 'Carlos Ruiz', email: 'carlos@email.com' }
  ];

  const availableGroups = [
    { id: 1, name: 'Grupo A - Avanzados', students: 15 },
    { id: 2, name: 'Grupo B - Intermedios', students: 12 },
    { id: 3, name: 'Grupo C - Principiantes', students: 18 }
  ];

  // Datos de cursos disponibles
  const availableCourses = [
    { id: 0, title: 'Acceso Libre (Sin curso específico)' },
    { id: 1, title: 'Cálculo Diferencial Avanzado' },
    { id: 2, title: 'Álgebra Linear Aplicada' },
    { id: 3, title: 'Física Cuántica Básica' }
  ];

  // Cargar datos si estamos editando
  useEffect(() => {
    if (quiz) {
      setQuizData({
        title: quiz.title || '',
        description: quiz.description || '',
        type: quiz.type || type || 'quiz',
        timeLimit: quiz.timeLimit || (type === 'exam' ? 120 : type === 'simulacro' ? 180 : 15),
        attempts: quiz.attempts || (type === 'exam' ? 2 : type === 'simulacro' ? 1 : 3),
        passingGrade: quiz.passingGrade || (type === 'exam' ? 75 : type === 'simulacro' ? 80 : 70),
        randomizeQuestions: quiz.randomizeQuestions !== undefined ? quiz.randomizeQuestions : (type === 'simulacro'),
        showCorrectAnswers: quiz.showCorrectAnswers !== undefined ? quiz.showCorrectAnswers : (type !== 'simulacro'),
        allowRetake: quiz.allowRetake !== undefined ? quiz.allowRetake : (type !== 'simulacro'),
        isIndependent: quiz.isIndependent !== undefined ? quiz.isIndependent : (type === 'simulacro'), // Simulacros SÍ son independientes
        courseId: quiz.courseId !== undefined ? quiz.courseId : (type === 'simulacro' ? 0 : ''),
        course: quiz.course || (type === 'simulacro' ? 'Independiente' : ''),
        dueDate: quiz.dueDate || '',
        assignedTo: quiz.assignedTo || [],
        assignedGroups: quiz.assignedGroups || [], // Grupos asignados para simulacros
        status: quiz.status || 'draft'
      });
      // Cargar preguntas si existen y son un array
      if (quiz.questions && Array.isArray(quiz.questions)) {
        setQuestions(quiz.questions);
      } else {
        // Si no hay preguntas definidas o es solo un número, inicializar array vacío
        setQuestions([]);
      }
    }
  }, [quiz, type]);

  const loadQuizData = (id) => {
    // Simulación de datos cargados
    const exampleQuiz = {
      title: 'Quiz: Introducción al Cálculo',
      description: 'Evaluación de conceptos básicos de límites y derivadas',
      type: 'quiz',
      timeLimit: 20,
      attempts: 3,
      passingGrade: 70,
      randomizeQuestions: false,
      showCorrectAnswers: true,
      allowRetake: true,
      assignedTo: [1, 2],
      status: 'draft'
    };

    const exampleQuestions = [
      {
        id: 1,
        type: 'multiple-choice',
        title: '¿Qué es un límite?',
        content: 'Selecciona la definición más precisa de límite matemático:',
        options: [
          'El valor al que se acerca una función',
          'El punto donde la función se indefine',
          'La derivada de una función',
          'La integral de una función'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'El límite es el valor al que tiende una función cuando la variable independiente se acerca a un valor determinado.',
        media: null
      },
      {
        id: 2,
        type: 'video-question',
        title: 'Análisis de video: Cálculo de límites',
        content: 'Mira el siguiente video y responde:',
        videoUrl: 'https://www.youtube.com/watch?v=example',
        videoTitle: 'Cálculo de Límites - Ejemplo Práctico',
        options: [
          'El límite es 5',
          'El límite es infinito',
          'El límite no existe',
          'El límite es 0'
        ],
        correctAnswer: 0,
        points: 15,
        explanation: 'Como se muestra en el video, aplicando las propiedades de límites obtenemos 5.',
        requireVideoCompletion: true
      }
    ];

    setQuizData(exampleQuiz);
    setQuestions(exampleQuestions);
  };

  const handleQuizChange = (field, value) => {
    setQuizData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Si cambió el curso, actualizar el estado independiente (solo para quiz y exams, no simulacros)
      if (field === 'courseId' && prev.type !== 'simulacro') {
        const courseId = value === '' ? null : parseInt(value);
        const course = availableCourses.find(c => c.id === courseId);
        const isIndependent = courseId === 0 || courseId === null;
        newData.isIndependent = isIndependent;
        newData.course = course ? course.title : (isIndependent ? 'Acceso Libre' : '');
        newData.courseId = courseId;
        // Limpiar fecha si es independiente
        if (isIndependent) {
          newData.dueDate = '';
        }
      }
      
      // Los simulacros siempre mantienen su estado independiente
      if (prev.type === 'simulacro') {
        newData.isIndependent = true;
        newData.course = 'Independiente';
        newData.courseId = 0;
      }
      
      return newData;
    });
  };

  const addQuestion = () => {
    setEditingQuestion(null);
    setShowQuestionForm(true);
  };

  const editQuestion = (question) => {
    setEditingQuestion(question);
    setShowQuestionForm(true);
  };

  const saveQuestion = (questionData) => {
    if (editingQuestion) {
      // Editar pregunta existente
      setQuestions(prev => prev.map(q => 
        q.id === editingQuestion.id ? { ...questionData, id: editingQuestion.id } : q
      ));
    } else {
      // Agregar nueva pregunta
      const newQuestion = {
        ...questionData,
        id: Date.now()
      };
      setQuestions(prev => [...prev, newQuestion]);
    }
    setShowQuestionForm(false);
    setEditingQuestion(null);
  };

  const deleteQuestion = (questionId) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId));
  };

  const duplicateQuestion = (question) => {
    const duplicated = {
      ...question,
      id: Date.now(),
      title: question.title + ' (Copia)'
    };
    setQuestions(prev => [...prev, duplicated]);
  };

  const moveQuestion = (questionId, direction) => {
    const currentIndex = questions.findIndex(q => q.id === questionId);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === questions.length - 1)
    ) {
      return;
    }

    const newQuestions = [...questions];
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    [newQuestions[currentIndex], newQuestions[targetIndex]] = 
    [newQuestions[targetIndex], newQuestions[currentIndex]];
    
    setQuestions(newQuestions);
  };

  const calculateTotalPoints = () => {
    return questions.reduce((total, q) => total + (q.points || 0), 0);
  };

  const handleSave = () => {
    // Validación básica
    if (!quizData.title.trim()) {
      alert('El título es requerido');
      return;
    }

    // Los simulacros son independientes y no requieren validación de grupos (opcional)
    // Solo los quiz y exams requieren validación de curso
    if (!quizData.isIndependent && !quizData.courseId && quizData.type !== 'simulacro') {
      alert('Debe seleccionar un curso o marcar como acceso libre');
      return;
    }

    if (!quizData.isIndependent && !quizData.dueDate && quizData.type !== 'simulacro') {
      alert('Las evaluaciones vinculadas a cursos requieren una fecha límite');
      return;
    }

    if (questions.length === 0) {
      alert('Debe agregar al menos una pregunta');
      return;
    }

    const finalQuizData = {
      ...quizData,
      questions,
      totalPoints: calculateTotalPoints(),
      createdAt: quiz ? quiz.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSave && onSave(finalQuizData);
  };

  const getQuestionTypeIcon = (type) => {
    switch (type) {
      case 'multiple-choice': return <FileText size={16} />;
      case 'true-false': return <FileText size={16} />;
      case 'short-answer': return <Edit3 size={16} />;
      case 'video-question': return <Video size={16} />;
      case 'image-question': return <Image size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const getQuestionTypeName = (type) => {
    const types = {
      'multiple-choice': 'Opción múltiple',
      'true-false': 'Verdadero/Falso',
      'short-answer': 'Respuesta corta',
      'video-question': 'Pregunta con video',
      'image-question': 'Pregunta con imagen'
    };
    return types[type] || type;
  };

  // Función para obtener el nombre del tipo
  const getTypeName = (type) => {
    switch (type) {
      case 'quiz': return 'Quiz';
      case 'exam': return 'Examen';
      case 'simulacro': return 'Simulacro';
      default: return 'Evaluación';
    }
  };

  if (showQuestionForm) {
    return (
      <QuestionForm
        question={editingQuestion}
        onSave={saveQuestion}
        onCancel={() => {
          setShowQuestionForm(false);
          setEditingQuestion(null);
        }}
      />
    );
  }

  return (
    <StyledWrapper>
      <div className="quiz-builder">
        {/* Header */}
        <div className="builder-header">
          <div className="header-left">
            <button className="back-btn" onClick={onCancel}>
              <ArrowLeft size={20} />
              Volver
            </button>
            <div className="quiz-info">
              <h1>{quiz ? 'Editar' : 'Crear'} {getTypeName(quizData.type)}</h1>
              <span className="quiz-status">{quizData.status === 'published' ? 'Publicado' : 'Borrador'}</span>
            </div>
          </div>
          <div className="header-actions">
            <button 
              className="preview-btn"
              onClick={() => setShowPreview(true)}
            >
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
        <div className="builder-tabs">
          <button 
            className={`tab ${activeTab === 'builder' ? 'active' : ''}`}
            onClick={() => setActiveTab('builder')}
          >
            Constructor
          </button>
          <button 
            className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={16} />
            Configuración
          </button>
          <button 
            className={`tab ${activeTab === 'assign' ? 'active' : ''}`}
            onClick={() => setActiveTab('assign')}
          >
            <Users size={16} />
            Asignación
          </button>
        </div>

        {/* Content */}
        <div className="builder-content">
          {activeTab === 'builder' && (
            <div className="builder-tab">
              {/* Quiz Basic Info */}
              <div className="quiz-basic-info">
                <div className="form-group">
                  <label>Título del {getTypeName(quizData.type)}</label>
                  <input
                    type="text"
                    value={quizData.title}
                    onChange={(e) => handleQuizChange('title', e.target.value)}
                    placeholder="Ej: Quiz: Introducción al Cálculo"
                  />
                </div>
                <div className="form-group">
                  <label>Descripción</label>
                  <textarea
                    value={quizData.description}
                    onChange={(e) => handleQuizChange('description', e.target.value)}
                    placeholder="Describe brevemente el contenido de esta evaluación..."
                    rows="3"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Tipo</label>
                    <select 
                      value={quizData.type}
                      onChange={(e) => handleQuizChange('type', e.target.value)}
                    >
                      <option value="quiz">Quiz (Evaluación corta)</option>
                      <option value="exam">Simulacro (Evaluación completa)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Tiempo límite (minutos)</label>
                    <input
                      type="number"
                      value={quizData.timeLimit || ''}
                      onChange={(e) => handleQuizChange('timeLimit', parseInt(e.target.value) || 15)}
                      min="1"
                    />
                  </div>
                </div>
              </div>

              {/* Questions Section */}
              <div className="questions-section">
                <div className="questions-header">
                  <div className="header-info">
                    <h3>Preguntas ({questions.length})</h3>
                    <div className="questions-stats">
                      <span>Total: {calculateTotalPoints()} puntos</span>
                    </div>
                  </div>
                  <button className="add-question-btn" onClick={addQuestion}>
                    <Plus size={16} />
                    Agregar Pregunta
                  </button>
                </div>

                <div className="questions-list">
                  {questions.map((question, index) => (
                    <div key={question.id} className="question-item">
                      <div className="question-header">
                        <div className="question-info">
                          <span className="question-number">#{index + 1}</span>
                          <div className="question-type">
                            {getQuestionTypeIcon(question.type)}
                            <span>{getQuestionTypeName(question.type)}</span>
                          </div>
                          <span className="question-points">{question.points} pts</span>
                        </div>
                        <div className="question-actions">
                          <button 
                            className="move-btn"
                            onClick={() => moveQuestion(question.id, 'up')}
                            disabled={index === 0}
                            title="Mover arriba"
                          >
                            ↑
                          </button>
                          <button 
                            className="move-btn"
                            onClick={() => moveQuestion(question.id, 'down')}
                            disabled={index === questions.length - 1}
                            title="Mover abajo"
                          >
                            ↓
                          </button>
                          <button 
                            className="action-btn copy"
                            onClick={() => duplicateQuestion(question)}
                            title="Duplicar"
                          >
                            <Copy size={14} />
                          </button>
                          <button 
                            className="action-btn edit"
                            onClick={() => editQuestion(question)}
                            title="Editar"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button 
                            className="action-btn delete"
                            onClick={() => deleteQuestion(question.id)}
                            title="Eliminar"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="question-content">
                        <h4>{question.title}</h4>
                        <p>{question.content}</p>
                        {question.type === 'video-question' && question.videoUrl && (
                          <div className="video-preview">
                            <Video size={16} />
                            <span>Video: {question.videoTitle || 'Video adjunto'}</span>
                          </div>
                        )}
                        {question.options && (
                          <div className="options-preview">
                            {question.options.map((option, optionIndex) => (
                              <div 
                                key={optionIndex} 
                                className={`option ${optionIndex === question.correctAnswer ? 'correct' : ''}`}
                              >
                                {optionIndex === question.correctAnswer && '✓ '}{option}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {questions.length === 0 && (
                  <div className="empty-questions">
                    <FileText size={48} />
                    <h4>No hay preguntas aún</h4>
                    <p>Comienza agregando la primera pregunta a tu {quizData.type === 'quiz' ? 'quiz' : 'simulacro'}</p>
                    <button className="add-first-question" onClick={addQuestion}>
                      <Plus size={16} />
                      Agregar Primera Pregunta
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-tab">
              <div className="settings-section">
                <h3>Configuración Básica</h3>
                
                <div className="form-row">
                  {quizData.type !== 'simulacro' && (
                    <div className="form-group">
                      <label>Curso</label>
                      <select 
                        value={quizData.courseId || ''}
                        onChange={(e) => handleQuizChange('courseId', e.target.value)}
                      >
                        <option value="">Seleccionar curso</option>
                        {availableCourses.map(course => (
                          <option key={course.id} value={course.id}>
                            {course.title}
                          </option>
                        ))}
                      </select>
                      {quizData.isIndependent && (
                        <small className="independent-note">
                          Esta evaluación será de acceso libre para todos los estudiantes
                        </small>
                      )}
                    </div>
                  )}
                  
                  {quizData.type === 'simulacro' && (
                    <div className="form-group">
                      <label>Tipo de Evaluación</label>
                      <div className="simulacro-info">
                        <p><strong>🎯 Simulacro Independiente</strong></p>
                        <small className="independent-note">
                          Los simulacros son evaluaciones independientes. Los estudiantes pueden pagarlos por separado para practicar.
                        </small>
                      </div>
                    </div>
                  )}
                  
                  {!quizData.isIndependent && (
                    <div className="form-group">
                      <label>Fecha límite</label>
                      <input
                        type="date"
                        value={quizData.dueDate || ''}
                        onChange={(e) => handleQuizChange('dueDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Información de grupos asignados para simulacros */}
              {quizData.type === 'simulacro' && quizData.assignedGroups && quizData.assignedGroups.length > 0 && (
                <div className="settings-section">
                  <h3>Grupos Asignados</h3>
                  <div className="assigned-groups-info">
                    {quizData.assignedGroups.map(groupId => {
                      const group = availableGroups.find(g => g.id === groupId);
                      return group ? (
                        <div key={group.id} className="assigned-group-item">
                          <div className="group-name">{group.name}</div>
                          <div className="group-students">{group.students} estudiantes</div>
                        </div>
                      ) : null;
                    })}
                  </div>
                  <small className="groups-note">
                    Para cambiar la asignación de grupos, usa la pestaña "Asignación"
                  </small>
                </div>
              )}

              <div className="settings-section">
                <h3>Configuración de Evaluación</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Intentos permitidos</label>
                    <input
                      type="number"
                      value={quizData.attempts || ''}
                      onChange={(e) => handleQuizChange('attempts', parseInt(e.target.value) || 1)}
                      min="1"
                      max="10"
                    />
                  </div>
                  <div className="form-group">
                    <label>Nota mínima para aprobar (%)</label>
                    <input
                      type="number"
                      value={quizData.passingGrade || ''}
                      onChange={(e) => handleQuizChange('passingGrade', parseInt(e.target.value) || 0)}
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={quizData.randomizeQuestions}
                      onChange={(e) => handleQuizChange('randomizeQuestions', e.target.checked)}
                    />
                    Randomizar orden de preguntas
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={quizData.showCorrectAnswers}
                      onChange={(e) => handleQuizChange('showCorrectAnswers', e.target.checked)}
                    />
                    Mostrar respuestas correctas al finalizar
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={quizData.allowRetake}
                      onChange={(e) => handleQuizChange('allowRetake', e.target.checked)}
                    />
                    Permitir repetir evaluación
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'assign' && (
            <div className="assign-tab">
              {quizData.isIndependent ? (
                <div className="independent-access">
                  <div className="access-info">
                    {quizData.type === 'simulacro' ? (
                      <div>
                        <h3>🎯 Simulacro Independiente</h3>
                        <p>Este simulacro es una evaluación independiente que no está vinculada a ningún curso específico.</p>
                        
                        <div className="simulacro-options">
                          <div className="access-option">
                            <h4>Opción 1: Acceso Libre</h4>
                            <p>Cualquier estudiante puede acceder y pagar por este simulacro.</p>
                          </div>
                          
                          <div className="access-option">
                            <h4>Opción 2: Asignación Específica</h4>
                            <p>Asignar el simulacro a grupos o estudiantes específicos.</p>
                            <button 
                              className="assign-btn"
                              onClick={() => {
                                // Toggle entre acceso libre y asignación específica
                                handleQuizChange('isIndependent', false);
                              }}
                            >
                              Configurar Asignaciones Específicas
                            </button>
                          </div>
                        </div>
                        
                        {(quizData.assignedGroups?.length > 0 || quizData.assignedTo?.length > 0) && (
                          <div className="assignment-summary">
                            <h4>✅ Asignaciones Configuradas</h4>
                            {quizData.assignedGroups?.length > 0 && (
                              <p>Grupos asignados: {quizData.assignedGroups.length}</p>
                            )}
                            {quizData.assignedTo?.length > 0 && (
                              <p>Estudiantes asignados: {quizData.assignedTo.length}</p>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <h3>Acceso Libre</h3>
                        <p>Esta evaluación está configurada como de acceso libre.</p>
                        <div className="access-details">
                          <div className="detail-item">
                            <strong>Acceso:</strong> Todos los estudiantes podrán acceder
                          </div>
                          <div className="detail-item">
                            <strong>Disponibilidad:</strong> Permanente (sin fecha límite)
                          </div>
                          <div className="detail-item">
                            <strong>Visibilidad:</strong> Pública en la plataforma
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="access-note">
                      <p><strong>Nota:</strong> {quizData.type === 'simulacro' 
                        ? 'Los simulacros independientes pueden tener acceso libre o asignaciones específicas.'
                        : 'Para restringir el acceso a estudiantes específicos, cambia la configuración en la pestaña "Configuración" y selecciona un curso específico.'
                      }</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="assign-section">
                  {quizData.type === 'simulacro' ? (
                    <div>
                      <h3>Asignar Simulacro a Grupos</h3>
                      <p className="assignment-note">
                        <strong>Los simulacros deben ser asignados a grupos específicos de estudiantes.</strong>
                      </p>
                      
                      <div className="groups-section">
                        <h4>Seleccionar Grupos</h4>
                        <div className="groups-list">
                          {availableGroups.map(group => (
                            <div key={group.id} className="group-item">
                              <label>
                                <input 
                                  type="checkbox" 
                                  checked={quizData.assignedGroups.includes(group.id)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      handleQuizChange('assignedGroups', [...quizData.assignedGroups, group.id]);
                                    } else {
                                      handleQuizChange('assignedGroups', quizData.assignedGroups.filter(id => id !== group.id));
                                    }
                                  }}
                                />
                                <div className="group-info">
                                  <span className="group-name">{group.name}</span>
                                  <span className="group-students">{group.students} estudiantes</span>
                                </div>
                              </label>
                            </div>
                          ))}
                        </div>
                        
                        {quizData.assignedGroups.length === 0 && (
                          <div className="warning-message">
                            ⚠️ Debes seleccionar al menos un grupo para el simulacro
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3>Asignar a Estudiantes</h3>
                      
                      <div className="assign-options">
                        <div className="students-section">
                          <h4>Estudiantes Individuales</h4>
                          <div className="students-list">
                            {availableStudents.map(student => (
                              <label key={student.id} className="student-item">
                                <input
                                  type="checkbox"
                                  checked={quizData.assignedTo.includes(student.id)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      handleQuizChange('assignedTo', [...quizData.assignedTo, student.id]);
                                    } else {
                                      handleQuizChange('assignedTo', quizData.assignedTo.filter(id => id !== student.id));
                                    }
                                  }}
                                />
                                <div className="student-info">
                                  <span className="student-name">{student.name}</span>
                                  <span className="student-email">{student.email}</span>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="groups-section">
                          <h4>Grupos</h4>
                          <div className="groups-list">
                            {availableGroups.map(group => (
                              <div key={group.id} className="group-item">
                                <label>
                                  <input type="checkbox" />
                                  <div className="group-info">
                                    <span className="group-name">{group.name}</span>
                                    <span className="group-students">{group.students} estudiantes</span>
                                  </div>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
  .quiz-builder {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  /* Header */
  .builder-header {
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

  .quiz-info h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
  }

  .quiz-status {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
    background: #f59e0b;
    color: white;
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
    color: #64748b;
  }

  .preview-btn:hover {
    background: #e2e8f0;
  }

  .save-btn {
    background: #3b82f6;
    color: white;
  }

  .save-btn:hover {
    background: #2563eb;
  }

  /* Tabs */
  .builder-tabs {
    display: flex;
    border-bottom: 1px solid #e2e8f0;
    background: white;
  }

  .tab {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    border: none;
    background: none;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;
    color: #64748b;
  }

  .tab.active {
    color: #3b82f6;
    border-bottom-color: #3b82f6;
    background: #f8fafc;
  }

  .tab:hover:not(.active) {
    background: #f8fafc;
  }

  /* Content */
  .builder-content {
    padding: 2rem;
  }

  /* Quiz Basic Info */
  .quiz-basic-info {
    background: #f8fafc;
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 2rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .form-group label {
    font-weight: 600;
    color: #374151;
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

  /* Questions Section */
  .questions-section {
    margin-top: 2rem;
  }

  .questions-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e2e8f0;
  }

  .header-info h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 0.5rem 0;
  }

  .questions-stats {
    color: #64748b;
    font-size: 0.9rem;
  }

  .add-question-btn {
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

  .add-question-btn:hover {
    background: #059669;
  }

  /* Question Items */
  .questions-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .question-item {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .question-item:hover {
    box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1);
  }

  .question-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
  }

  .question-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .question-number {
    background: #3b82f6;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .question-type {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #64748b;
    font-size: 0.9rem;
  }

  .question-points {
    background: #10b981;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .question-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .move-btn {
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;
  }

  .move-btn:hover:not(:disabled) {
    background: #e2e8f0;
  }

  .move-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .action-btn {
    padding: 0.5rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: none;
  }

  .action-btn:hover {
    background: #f1f5f9;
  }

  .action-btn.copy { color: #3b82f6; }
  .action-btn.edit { color: #10b981; }
  .action-btn.delete { color: #ef4444; }

  .question-content {
    padding: 1.5rem;
  }

  .question-content h4 {
    margin: 0 0 0.5rem 0;
    color: #1e293b;
    font-size: 1.1rem;
  }

  .question-content p {
    margin: 0 0 1rem 0;
    color: #64748b;
    line-height: 1.5;
  }

  .video-preview {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background: #dbeafe;
    border-radius: 8px;
    color: #1e40af;
    margin-bottom: 1rem;
  }

  .options-preview {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .option {
    padding: 0.5rem 0.75rem;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 0.9rem;
  }

  .option.correct {
    background: #d1fae5;
    border-color: #10b981;
    color: #065f46;
    font-weight: 600;
  }

  /* Empty State */
  .empty-questions {
    text-align: center;
    padding: 4rem 2rem;
    color: #64748b;
  }

  .empty-questions svg {
    color: #cbd5e1;
    margin-bottom: 1rem;
  }

  .empty-questions h4 {
    margin: 0 0 0.5rem 0;
    color: #475569;
  }

  .empty-questions p {
    margin: 0 0 2rem 0;
  }

  .add-first-question {
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
    margin: 0 auto;
  }

  .add-first-question:hover {
    background: #059669;
  }

  /* Settings Tab */
  .settings-section {
    max-width: 600px;
  }

  .settings-section h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 2rem 0;
  }

  .checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    padding: 1rem;
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

  /* Assign Tab */
  .assign-section h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 2rem 0;
  }

  .assign-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .students-section h4,
  .groups-section h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #374151;
    margin: 0 0 1rem 0;
  }

  .students-list,
  .groups-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .student-item,
  .group-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background: #f8fafc;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .student-item:hover,
  .group-item:hover {
    background: #f1f5f9;
  }

  .student-item input[type="checkbox"],
  .group-item input[type="checkbox"] {
    width: 1.1rem;
    height: 1.1rem;
    accent-color: #3b82f6;
  }

  .student-info,
  .group-info {
    display: flex;
    flex-direction: column;
  }

  .student-name,
  .group-name {
    font-weight: 500;
    color: #1e293b;
  }

  .student-email,
  .group-students {
    font-size: 0.8rem;
    color: #64748b;
  }

  /* Simulacro Assignment Styles */
  .assignment-note {
    background: #fef3c7;
    border: 1px solid #f59e0b;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1.5rem;
  }

  .assignment-note strong {
    color: #92400e;
  }

  .warning-message {
    background: #fef2f2;
    border: 1px solid #ef4444;
    border-radius: 8px;
    padding: 1rem;
    margin-top: 1rem;
    color: #dc2626;
    font-size: 0.9rem;
    text-align: center;
  }

  /* Assigned Groups Info Styles */
  .assigned-groups-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .assigned-group-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    background: #f0f9ff;
    border: 1px solid #0ea5e9;
    border-radius: 8px;
  }

  .assigned-group-item .group-name {
    font-weight: 500;
    color: #0c4a6e;
  }

  .assigned-group-item .group-students {
    font-size: 0.9rem;
    color: #0369a1;
  }

  .groups-note {
    color: #64748b;
    font-style: italic;
  }

  /* Independent Access Styles */
  .independent-access {
    padding: 2rem;
    text-align: center;
  }

  .access-info {
    max-width: 500px;
    margin: 0 auto;
  }

  .access-info h3 {
    color: #10b981;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .access-info p {
    color: #64748b;
    margin-bottom: 2rem;
  }

  .access-details {
    background: #f0f9ff;
    border: 1px solid #0ea5e9;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    text-align: left;
  }

  .detail-item {
    margin-bottom: 0.75rem;
    color: #1e293b;
  }

  .detail-item:last-child {
    margin-bottom: 0;
  }

  .access-note {
    background: #fef3c7;
    border: 1px solid #f59e0b;
    border-radius: 8px;
    padding: 1rem;
    text-align: left;
  }

  .access-note p {
    margin: 0;
    color: #92400e;
    font-size: 0.9rem;
  }

  .simulacro-options {
    margin: 1.5rem 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .access-option {
    padding: 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    background: #fafafa;
    transition: all 0.3s ease;
  }

  .access-option:hover {
    border-color: #2196f3;
    background: #f0f8ff;
  }

  .access-option h4 {
    margin: 0 0 0.5rem 0;
    color: #333;
    font-size: 1.1rem;
  }

  .access-option p {
    margin: 0 0 1rem 0;
    color: #666;
    font-size: 0.9rem;
  }

  .assign-btn {
    background: #2196f3;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.3s ease;
  }

  .assign-btn:hover {
    background: #1976d2;
  }

  .assignment-summary {
    margin-top: 1rem;
    padding: 1rem;
    background: #e8f5e8;
    border: 1px solid #4caf50;
    border-radius: 8px;
  }

  .assignment-summary h4 {
    margin: 0 0 0.5rem 0;
    color: #2e7d32;
  }

  .assignment-summary p {
    margin: 0.25rem 0;
    color: #2e7d32;
    font-size: 0.9rem;
  }

  .simulacro-info {
    padding: 1rem;
    background: #f0f8ff;
    border: 2px solid #2196f3;
    border-radius: 8px;
    text-align: center;
  }

  .simulacro-info p {
    margin: 0 0 0.5rem 0;
    color: #1976d2;
    font-size: 1.1rem;
  }

  .independent-note {
    color: #10b981;
    font-size: 0.8rem;
    margin-top: 0.25rem;
    display: block;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .builder-header {
      flex-direction: column;
      gap: 1rem;
      align-items: stretch;
    }

    .form-row {
      grid-template-columns: 1fr;
    }

    .question-header {
      flex-direction: column;
      gap: 1rem;
      align-items: stretch;
    }

    .assign-options {
      grid-template-columns: 1fr;
    }

    .builder-tabs {
      overflow-x: auto;
    }

    .tab {
      flex-shrink: 0;
    }
  }
`;

export default QuizBuilder;
