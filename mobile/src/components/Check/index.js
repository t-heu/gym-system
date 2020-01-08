import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Container, Count, Time } from './styles';

export default function Check({ data }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.createdAt]);

  return (
    <Container>
      <Count>Check-in #{data.count}</Count>
      <Time>{dateParsed}</Time>
    </Container>
  );
}

Check.propTypes = {
  data: PropTypes.shape().isRequired,
};
