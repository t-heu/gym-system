import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '../../../services/history';
import api from '../../../services/api';

import {
  studentFailure,
  studentRegisterSuccess,
  getStudentSuccess,
  studentUpdateSuccess,
  studentDeleteSuccess,
} from './actions';

export function* registerStudent({ payload }) {
  try {
    const response = yield call(api.post, 'students', payload.student);
    toast.success('Aluno Cadastrado com Sucesso');
    yield put(studentRegisterSuccess(response.data));
    history.push('/students');
  } catch (err) {
    toast.error('Erro ao cadastrar aluno. Verifique os dados.');
    yield put(studentFailure());
  }
}

export function* getStudent({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `students/${id}`);

    yield put(getStudentSuccess(response.data));
  } catch (err) {
    console.log('ERROR GET_STUDENT: ', err);
    toast.error('Usuário não encontrado. Verifique os dados.');
    yield put(studentFailure());
  }
}

export function* updateStudent({ payload }) {
  try {
    const { id, name, email, age, weight, height, code } = payload.student;

    const response = yield call(api.put, `students/${id}`, {
      name,
      email,
      age,
      weight,
      height,
      code
    });

    toast.success('Aluno atualizado com sucesso');

    yield put(studentUpdateSuccess(response.data));
    history.push('/students');
  } catch (err) {
    console.log('ERROR UPDATE_STUDENT: ', err);
    toast.error('Erro ao atualizar os dados.');
  }
}

export function* deleteStudent({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `/students/${id}`);

    toast.success('Aluno excluido com sucesso');

    yield put(studentDeleteSuccess());
  } catch (err) {
    toast.error(
      'Falha ao deletar. Verifique se o aluno possui uma matrícula válida.'
    );
  }
}

export default all([
  takeLatest('@student/REGISTER_REQUEST', registerStudent),
  takeLatest('@student/REQUEST', getStudent),
  takeLatest('@student/UPDATE_REQUEST', updateStudent),
  takeLatest('@student/DELETE_REQUEST', deleteStudent),
]);
