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

import { trainingRegisterRequest } from '../../store/modules/trainings/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  exe: Yup.string().required('O email é obrigatório'),
});

export default function TrainingNew() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.trainings.loading);

  function handleSubmit(data) {
    dispatch(trainingRegisterRequest(data));
  }

  function handleBack() {
    history.push('/trainings');
  }

  return (
    <>
      <ContainerCustom maxWidth="900">
        <Header>
          <h1>Cadastrar Treino</h1>

          <aside>
            <ButtonCustom color="grayLight" clickFunc={handleBack}>
              <MdKeyboardArrowLeft size={22} color="#fff" />
              Voltar
            </ButtonCustom>
            <button type="submit" 
            form="studentForm" className="button__submit">
              <MdCheck size={22} color="#fff" />
              {loading ? 'Loading...' : 'Salvar'}
            </button>
          </aside>
        </Header>

        <ContentBox>
          <Fragment>
            <Form schema={schema}  onSubmit={handleSubmit} id="studentForm">
              <label htmlFor="name">Nome</label>
              <Input
                name="name"
                placeholder="Ombro"
                block="stretch"
                autoComplete="off"
              />

              <label htmlFor="exe">Exercícios</label>
              <Input
                name="exe"
                placeholder="flexão, perna"
                block="stretch"
                autoComplete="off"
              />
            </Form>
          </Fragment>
        </ContentBox>
      </ContainerCustom>
    </>
  );
}
