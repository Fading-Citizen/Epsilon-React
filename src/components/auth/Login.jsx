import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Demo user credentials
    const demoIdentifier = 'demo';
    const demoPassword = 'demo';
    
    const teacherIdentifier = 'profesor';
    const teacherPassword = 'profesor';

    if (identifier === demoIdentifier && password === demoPassword) {
      alert('Ingreso exitoso como estudiante demo');
      navigate('/student');
    } else if (identifier === teacherIdentifier && password === teacherPassword) {
      alert('Ingreso exitoso como profesor demo');
      navigate('/teacher');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f0f0f0', 
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Epsilon Akademy</h1>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Usuario/Email:</label>
            <input 
              type="text" 
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                border: '1px solid #ddd',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Contraseña:</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                border: '1px solid #ddd',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#1abc9c',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Iniciar Sesión
          </button>
        </form>
        <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
          <p><strong>Demo Estudiante:</strong> usuario: demo, contraseña: demo</p>
          <p><strong>Demo Profesor:</strong> usuario: profesor, contraseña: profesor</p>
        </div>
      </div>
    </div>
  );
};

export default Login;