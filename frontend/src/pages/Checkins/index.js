import React, { useState, useEffect } from 'react';
//import { useDispatch } from 'react-redux';
//import { Link } from 'react-router-dom';
import { MdAdd, MdSearch, MdCheckCircle } from 'react-icons/md';

//import history from '../../services/history';
import api from '../../services/api';

//import { studentDeleteRequest } from '../../store/modules/student/actions';
import ContainerCustom from '../../components/ContainerCustom';
import ContentBox from '../../components/ContentBox';

import { Header, SearchForm, Button } from './styles';
import colors from '../../styles/colors';

export default function Checkins() {
  //const [loading, setLoading] = useState(false);
  //const dispatch = useDispatch();
  const [trai, setTrai] = useState([])
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
      //setLoading(true);
      const res = await api.post(`/students/${id}/checkins`);
      if(res.length >= 1) {
        const traini = await api.get(`/trai/${id}`)
        
        setTrai(traini.data[0].trainings)
      }
    } catch (err) {
      //setLoading(false);
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
              <td className="shrink" />
            </tr>
          </thead>
          <tbody>
            {registrations.map(student => (
              <tr style={{display: student.active ? '' : 'none'}} key={String(student.id)}>
                <td>
                  {student.student.name}
                  <MdCheckCircle color={student.active ? colors.warnSuccess : colors.grayLight} />
                </td>
                
                <td>
                   <Button
                      onClick={() => handleSubmit(student.id)}>
                    <>
                      <MdAdd color="#fff" size={17} />
                      
                    </>
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ContentBox>
      
      <ContentBox>
        <div style={{padding: '20px'}}>
        <h2>info:</h2>
        {trai.length != 0 && (
          <>
            {trai.map(d => (
              <p>{d.name}</p>
            ))}
          </>
        )}
        </div>
      </ContentBox>
    </ContainerCustom>
  );
}