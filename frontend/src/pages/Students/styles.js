import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  h1 {
    display: inline-block;
  }

  aside {
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const SearchForm = styled.div`
  position: relative;
  margin-left: 16px;

  form {
    input {
      padding-left: 26px;
      margin-top: 0 !important;
    }

    button {
      position: absolute;
      top: 8px;
      left: 4px;
      background: transparent;
      border: none;
    }
  }
`;
