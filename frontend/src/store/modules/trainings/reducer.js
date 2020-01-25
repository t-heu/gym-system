import produce from 'immer';

const INITIAL_STATE = {
  data: {},
  loading: false,
};

export default function trainings(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@training/REQUEST':
        draft.loading = true;
        break;

      case '@training/REQUEST_SUCCESS':
        draft.data = action.payload.student;
        draft.loading = false;
        break;

      case '@training/UPDATE_REQUEST':
        draft.loading = true;
        draft.data = action.payload.student;
        break;

      case '@training/UPDATE_SUCCESS':
        draft.loading = false;
        draft.data = action.payload.student;
        break;

      case '@training/DELETE_REQUEST':
        draft.loading = true;
        break;

      case '@training/DELETE_SUCCESS':
        draft.loading = false;
        break;

      case '@training/FAILURE':
        draft.loading = false;
        break;

      default:
    }
  });
}