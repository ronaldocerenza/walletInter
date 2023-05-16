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
    const heads = ['Descrição', 'Tag', 'Método de pagamento', 'Valor',
      'Moeda', 'Câmbio utilizado', 'Valor convertido',
      'Moeda de conversão', 'Editar/Excluir'];
    return (
      <div
        className="bg-white flex absolute min-h-screen w-4/5
        right-0 top-0 items-center overflow-scroll"
      >
        <table
          className="table-auto absolute bg-orange-100 top-0 min-w-full min-h-screen
          border-separate border-spacing-2 justify-center"
        >
          <thead className="text-white bg-orange-500">
            <tr className="h-16">
              {
                heads.map(
                  (head) => (
                    <th
                      className="border border-white rounded-md"
                      key={ head }
                    >
                      {head}
                    </th>),
                )
              }
            </tr>
          </thead>
          <tbody className="h-16">
            {expenses
              .map(({ id, description, tag, method, value, exchangeRates, currency }) => (
                <tr key={ id }>
                  <td
                    className="text-center border border-white rounded-md"
                  >
                    { description }
                  </td>
                  <td
                    className="text-orange-500 text-center border border-white rounded-md"
                  >
                    { tag }
                  </td>
                  <td
                    className="text-orange-500 text-center border border-white rounded-md"
                  >
                    { method }
                  </td>
                  <td
                    className="text-orange-500 text-center border border-white rounded-md"
                  >
                    { Number(value).toFixed(2) }
                  </td>
                  <td
                    className="text-orange-500 text-center border border-white rounded-md"
                  >
                    { exchangeRates[currency].name }
                  </td>
                  <td
                    className="text-orange-500 text-center border border-white rounded-md"
                  >
                    { Number(exchangeRates[currency].ask)
                      .toFixed(2) }
                  </td>
                  <td
                    className="text-orange-500 text-center border border-white rounded-md"
                  >
                    {
                      (Number(value)
                    * Number(exchangeRates[currency].ask)).toFixed(2)
                    }
                  </td>
                  <td
                    className="text-orange-500 text-center border border-white rounded-md"
                  >
                    Real
                  </td>
                  <td
                    className="text-orange-500 text-center border border-white rounded-md"
                  >
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => this.handleClickEdit(id) }
                      className="w-full shadow-inner block disabled:opacity-60
                      bg-orange-300 rounded-md mb-2 p-1
                      enabled:bg-orange-500 text-white"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.handleClickDelete(id) }
                      className="w-full shadow-inner block disabled:opacity-60
                      bg-orange-300 rounded-md mb-2 p-1
                      enabled:bg-orange-500 text-white"
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
