import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import history from '../../services/history';

import ContainerCustom from '../../components/ContainerCustom';
import ContentBox from '../../components/ContentBox';
import ButtonCustom from '../../components/ButtonCustom';
import { Header, Fragment } from './styles';

import { studentRegisterRequest } from '../../store/modules/student/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um email válido')
    .required('O email é obrigatório'),
  age: Yup.string().required('A idade é obrigatória'),
  weight: Yup.string().required('O peso é obrigatório'),
  height: Yup.string().required('A altura é obrigatória')
});

export default function StudentsRegister() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.student.loading);

  function handleSubmit(data) {
    dispatch(studentRegisterRequest(data));
  }

  function handleBack() {
    history.push('/students');
  }

  return (
    <>
      <ContainerCustom maxWidth="900">
        <Header>
          <h1>Cadastro de Aluno</h1>

          <aside>
            <ButtonCustom color="grayLight" clickFunc={handleBack}>
              <MdKeyboardArrowLeft size={22} color="#fff" />
              Voltar
            </ButtonCustom>
            <button type="submit" form="studentForm" className="button__submit">
              <MdCheck size={22} color="#fff" />
              {loading ? 'Loading...' : 'Salvar'}
            </button>
          </aside>
        </Header>

        <ContentBox>
          <Fragment>
            <Form schema={schema} onSubmit={handleSubmit} id="studentForm">
              <label htmlFor="name">Nome Completo</label>
              <Input
                name="name"
                placeholder="John Doe"
                block="stretch"
                autoComplete="off"
              />

              <label htmlFor="email">Endereço de Email</label>
              <Input
                name="email"
                placeholder="email@exemplo.com"
                block="stretch"
                autoComplete="off"
              />
              <div className="lineGroup">
                <div>
                  <label htmlFor="age">Idade</label>
                  <Input type="number" name="age" autoComplete="off" />
                </div>
                <div>
                  <label htmlFor="weight">Peso (em Kg)</label>
                  <Input type="number" name="weight" autoComplete="off" />
                </div>
                <div>
                  <label htmlFor="height">Altura</label>
                  <Input type="number" name="height" autoComplete="off" />
                </div>
              </div>
            </Form>
          </Fragment>
        </ContentBox>
      </ContainerCustom>
    </>
  );
}
