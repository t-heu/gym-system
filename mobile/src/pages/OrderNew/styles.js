import styled from 'styled-components/native';

import colors from '../../styles/colors';

export const TextArea = styled.TextInput.attrs({
  placeholderTextColor: colors.grayMedium,
})`
  padding: 10px;
  font-size: 16px;
  color: ${colors.black};
  margin-bottom: 20px;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${colors.grayLight};
  background: #fff;

  flex-direction: column;
  justify-content: flex-end;
  align-self: stretch;
`;
