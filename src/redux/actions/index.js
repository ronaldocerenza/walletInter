import { ADD_EMAIL, REQUEST_SUCCESSFUL, ADD_EXPENSE,
  DELETE_EXPENSE, EDIT_EXPENSE, SAVE_EDIT_EXPENSE } from './actionType';

// action que recebe o e-mail digitado na enviar para o estado global
export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

export const requestSuccessful = (data) => ({
  type: REQUEST_SUCCESSFUL,
  payload: data,
});

// usando o thunk: ele retorna uma função
export function getCurrencys() {
  return async (dispatch) => {
    try {
      // fetch para a API
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      // o data é o objeto com objetos
      const data = await response.json();
      // transformar objeto em um array de strings, neste caso o object.keys será a key (as moedas) filtrar para remover a moeda USDT
      const arrayAPI = Object.keys(data).filter((currency) => currency !== 'USDT');
      dispatch(requestSuccessful(arrayAPI));
    } catch (error) {
      console.error(error);
    }
  };
}

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  payload: id,
});

export const saveEditExpense = (expense) => ({
  type: SAVE_EDIT_EXPENSE,
  payload: expense,
});
