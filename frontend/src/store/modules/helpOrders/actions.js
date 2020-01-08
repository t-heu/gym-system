export function getHelpOrdersSuccess(helpOrders) {
  return {
    type: '@helpOrders/GET_SUCCESS',
    payload: { helpOrders },
  };
}

export function toggleModal(id) {
  return {
    type: '@helpOrders/MODAL_TOGGLE',
    payload: { id },
  };
}

export function answerOrderRequest(id, answer) {
  return {
    type: '@helpOrders/ANSWER_REQUEST',
    payload: { id, answer },
  };
}

export function answerOrderSuccess(response) {
  return {
    type: '@helpOrders/ANSWER_SUCCESS',
    payload: { response },
  };
}
