import React, { useState } from 'react';
import styled from 'styled-components';

const StudentDashboardFixed = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  console.log('StudentDashboard renderizando...');

  return (
    <StyledContainer>
      <div className="dashboard-wrapper">
        <header className="main-header">
          <div className="logo">
            <h1>EPSILON AKDEMY</h1>
            <span className="badge">PERFIL</span>
          </div>
          
          <div className="user-section">
            <button 
              className="theme-btn"
              onClick={() => console.log('Theme toggle clicked')}
            >
              🌙 Toggle
            </button>
            <div className="user-info">
              <div>Demo Student</div>
              <div>demo@epsilonacademy.com</div>
            </div>
          </div>
        </header>

        <main className="content">
          <h1 className="main-title">Dashboard del Estudiante</h1>
          
          <div className="cards-grid">
            <div className="card academia">
              <h2>Oferta Académica</h2>
              <p>Explora todos los cursos disponibles</p>
              <button 
                className="btn-secondary"
                onClick={() => {
                  console.log('Navegando a oferta académica');
                  setCurrentPage('oferta-academica');
                }}
              >
                Ver cursos
              </button>
            </div>

            <div className="card cursos">
              <h2>Mis Cursos</h2>
              <p>Tu progreso académico personal</p>
              <button 
                className="btn-primary"
                onClick={() => {
                  console.log('Navegando a mis cursos');
                  setCurrentPage('mis-cursos');
                }}
              >
                Ver progreso
              </button>
            </div>

            <div className="card simulacros">
              <h2>Simulacros</h2>
              <p>Practica con exámenes reales</p>
              <button 
                className="btn-secondary"
                onClick={() => {
                  console.log('Navegando a simulacros');
                  setCurrentPage('simulacros');
                }}
              >
                Practicar
              </button>
            </div>
          </div>

          {currentPage !== 'dashboard' && (
            <div className="page-content">
              <button 
                className="back-btn"
                onClick={() => setCurrentPage('dashboard')}
              >
                ← Volver al Dashboard
              </button>
              <h2>Página: {currentPage}</h2>
              <p>Contenido de {currentPage} se cargaría aquí...</p>
            </div>
          )}
        </main>
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .dashboard-wrapper {
    min-height: 100vh;
    width: 100vw;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  .main-header {
    background: linear-gradient(135deg, #087799 0%, #076687 100%);
    color: white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .logo h1 {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .badge {
    background: #18e2a2;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .user-section {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .theme-btn {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    padding: 0.5rem 1rem;
    color: white;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.3s ease;
  }

  .theme-btn:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  .user-info {
    text-align: right;
  }

  .user-info div:first-child {
    font-weight: 600;
  }

  .user-info div:last-child {
    font-size: 0.8rem;
    opacity: 0.8;
  }

  .content {
    padding: 2rem;
  }

  .main-title {
    color: #2c3e50;
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 3rem;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .card {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    border-left: 4px solid;
  }

  .card:hover {
    transform: translateY(-4px);
  }

  .card.academia {
    border-left-color: #F0E23D;
  }

  .card.cursos {
    border-left-color: #087799;
  }

  .card.simulacros {
    border-left-color: #F7750b;
  }

  .card h2 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }

  .card p {
    color: #7f8c8d;
    margin-bottom: 1.5rem;
  }

  .btn-primary {
    background: linear-gradient(135deg, #087799, #0891b2);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-secondary {
    background: linear-gradient(135deg, #F7750b, #ea580c);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-primary:hover,
  .btn-secondary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }

  .page-content {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  .back-btn {
    background: #6b7280;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    margin-bottom: 1rem;
    transition: background 0.3s ease;
  }

  .back-btn:hover {
    background: #4b5563;
  }

  .page-content h2 {
    color: #2c3e50;
    margin-bottom: 1rem;
  }

  .page-content p {
    color: #7f8c8d;
  }
`;

export default StudentDashboardFixed;
