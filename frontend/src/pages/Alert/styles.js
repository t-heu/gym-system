import styled from 'styled-components';

export const Alerts = styled.div `
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  
  h1 {
    padding: 1em;
  }
`;

export const Wrapper = styled.div `
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div `
  width: 360px;
  max-width: 360px;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  form {
    align-self: stretch;
    display: flex;
    flex-direction: column;

    label {
      display: block;
      margin-bottom: 10px;
    }

    input {
      margin-bottom: 24px;
    }
  }
`;