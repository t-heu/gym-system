import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Alert, ActivityIndicator } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import Header from '../../components/Header';

import colors from '../../styles/colors';
import { List } from './styles';

import Container from '../../components/Container';
import Check from '../../components/Check';

export default function CheckIns() {
  const userId = useSelector(state => state.auth.userId);
  const [checkIns, setCheckIns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function loadCheckIns() {
      const response = await api.get(`/students/${userId}/checkins`);

      const countData = response.data.map((checkIn, index) => {
        return {
          ...checkIn,
          count: response.data.length - index,
        };
      });
      
      setCheckIns(countData);
      setLoading(false);
    }
    loadCheckIns();
  }, [userId]);

  return (
    <>
      <Header />
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', fontSize: 20}}>
          <Text>loading...</Text>
        </View>
      ):(
        <Container>
          {!checkIns && <ActivityIndicator color={colors.primary} size="large" />}
  
          <List
            data={checkIns}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <Check data={item} />}
          />
        </Container>
      )}
    </>
  );
}

CheckIns.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: (
    { tintColor } // eslint-disable-line
  ) => <Icon name="beenhere" color={tintColor} size={28} />,
};
