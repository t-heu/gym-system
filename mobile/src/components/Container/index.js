import React from 'react';
import PropTypes from 'prop-types';

import { SContainer } from './styles';

export default function Container({ children }) {
  return <SContainer>{children}</SContainer>;
}

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.node,
  ]),
};

Container.defaultProps = {
  children: () => {},
};
