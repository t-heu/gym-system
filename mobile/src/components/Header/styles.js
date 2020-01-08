import styled from 'styled-components/native';

import colors from '../../styles/colors';

export const Container = styled.View`
  height: 54px;
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.grayLight};
  background-color: #fff;
`;

export const BackButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 50px;
  height: 54px;
  left: 0;
  top: 0;
`;

export const Logo = styled.Image`
  width: 116px;
  height: 18px;
`;
