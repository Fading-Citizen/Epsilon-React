import React, { useState } from 'react';
import styled from 'styled-components';
import { User } from 'lucide-react';
import ManageUsers from './ManageUsers';
import ManageGroups from './ManageGroups';
import ManageCourses from './ManageCourses';
import ManageLessons from './ManageLessons';
import ManageEnrollments from './ManageEnrollments';
import ManageQuizzes from './ManageQuizzes';
import Statistics from './Statistics';

// Datos iniciales para el dashboard
const initialUsers = [{ id:1 }, { id:2 }];
const initialGroups = [{}, {}];
const initialCourses = [{}, {}];
const initialLessons = [{}, {}, {}];
const initialEnrollments = [{}, {}, {}, {}];
const initialQuizzes = [{}, {}, {}];

const AdminPanel = () => {
  const [page, setPage] = useState('dashboard');

  const getPageTitle = () => {
    const titles = {
      dashboard: 'Panel de Control',
      users: 'Gestión de Usuarios',
      groups: 'Gestión de Grupos',
      courses: 'Gestión de Cursos',
      lessons: 'Gestión de Lecciones',
      enrollments: 'Inscripciones',
      quizzes: 'Quizzes y Evaluaciones',
      statistics: 'Estadísticas',
      settings: 'Configuración'
    };
    return titles[page] || 'Admin Panel';
  };

  let content;
  if (page === 'users') content = <ManageUsers />;
  else if (page === 'groups') content = <ManageGroups />;
  else if (page === 'courses') content = <ManageCourses />;
  else if (page === 'lessons') content = <ManageLessons />;
  else if (page === 'enrollments') content = <ManageEnrollments />;
  else if (page === 'quizzes') content = <ManageQuizzes />;
  else if (page === 'statistics') content = <Statistics />;
  else content = (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Panel de Control</h2>
        <p>Resumen general del sistema Epsilon Academy</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card users">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-number">{initialUsers.length}</span>
            <span className="stat-label">Usuarios</span>
          </div>
        </div>
        
        <div className="stat-card groups">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-number">{initialGroups.length}</span>
            <span className="stat-label">Grupos</span>
          </div>
        </div>
        
        <div className="stat-card courses">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-number">{initialCourses.length}</span>
            <span className="stat-label">Cursos</span>
          </div>
        </div>
        
        <div className="stat-card lessons">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="5,3 19,12 5,21" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-number">{initialLessons.length}</span>
            <span className="stat-label">Lecciones</span>
          </div>
        </div>
        
        <div className="stat-card enrollments">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-number">{initialEnrollments.length}</span>
            <span className="stat-label">Inscripciones</span>
          </div>
        </div>
        
        <div className="stat-card quizzes">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-number">{initialQuizzes.length}</span>
            <span className="stat-label">Quizzes</span>
          </div>
        </div>
      </div>
      
      <div className="quick-actions">
        <h3>Acciones Rápidas</h3>
        <div className="actions-grid">
          <button className="action-btn" onClick={() => setPage('users')}>
            <span className="action-icon">👤</span>
            <span>Gestionar Usuarios</span>
          </button>
          <button className="action-btn" onClick={() => setPage('courses')}>
            <span className="action-icon">📚</span>
            <span>Subir Curso</span>
          </button>
          <button className="action-btn" onClick={() => setPage('statistics')}>
            <span className="action-icon">📊</span>
            <span>Ver Estadísticas</span>
          </button>
          <button className="action-btn" onClick={() => setPage('settings')}>
            <span className="action-icon">⚙️</span>
            <span>Configuración</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <AdminPanelContainer>
      <div className="sidebar">
        <div className="logo">
          <h3>EPSILON</h3>
          <p>Admin Panel</p>
        </div>
        <ul className="menu">
          <li>
            <a 
              onClick={() => setPage('dashboard')} 
              className={page === 'dashboard' ? 'active' : ''}
            >
              <span className="menu-icon">🏠</span>
              Dashboard
            </a>
          </li>
          <li>
            <a 
              onClick={() => setPage('users')} 
              className={page === 'users' ? 'active' : ''}
            >
              <span className="menu-icon">👥</span>
              Usuarios
            </a>
          </li>
          <li>
            <a 
              onClick={() => setPage('groups')} 
              className={page === 'groups' ? 'active' : ''}
            >
              <span className="menu-icon">🏢</span>
              Grupos
            </a>
          </li>
          <li>
            <a 
              onClick={() => setPage('courses')} 
              className={page === 'courses' ? 'active' : ''}
            >
              <span className="menu-icon">📚</span>
              Cursos
            </a>
          </li>
          <li>
            <a 
              onClick={() => setPage('lessons')} 
              className={page === 'lessons' ? 'active' : ''}
            >
              <span className="menu-icon">📖</span>
              Lecciones
            </a>
          </li>
          <li>
            <a 
              onClick={() => setPage('enrollments')} 
              className={page === 'enrollments' ? 'active' : ''}
            >
              <span className="menu-icon">📝</span>
              Inscripciones
            </a>
          </li>
          <li>
            <a 
              onClick={() => setPage('quizzes')} 
              className={page === 'quizzes' ? 'active' : ''}
            >
              <span className="menu-icon">❓</span>
              Quizzes
            </a>
          </li>
          <li>
            <a 
              onClick={() => setPage('statistics')} 
              className={page === 'statistics' ? 'active' : ''}
            >
              <span className="menu-icon">📊</span>
              Estadísticas
            </a>
          </li>
        </ul>
      </div>
      
      <div className="main-content">
        <div className="top-bar">
          <div className="header-left">
            <img 
              src={`${import.meta.env.BASE_URL}assets/images/LogotipoGrisOscuro.png`} 
              alt="Epsilon Akdemy" 
              className="header-logo"
            />
            <h2>{getPageTitle()}</h2>
          </div>
          <div className="user-info">
            <div className="user-profile">
              <div className="user-avatar">
                <User size={20} color="white" />
              </div>
              <div className="user-details">
                <span className="user-name">Administrador</span>
                <span className="user-role">Admin</span>
              </div>
            </div>
            <button className="logout-btn">Cerrar Sesión</button>
          </div>
        </div>
        
        <div className="content">
          {content}
        </div>
      </div>
    </AdminPanelContainer>
  );
};

const AdminPanelContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: flex;
  
  .sidebar {
    width: 250px;
    background: linear-gradient(180deg, #2c3e50 0%, #34495e 100%);
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    transition: all 0.3s ease;
    
    .logo {
      padding: 2rem;
      text-align: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      
      h3 {
        color: #ffffff;
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0 0 0.5rem 0;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        letter-spacing: 1px;
      }
      
      p {
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.9rem;
        margin: 0;
        font-weight: 500;
        letter-spacing: 0.5px;
      }
    }
    
    .menu {
      list-style: none;
      padding: 1rem 0;
      margin: 0;
      
      li {
        margin: 0;
        
        a {
          display: flex;
          align-items: center;
          padding: 1rem 2rem;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
          font-weight: 500;
          cursor: pointer;
          
          &:hover {
            background: rgba(255, 255, 255, 0.1);
            color: #ffffff;
            border-left-color: #3498db;
          }
          
          &.active {
            background: rgba(255, 255, 255, 0.15);
            color: #ffffff;
            border-left-color: #e74c3c;
          }
          
          .menu-icon {
            margin-right: 0.75rem;
            font-size: 1.1rem;
          }
        }
      }
    }
  }
  
  .main-content {
    flex: 1;
    min-height: 100vh;
    
    .top-bar {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      padding: 1rem 2rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 100;
      
      .header-left {
        display: flex;
        align-items: center;
        gap: 1rem;
        
        .header-logo {
          height: 40px;
          width: auto;
          filter: contrast(1.2);
          border-radius: 4px;
          padding: 2px;
        }
        
        .logo-fallback {
          font-size: 1.2rem;
          font-weight: 700;
          color: #2c3e50;
          letter-spacing: 1px;
        }
        
        h2 {
          margin: 0;
          color: #2c3e50;
          font-size: 1.5rem;
          font-weight: 600;
        }
      }
      
      .user-info {
        display: flex;
        align-items: center;
        gap: 1rem;
        
        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(0, 0, 0, 0.1);
          
          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, #3498db, #2980b9);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            font-size: 1.1rem;
            
            svg {
              width: 20px;
              height: 20px;
            }
          }
          
          .user-details {
            display: flex;
            flex-direction: column;
            
            .user-name {
              color: #2c3e50;
              font-weight: 600;
              font-size: 0.9rem;
            }
            
            .user-role {
              color: #7f8c8d;
              font-size: 0.8rem;
              font-weight: 500;
            }
          }
        }
        
        .logout-btn {
          background: linear-gradient(135deg, #e74c3c, #c0392b);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
          }
        }
      }
    }
    
    .content {
      padding: 2rem;
      
      .dashboard {
        .dashboard-header {
          text-align: center;
          margin-bottom: 3rem;
          
          h2 {
            font-size: 2.5rem;
            font-weight: 700;
            color: #ffffff;
            margin: 0 0 0.5rem 0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          }
          
          p {
            font-size: 1.1rem;
            color: rgba(255, 255, 255, 0.9);
            margin: 0;
          }
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
          
          .stat-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            padding: 2rem;
            display: flex;
            align-items: center;
            gap: 1.5rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.2);
            
            &:hover {
              transform: translateY(-4px);
              box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
            }
            
            .stat-icon {
              width: 60px;
              height: 60px;
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              
              svg {
                width: 28px;
                height: 28px;
              }
            }
            
            .stat-content {
              display: flex;
              flex-direction: column;
              
              .stat-number {
                font-size: 2rem;
                font-weight: 700;
                color: #2c3e50;
                line-height: 1;
              }
              
              .stat-label {
                font-size: 0.9rem;
                color: #7f8c8d;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              }
            }
            
            &.users .stat-icon {
              background: linear-gradient(135deg, #3498db, #2980b9);
            }
            
            &.groups .stat-icon {
              background: linear-gradient(135deg, #9b59b6, #8e44ad);
            }
            
            &.courses .stat-icon {
              background: linear-gradient(135deg, #e67e22, #d35400);
            }
            
            &.lessons .stat-icon {
              background: linear-gradient(135deg, #1abc9c, #16a085);
            }
            
            &.enrollments .stat-icon {
              background: linear-gradient(135deg, #e74c3c, #c0392b);
            }
            
            &.quizzes .stat-icon {
              background: linear-gradient(135deg, #f39c12, #e67e22);
            }
          }
        }
        
        .quick-actions {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          
          h3 {
            margin: 0 0 1.5rem 0;
            color: #2c3e50;
            font-size: 1.5rem;
            font-weight: 600;
          }
          
          .actions-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            
            .action-btn {
              background: white;
              border: 2px solid #ecf0f1;
              border-radius: 12px;
              padding: 1.5rem;
              cursor: pointer;
              transition: all 0.3s ease;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 0.75rem;
              font-size: 1rem;
              font-weight: 500;
              color: #2c3e50;
              
              &:hover {
                border-color: #3498db;
                transform: translateY(-2px);
                box-shadow: 0 8px 24px rgba(52, 152, 219, 0.2);
              }
              
              .action-icon {
                font-size: 1.5rem;
              }
            }
          }
        }
      }
    }
  }
  
  @media (max-width: 768px) {
    .sidebar {
      width: 200px;
    }
    
    .top-bar {
      .header-left {
        gap: 0.5rem;
        
        .header-logo {
          height: 32px;
        }
        
        h2 {
          font-size: 1.2rem;
        }
      }
      
      .user-info .user-profile .user-details {
        display: none;
      }
    }
    
    .stats-grid {
      grid-template-columns: 1fr !important;
    }
    
    .actions-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    
    .sidebar {
      width: 100%;
      position: relative;
    }
    
    .top-bar {
      .header-left {
        .header-logo {
          height: 28px;
        }
        
        h2 {
          font-size: 1.1rem;
        }
      }
      
      .user-info {
        gap: 0.5rem;
        
        .user-profile {
          padding: 0.25rem;
          
          .user-avatar {
            width: 32px;
            height: 32px;
            font-size: 1rem;
            
            svg {
              width: 16px;
              height: 16px;
            }
          }
        }
        
        .logout-btn {
          padding: 0.4rem 0.8rem;
          font-size: 0.8rem;
        }
      }
    }
    
    .actions-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;

export default AdminPanel;
