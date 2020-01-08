import React from 'react';
import PropTypes from 'prop-types';

import { Button } from './styles';

export default function ButtonSubmit({ clickFunc, form, children, block }) {
  return (
    <Button type="submit" form={form} onClick={clickFunc} block={block}>
      {children}
    </Button>
  );
}

ButtonSubmit.propTypes = {
  clickFunc: PropTypes.func,
  form: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  block: PropTypes.bool,
};

ButtonSubmit.defaultProps = {
  form: '',
  clickFunc() {},
  block: false,
};
