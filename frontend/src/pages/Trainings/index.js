import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { MdAdd, MdSearch } from 'react-icons/md';
import history from '../../services/history';
import api from '../../services/api';

import { studentDeleteRequest } from '../../store/modules/student/actions';

import ContainerCustom from '../../components/ContainerCustom';
import ButtomCustom from '../../components/ButtonCustom';
import ContentBox from '../../components/ContentBox';

import { Header, SearchForm } from './styles';

export default function Trainings() {
  const dispatch = useDispatch();

  const [students, setStudents] = useState([]);

  async function loadStudents(query) {
    try {
      const response = query ?
        await api.get(`/students?q=${query}`) :
        await api.get(`/students`);

      setStudents(response.data);
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setStudents([]);
    loadStudents(e.target.q.value);
  }

  function handleNavigate() {
    history.push('/trainings-register');
  }

  function handleDelete(id) {
    dispatch(studentDeleteRequest(id));

    const updateStudents = students.filter(student => student.id !== id);

    setStudents(updateStudents);
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
              <td>Email</td>
              <td>Code</td>
              <td className="tdCenter">Idade</td>
              <td className="shrink" />
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={String(student.id)}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.code}</td>
                <td className="tdCenter">{student.age}</td>
                <td>
                  <div>
                    <Link
                      to={`/trainings-update/${student.id}`}
                      className="inline__edit"
                    >
                      editar
                    </Link>
                    <Link
                      to="/students"
                      onClick={() => handleDelete(student.id)}
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