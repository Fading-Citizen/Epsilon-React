import React from 'react';
import styled from 'styled-components';

const ManageLessons = () => {
  return (
    <StyledWrapper>
      <h2>Gestionar Lecciones</h2>
      <div className="section">
        <p>Aquí puedes crear, editar y eliminar lecciones dentro de los cursos.</p>
        {/* Aquí iría la tabla/lista de lecciones y acciones CRUD */}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  h2 {
    margin-bottom: 1rem;
  }
  .section {
    background: #fff;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }
`;

export default ManageLessons;
