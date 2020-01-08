import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import DatePicker from 'react-datepicker';
import { startOfDay, addMonths, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import history from '../../services/history';
import api from '../../services/api';
import { formatPrice } from '../../utils/format';

import { updateRegistrationRequest } from '../../store/modules/registration/actions';

import ContainerCustom from '../../components/ContainerCustom';
import ContentBox from '../../components/ContentBox';
import ButtonCustom from '../../components/ButtonCustom';
import { Header, Fragment } from './styles';
import 'react-datepicker/dist/react-datepicker.css';

export default function RegistrationUpdate() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [loading] = useState(false);
  const [registration, setRegistration] = useState({
    student_id: '',
    plan_id: '',
    start_date: null,
  });

  const [plans, setPlans] = useState([]);

  const [end_date, setEndDate] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [student, setStudent] = useState('');

  // LOAD CONTENTS
  useEffect(() => {
    async function loadData() {
      const register = await api.get(`registration/${id}`);
      const { student_id, plan_id, start_date } = register.data;
      setRegistration({
        id,
        student_id,
        plan_id,
        start_date: parseISO(start_date),
      });

      const planList = await api.get('/plans');

      setPlans(planList.data);

      const studentGet = await api.get(`/students/${registration.student_id}`);
      setStudent(studentGet.data.name);
    }

    loadData();
  }, [id, registration.student_id]);

  // UPDATE END DATE
  useMemo(() => {
    const chosenPlan = plans.find(item => item.id === registration.plan_id);

    if (chosenPlan) {
      setEndDate(addMonths(registration.start_date, chosenPlan.duration));
    }
  }, [plans, registration.plan_id, registration.start_date]);

  // UPDATE TOTAL PRICE
  useMemo(() => {
    const chosenPlan = plans.find(item => item.id === registration.plan_id);

    if (chosenPlan) {
      const { duration, price } = chosenPlan;

      setTotalPrice(formatPrice(duration * price));
    }
  }, [plans, registration.plan_id]);

  function handleChange(e) {
    switch (e.target.name) {
      case 'plan_id':
        setRegistration({
          ...registration,
          plan_id: e.target.value,
        });
        break;
      default:
    }
  }

  function handleStartDate(date) {
    setRegistration({
      ...registration,
      start_date: startOfDay(date),
    });
  }

  function handleSubmit() {
    // COUTION!!! UGLY SH*** WORKAROUND
    const formPlan = document.getElementById('planID');

    if (formPlan.value > 0) {
      dispatch(updateRegistrationRequest(registration));
    }
  }

  function handleBack() {
    history.push('/registration');
  }

  return (
    <>
      <ContainerCustom maxWidth="900">
        <Header>
          <h1>Edição de Matrícula</h1>

          <aside>
            <ButtonCustom color="grayLight" clickFunc={handleBack}>
              <MdKeyboardArrowLeft size={22} color="#fff" />
              Voltar
            </ButtonCustom>
            <button
              className="button__submit"
              type="submit"
              form="registrationForm"
            >
              <MdCheck size={22} color="#fff" />
              {loading ? 'Loading...' : 'Salvar'}
            </button>
          </aside>
        </Header>

        <ContentBox>
          <Fragment>
            <Form
              initialData={registration}
              id="registrationForm"
              onSubmit={handleSubmit}
            >
              <label htmlFor="name">Aluno</label>
              <Input type="text" name="name" value={student} readOnly />

              <div className="lineGroup">
                <div>
                  <label htmlFor="plan_id">Plano</label>
                  <select
                    id="planID"
                    name="plan_id"
                    value={registration.plan_id}
                    onChange={handleChange}
                  >
                    <option value="">Selecione um plano</option>
                    {plans.map(plan => (
                      <option key={String(plan.id)} value={plan.id}>
                        {plan.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="start_date">Data de Início</label>
                  <DatePicker
                    selected={registration.start_date}
                    onChange={date => handleStartDate(date)}
                    locale={pt}
                    dateFormat="P"
                  />
                </div>
                <div>
                  <label htmlFor="end_date">Data de Término</label>
                  <DatePicker
                    selected={end_date}
                    locale={pt}
                    dateFormat="P"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="totalPrice">Valor Final</label>
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
