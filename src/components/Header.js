import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  expensesValues = () => {
    // feita a leitura do estado global através do mapStateToProps, usamos os dados da despesa
    const { expenses } = this.props;
    const arrayOfValues = expenses
      .map(({ currency, value, exchangeRates }) => {
        // essa constante guarda o valor da moeda escolhida, buscada em ask que tem o cambio em relação ao real
        const exchange = exchangeRates[currency].ask;
        // logo o valor do cambio é multiplicado pelo cambio encontrado
        return (Number(value) * Number(exchange));
      });
      // ainda na função é feita a soma do valor, note que inicialmente esse valor é zero anulando uma possivel condicional.
    return arrayOfValues
      .reduce((acc, curr) => Number(acc) + Number(curr), 0)
      .toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <div
        className="bg-orange-100 p-4 rounded-lg w-10/12
      justify-center text-center m-5"
      >
        <h2 className="text-2xl text-orange-500 " data-testid="email-field">
          { email }
        </h2>
        <h3 className="text-xl" data-testid="total-field">
          { // a função retorna o valor das despesas transformando para moeda selecionada, e mantendo duas casas decimais
            this.expensesValues()
          }
        </h3>
        <h3 data-testid="header-currency-field">
          BRL
        </h3>

      </div>
    );
  }
}

// map para ler as informações do estado, buscando dois reducers o user e o wallet
const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  expenses: globalState.wallet.expenses,
});

Header.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      currency: PropTypes.string,
    }),
  ).isRequired,
  email: PropTypes.string.isRequired,
};

// aqui o connet recebe o mapStateToProps porque usamos os valores do estado Global,
// tanto o e-mail digitado na home quanto as despesas cadastradas pelo usuário
export default connect(mapStateToProps)(Header);
