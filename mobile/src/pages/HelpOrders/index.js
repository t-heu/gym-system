import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Text, View, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import Header from '../../components/Header';
import Container from '../../components/Container';
import { AddHelpButton, List } from './styles';
import colors from '../../styles/colors';

import HelpOrder from '../../components/HelpOrder';

export default function HelpOrders({ isFocused, navigation }) {
  const [helpOrders, setHelpOrders] = useState([]);
  const userId = useSelector(state => state.auth.userId);
  const [loading, setLoading] = useState(true)

  async function loadHelpOrders(ID) {
    try {
      const response = await api.get(`students/${ID}/help-orders`);

      setHelpOrders(response.data);
      setLoading(false)
    } catch (err) {
      Alert.alert('Ooops!', 'No pain, no gain!');
    }
  }

  useEffect(() => {
    loadHelpOrders(userId);
    setLoading(true)
  }, [isFocused, userId]);

  function handleOpenOrder(data) {
    navigation.navigate('OrderHelp', { data });
  }

  return (
    <>
      <Header />
      <Container>
        <AddHelpButton onPress={() => navigation.navigate('OrderNew')}>
          Novo pedido de auxílio
        </AddHelpButton>
        
        {loading ? (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', fontSize: 20}}>
            <Text>loading...</Text>
          </View>
        ) : (
          <Fragment>
            {!helpOrders && (
              <ActivityIndicator
                color={colors.primary}
                size="large"
                style={{ alignSelf: 'center' }}
              />
            )}
           
            <List
              data={helpOrders}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <HelpOrder
                  onPress={() => item.answer && handleOpenOrder(item)}
                  data={item}
                />
              )}
            />
          </Fragment>
        )}
      </Container>
    </>
  );
}

HelpOrders.navigationOptions = {
  tabBarLabel: 'Pedir Ajuda',
  tabBarIcon: (
    { tintColor } // eslint-disable-line
  ) => <Icon name="live-help" color={tintColor} size={28} />,
};

HelpOrders.propTypes = {
  isFocused: PropTypes.bool,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

HelpOrders.defaultProps = {
  isFocused: false,
};
