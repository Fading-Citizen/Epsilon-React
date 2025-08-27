import React from 'react';
import styled from 'styled-components';

const Statistics = () => {
  return (
    <StyledWrapper>
      <h2>Estadísticas</h2>
      <div className="section">
        <p>Aquí puedes ver el progreso de los estudiantes y estadísticas generales.</p>
        {/* Aquí iría la visualización de estadísticas y progreso */}
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

export default Statistics;
