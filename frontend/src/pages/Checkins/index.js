import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch, MdCheckCircle } from 'react-icons/md';

import history from '../../services/history';
import api from '../../services/api';

//import { studentDeleteRequest } from '../../store/modules/student/actions';
import ContainerCustom from '../../components/ContainerCustom';
import ContentBox from '../../components/ContentBox';

import { Header, SearchForm, Button } from './styles';
import colors from '../../styles/colors';

export default function Checkins() {
  const [loading, setLoading] = useState(false);
  //const dispatch = useDispatch();
  const [query, setQuery] = useState([])
  const [registrations, setRegistrations] = useState([]);
  
  useEffect(() => {
    async function loadRegistrations() {
      try {
        const response = query ?
          await api.get(`/registration?q=${query}`) :
          await api.get(`/registration`);
        
        const data = response.data;
        
        setRegistrations(data);
      } catch (err) {
        alert('e: ' + err)
      }
    }
    loadRegistrations();
  }, [query]);
  
  async function handleSubmit(id) {
    try {
      setLoading(true);
      await api.post(`/students/${id}/checkins`);
    
      setLoading(false);
      alert('Check!');
    } catch (err) {
      setLoading(false);
      alert('Ooops.. ');
    }
  }
  
async function handleSearch(e) {
  e.preventDefault();
  setRegistrations([]);

  setQuery(e.target.q.value);
}

return (
  <ContainerCustom maxWidth="1200">
      <Header>
        <h1>Treino do Aluno</h1>

        <aside>
          <SearchForm>
            <form onSubmit={handleSearch}>
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
              <td>Status</td>
              <td className="shrink" />
            </tr>
          </thead>
          <tbody>
            {registrations.map(student => (
              <tr key={String(student.id)}>
                <td>{student.student.name}</td>
                <td>
                  <MdCheckCircle
                  color={
                    student.active ? colors.warnSuccess : colors.grayLight
                  } />
                </td>
                <td>
                  <div>
                   <Button
                      type="button"
                      onClick={() => handleSubmit(student.id)}>
                    <>
                      <MdAdd color="#fff" size={17} />
                      Checkin
                    </>
                    </Button>
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