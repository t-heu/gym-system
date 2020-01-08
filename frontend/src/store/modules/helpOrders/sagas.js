import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import { answerOrderSuccess } from './actions';

export function* helpAnswer({ payload }) {
  try {
    const response = yield call(api.post, `/help-orders/${payload.id}/answer`, {
      answer: payload.answer,
    });

    toast.success('Resposta enviada com sucesso');

    yield put(answerOrderSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao responder requisição');
  }
}

export default all([takeLatest('@helpOrders/ANSWER_REQUEST', helpAnswer)]);
