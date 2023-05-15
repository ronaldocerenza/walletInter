import { ADD_EMAIL, REQUEST_SUCCESS } from './actionType';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

export const requestSuccessful = (data) => ({
  type: REQUEST_SUCCESS,
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
      console.log(arrayAPI);
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
