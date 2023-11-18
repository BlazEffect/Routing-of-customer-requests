import Button from '../components/Button.jsx';
import { Link } from 'react-router-dom';

export default function Main() {
  return (
    <div className="main">
      <h3 className="main__greeter-text">Добро пожаловать!</h3>
      <p className="main__sub-text">Какой действие вы выберите?</p>

      <div className="action-buttons">
        <Link to="/chat">
          <Button className="action-button button-question">
            Задать вопрос
          </Button>
        </Link>

        <Link to="/login">
          <Button className="action-button button-other">
            Другое
          </Button>
        </Link>
      </div>
    </div>
  )
}