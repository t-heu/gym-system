import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import history from '../../services/history';

import ContainerCustom from '../../components/ContainerCustom';
import ContentBox from '../../components/ContentBox';
import ButtonCustom from '../../components/ButtonCustom';
import { Header, Fragment } from './styles';

import {
  getTrainingRequest,
  trainingUpdateRequest,
} from '../../store/modules/trainings/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  exe: Yup.string().required('O email é obrigatório'),
});

export default function TrainingUpdate({ match }) {
  const dispatch = useDispatch();
  const student = useSelector(state => state.trainings.data);

  useEffect(() => {
    dispatch(getTrainingRequest(match.params.id));
  }, [dispatch, match.params.id]);

  function handleSubmit(data) {
    const allData = { ...data, id: match.params.id };

    dispatch(trainingUpdateRequest(allData));
  }

  function handleBack() {
    history.push('/trainings');
  }

  return (
    <>
      <ContainerCustom maxWidth="900">
        <Header>
          <h1>Edição de Treino</h1>

          <aside>
            <ButtonCustom color="grayLight" clickFunc={handleBack}>
              <MdKeyboardArrowLeft size={22} color="#fff" />
              Voltar
            </ButtonCustom>
            <button type="submit" form="studentForm" className="button__submit">
              <MdCheck size={22} color="#fff" />
              Salvar
            </button>
          </aside>
        </Header>

        <ContentBox>
          <Fragment>
            <Form
              schema={schema}
              id="studentForm"
              initialData={student}
              onSubmit={handleSubmit}
            >
              <Input name="id" hidden readOnly style={{ display: 'none' }} />
              <label htmlFor="name">Nome Completo</label>
              <Input name="name" placeholder="Ombro" block="stretch" />

              <label htmlFor="exe">Exercícios</label>
              <Input
                name="exe"
                placeholder="flexão, perna"
                block="stretch"
              />
            </Form>
          </Fragment>
        </ContentBox>
      </ContainerCustom>
    </>
  );
}

TrainingUpdate.propTypes = {
  match: PropTypes.shape().isRequired,
};
