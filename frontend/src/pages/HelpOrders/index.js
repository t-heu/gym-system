import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import ModalHelpOrder from '../../components/ModalHelpOrder';

import {
  toggleModal,
  answerOrderRequest,
} from '../../store/modules/helpOrders/actions';

import ContainerCustom from '../../components/ContainerCustom';
import ContentBox from '../../components/ContentBox';
import { Header } from './styles';

export default function HelpOrders() {
  const dispatch = useDispatch();
  const modal = useSelector(state => state.helpOrders.modal);
  const orders = useSelector(state => state.helpOrders.orders);
  const [orderId, setOrderlId] = useState(null);

  function handleSubmit(data) {
    const { answer } = data;
    dispatch(answerOrderRequest(orderId, answer));
  }

  function handleToggleModal(id) {
    setOrderlId(id);
    dispatch(toggleModal());
  }

  return (
    <ContainerCustom maxWidth="700">
      <Header>
        <h1>Pedidos de Auxílio</h1>
      </Header>

      <ContentBox>
        <table>
          <thead>
            <tr>
              <td>Aluno</td>
              <td className="shrink" />
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={String(order.id)}>
                <td>{order.student.name}</td>
                <td>
                  <Link
                    to="/help-orders"
                    className="inline__edit"
                    onClick={() => handleToggleModal(order.id)}
                  >
                    responder
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {modal && (
          <ModalHelpOrder
            id={orderId}
            submitFunc={data => handleSubmit(data)}
          />
        )}
      </ContentBox>
    </ContainerCustom>
  );
}
