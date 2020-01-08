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
  getStudentRequest,
  studentUpdateRequest,
} from '../../store/modules/student/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um email válido')
    .required('O email é obrigatório'),
  age: Yup.string().required('A idade é obrigatória'),
  weight: Yup.string().required('O peso é obrigatório'),
  height: Yup.string().required('A altura é obrigatória'),
  code: Yup.string().required('code obrigatório')
});

export default function StudentsUpdate({ match }) {
  const dispatch = useDispatch();
  const student = useSelector(state => state.student.data);

  useEffect(() => {
    dispatch(getStudentRequest(match.params.id));
  }, [dispatch, match.params.id]);

  function handleSubmit(data) {
    const allData = { ...data, id: match.params.id };
    //console.tron.log(allData);

    dispatch(studentUpdateRequest(allData));
  }

  function handleBack() {
    history.push('/students');
  }

  return (
    <>
      <ContainerCustom maxWidth="900">
        <Header>
          <h1>Edição de Aluno</h1>

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
              <Input name="name" placeholder="John Doe" block="stretch" />

              <label htmlFor="email">Endereço de Email</label>
              <Input
                name="email"
                placeholder="email@exemplo.com"
                block="stretch"
              />

              <div className="lineGroup">
                <div>
                  <label htmlFor="age">Idade</label>
                  <Input name="age" />
                </div>
                <div>
                  <label htmlFor="code">Code</label>
                  <Input name="code" />
                </div>
                <div>
                  <label htmlFor="weight">Peso (em Kg)</label>
                  <Input name="weight" />
                </div>
                <div>
                  <label htmlFor="height">Altura</label>
                  <Input name="height" />
                </div>
              </div>
            </Form>
          </Fragment>
        </ContentBox>
      </ContainerCustom>
    </>
  );
}

StudentsUpdate.propTypes = {
  match: PropTypes.shape().isRequired,
};
