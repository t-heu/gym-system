import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { MdAdd, MdCheckCircle } from 'react-icons/md';

import history from '../../services/history';
import api from '../../services/api';

import { deleteRegistrationRequest } from '../../store/modules/registration/actions';

import ContainerCustom from '../../components/ContainerCustom';
import ButtomCustom from '../../components/ButtonCustom';
import ContentBox from '../../components/ContentBox';

import { Header } from './styles';
import colors from '../../styles/colors';

export default function Registration() {
  const dispatch = useDispatch();

  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    async function loadRegistrations() {
      try {
        const response = await api.get(`/registration`);

        const data = response.data.map(reg => ({
          ...reg,
          startDateFormatted: format(
            parseISO(reg.start_date),
            "dd 'de' MMMM 'de' yyyy",
            {
              locale: pt,
            }
          ),
          endDateFormatted: format(
            parseISO(reg.end_date),
            "dd 'de' MMMM 'de' yyyy",
            {
              locale: pt,
            }
          ),
        }));

        setRegistrations(data);
      } catch (err) {
        //console.tron.log(err);
      }
    }
    loadRegistrations();
  }, []);

  function handleNavigate() {
    history.push('/new-registration');
  }

  function handleDelete(id) {
    dispatch(deleteRegistrationRequest(id));
    const updateRegistration = registrations.filter(
      register => register.id !== id
    );
    setRegistrations(updateRegistration);
  }

  return (
    <ContainerCustom maxWidth="1380">
      <Header>
        <h1>Gerenciando Matrículas</h1>

        <aside>
          <ButtomCustom clickFunc={() => handleNavigate()}>
            <>
              <MdAdd color="#fff" size={20} />
              Cadastrar
            </>
          </ButtomCustom>
        </aside>
      </Header>

      <ContentBox>
        <table>
          <thead>
            <tr>
              <td>Aluno</td>
              <td className="tdCenter">Plano</td>
              <td className="tdCenter">Início</td>
              <td className="tdCenter">Término</td>
              <td className="tdCenter">Status</td>
              <td className="shrink" />
            </tr>
          </thead>
          <tbody>
            {registrations.map(register => (
              <tr key={String(register.id)}>
                <td>{register.student.name}</td>
                <td className="tdCenter">{register.plan.title}</td>
                <td className="tdCenter">{register.startDateFormatted}</td>
                <td className="tdCenter">{register.endDateFormatted}</td>
                <td className="tdCenter">
                  <MdCheckCircle
                    color={
                      register.active ? colors.warnSuccess : colors.grayLight
                    }
                  />
                </td>

                <td>
                  <div>
                    <Link
                      to={`/registration-update/${register.id}`}
                      className="inline__edit"
                    >
                      editar
                    </Link>
                    <Link
                      to="/registration"
                      onClick={() => handleDelete(register.id)}
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
