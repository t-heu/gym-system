import React from 'react';
import PropTypes from 'prop-types';

import { Button } from './styles';

export default function ButtonCustom({ color, clickFunc, children }) {
  return (
    <Button color={color} onClick={clickFunc}>
      {children}
    </Button>
  );
}

ButtonCustom.propTypes = {
  clickFunc: PropTypes.func,
  color: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
};

ButtonCustom.defaultProps = {
  color: 'primary',
  clickFunc() {},
};
