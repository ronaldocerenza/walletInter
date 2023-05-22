import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense, getCurrencys, saveEditExpense } from '../redux/actions/index';

class WalletForm extends Component {
  // foi criado um estado local para receber as informações digitadas no form
  // a chave id foi implantada para ???
  state = {
    value: 0,
    description: '',
    currency: 'USD',
    method: 'dinheiro',
    tag: 'alimentacao',
    id: 0,
  };

  // realiza a requisição da API para obter a lista de moedas com a função getCurrencys()
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencys());
  }

  // handleChange padrão para alimentar o form e passar para o estado local.
  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  // ao clicar no botão dispara as informações do estado local para o estado global atravé da action assExpense
  handleClick = async () => {
    const { dispatch } = this.props;
    // desestruturação do estado global
    const { value, description, currency, method, tag, id } = this.state;

    // criada a const expense para receber as informações do estado local e passar via dispath para o estado global
    const expense = {
      value,
      description,
      currency,
      method,
      tag,
      id,
      // essa função foi implementada para receber um objeto atraves da chamada da API com todas as moedas, e passar na chave exchangeRates
      exchangeRates: await this.exchangeRates(),
    };
    dispatch(addExpense(expense));

    // apos os dados serem enviados para o global, o form é limpo retorna ao original
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });

    // O id da despesa vai sendo criada para futuramente ser usada para editar
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
  };

  // função criada para chamar a api com todas as moedas é um objeto.
  exchangeRates = async () => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      return data;
    } catch (error) {
      // se não tivermos retorno da API retornamos o erro no console.
      console.error(error);
    }
  };

  // função após o clique de editar despesa. Ele cria um novo objeto com as informações da despesa, passando o mesmo id do estado global (idToEdit).
  handleClickEdit = async () => {
    const { dispatch, expenses, idToEdit } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const expense = {
      id: idToEdit,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: await this.exchangeRates(),
    };
    dispatch(saveEditExpense(expense));

    // após editar limpa o forms
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });

    this.setState({
      // pega o ultimo do array e coloca outro numero do id
      id: expenses[expenses.length - 1].id + 1,
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;

    return (
      <div className="flex flex-col justify-between w-10/12 p-4 rounded-lg bg-orange-100">
        <form className="flex flex-col mb-5">
          <label htmlFor="value">
            <input
              onChange={ this.handleChange }
              data-testid="value-input"
              type="text"
              name="value"
              value={ value }
              placeholder="Despesas"
              className="w-full block border-2 p-1
              placeholder:italic bg-white border-orange-300
              focus:outline-none focus:border-orange-500 focus:ring-orange-400
              focus:ring-1 shadow-md rounded-md mb-2"
            />
          </label>
          <label htmlFor="description">
            <input
              onChange={ this.handleChange }
              data-testid="description-input"
              type="text"
              name="description"
              value={ description }
              placeholder="Descrição"
              className="w-full block border-2 p-1
              placeholder:italic bg-white border-orange-300
              focus:outline-none focus:border-orange-500 focus:ring-orange-400
              focus:ring-1 shadow-md rounded-md mb-2"
            />
          </label>
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
            className="w-full shadow-inner block disabled:opacity-60 bg-orange-300
            rounded-md mb-2 p-1 enabled:bg-orange-200 text-white"
          >
            { // aqui é feito um map para montar as moedas buscadas da api
              currencies.map((coin) => (
                <option
                  value={ coin }
                  key={ coin }
                >
                  { coin }
                </option>
              ))
            }
          </select>
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
            className="w-full shadow-inner block disabled:opacity-60 bg-orange-300
            rounded-md mb-2 p-1 enabled:bg-orange-200 text-white"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
            className="w-full shadow-inner block disabled:opacity-60 bg-orange-300
            rounded-md mb-2 p-1 enabled:bg-orange-200 text-white"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          {
            // aqui o botão editar só aparece quando é clicado devido estar no estado global e é setado via reducer
            editor ? (
              <button
                type="button"
                onClick={ this.handleClickEdit }
                className="w-full shadow-inner block disabled:opacity-60 bg-orange-300
                rounded-md mb-2 p-1
                enabled:bg-orange-500 text-white"
              >
                Editar despesa
              </button>)
              : (
                <button
                  type="button"
                  onClick={ this.handleClick }
                  className="w-full shadow-inner block disabled:opacity-60 bg-orange-300
                  rounded-md mb-2 p-1
                  enabled:bg-orange-500 text-white"
                >
                  Adicionar despesa
                </button>
              )
          }
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })).isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
