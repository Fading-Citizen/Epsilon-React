import React, { useState } from 'react';
import styled from 'styled-components';

// Estado inicial con quizzes de ejemplo
const initialQuizzes = [
  { id: 1, courseId: 1, title: 'Quiz Intro React' },
];

const ManageQuizzes = () => {
  const [quizzes, setQuizzes] = useState(initialQuizzes);
  const [form, setForm] = useState({ courseId: '', title: '' });
  const [editId, setEditId] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editId) {
      setQuizzes(quizzes.map(q => q.id === editId ? { ...form, id: editId } : q));
      setEditId(null);
    } else {
      setQuizzes([...quizzes, { ...form, id: Date.now() }]);
    }
    setForm({ courseId: '', title: '' });
  };

  const handleEdit = quiz => {
    setForm({ courseId: quiz.courseId, title: quiz.title });
    setEditId(quiz.id);
  };

  const handleDelete = id => {
    setQuizzes(quizzes.filter(q => q.id !== id));
    if (editId === id) setEditId(null);
  };

  return (
    <StyledWrapper>
      <h2>Gestión de Quizzes</h2>
      <div className="section">
        <form className="quiz-form" onSubmit={handleSubmit}>
          <input
            name="courseId"
            value={form.courseId}
            onChange={handleChange}
            placeholder="ID Curso"
            required
          />
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Título del Quiz"
            required
          />
          <button type="submit">{editId ? 'Actualizar' : 'Agregar'}</button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setForm({ courseId: '', title: '' });
              }}
            >
              Cancelar
            </button>
          )}
        </form>
        <table className="quiz-table">
          <thead>
            <tr>
              <th>ID Curso</th>
              <th>Título</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map(quiz => (
              <tr key={quiz.id}>
                <td>{quiz.courseId}</td>
                <td>{quiz.title}</td>
                <td>
                  <button onClick={() => handleEdit(quiz)}>Editar</button>
                  <button onClick={() => handleDelete(quiz.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  h2 { margin-bottom: 1rem; }
  .section { background: #fff; padding: 2rem; border-radius: 0.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
  .quiz-form { display: flex; gap: 1rem; margin-bottom: 2rem; }
  .quiz-form input { padding: 0.5rem; border-radius: 0.25rem; border: 1px solid #ccc; }
  .quiz-form button { padding: 0.5rem 1rem; border-radius: 0.25rem; border: none; background: #6d28d9; color: #fff; cursor: pointer; }
  .quiz-table { width: 100%; border-collapse: collapse; }
  .quiz-table th, .quiz-table td { padding: 0.75rem; border-bottom: 1px solid #eee; text-align: left; }
  .quiz-table button { margin-right: 0.5rem; background: #374151; color: #fff; border: none; border-radius: 0.25rem; padding: 0.25rem 0.75rem; cursor: pointer; }
`;

export default ManageQuizzes;
