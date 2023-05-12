// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Esse reducer será responsável por tratar as informações da pessoa usuária
// import { REQUEST_IMAGE, GET_IMAGE, GET_NAME, FAILED_REQUEST } from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  imagePath: '',
  name: '',
  error: '',
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 1:
    return { ...state, isFetching: true };
  default:
    return state;
  }
}

export default wallet;
