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

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, this.validationBtn);
  };

  validationEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  validationBtn = () => {
    const {
      email,
      password,
    } = this.state;
    const six = 6;
    const eigth = 8;
    const valEmail = this.validationEmail(email);
    const valPassword = password.length >= six && password.length <= eigth;

    this.setState({
      isDisabled: !(
        valEmail && valPassword),
    });
  };

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
        <img src="./public/logo192.png" alt="teste" />
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

export default connect()(Login);

Login.propTypes = {
  history: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};
