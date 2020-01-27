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
//Linkp
export default function Linke() {
  const dispatch = useDispatch();

  const [link, setLink] = useState([]);

  async function loadStudents(query) {
    try {
      const { data } = query ?
        await api.get(`/trai?q=${query}`) :
        await api.get(`/trai`);
      
      //alert(typeof data[0].trainings)
      setLink(data)
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLink([]);
    loadStudents(e.target.q.value);
  }

  return (
    <ContainerCustom maxWidth="1200">
      <Header>
        <h1>Gerenciando Treinos</h1>

        <aside>
          <div>
            <form onSubmit={handleSubmit}>
              <input name="aluno" type="text" placeholder="Buscar aluno" />
              <input name="treino" type="text" placeholder="Buscar treino" />
            </form>
          </div>
          
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
              <td>Nome dos Treinos</td>
            </tr>
          </thead>
          <tbody>
            {link.map(re => (
              <tr key={String(re.id)}>
                <td>{re.name}</td>
                <td>
                  <ul>
                    {re.trainings.length == 0 ? (
                      <li>vazio</li>
                    ) : (
                      <>
                        {re.trainings.map(a => (
                          <li>{a.name}</li>
                        ))}
                      </>
                    )}
                  </ul>
                </td>
                <td>
                <Link to={`/linke/${re.id}`}>ver</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ContentBox>
    </ContainerCustom>
  );
}