import React, { useState } from 'react';
import styled from 'styled-components';

const initialCourses = [
  { id: 1, title: 'React Básico', description: 'Curso introductorio de React', instructor: 'demo' },
];

const ManageCourses = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [form, setForm] = useState({ title: '', description: '', instructor: '' });
  const [editId, setEditId] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editId) {
      setCourses(courses.map(c => c.id === editId ? { ...form, id: editId } : c));
      setEditId(null);
    } else {
      setCourses([...courses, { ...form, id: Date.now() }]);
    }
    setForm({ title: '', description: '', instructor: '' });
  };

  const handleEdit = course => {
    setForm({ title: course.title, description: course.description, instructor: course.instructor });
    setEditId(course.id);
  };

  const handleDelete = id => {
    setCourses(courses.filter(c => c.id !== id));
    if (editId === id) setEditId(null);
  };

  return (
    <StyledWrapper>
      <h2>Subir Cursos</h2>
      <div className="section">
        <form className="course-form" onSubmit={handleSubmit}>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Título del curso" required />
          <input name="description" value={form.description} onChange={handleChange} placeholder="Descripción" required />
          <input name="instructor" value={form.instructor} onChange={handleChange} placeholder="Instructor" required />
          <button type="submit">{editId ? 'Actualizar' : 'Agregar'}</button>
          {editId && <button type="button" onClick={() => { setEditId(null); setForm({ title: '', description: '', instructor: '' }); }}>Cancelar</button>}
        </form>
        <table className="course-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Descripción</th>
              <th>Instructor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td>{course.description}</td>
                <td>{course.instructor}</td>
                <td>
                  <button onClick={() => handleEdit(course)}>Editar</button>
                  <button onClick={() => handleDelete(course.id)}>Eliminar</button>
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
  .course-form { display: flex; gap: 1rem; margin-bottom: 2rem; }
  .course-form input { padding: 0.5rem; border-radius: 0.25rem; border: 1px solid #ccc; }
  .course-form button { padding: 0.5rem 1rem; border-radius: 0.25rem; border: none; background: #6d28d9; color: #fff; cursor: pointer; }
  .course-table { width: 100%; border-collapse: collapse; }
  .course-table th, .course-table td { padding: 0.75rem; border-bottom: 1px solid #eee; text-align: left; }
  .course-table button { margin-right: 0.5rem; background: #374151; color: #fff; border: none; border-radius: 0.25rem; padding: 0.25rem 0.75rem; cursor: pointer; }
`;

export default ManageCourses;
