import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  expensesValues = () => {
    const { expenses } = this.props;
    // se não houver nenhuma despesa salva, retorna o valor zero
    const arrayOfValues = expenses
      .map(({ currency, value, exchangeRates }) => {
        const exchange = exchangeRates[currency].ask;
        return (Number(value) * Number(exchange));
      });
    return arrayOfValues
      .reduce((acc, curr) => Number(acc) + Number(curr), 0)
      .toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <h2 data-testid="email-field">
          { email }
        </h2>
        <h3 data-testid="total-field">
          { this.expensesValues() }
        </h3>
        <h3 data-testid="header-currency-field">
          BRL
        </h3>

      </div>
    );
  }
}

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

export default connect(mapStateToProps)(Header);
