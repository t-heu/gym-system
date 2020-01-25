import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '../../../services/history';
import api from '../../../services/api';

import {
  trainingFailure,
  trainingRegisterSuccess,
  trainingUpdateSuccess,
  trainingDeleteSuccess,
  getTrainingSuccess
} from './actions';

export function* registerTraining({ payload }) {
  try {
    const response = yield call(api.post, 'training', payload.training);
    
    toast.success('Aluno Cadastrado com Sucesso');
    
    yield put(trainingRegisterSuccess(response.data));
    
    history.push('/trainings');
  } catch (err) {
    toast.error('Erro ao cadastrar aluno. Verifique os dados.');
    yield put(trainingFailure());
  }
}

export function* getTrainingRequest({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `students/${id}`);

    yield put(getTrainingSuccess(response.data));
  } catch (err) {
    toast.error('Usuário não encontrado. Verifique os dados.');
    yield put(trainingFailure());
  }
}

export function* updateTraining({ payload }) {
  try {
    const { name, exe, id } = payload.training;
    alert(id)
    const response = yield call(api.put, `training/${id}`, {
      name,
      exe
    });

    toast.success('Treini atualizado com sucesso');

    yield put(trainingUpdateSuccess(response.data));
    history.push('/trainings');
  } catch (err) {
    toast.error('Erro ao atualizar os dados.');
  }
}

export function* deleteTraining({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `/training/${id}`);

    toast.success('Treino excluído com sucesso');

    yield put(trainingDeleteSuccess());
  } catch (err) {
    toast.error(
      'Falha ao deletar. Verifique se o aluno possui uma matrícula válida.'
    );
  }
}

export default all([
  takeLatest('@training/REGISTER_REQUEST', registerTraining),
  takeLatest('@training/REQUEST', getTrainingRequest),
  takeLatest('@training/UPDATE_REQUEST', updateTraining),
  takeLatest('@training/DELETE_REQUEST', deleteTraining),
]);