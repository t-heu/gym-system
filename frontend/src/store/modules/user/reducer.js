import produce from 'immer';

const INITIAL_STATE = {
  name: '',
  email: '',
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        const { name, email } = action.payload.user;
        draft.name = name;
        draft.email = email;
        break;
      }

      default:
    }
  });
}
