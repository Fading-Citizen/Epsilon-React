import React from 'react';
import styled from 'styled-components';

const ManageGroups = () => {
  return (
    <StyledWrapper>
      <h2>Gestionar Grupos</h2>
      <div className="section">
        <p>Aquí puedes crear y administrar grupos de usuarios.</p>
        {/* Aquí iría la tabla/lista de grupos y acciones CRUD */}
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

export default ManageGroups;
