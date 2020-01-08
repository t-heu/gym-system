import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Container, Text } from './styles';

export default function ButtonPrimary({ children, loading, ...rest }) {
  return (
    <Container {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text>{children}</Text>
      )}
    </Container>
  );
}

ButtonPrimary.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

ButtonPrimary.defaultProps = {
  loading: false,
};
