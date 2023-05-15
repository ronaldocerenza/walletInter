import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  // construido para validar e habilitar o botão de acordo com as validações
  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, this.validationBtn);
  };

  // validação do e-mail
  validationEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // validação para ativar o botão
  validationBtn = () => {
    const {
      email,
      password,
    } = this.state;
    const six = 6;
    const eigth = 8;
    const valEmail = this.validationEmail(email);
    const valPassword = password.length >= six && password.length <= eigth;

    // disable is true set false para habilitar o botão
    this.setState({
      isDisabled: !(
        valEmail && valPassword),
    });
  };

  // ao clicar no botão mudar a rota, e disparar a com a função addEmail criando uma chave no reducer user o e-mail digitado pelo usuario
  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(addEmail(email));
    history.push('/carteira');
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <div className="login-container">
        <form className="wallet-form">
          <label htmlFor="email-input">
            <input
              onChange={ this.onInputChange }
              className="email-input"
              data-testid="email-input"
              type="email"
              name="email"
              placeholder="Digite Seu Email"
            />
          </label>
          <label htmlFor="password-input">
            <input
              onChange={ this.onInputChange }
              className="password-input"
              data-testid="password-input"
              type="password"
              name="password"
              placeholder="Digite Sua Senha"
            />
          </label>
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
