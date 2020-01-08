import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';

import api from '../../services/api';

import Header from '../../components/Header';
import ButtonPrimary from '../../components/ButtonPrimary';
import Container from '../../components/Container';
import { TextArea } from './styles';

export default function OrderNew({ navigation }) {
  const [question, setQuestion] = useState('');
  const userId = useSelector(state => state.auth.userId);

  async function handleSubmit() {
    try {
      await api.post(`/students/${userId}/help-orders`, { question });
      
      setQuestion('');
      Alert.alert(
        'High Five!',
        'Pedido enviado com sucesso. Em breve você receberá sua resposta!'
      );
      navigation.navigate('HelpOrders');
    } catch (err) {
      Alert.alert(
        'Ooops...',
        'Algo deu errado aqui! Continue tentando ou avise um funcionário.'
      );
    }
  }

  return (
    <Container>
      <TextArea
        multiline
        numberOfLines={10}
        placeholder="Inclua seu pedido de auxílio..."
        textAlignVertical="top"
        value={question}
        onChangeText={content => setQuestion(content)}
      />

      <ButtonPrimary onPress={handleSubmit}>Enviar Pedido</ButtonPrimary>
    </Container>
  );
}

OrderNew.navigationOptions = ({ navigation }) => ({
  header: () => (
    <Header
      displayBackButton
      navigateTo={() => navigation.navigate('HelpOrders')}
    />
  ),
});

OrderNew.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired
};
