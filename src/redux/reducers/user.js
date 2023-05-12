import { PUSH_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case PUSH_EMAIL:
    return { ...state, email: action.payload };
  default:
    return state;
  }
}

export default user;
