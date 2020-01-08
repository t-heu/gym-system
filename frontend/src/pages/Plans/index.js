import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { MdAdd } from 'react-icons/md';
import { formatPrice } from '../../utils/format';

import history from '../../services/history';
import api from '../../services/api';

import { deletePlanRequest } from '../../store/modules/plans/actions';

import ContainerCustom from '../../components/ContainerCustom';
import ButtomCustom from '../../components/ButtonCustom';
import ContentBox from '../../components/ContentBox';

import { Header } from './styles';

export default function Plans() {
  const dispatch = useDispatch();

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      try {
        const response = await api.get(`/plans`);

        setPlans(response.data);
      } catch (err) {
        console.tron.log(err);
      }
    }
    loadPlans();
  }, []);

  function handleNavigate() {
    history.push('/plans-register');
  }

  function handleDelete(id) {
    dispatch(deletePlanRequest(id));

    const updatePlans = plans.filter(plan => plan.id !== id);

    setPlans(updatePlans);
  }

  return (
    <ContainerCustom maxWidth="900">
      <Header>
        <h1>Gerenciando Planos</h1>

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
              <td>Título</td>
              <td>Duração</td>
              <td className="tdCenter">Valor Por Mês</td>
              <td className="shrink" />
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={String(plan.id)}>
                <td>{plan.title}</td>
                <td>
                  {plan.duration}
                  {plan.duration === 1 ? ' mês' : ' meses'}
                </td>
                <td className="tdCenter">{formatPrice(plan.price)}</td>
                <td>
                  <div>
                    <Link
                      to={`/plans-update/${plan.id}`}
                      className="inline__edit"
                    >
                      editar
                    </Link>
                    <Link
                      to="/plans"
                      onClick={() => handleDelete(plan.id)}
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
