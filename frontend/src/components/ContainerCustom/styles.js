import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px;
  width: 100%;
  max-width: ${props => `${props.maxWidth}px` || '100%'};
`;
