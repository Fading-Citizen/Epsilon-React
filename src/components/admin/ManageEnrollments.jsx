import React from 'react';
import styled from 'styled-components';

const ManageEnrollments = () => {
  return (
    <StyledWrapper>
      <h2>Inscripciones</h2>
      <div className="section">
        <p>Aquí puedes inscribir usuarios a cursos y grupos.</p>
        {/* Aquí iría el formulario y la lista de inscripciones */}
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

export default ManageEnrollments;
