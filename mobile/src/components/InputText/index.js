import React from 'react';
import PropTypes from 'prop-types';

import { Container, TextInput } from './styles';

export default function InputText({ style, ...rest }) {
  return (
    <Container style={style}>
      <TextInput {...rest} />
    </Container>
  );
}

InputText.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

InputText.defaultProps = {
  style: {},
};
