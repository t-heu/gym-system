import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import history from '../../services/history';
import api from '../../services/api';
import { formatPrice } from '../../utils/format';

import { updatePlanRequest } from '../../store/modules/plans/actions';

import ContainerCustom from '../../components/ContainerCustom';
import ContentBox from '../../components/ContentBox';
import ButtonCustom from '../../components/ButtonCustom';
import { Header, Fragment } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('Campo obrigatório'),
  duration: Yup.string().required('Campo Obrigatório'),
  price: Yup.string().required('Campo Obrigatório'),
});

export default function PlansUpdate() {
  const dispatch = useDispatch();

  const [loading] = useState(false);
  const [plan, setPlan] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    async function loadPlan() {
      const response = await api.get(`/plans/${id}`);

      const planData = {
        ...response.data,
      };

      setPlan(planData);
    }
    loadPlan();
  }, [id]);

  useMemo(() => {
    const { duration, price } = plan;

    setTotalPrice(formatPrice(duration * price));
  }, [plan]);

  function handleChange(e) {
    switch (e.target.name) {
      case 'title':
        setPlan({ ...plan, title: e.target.value });
        break;
      case 'duration':
        setPlan({ ...plan, duration: e.target.value });
        break;
      case 'price':
        setPlan({ ...plan, price: e.target.value });
        break;

      default:
    }
  }

  function handleSubmit(data) {
    const { title, duration, price } = data;

    dispatch(updatePlanRequest({ id, title, duration, price }));
  }

  function handleBack() {
    history.push('/plans');
  }

  return (
    <>
      <ContainerCustom maxWidth="900">
        <Header>
          <h1>Edição de Plano</h1>

          <aside>
            <ButtonCustom color="grayLight" clickFunc={handleBack}>
              <MdKeyboardArrowLeft size={22} color="#fff" />
              Voltar
            </ButtonCustom>
            <button className="button__submit" type="submit" form="planForm">
              <MdCheck size={22} color="#fff" />
              {loading ? 'Loading...' : 'Salvar'}
            </button>
          </aside>
        </Header>

        <ContentBox>
          <Fragment>
            <Form
              schema={schema}
              initialData={plan}
              id="planForm"
              onSubmit={handleSubmit}
            >
              <label htmlFor="title">
                Título do Plano
                <Input
                  name="title"
                  block="stretch"
                  onChange={handleChange}
                  autoComplete="off"
                />
              </label>
              <div className="lineGroup">
                <div>
                  <label htmlFor="duration">Duração (em meses)</label>
                  <Input
                    type="number"
                    name="duration"
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label htmlFor="price">Preço Mensal </label>
                  <Input
                    type="number"
                    name="price"
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label htmlFor="totalPrice">Preço Total</label>
                  <Input name="totalPrice" value={totalPrice} readOnly />
                </div>
              </div>
            </Form>
          </Fragment>
        </ContentBox>
      </ContainerCustom>
    </>
  );
}
