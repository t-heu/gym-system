import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '../../../services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { code } = payload;

    const response = yield call(api.post, '/studentsession', { code });

    const { id } = response.data;

    yield put(signInSuccess(id));
  } catch (err) {
    Alert.alert('Falha na Autenticação', 'Verifique se seu email está correto');
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
