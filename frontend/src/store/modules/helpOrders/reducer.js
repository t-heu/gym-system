import produce from 'immer';

const INITIAL_STATE = {
  orders: [],
  loading: false,
  modal: false,
};

export default function helpOrders(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@helpOrders/GET_SUCCESS':
        draft.orders = action.payload.helpOrders;

        break;

      case '@helpOrders/MODAL_TOGGLE':
        draft.modal = !state.modal;
        break;

      case '@helpOrders/ANSWER_SUCCESS':
        draft.modal = false;
        draft.orders.splice(
          draft.orders.findIndex(o => o.id === action.payload.response.id),
          1
        );

        break;
      default:
    }
  });
}
