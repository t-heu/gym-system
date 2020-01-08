import styled from 'styled-components';

import colors from '../../styles/colors';

export const Container = styled.div`
  width: 100%;
  height: 64px;
  background: #fff;
  border-bottom: 1px solid ${colors.grayLight};

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  nav {
    display: flex;
    flex-direction: row;
    align-items: center;

    img {
      padding: 0 30px;
      margin-right: 30px;
      border-right: 1px solid ${colors.grayLight};
    }

    ul li {
      position: relative;
      display: inline;

      a {
        color: ${colors.grayMedium};
        font-weight: bold;
        text-transform: uppercase;
        font-size: 15px;
        margin-right: 10px;

        &:hover,
        &.active {
          color: ${colors.blackIsh};
        }
      }
    }
  }
`;

export const User = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  text-align: right;
  justify-content: center;

  a {
    font-weight: bold;
    display: block;

    &:visited,
    &:active {
      color: ${colors.blackIsh};
    }
  }

  button {
    color: ${colors.warnDanger};
    border: none;
  }
`;

export const UserName = styled.span`
  font-weight: bold;
`;

export const OrderCount = styled.span`
  width: 8px;
  height: 8px;
  position: absolute;
  top: -2px;
  right: 6px;
  font-size: 12px;
  background-color: ${colors.primary};
  border-radius: 50%;
`;
