import styled from 'styled-components/native';

import colors from '../../styles/colors';

export const Container = styled.TouchableOpacity`
  padding: 20px;
  border-width: 1px;
  border-color: ${colors.grayLight};
  background-color: #fff;
  margin-bottom: 10px;

  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Status = styled.View`
  flex-direction: row;
`;

export const StatusText = styled.Text`
  color: ${props => (props.answered ? colors.warnSuccess : colors.grayMedium)};
  font-weight: bold;
  margin-left: 5px;
`;

export const Time = styled.Text`
  font-size: 14px;
  color: ${colors.grayMedium};
`;

export const Question = styled.Text`
  font-size: 14px;
  line-height: 26px;
  color: ${colors.grayMedium};
  margin-top: 10px;
  align-self: stretch;
`;
