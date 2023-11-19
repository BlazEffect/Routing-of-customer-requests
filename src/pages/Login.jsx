import Button from '../components/Button.jsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');

  const [authStatus, setAuthStatus] = useState('');

  const auth = (event) => {
    event.preventDefault();
    setAuthStatus('');

    axios.post('/api/token?username=' + loginInput + '&password=' + password).then((data) => {
      setAuthStatus('Успешных вход');
      localStorage.setItem('jwt', data.data.access_token);
    }).catch(error => {
      if (error.response) {
        if (error.response.status === 401) {
          setAuthStatus('Проверьте логин или пароль');
        }
      }
    });
  }

  return (
    <div className="auth">
      <h3 className="auth__greeter-text">Вход в<br/>административную<br/>панель</h3>

      <form onSubmit={ auth } className="auth-form">
        <input
          type="text"
          id="userLogin"
          placeholder="Логин"
          className="auth-form__input"
          name="userLogin"
          value={loginInput}
          onChange={(e) => setLoginInput(e.target.value)}
        />

        <input
          type="password"
          id="userPassword"
          placeholder="Пароль"
          className="auth-form__input"
          name="userPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p>{ authStatus }</p>

        <button type="submit" className="auth__button">Войти</button>
      </form>

      <Link to="/">
        <Button className="action-button button-other">
          Назад
        </Button>
      </Link>
    </div>
  )
}