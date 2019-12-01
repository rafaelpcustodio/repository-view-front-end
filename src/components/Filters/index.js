import React from 'react';

import { ContainerButton, StyledButton } from './styled';

const Filters = ({ handleFilter }) => (
  <ContainerButton>
    <StyledButton type="submit" value="all" onClick={handleFilter}>
      {' '}
      Todos{' '}
    </StyledButton>
    <StyledButton type="submit" value="open" onClick={handleFilter}>
      {' '}
      Abertos{' '}
    </StyledButton>
    <StyledButton type="submit" value="closed" onClick={handleFilter}>
      {' '}
      Fechados{' '}
    </StyledButton>
  </ContainerButton>
);

export default Filters;
