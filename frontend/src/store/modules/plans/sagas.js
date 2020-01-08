import { takeLatest, all, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';

import { registerPlanSuccess, updatePlanSuccess } from './actions';

export function* planAdd({ payload }) {
  try {
    const response = yield call(api.post, '/plans', payload.plan);

    toast.success('Plano adicionado com sucesso');

    put(registerPlanSuccess(response.data));

    history.push('/plans');
  } catch (err) {
    toast.error(
      'Erro ao cadastrar plano. Verifique se os dados estão corretos.'
    );
  }
}

export function* planUpdate({ payload }) {
  try {
    const { id, title, duration, price } = payload.plan;
    const response = yield call(api.put, `/plans/${id}`, {
      title,
      duration,
      price,
    });

    toast.success('Plano atualizado com sucesso');

    yield put(updatePlanSuccess(response.data));
    history.push('/plans');
  } catch (err) {
    toast.error(
      'Erro ao atualizar plano. Verifique se os dados estão corretos.'
    );
  }
}

export function* planDelete({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `/plans/${id}`);

    toast.success('Plano removido com sucesso');
  } catch (err) {
    toast.error(
      'Erro ao Deletar Plano. Verifique se ele não possui matrículas ativas.'
    );
  }
}

export default all([
  takeLatest('@plans/ADD_REQUEST', planAdd),
  takeLatest('@plans/UPDATE_REQUEST', planUpdate),
  takeLatest('@plans/DELETE_REQUEST', planDelete),
]);
