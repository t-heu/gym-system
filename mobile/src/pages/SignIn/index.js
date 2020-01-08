import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Alert, KeyboardAvoidingView } from 'react-native';

import logoVertical from '../../assets/logo-vertical.png';
import { Container, Logo, Input, Button } from './styles';

import { signInRequest } from '../../store/modules/auth/actions';

export default function SignIn() {
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false)
  
  function handleSubmit() {
    if (!code) {
      Alert.alert('ERRO', 'DIGITE UM CODE VÁLIDO');
      return;
    }
    dispatch(signInRequest(code))
    setLoading(true)
  }

  return (
    <KeyboardAvoidingView 
      enable={Platform.OS === "ios"} 
      behavior="padding" 
      style={{flex: 1, marginTop: 25}}>
      <Container>
        <Logo source={logoVertical} />
        <Input
          autoCapitalize="none"
          placeholder="Informe seu código cadastrado"
          onChangeText={setCode}
          value={code}
        />
        <Button onPress={handleSubmit}>
        {loading ? 'loading...' : 'Entrar no Sistema'}
        </Button>
      </Container>
    </KeyboardAvoidingView>
  );
}