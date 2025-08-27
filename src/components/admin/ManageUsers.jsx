import React, { useState } from 'react';
import styled from 'styled-components';

const initialUsers = [
  { id: 1, username: 'demo', email: 'demo@demo.com', role: 'admin' },
  { id: 2, username: 'alumno1', email: 'alumno1@email.com', role: 'estudiante' },
];

const ManageUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [form, setForm] = useState({ username: '', email: '', role: 'estudiante' });
  const [editId, setEditId] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editId) {
      setUsers(users.map(u => u.id === editId ? { ...form, id: editId } : u));
      setEditId(null);
    } else {
      setUsers([...users, { ...form, id: Date.now() }]);
    }
    setForm({ username: '', email: '', role: 'estudiante' });
  };

  const handleEdit = user => {
    setForm({ username: user.username, email: user.email, role: user.role });
    setEditId(user.id);
  };

  const handleDelete = id => {
    setUsers(users.filter(u => u.id !== id));
    if (editId === id) setEditId(null);
  };

  return (
    <StyledWrapper>
      <h2>Gestionar Usuarios</h2>
      <div className="section">
        <form className="user-form" onSubmit={handleSubmit}>
          <input name="username" value={form.username} onChange={handleChange} placeholder="Usuario" required />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Correo" required />
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="admin">Admin</option>
            <option value="instructor">Instructor</option>
            <option value="estudiante">Estudiante</option>
          </select>
          <button type="submit">{editId ? 'Actualizar' : 'Agregar'}</button>
          {editId && <button type="button" onClick={() => { setEditId(null); setForm({ username: '', email: '', role: 'estudiante' }); }}>Cancelar</button>}
        </form>
        <table className="user-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Editar</button>
                  <button onClick={() => handleDelete(user.id)}>Eliminar</button>
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
  .user-form { display: flex; gap: 1rem; margin-bottom: 2rem; }
  .user-form input, .user-form select { padding: 0.5rem; border-radius: 0.25rem; border: 1px solid #ccc; }
  .user-form button { padding: 0.5rem 1rem; border-radius: 0.25rem; border: none; background: #6d28d9; color: #fff; cursor: pointer; }
  .user-table { width: 100%; border-collapse: collapse; }
  .user-table th, .user-table td { padding: 0.75rem; border-bottom: 1px solid #eee; text-align: left; }
  .user-table button { margin-right: 0.5rem; background: #374151; color: #fff; border: none; border-radius: 0.25rem; padding: 0.25rem 0.75rem; cursor: pointer; }
`;

export default ManageUsers;
