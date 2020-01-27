import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import history from '../../services/history';
import api from '../../services/api'

import ContainerCustom from '../../components/ContainerCustom';
import ContentBox from '../../components/ContentBox';
import ButtonCustom from '../../components/ButtonCustom';
import { Header, Fragment } from './styles';
/*
import {
  getTrainingRequest,
  trainingUpdateRequest,
} from '../../store/modules/trainings/actions';*/

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  exe: Yup.string().required('O email é obrigatório'),
});

export default function LinkProfile({ match }) {
  const [student, setStudent] = useState([])
  const [trainings, setTrainings] = useState([])
  const [update, setUpdate] = useState([])

  useEffect(() => {
    async function load() {
      const student_id = match.params.id
      const { data } = await api.get(`/trai/${student_id}`)
      const trai = await api.get(`/trainings`);
      
      setTrainings(trai.data)
      setStudent(data)
    }
    load()
  }, [update]);

  async function handleSubmit() {
    const formPlan = document.getElementById('trainingID');
    
    if (formPlan.value > 0) {
      const student_id = match.params.id
      
      const aa = await api.post(`/trai/${student_id}`, {
        id: formPlan.value
      })
      
      setUpdate(aa.data)
    }
  }
  
  async function handleDelete(name) {
    const student_id = match.params.id
    try {
      const { data } = await api.delete(`/trai/${student_id}/${name}`)
      
      setUpdate(data)
    }catch(err) {
      alert(err)
    }
  }
  
  function handleChange(e) {
    switch(e.target.name) {
      case 'training_id':
        setTrainings([{
          ...trainings,
          id: e.target.value
        }]);
        break;
      default:
    }
  }
  
  function handleBack() {
    history.push('/link');
  }

  return (
    <>
      <ContainerCustom maxWidth="900">
        <Header>
          <h1>Edição de link</h1>

          <aside>
            <ButtonCustom color="grayLight" clickFunc={handleBack}>
              <MdKeyboardArrowLeft size={22} color="#fff" />
              Voltar
            </ButtonCustom>
             <button type="submit" form="traiOk" className="button__submit">
              <MdCheck size={22} color="#fff" />
            </button>
          </aside>
        </Header>

        <ContentBox>
          {student.map(a => (
          <>
            <p>{a.name}</p>
            <ul>
              {a.trainings.length == 0 ? (
                <li>vazio</li>
              ) : (
                <>
                  {a.trainings.map(b => (
                    <li>{b.name}
                    <a style={{color: 'red', cursor: 'pointer'}} onClick={() => handleDelete(b.name)}> delete</a>
                    </li>
                  ))}
                </>
              )}
            </ul>
            
            <div>
              <Form onSubmit={handleSubmit} id="traiOk">
              <label htmlFor="training_id">Treino</label>
              <select id="trainingID" name="training_id" value={trainings.id} onChange={handleChange}
              >
              <option value="">Selecione um treino</option>
               {trainings.map(training => (
                <option key={String(training.id)} value={training.id}>
                  {training.name}
                </option>
              ))}
              </select>
              </Form>
            </div>
            </>
          ))}
          
        </ContentBox>
      </ContainerCustom>
    </>
  );
}

LinkProfile.propTypes = {
  match: PropTypes.shape().isRequired,
};
