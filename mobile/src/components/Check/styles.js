import styled from 'styled-components/native';

import colors from '../../styles/colors';

export const Container = styled.View`
  height: 46px;
  padding: 0 20px;
  border-width: 1px;
  border-color: ${colors.grayLight};
  background-color: #fff;
  margin-bottom: 10px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Count = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.black};
`;

export const Time = styled.Text`
  font-size: 14px;
  color: ${colors.grayHeavy};
`;
