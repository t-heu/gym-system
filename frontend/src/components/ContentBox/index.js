import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function ContentBox({ children }) {
  return <Container>{children}</Container>;
}

ContentBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
};
