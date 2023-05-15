import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense, editExpense } from '../redux/actions';

class Table extends Component {
  handleClickDelete = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(id));
  };

  handleClickEdit = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpense(id));
  };

  render() {
    const { expenses } = this.props;
    const heads = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <div>
        <table>
          <thead>
            <tr>
              {heads.map(head => <th key={head}>{head}</th>)}
            </tr>
          </thead>
          <tbody>
           {expenses
              .map(({id, description, tag, method, value, exchangeRates, currency}) => (
                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ Number(value).toFixed(2) }</td>
                  <td>{ exchangeRates[currency].name }</td>
                  <td>
                    { Number(exchangeRates[currency].ask)
                      .toFixed(2) }
                  </td>
                  <td>
                    {
                      (Number(value)
                    * Number(exchangeRates[currency].ask)).toFixed(2)
                    }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => this.handleClickEdit(id) }
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.handleClickDelete(id) }
                    >
                      Excluir
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    currency: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
