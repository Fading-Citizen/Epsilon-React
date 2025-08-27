import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Play, 
  Pause, 
  RotateCcw, 
  Send, 
  ArrowLeft, 
  ArrowRight,
  Video,
  FileText,
  Eye,
  EyeOff,
  Flag,
  Save
} from 'lucide-react';

const StudentQuiz = ({ quiz, onSubmit, onExit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [videoProgress, setVideoProgress] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [autoSaved, setAutoSaved] = useState(false);
  
  const timerRef = useRef(null);
  const videoRefs = useRef({});

  // Simular datos del quiz si no se proporcionan
  const mockQuiz = {
    id: 'quiz-1',
    title: 'Quiz de Cálculo Diferencial',
    description: 'Evaluación sobre límites y derivadas',
    type: 'Quiz',
    duration: 30, // minutos
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        title: '¿Qué es un límite?',
        content: 'Define qué representa el concepto de límite en cálculo diferencial.',
        options: [
          'El valor que se aproxima una función',
          'El valor máximo de una función', 
          'El valor mínimo de una función',
          'El punto de inflexión'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Un límite es el valor al que se aproxima una función cuando la variable independiente se acerca a un valor determinado.'
      },
      {
        id: 'q2',
        type: 'video-question',
        title: 'Análisis de Video - Derivadas',
        content: 'Observa el siguiente video sobre derivadas y responde la pregunta.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        videoTitle: 'Introducción a las Derivadas',
        requireVideoCompletion: true,
        options: [
          'La derivada representa la velocidad',
          'La derivada representa la aceleración',
          'La derivada representa la pendiente',
          'Todas las anteriores'
        ],
        correctAnswer: 2,
        points: 15,
        explanation: 'La derivada en un punto representa la pendiente de la recta tangente a la función en ese punto.'
      },
      {
        id: 'q3',
        type: 'short-answer',
        title: 'Aplicación de la Regla de la Cadena',
        content: 'Explica con tus propias palabras cuándo y cómo se aplica la regla de la cadena.',
        points: 20,
        explanation: 'La regla de la cadena se aplica cuando derivamos funciones compuestas.'
      }
    ],
    settings: {
      showResults: true,
      allowRetakes: false,
      randomizeQuestions: false,
      showExplanations: true,
      passingGrade: 70
    }
  };

  const currentQuizData = quiz || mockQuiz;

  useEffect(() => {
    if (quizStarted && currentQuizData.duration) {
      setTimeRemaining(currentQuizData.duration * 60); // convertir a segundos
    }
  }, [quizStarted, currentQuizData.duration]);

  useEffect(() => {
    if (timeRemaining > 0 && quizStarted) {
      timerRef.current = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handleSubmitQuiz(true); // auto-submit cuando se acaba el tiempo
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeRemaining, quizStarted]);

  // Auto-guardar cada 30 segundos
  useEffect(() => {
    if (quizStarted) {
      const autoSaveInterval = setInterval(() => {
        handleAutoSave();
      }, 30000);

      return () => clearInterval(autoSaveInterval);
    }
  }, [quizStarted, answers]);

  const handleAutoSave = () => {
    // Simular auto-guardado
    console.log('Auto-guardando respuestas...', answers);
    setAutoSaved(true);
    setTimeout(() => setAutoSaved(false), 2000);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleVideoProgress = (questionId, progress, completed) => {
    setVideoProgress(prev => ({
      ...prev,
      [questionId]: { progress, completed }
    }));
  };

  const isVideoQuestionAnswerable = (question) => {
    if (question.type !== 'video-question' || !question.requireVideoCompletion) {
      return true;
    }
    return videoProgress[question.id]?.completed || false;
  };

  const toggleQuestionFlag = (questionId) => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const getAnsweredQuestionsCount = () => {
    return Object.keys(answers).length;
  };

  const handleSubmitQuiz = (autoSubmit = false) => {
    if (!autoSubmit) {
      setShowSubmitConfirm(true);
      return;
    }

    const submission = {
      quizId: currentQuizData.id,
      answers: answers,
      timeSpent: currentQuizData.duration * 60 - (timeRemaining || 0),
      submittedAt: new Date().toISOString(),
      autoSubmitted: autoSubmit
    };

    onSubmit(submission);
  };

  const confirmSubmit = () => {
    handleSubmitQuiz(true);
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < currentQuizData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const goToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const currentQ = currentQuizData.questions[currentQuestion];
  const isLastQuestion = currentQuestion === currentQuizData.questions.length - 1;
  const canAnswerCurrentQuestion = isVideoQuestionAnswerable(currentQ);

  if (!quizStarted) {
    return (
      <StyledWrapper>
        <div className="quiz-intro">
          <div className="intro-header">
            <h1>{currentQuizData.title}</h1>
            <span className="quiz-type">{currentQuizData.type}</span>
          </div>
          
          <div className="quiz-details">
            <p>{currentQuizData.description}</p>
            
            <div className="quiz-info">
              <div className="info-item">
                <strong>Preguntas:</strong> {currentQuizData.questions.length}
              </div>
              <div className="info-item">
                <strong>Tiempo límite:</strong> {currentQuizData.duration} minutos
              </div>
              <div className="info-item">
                <strong>Puntos totales:</strong> {currentQuizData.questions.reduce((sum, q) => sum + q.points, 0)}
              </div>
              {currentQuizData.settings.passingGrade && (
                <div className="info-item">
                  <strong>Nota mínima:</strong> {currentQuizData.settings.passingGrade}%
                </div>
              )}
            </div>

            <div className="quiz-rules">
              <h3>Instrucciones:</h3>
              <ul>
                <li>Lee cada pregunta cuidadosamente antes de responder</li>
                <li>Puedes navegar entre preguntas usando los botones de navegación</li>
                <li>Tus respuestas se guardan automáticamente cada 30 segundos</li>
                {currentQuizData.duration && (
                  <li>El quiz se enviará automáticamente cuando se agote el tiempo</li>
                )}
                <li>Asegúrate de revisar todas tus respuestas antes de enviar</li>
                {!currentQuizData.settings.allowRetakes && (
                  <li><strong>Solo tienes una oportunidad para completar este quiz</strong></li>
                )}
              </ul>
            </div>
          </div>

          <div className="intro-actions">
            <button className="start-btn" onClick={startQuiz}>
              <Play size={20} />
              Comenzar Quiz
            </button>
            <button className="cancel-btn" onClick={onExit}>
              <ArrowLeft size={20} />
              Cancelar
            </button>
          </div>
        </div>
      </StyledWrapper>
    );
  }

  return (
    <StyledWrapper>
      <div className="quiz-container">
        {/* Header */}
        <div className="quiz-header">
          <div className="quiz-info">
            <h2>{currentQuizData.title}</h2>
            <div className="progress-info">
              <span>Pregunta {currentQuestion + 1} de {currentQuizData.questions.length}</span>
              <span>•</span>
              <span>{getAnsweredQuestionsCount()} respondidas</span>
            </div>
          </div>
          
          <div className="quiz-controls">
            {autoSaved && (
              <div className="auto-save-indicator">
                <Save size={16} />
                Auto-guardado
              </div>
            )}
            
            {timeRemaining !== null && (
              <div className={`timer ${timeRemaining < 300 ? 'warning' : ''}`}>
                <Clock size={16} />
                {formatTime(timeRemaining)}
              </div>
            )}
            
            <button className="flag-btn" onClick={() => toggleQuestionFlag(currentQ.id)}>
              <Flag 
                size={16} 
                fill={flaggedQuestions.has(currentQ.id) ? '#ef4444' : 'none'}
                color={flaggedQuestions.has(currentQ.id) ? '#ef4444' : '#64748b'}
              />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="question-nav">
          {currentQuizData.questions.map((q, index) => (
            <button
              key={q.id}
              className={`nav-item ${index === currentQuestion ? 'current' : ''} 
                         ${answers[q.id] ? 'answered' : ''} 
                         ${flaggedQuestions.has(q.id) ? 'flagged' : ''}`}
              onClick={() => goToQuestion(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Question Content */}
        <div className="question-section">
          <div className="question-header">
            <div className="question-info">
              <h3>{currentQ.title}</h3>
              <div className="question-meta">
                <span className="points">{currentQ.points} puntos</span>
                <span className="type">{
                  currentQ.type === 'multiple-choice' ? 'Opción múltiple' :
                  currentQ.type === 'true-false' ? 'Verdadero/Falso' :
                  currentQ.type === 'short-answer' ? 'Respuesta corta' :
                  currentQ.type === 'video-question' ? 'Pregunta con video' :
                  'Pregunta con imagen'
                }</span>
              </div>
            </div>
          </div>

          <div className="question-content">
            <p>{currentQ.content}</p>

            {/* Video Question */}
            {currentQ.type === 'video-question' && currentQ.videoUrl && (
              <div className="video-section">
                <div className="video-container">
                  <iframe
                    ref={ref => videoRefs.current[currentQ.id] = ref}
                    src={currentQ.videoUrl.replace('watch?v=', 'embed/')}
                    title={currentQ.videoTitle}
                    allowFullScreen
                    onLoad={() => {
                      // Simular seguimiento de progreso de video
                      if (currentQ.requireVideoCompletion) {
                        setTimeout(() => {
                          handleVideoProgress(currentQ.id, 100, true);
                        }, 5000); // Simular completado después de 5 segundos
                      }
                    }}
                  />
                </div>
                
                {currentQ.requireVideoCompletion && (
                  <div className={`video-requirement ${canAnswerCurrentQuestion ? 'completed' : ''}`}>
                    {canAnswerCurrentQuestion ? (
                      <>
                        <CheckCircle size={16} />
                        Video completado - Puedes responder la pregunta
                      </>
                    ) : (
                      <>
                        <AlertCircle size={16} />
                        Debes ver el video completo antes de responder
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Image Question */}
            {currentQ.type === 'image-question' && currentQ.imageUrl && (
              <div className="image-section">
                <img src={currentQ.imageUrl} alt={currentQ.imageAlt} />
              </div>
            )}

            {/* Answer Section */}
            <div className={`answer-section ${!canAnswerCurrentQuestion ? 'disabled' : ''}`}>
              {(currentQ.type === 'multiple-choice' || currentQ.type === 'true-false' || currentQ.type === 'video-question') && (
                <div className="options">
                  {currentQ.options.map((option, index) => (
                    <label key={index} className="option">
                      <input
                        type="radio"
                        name={`question-${currentQ.id}`}
                        value={index}
                        checked={answers[currentQ.id] === index}
                        onChange={() => handleAnswerChange(currentQ.id, index)}
                        disabled={!canAnswerCurrentQuestion}
                      />
                      <span className="option-text">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {currentQ.type === 'short-answer' && (
                <div className="text-answer">
                  <textarea
                    value={answers[currentQ.id] || ''}
                    onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                    placeholder="Escribe tu respuesta aquí..."
                    disabled={!canAnswerCurrentQuestion}
                    rows="6"
                  />
                  <div className="char-count">
                    {(answers[currentQ.id] || '').length} caracteres
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="navigation-controls">
          <button 
            className="nav-btn prev"
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft size={16} />
            Anterior
          </button>

          <div className="center-controls">
            <button className="save-btn" onClick={handleAutoSave}>
              <Save size={16} />
              Guardar
            </button>
          </div>

          {isLastQuestion ? (
            <button 
              className="submit-btn"
              onClick={() => handleSubmitQuiz(false)}
            >
              <Send size={16} />
              Enviar Quiz
            </button>
          ) : (
            <button 
              className="nav-btn next"
              onClick={nextQuestion}
            >
              Siguiente
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <h3>¿Enviar Quiz?</h3>
            <div className="submit-summary">
              <p>Estás a punto de enviar tu quiz. Revisa la información:</p>
              <ul>
                <li><strong>Preguntas respondidas:</strong> {getAnsweredQuestionsCount()} de {currentQuizData.questions.length}</li>
                <li><strong>Preguntas marcadas:</strong> {flaggedQuestions.size}</li>
                {timeRemaining && (
                  <li><strong>Tiempo restante:</strong> {formatTime(timeRemaining)}</li>
                )}
              </ul>
              
              {getAnsweredQuestionsCount() < currentQuizData.questions.length && (
                <div className="warning">
                  <AlertCircle size={16} />
                  Tienes preguntas sin responder. ¿Estás seguro de enviar?
                </div>
              )}
            </div>
            
            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={() => setShowSubmitConfirm(false)}
              >
                Cancelar
              </button>
              <button 
                className="confirm-btn"
                onClick={confirmSubmit}
              >
                <Send size={16} />
                Enviar Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  min-height: 100vh;
  background: #f8fafc;

  /* Quiz Intro */
  .quiz-intro {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    margin-top: 2rem;
  }

  .intro-header {
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e2e8f0;
  }

  .intro-header h1 {
    margin: 0 0 0.5rem 0;
    color: #1e293b;
    font-size: 2rem;
  }

  .quiz-type {
    background: #3b82f6;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
  }

  .quiz-details p {
    color: #64748b;
    line-height: 1.6;
    text-align: center;
    margin-bottom: 2rem;
  }

  .quiz-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 8px;
  }

  .info-item {
    text-align: center;
    color: #64748b;
  }

  .quiz-rules {
    margin-bottom: 2rem;
  }

  .quiz-rules h3 {
    color: #1e293b;
    margin-bottom: 1rem;
  }

  .quiz-rules ul {
    color: #64748b;
    line-height: 1.6;
    padding-left: 1.5rem;
  }

  .intro-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .start-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #10b981;
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .start-btn:hover {
    background: #059669;
  }

  .cancel-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #6b7280;
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .cancel-btn:hover {
    background: #4b5563;
  }

  /* Quiz Container */
  .quiz-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-height: 100vh;
  }

  /* Header */
  .quiz-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .quiz-info h2 {
    margin: 0 0 0.5rem 0;
    color: #1e293b;
    font-size: 1.5rem;
  }

  .progress-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #64748b;
    font-size: 0.9rem;
  }

  .quiz-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .auto-save-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #10b981;
    font-size: 0.9rem;
  }

  .timer {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #f1f5f9;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: 600;
    color: #1e293b;
  }

  .timer.warning {
    background: #fef2f2;
    color: #ef4444;
  }

  .flag-btn {
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.3s ease;
  }

  .flag-btn:hover {
    background: #f1f5f9;
  }

  /* Question Navigation */
  .question-nav {
    display: flex;
    gap: 0.5rem;
    background: white;
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow-x: auto;
  }

  .nav-item {
    width: 2.5rem;
    height: 2.5rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    background: white;
    color: #64748b;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    transition: all 0.3s ease;
    flex-shrink: 0;
  }

  .nav-item:hover {
    border-color: #3b82f6;
  }

  .nav-item.current {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
  }

  .nav-item.answered {
    background: #d1fae5;
    border-color: #10b981;
    color: #065f46;
  }

  .nav-item.current.answered {
    background: #10b981;
    color: white;
    border-color: #10b981;
  }

  .nav-item.flagged {
    border-color: #ef4444;
    background: #fef2f2;
    color: #dc2626;
  }

  /* Question Section */
  .question-section {
    flex: 1;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .question-header {
    padding: 1.5rem;
    border-bottom: 1px solid #e2e8f0;
    background: #f8fafc;
  }

  .question-info h3 {
    margin: 0 0 0.5rem 0;
    color: #1e293b;
    font-size: 1.3rem;
    line-height: 1.4;
  }

  .question-meta {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .points {
    background: #dbeafe;
    color: #1e40af;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .type {
    color: #64748b;
    font-size: 0.9rem;
  }

  .question-content {
    padding: 1.5rem;
  }

  .question-content > p {
    color: #374151;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    font-size: 1rem;
  }

  /* Video Section */
  .video-section {
    margin-bottom: 1.5rem;
  }

  .video-container {
    position: relative;
    width: 100%;
    height: 400px;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 1rem;
  }

  .video-container iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  .video-requirement {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .video-requirement:not(.completed) {
    background: #fef3c7;
    color: #d97706;
  }

  .video-requirement.completed {
    background: #d1fae5;
    color: #065f46;
  }

  /* Image Section */
  .image-section {
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .image-section img {
    max-width: 100%;
    max-height: 400px;
    object-fit: contain;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
  }

  /* Answer Section */
  .answer-section {
    margin-top: 1.5rem;
  }

  .answer-section.disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .option {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .option:hover {
    border-color: #3b82f6;
    background: #f8fafc;
  }

  .option input[type="radio"] {
    margin-top: 0.125rem;
    width: 1.2rem;
    height: 1.2rem;
    accent-color: #3b82f6;
  }

  .option-text {
    flex: 1;
    line-height: 1.5;
  }

  .text-answer textarea {
    width: 100%;
    padding: 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    line-height: 1.5;
    resize: vertical;
    transition: all 0.3s ease;
  }

  .text-answer textarea:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .char-count {
    text-align: right;
    color: #64748b;
    font-size: 0.8rem;
    margin-top: 0.5rem;
  }

  /* Navigation Controls */
  .navigation-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .nav-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border: 1px solid #d1d5db;
    background: white;
    color: #374151;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .nav-btn:hover:not(:disabled) {
    background: #f9fafb;
    border-color: #3b82f6;
    color: #3b82f6;
  }

  .nav-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .center-controls {
    display: flex;
    gap: 1rem;
  }

  .save-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: #6b7280;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .save-btn:hover {
    background: #4b5563;
  }

  .submit-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: #10b981;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .submit-btn:hover {
    background: #059669;
  }

  /* Modal */
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
    padding: 1rem;
  }

  .confirm-modal {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    max-width: 500px;
    width: 100%;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }

  .confirm-modal h3 {
    margin: 0 0 1rem 0;
    color: #1e293b;
    font-size: 1.3rem;
  }

  .submit-summary {
    margin-bottom: 2rem;
  }

  .submit-summary p {
    color: #64748b;
    margin-bottom: 1rem;
  }

  .submit-summary ul {
    color: #374151;
    padding-left: 1.5rem;
    line-height: 1.6;
  }

  .warning {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #fef3c7;
    color: #d97706;
    padding: 0.75rem;
    border-radius: 8px;
    margin-top: 1rem;
    font-weight: 500;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }

  .confirm-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #10b981;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .confirm-btn:hover {
    background: #059669;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .quiz-header {
      flex-direction: column;
      gap: 1rem;
      align-items: stretch;
    }

    .quiz-controls {
      justify-content: space-between;
    }

    .question-nav {
      justify-content: center;
      padding: 0.75rem;
    }

    .navigation-controls {
      flex-direction: column;
      gap: 1rem;
    }

    .nav-btn,
    .submit-btn {
      width: 100%;
      justify-content: center;
    }

    .video-container {
      height: 250px;
    }

    .confirm-modal {
      padding: 1.5rem;
    }

    .modal-actions {
      flex-direction: column;
    }

    .nav-btn,
    .confirm-btn {
      width: 100%;
      justify-content: center;
    }
  }
`;

export default StudentQuiz;
