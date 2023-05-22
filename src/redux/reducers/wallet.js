import { ADD_EXPENSE, DELETE_EXPENSE,
  EDIT_EXPENSE, REQUEST_SUCCESSFUL, SAVE_EDIT_EXPENSE } from '../actions/actionType';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_SUCCESSFUL:
    return { ...state, currencies: action.payload };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload),
      // filtra para deletar apenas o id selecionado apagando do array
    };
  case EDIT_EXPENSE:
    return { ...state, editor: true, idToEdit: action.payload };
    // ao clicar em editar o botão de editar passa para true e aparece no console
  case SAVE_EDIT_EXPENSE:
    return {
      ...state,
      editor: false,
      expenses: state.expenses
        .map((elem) => (elem.id === action.payload.id ? action.payload : elem)),
    };
  default:
    return state;
  }
};

export default wallet;
