import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../../styles/colors';
import { Container, BackButton, Logo } from './styles';

import logo from '../../assets/logo.png';

export default function Header({ displayBackButton, navigateTo, ...rest }) {
  return (
    <Container>
      {displayBackButton && (
        <BackButton onPress={navigateTo} {...rest}>
          <Icon name="chevron-left" color={colors.black} size={20} />
        </BackButton>
      )}
      <Logo source={logo} />
    </Container>
  );
}

Header.propTypes = {
  displayBackButton: PropTypes.bool,
  navigateTo: PropTypes.func,
};
Header.defaultProps = {
  displayBackButton: false,
  navigateTo: () => {},
};
