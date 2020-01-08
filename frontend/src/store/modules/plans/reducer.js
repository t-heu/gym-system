import produce from 'immer';

const INITIAL_STATE = {
  plan: {},
  loading: false,
};

export default function plans(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@plans/ADD_REQUEST':
        draft.plan = action.payload.plan
        draft.loading = true;
        break;
      case '@plans/ADD_SUCCESS':
        draft.plan = action.payload.plan;
        draft.loading = false;
        break;
      case '@plans/UPDATE_REQUEST':
        draft.loading = true;
        draft.plan = action.payload.plan;
        break;
      case '@plans/UPDATE_SUCCESS':
        draft.loading = false;
        draft.plan = action.payload.plan;
        break;
      case '@plans/DELETE_REQUEST':
        draft.loading = true;
        break;
      default:
    }
  });
}