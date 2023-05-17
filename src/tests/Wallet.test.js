import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import App from '../App';

describe('Testando a pagina Wallet.js', () => {
  const initialEntries = ['/carteira'];

  const valueInput = 'value-input';
  const totalField = 'total-field';

  const expense1 = {
    value: '80',
    description: 'Fone',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Lazer',
    id: 0,
    exchangeRates: mockData,
  };

  const expense2 = {
    value: '20',
    description: 'Mouse',
    currency: 'USD',
    method: 'Cartão de crédito',
    tag: 'Lazer',
    id: 1,
    exchangeRates: mockData,
  };

  // beforeEach(() => {
  //   global.fetch = jest.fn(mockData);
  // });

  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it('Verificando os inputs', async () => {
    const initialState = { user: { email: 'ronaldo@teste.com' } };
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });
    expect(global.fetch).toHaveBeenCalledTimes(1);

    expect(screen.getByText(/ronaldo@teste\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/brl/i)).toBeInTheDocument();
    expect(screen.getByText(/0\.00/i)).toBeInTheDocument();

    const value = screen.getByTestId(valueInput);
    const description = screen.getByTestId('description-input');
    const currency = await screen.findByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    const buttonAdd = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(value).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(buttonAdd).toBeInTheDocument();
  });

  it('Verifica o calculo do Header total de despesas', () => {
    const initialState = {
      wallet: {
        expenses: [expense1, expense2],
        currencies: Object.keys(mockData).filter((currency) => currency !== 'USDT'),
      },
    };
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });
    const total = screen.getByTestId(totalField);
    expect(total).toHaveTextContent('475.31');
  });

  it('Verifica o botão de deletar despesas', () => {
    const initialState = {
      wallet: {
        expenses: [expense1, expense2],
        currencies: Object.keys(mockData).filter((currency) => currency !== 'USDT'),
      },
    };
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });
    const button = screen.getAllByRole('button', { name: /excluir/i });
    userEvent.click(button[0]);
    expect(screen.getByTestId(totalField)).toHaveTextContent('95.06');
  });

  it('Verifica o botão de editar despesas', () => {
    const initialState = {
      wallet: {
        expenses: [expense1, expense2],
        currencies: Object.keys(mockData).filter((currency) => currency !== 'USDT'),
      },
    };
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });
    const button = screen.getAllByRole('button', { name: /editar/i });
    userEvent.click(button[0]);
    const value = screen.getByTestId(valueInput);
    userEvent.type(value, '200');
    expect(screen.getByTestId(totalField)).toHaveTextContent('475.31');
    const buttonEdit = screen.getByRole('button', { name: /editar despesa/i });
    userEvent.click(buttonEdit);
  });

  it('Verifica se adicionando a despesa, os inputs são limpos', () => {
    renderWithRouterAndRedux(<App />, { initialEntries });
    const value = screen.getByTestId(valueInput);
    const description = screen.getByTestId('description-input');
    const buttonAdd = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.type(value, '200');
    userEvent.type(description, 'Duzentão');
    userEvent.click(buttonAdd);
    expect(value).toHaveTextContent('');
    expect(description).toHaveTextContent('');
  });
});
