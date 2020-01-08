import produce from 'immer';

const INITIAL_STATE = {
  data: {},
  loading: false,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/REQUEST':
        draft.loading = true;
        break;

      case '@student/REQUEST_SUCCESS':
        draft.data = action.payload.student;
        draft.loading = false;

        break;

      case '@student/UPDATE_REQUEST':
        draft.loading = true;
        draft.data = action.payload.student;

        break;

      case '@student/UPDATE_SUCCESS':
        draft.loading = false;
        draft.data = action.payload.student;

        break;

      case '@student/DELETE_REQUEST':
        draft.loading = true;

        break;

      case '@student/DELETE_SUCCESS':
        draft.loading = false;

        break;

      case '@student/FAILURE':
        draft.loading = false;
        break;

      default:
    }
  });
}
