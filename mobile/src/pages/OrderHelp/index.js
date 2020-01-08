import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Box, TitleWrapper, Title, Time, Text } from './styles';
import Container from '../../components/Container';

import Header from '../../components/Header';

export default function OrderHelp({navigation}) {
  const data = navigation.getParam('data')
  
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.createdAt]);

  return (
    <Container>
      <Box>
        <TitleWrapper>
          <Title>Pergunta</Title>
          <Time>{dateParsed}</Time>
        </TitleWrapper>
        <Text>{data.question}</Text>

        <TitleWrapper>
          <Title>Resposta</Title>
        </TitleWrapper>
        <Text>{data.answer}</Text>
      </Box>
    </Container>
  );
}

OrderHelp.navigationOptions = ({ navigation }) => ({
  header: () => (
    <Header
      displayBackButton
      navigateTo={() => navigation.navigate('HelpOrders')}
    />
  ),
});

OrderHelp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};
