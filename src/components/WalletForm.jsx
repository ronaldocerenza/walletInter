import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense, getCurrencys, saveEditExpense } from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    value: 0,
    description: '',
    currency: 'USD',
    method: 'dinheiro',
    tag: 'alimentacao',
    id: 0,
  };

  // realiza a requisição da API para obter a lista de moedas com a getCurrencys()
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencys());
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { dispatch } = this.props;
    const { value, description, currency, method, tag, id } = this.state;
    const expense = {
      value,
      description,
      currency,
      method,
      tag,
      id,
      exchangeRates: await this.exchangeRates(),
    };
    dispatch(addExpense(expense));

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });

    // O id da despesa para usar para editar
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
  };

  exchangeRates = async () => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      return data;
    } catch (error) {
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
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });

    this.setState({
      id: expenses[expenses.length - 1].id + 1,
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;

    return (
      <div className="cart-count">
        <form className="cart-form">
          <label htmlFor="value">
            <input
              onChange={ this.handleChange }
              data-testid="value-input"
              type="text"
              name="value"
              value={ value }
              placeholder="Despesas"
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
            />
          </label>
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((coin) => (
              <option
                value={ coin }
                key={ coin }
              >
                { coin }
              </option>
            ))}
          </select>
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
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
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          {
            editor ? (
              <button type="button" onClick={ this.handleClickEdit }>
                Editar despesa
              </button>)
              : (
                <button type="button" onClick={ this.handleClick }>
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
