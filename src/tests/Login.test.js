import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testando a pagina Login.js', () => {
  it('Verificando o form de login', () => {
    renderWithRouterAndRedux(<App />);
    const title = screen.getByRole('heading', { name: /pra você/i });
    const email = screen.getByRole('textbox');
    const password = screen.getByPlaceholderText(/digite sua senha/i);
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(title).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('Verifica a validação do botão e ao preencher corretamente muda de rota', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByRole('textbox');
    const password = screen.getByPlaceholderText(/digite sua senha/i);
    userEvent.type(email, 'ronaldo@gov.com');
    userEvent.type(password, '123456');

    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
