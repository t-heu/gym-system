import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { MdAdd, MdSearch } from 'react-icons/md';
import history from '../../services/history';
import api from '../../services/api';

import { trainingDeleteRequest } from '../../store/modules/trainings/actions';

import ContainerCustom from '../../components/ContainerCustom';
import ButtomCustom from '../../components/ButtonCustom';
import ContentBox from '../../components/ContentBox';

import { Header, SearchForm } from './styles';

export default function Trainings() {
  const dispatch = useDispatch();

  const [trainings, setTrainings] = useState([]);

  async function loadStudents(query) {
    try {
      const { data } = query ?
        await api.get(`/trainings?q=${query}`) :
        await api.get(`/trainings`);
      
      //response.data[0].exercicios.map(te => alert(te))
      const { exercicios } = data
      setTrainings(data)
      
      //setTrainings(response.data);
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setTrainings([]);
    loadStudents(e.target.q.value);
  }

  function handleNavigate() {
    history.push('/training-register');
  }

  function handleDelete(id) {
    dispatch(trainingDeleteRequest(id));

    const updateTrainings = trainings.filter(training => training.id !== id);

    setTrainings(updateTrainings);
  }

  return (
    <ContainerCustom maxWidth="1200">
      <Header>
        <h1>Gerenciando Treinos</h1>

        <aside>
          <ButtomCustom clickFunc={() => handleNavigate()}>
            <>
              <MdAdd color="#fff" size={20} />
              Cadastrar
            </>
          </ButtomCustom>

          <SearchForm>
            <form onSubmit={handleSubmit}>
              <input name="q" type="text" placeholder="Buscar aluno" />
              <button type="submit">
                <MdSearch color="#ddd" size={20} />
              </button>
            </form>
          </SearchForm>
        </aside>
      </Header>

      <ContentBox>
        <table>
          <thead>
            <tr>
              <td>Nome</td>
              <td>Exercícios</td>
            </tr>
          </thead>
          <tbody>
            {trainings.map(training => (
              <tr key={String(training.id)}>
                <td>{training.name}</td>
                <td>
                  <ul>
                    {training.exercicios.join(', ').split(',').map(treino => (<li>{treino}</li>))}
                  </ul>
                </td>
                <td>
                  <div>
                    <Link
                      to={`/training-update/${training.id}`}
                      className="inline__edit"
                    >
                      editar
                    </Link>
                    <Link
                      to="/trainings"
                      onClick={() => handleDelete(training.id)}
                      className="inline__delete"
                    >
                      apagar
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ContentBox>
    </ContainerCustom>
  );
}