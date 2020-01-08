import styled from 'styled-components/native';

import colors from '../../styles/colors';

export const Container = styled.View`
  height: 45px;
  border: 1px solid ${colors.grayLight};
  border-radius: 4px;

  align-self: stretch;
  align-items: center;
`;

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: colors.grayMedium,
})`
  flex: 1;
  align-self: stretch;
  font-size: 16px;
  padding: 0 8px;
  color: ${colors.black};
`;
