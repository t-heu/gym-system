import styled from 'styled-components/native';

import colors from '../../styles/colors';

export const Box = styled.View`
  padding: 20px 20px 0;
  background-color: #fff;
  border-width: 1px;
  border-color: ${colors.grayLight};
  border-radius: 4px;

  flex-direction: column;
  justify-content: space-between;
`;

export const TitleWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  color: ${colors.black};
  text-transform: uppercase;
  font-weight: bold;
  align-self: baseline;
`;

export const Time = styled.Text`
  color: ${colors.grayMedium};
  align-self: baseline;
`;

export const Text = styled.Text`
  color: ${colors.grayMedium};
  line-height: 26;
  margin-bottom: 20px;
`;
