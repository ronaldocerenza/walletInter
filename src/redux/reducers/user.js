import { ADD_EMAIL } from '../actions/actionType';

const INITIAL_STATE = {
  email: '',
};

// o reducer user apenas recebe o email da pagina home
function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EMAIL:
    return { ...state, email: action.payload };
  default:
    return state;
  }
}

export default user;
