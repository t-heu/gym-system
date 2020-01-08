import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function ContainerCustom({ maxWidth, children }) {
  return <Container maxWidth={maxWidth}>{children}</Container>;
}

ContainerCustom.propTypes = {
  maxWidth: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
};

ContainerCustom.defaultProps = {
  maxWidth: '1200px',
};
