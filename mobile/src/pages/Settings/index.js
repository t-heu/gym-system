import React from 'react';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { signOut } from '../../store/modules/auth/actions';

import Header from '../../components/Header';

import Container from '../../components/Container';
import { LogOutButton } from './styles';

export default function Settings() {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <>
      <Header />
      <Container>
        <LogOutButton onPress={handleLogout}>Sair do Applicativo</LogOutButton>
      </Container>
    </>
  );
}

Settings.navigationOptions = {
  tabBarLabel: 'Configurações',
  tabBarIcon: (
    { tintColor } // eslint-disable-line
  ) => <Icon name="settings-applications" color={tintColor} size={28} />,
};
