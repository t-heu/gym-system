import { takeLatest, all, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';

import { addRegistrationSuccess, updateRegistrationSuccess } from './actions';

export function* registrationAdd({ payload }) {
  try {
    const response = yield call(
      api.post,
      '/registration',
      payload.registration
    );

    toast.success('Matrícula Adicionada com sucesso');
    put(addRegistrationSuccess(response.data));
    history.push('/registration');
  } catch (err) {
    toast.error(
      'Erro. O Aluno já possui uma matrícula ativa no período selecionado.'
    );
  }
}

export function* registrationUpdate({ payload }) {
  try {
    const response = yield call(
      api.put,
      `/registration/${payload.registration.id}`,
      payload.registration
    );

    toast.success('Matrícula Atualizada com sucesso');
    put(updateRegistrationSuccess(response.data));
    history.push('/registration');
  } catch (err) {
    toast.error('Erro ao atualizar. Verifique os dados e tente novamente.');
  }
}

export function* registrationDelete({ payload }) {
  try {
    yield call(api.delete, `registration/${payload.id}`);

    toast.success('Matrícula removida com sucesso');
  } catch (err) {
    toast.error('Erro ao apagar matrícula');
  }
}

export default all([
  takeLatest('@registration/ADD_REQUEST', registrationAdd),
  takeLatest('@registration/UPDATE_REQUEST', registrationUpdate),
  takeLatest('@registration/DELETE_REQUEST', registrationDelete),
]);
