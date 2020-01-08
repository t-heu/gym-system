import { Platform } from 'react-native';
import styled from 'styled-components/native';

import InputText from '../../components/InputText';
import ButtomPrimary from '../../components/ButtonPrimary';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  padding: 30px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  margin-bottom: 20px;
`;

export const Input = styled(InputText)`
  margin-bottom: 15px;
`;

export const Button = styled(ButtomPrimary)``;
