import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  h1 {
    display: inline-block;
  }

  aside {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    button:last-child {
      margin-left: 14px;
    }
  }
`;

export const Fragment = styled.div`
  form {
    input,
    select {
      margin-bottom: 20px;
      width: 100%;
    }

    .lineGroup {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      div {
        flex-basis: 33%;
      }
      & div + div {
        margin-left: 20px;
      }
    }
  }
`;
