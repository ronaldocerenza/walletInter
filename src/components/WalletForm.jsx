import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencys } from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    value: 0,
    description: '',
    currency: 'USD',
    method: 'dinheiro',
    tag: 'alimentacao',
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

  // handleClick = () => {
  //   const { dispatch } = this.props;
  //   const { value, description, currency, method, tag, id } = this.state;
  //   const expense = {
  //     id,
  //     value,
  //     description,
  //     currency,
  //     method,
  //     tag,
  //     exchangeRates: {},
  //   };
  //   dispatch(expense);

  //   // O id da despesa deve ser um número sequencial
  //   this.setState((prevState) => ({
  //     id: prevState.id + 1,
  //   }));
  // };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencys } = this.props;

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
            {currencys.map((coin) => (
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
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
          <button
            type="button"
            // onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencys: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencys: state.wallet.currencys,
});

export default connect(mapStateToProps)(WalletForm);
