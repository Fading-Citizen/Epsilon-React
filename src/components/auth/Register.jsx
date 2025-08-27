import React, { useState } from 'react';
import styled from 'styled-components';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    alert('Registro exitoso');
  };

  return (
    <StyledWrapper>
      <div className="background">
        <div className="form-container">
          <h2 className="title">Registrarse</h2>
          <form className="form" onSubmit={handleRegister}>
            <div className="name-row">
              <input 
                placeholder="Nombre" 
                className="input-field half-width" 
                type="text" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input 
                placeholder="Apellido" 
                className="input-field half-width" 
                type="text" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <input 
              placeholder="Email" 
              className="input-field" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              placeholder="Confirmar Email" 
              className="input-field" 
              type="email" 
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              required
            />
            <input 
              placeholder="Contraseña" 
              className="input-field" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input 
              placeholder="Confirmar Contraseña" 
              className="input-field" 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label className="label" htmlFor="gender">Género</label>
            <select 
              className="input-field" 
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="other">Otro</option>
            </select>
            <label className="label" htmlFor="age">Fecha de Nacimiento</label>
            <input 
              className="input-field" 
              id="age" 
              type="date" 
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <p className="login-link">
              ¿Ya tienes una cuenta?
              <a className="link" href="/login">Iniciar Sesión</a>
            </p>
            <button 
              className="sign-button" 
              type="submit"
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .background {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #121212;
    padding: 1rem;
  }

  .form-container {
    width: 100%;
    max-width: 400px;
    background-color: #1f2937;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
  }

  .title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #e5e7eb;
    margin-bottom: 1rem;
    text-align: center;
  }

  .form {
    display: flex;
    flex-direction: column;
  }

  .name-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .input-field {
    background-color: #374151;
    color: #e5e7eb;
    border: 0;
    border-radius: 0.375rem;
    padding: 0.5rem;
    margin-bottom: 1rem;
    transition: all 0.15s ease-in-out;
    width: 100%;
  }

  .half-width {
    width: calc(50% - 0.5rem);
    margin-bottom: 0;
  }

  .input-field:focus {
    background-color: #4b5563;
    outline: none;
    ring: 1px;
    ring-color: #3b82f6;
  }

  .label {
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    color: #e5e7eb;
    cursor: pointer;
  }

  .login-link {
    color: white;
    margin-top: 1rem;
    text-align: center;
  }

  .link {
    font-size: 0.875rem;
    color: #3b82f6;
    text-decoration: none;
    margin-left: 0.5rem;
  }

  .link:hover {
    text-decoration: underline;
  }

  .sign-button {
    background: linear-gradient(to right, #6366f1, #3b82f6);
    color: white;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    margin-top: 1rem;
    border: none;
    cursor: pointer;
    transition: all 0.15s ease-in-out;
  }

  .sign-button:hover {
    background: linear-gradient(to right, #4f46e5, #2563eb);
  }`;

export default Register;
