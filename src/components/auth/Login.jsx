import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
    <StyledWrapper>
      <div className="background">
        <div className="form-container">
          <div className="logo-section">
            <img 
              src="/assets/images/LogotipoBlanco.png" 
              alt="Epsilon Academy" 
              className="logo-image"
            />
          </div>
          
          <div className="form-content">
            <h1 className="title">Iniciar Sesión</h1>
            <p className="subtitle">Accede a tu plataforma educativa</p>
            
            <form className="form" onSubmit={handleLogin}>
              <div className="input-group">
                <label htmlFor="identifier">Usuario o Email</label>
                <input 
                  id="identifier"
                  type="text" 
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Ingresa tu usuario o email"
                  required
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="password">Contraseña</label>
                <input 
                  id="password"
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>
              
              <button type="submit" className="login-btn">
                Iniciar Sesión
              </button>
            </form>
            
            <div className="demo-info">
              <h3>Cuentas de Demostración</h3>
              <div className="demo-accounts">
                <div className="demo-account">
                  <strong>👨‍🎓 Estudiante:</strong>
                  <span>Usuario: demo | Contraseña: demo</span>
                </div>
                <div className="demo-account">
                  <strong>👨‍🏫 Profesor:</strong>
                  <span>Usuario: profesor | Contraseña: profesor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .background {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    font-family: 'Inter', sans-serif;
  }

  .form-container {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 3rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 450px;
    text-align: center;
  }

  .logo-section {
    margin-bottom: 2rem;
    
    .logo-image {
      height: 60px;
      width: auto;
      object-fit: contain;
    }
  }

  .form-content {
    .title {
      font-size: 2rem;
      font-weight: 700;
      color: #2d3748;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: #718096;
      margin-bottom: 2rem;
      font-size: 1rem;
    }
  }

  .form {
    text-align: left;
    margin-bottom: 2rem;

    .input-group {
      margin-bottom: 1.5rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #4a5568;
        font-size: 0.9rem;
      }

      input {
        width: 100%;
        padding: 0.875rem 1rem;
        border: 2px solid #e2e8f0;
        border-radius: 10px;
        font-size: 1rem;
        transition: all 0.3s ease;
        box-sizing: border-box;
        
        &:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        &::placeholder {
          color: #a0aec0;
        }
      }
    }

    .login-btn {
      width: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 10px;
      padding: 1rem;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
      }

      &:active {
        transform: translateY(0);
      }
    }
  }

  .demo-info {
    background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
    border-radius: 15px;
    padding: 1.5rem;
    border-left: 4px solid #667eea;

    h3 {
      margin: 0 0 1rem 0;
      font-size: 1rem;
      font-weight: 600;
      color: #4a5568;
    }

    .demo-accounts {
      .demo-account {
        display: flex;
        flex-direction: column;
        margin-bottom: 0.75rem;
        text-align: left;

        &:last-child {
          margin-bottom: 0;
        }

        strong {
          color: #667eea;
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }

        span {
          color: #718096;
          font-size: 0.85rem;
          font-family: 'Courier New', monospace;
          background: rgba(255, 255, 255, 0.7);
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .background {
      padding: 1rem;
    }
    
    .form-container {
      padding: 2rem 1.5rem;
    }

    .form-content .title {
      font-size: 1.75rem;
    }
  }
`;

export default Login;