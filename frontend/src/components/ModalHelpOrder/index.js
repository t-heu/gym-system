import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Textarea } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import ContainerCustom from '../ContainerCustom';
import ContentBox from '../ContentBox';

import { ModalBase, Title, Question, Overlay } from './styles';

import { toggleModal } from '../../store/modules/helpOrders/actions';

export default function ModalHelpOrder({ id, submitFunc }) {
  const dispatch = useDispatch();
  const order = useSelector(state => state.helpOrders.orders).find(
    o => o.id === id
  );

  function handleCloseModal() {
    dispatch(toggleModal());
  }

  const schema = Yup.object().shape({
    answer: Yup.string().required('Campo Obrigatório'),
  });

  return (
    <>
      <ModalBase>
        <ContainerCustom maxWidth="450">
          <ContentBox>
            <Title>Pergunta do Aluno</Title>
            <Question>{order.question}</Question>
            <Form schema={schema} onSubmit={submitFunc}>
              <label htmlFor="answer">
                Sua resposta
                <Textarea name="answer" />
              </label>
              <button
                type="submit"
                className="button__submit"
                style={{ width: '100%' }}
              >
                Responder
              </button>
            </Form>
          </ContentBox>
        </ContainerCustom>
        <Overlay onClick={handleCloseModal} />
      </ModalBase>
    </>
  );
}

ModalHelpOrder.propTypes = {
  id: PropTypes.number.isRequired,
  submitFunc: PropTypes.func,
};

ModalHelpOrder.defaultProps = {
  submitFunc() {},
};
