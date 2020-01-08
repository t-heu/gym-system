import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../styles/colors';

import { Container, Status, StatusText, Time, Question } from './styles';

export default function HelpOrder({ data, ...rest }) {
  const parsedDate = useMemo(() => {
    return formatRelative(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.createdAt]);

  return (
    <Container {...rest}>
      <Status>
        <Icon
          name="check-circle"
          color={data.answer ? colors.warnSuccess : colors.grayMedium}
          size={20}
        />

        <StatusText answered={data.answer}>
          {data.answer === null ? 'Sem Resposta' : 'Respondido'}
        </StatusText>
      </Status>

      <Time>{parsedDate}</Time>

      <Question>{data.question}</Question>
    </Container>
  );
}

HelpOrder.propTypes = {
  data: PropTypes.shape().isRequired,
};
