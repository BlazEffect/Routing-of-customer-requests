import Button from '../components/Button.jsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [loginInput, setLoginInput] = useState();
  const [password, setPassword] = useState();

  return (
    <div className="auth">
      <h3 className="auth__greeter-text">Вход в<br/>административную<br/>панель</h3>

      <form action="" className="auth-form">
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

        <Button className="auth__button">
          Войти
        </Button>
      </form>

      <Link to="/">
        <Button className="action-button button-other">
          Назад
        </Button>
      </Link>
    </div>
  )
}