import styled from 'styled-components';
import { darken } from 'polished';

import colors from '../../styles/colors';

export const Button = styled.button`
  background-color: ${props => colors[props.color]};

  width: auto;
  height: 36px;
  padding: 0 16px;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.2s ease-in;

  &:hover {
    background: ${props => darken(0.1, colors[props.color])};
  }

  svg {
    margin-right: 8px;
  }
`;
