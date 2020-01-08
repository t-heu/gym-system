import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import DatePicker from 'react-datepicker';
import { startOfDay, addMonths } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import history from '../../services/history';
import api from '../../services/api';
import { formatPrice } from '../../utils/format';

import { addRegistrationRequest } from '../../store/modules/registration/actions';

import ContainerCustom from '../../components/ContainerCustom';
import ContentBox from '../../components/ContentBox';
import ButtonCustom from '../../components/ButtonCustom';
import { Header, Fragment } from './styles';
import 'react-datepicker/dist/react-datepicker.css';

export default function RegistrationNew() {
  const dispatch = useDispatch();

  const [loading] = useState(false);
  const [registration, setRegistration] = useState({
    student_id: '',
    plan_id: '',
  });

  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);

  const [start_date, setStartDate] = useState(new Date());
  const [end_date, setEndDate] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  // LOAD CONTENTS
  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('/students');

      setStudents(response.data);
    }

    async function loadPlans() {
      const response = await api.get('/plans');

      setPlans(response.data);
    }

    loadStudents();
    loadPlans();
  }, []);

  // UPDATE END DATE
  useMemo(() => {
    const chosenPlan = plans.find(
      item => item.id.toString() === registration.plan_id
    );

    if (chosenPlan) {
      setEndDate(addMonths(start_date, chosenPlan.duration));
    }
  }, [plans, registration.plan_id, start_date]);

  // UPDATE TOTAL PRICE
  useMemo(() => {
    const chosenPlan = plans.find(
      item => item.id.toString() === registration.plan_id
    );

    if (chosenPlan) {
      const { duration, price } = chosenPlan;

      setTotalPrice(formatPrice(duration * price));
    }
  }, [plans, registration.plan_id]);

  function handleChange(e) {
    switch (e.target.name) {
      case 'student_id':
        setRegistration({
          ...registration,
          student_id: e.target.value,
        });
        break;
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
    setStartDate(startOfDay(date));
  }

  function handleSubmit() {
    // COUTION!!! UGLY SH*** WORKAROUND
    const formStudent = document.getElementById('studentID');
    const formPlan = document.getElementById('planID');

    if (formStudent.value > 0 && formPlan.value > 0) {
      const data = {
        ...registration,
        start_date,
      };

      dispatch(addRegistrationRequest(data));
    }
  }

  function handleBack() {
    history.push('/registration');
  }

  return (
    <>
      <ContainerCustom maxWidth="900">
        <Header>
          <h1>Cadastro de Matricula</h1>

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
            <Form id="registrationForm" onSubmit={handleSubmit}>
              <label htmlFor="title">Aluno</label>
              <select
                id="studentID"
                name="student_id"
                value={registration.student_id}
                onChange={handleChange}
              >
                <option value="">Selecione um aluno</option>
                {students.map(student => (
                  <option key={String(student.id)} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>

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
                    selected={start_date}
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
                    readOnly
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
