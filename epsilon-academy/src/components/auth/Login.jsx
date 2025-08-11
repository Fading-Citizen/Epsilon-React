import React, { useState } from 'react';
import styled from 'styled-components';

const Login = () => {
  const [identifier, setIdentifier] = useState(''); // Puede ser usuario o correo
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Demo user credentials
    const demoIdentifier = 'demo'; // Estudiante
    const demoPassword = 'demo';
    
    const teacherIdentifier = 'profesor'; // Profesor  
    const teacherPassword = 'profesor';

    if (identifier === demoIdentifier && password === demoPassword) {
      alert('Ingreso exitoso como estudiante demo');
      // Redirigir al panel de estudiante
      window.location.href = '/student';
    } else if (identifier === teacherIdentifier && password === teacherPassword) {
      alert('Ingreso exitoso como profesor demo');
      // Redirigir al panel de profesor
      window.location.href = '/teacher';
    } else {
      console.log('Login:', { identifier, password });
      alert('Credenciales incorrectas');
    }
  };

  return (
    <StyledWrapper>
      <div className="background">
        <div className="form-container">
          <div className="logo-section">
            <img 
              src="/assets/images/LogotipoBlanco.png" 
              alt="Epsilon Academy" 
              className="logo-image"
              onError={(e) => {
                console.log('Error loading login logo');
                e.target.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.innerHTML = '<div class="logo">epsilon</div><div class="academy">ACADEMY</div>';
                fallback.className = 'logo-fallback';
                e.target.parentElement.insertBefore(fallback, e.target);
              }}
              onLoad={() => console.log('Login logo loaded successfully')}
            />
          </div>
          <p className="title">Iniciar Sesión</p>
          <form className="form" onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="identifier">Usuario o Correo</label>
              <input
                type="text"
                id="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Ingresa demo"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa demo"
                required
              />
            </div>
            <button className="sign">Iniciar Sesión</button>
            <div className="demo-info">
              <p><strong>Credenciales disponibles:</strong></p>
              <p>Estudiante: <strong>demo / demo</strong></p>
              <p>Profesor: <strong>profesor / profesor</strong></p>
            </div>
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
    width: 100vw;
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    padding: 2rem;
    box-sizing: border-box;
  }

  .form-container {
    width: 100%;
    max-width: 450px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 3rem 2.5rem;
    color: #2c3e50;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .logo-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
    
    .logo-image {
      height: 60px;
      width: auto;
      filter: brightness(0.8) contrast(1.2);
      margin-bottom: 0.5rem;
    }
    
    .logo-fallback {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .logo {
    font-size: 2.5rem;
    font-weight: 300;
    letter-spacing: 3px;
    color: #2c3e50;
  }

  .academy {
    font-size: 0.9rem;
    font-weight: 600;
    color: #1abc9c;
    letter-spacing: 2px;
  }

  .title {
    text-align: center;
    font-size: 2rem;
    line-height: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .form {
    margin-top: 2rem;
  }

  .input-group {
    margin-bottom: 1.5rem;
    font-size: 1rem;
    line-height: 1.5rem;
  }

  .input-group label {
    display: block;
    color: #5d6d7e;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  .input-group input {
    width: 100%;
    border-radius: 10px;
    border: 2px solid #e8f4f8;
    outline: 0;
    background-color: #ffffff;
    padding: 1rem 1.25rem;
    color: #2c3e50;
    font-size: 1rem;
    transition: all 0.3s ease;
    box-sizing: border-box;
  }

  .input-group input::placeholder {
    color: #95a5a6;
    font-style: italic;
  }

  .input-group input:focus {
    border-color: #1abc9c;
    box-shadow: 0 0 0 3px rgba(26, 188, 156, 0.1);
  }

  .sign {
    display: block;
    width: 100%;
    background: linear-gradient(135deg, #1abc9c 0%, #16a085 100%);
    padding: 1rem;
    text-align: center;
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    font-size: 1.1rem;
    margin-top: 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .sign:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(26, 188, 156, 0.3);
  }

  .demo-info {
    text-align: center;
    margin-top: 1.5rem;
    padding: 1rem;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 10px;
    border-left: 4px solid #1abc9c;
  }

  .demo-info p {
    margin: 0;
    font-size: 0.9rem;
    color: #5d6d7e;
  }

  .demo-info strong {
    color: #1abc9c;
  }

  @media (max-width: 768px) {
    .background {
      padding: 1rem;
    }
    
    .form-container {
      padding: 2rem 1.5rem;
    }
    
    .logo {
      font-size: 2rem;
    }
  }
`;

export default Login;
