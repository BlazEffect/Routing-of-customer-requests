import Avatar from '../assets/images/icon1.png'
import Arrow_back from '../assets/images/arrow_back.png'
import Dots from '../assets/images/dots.png';
import Messager from '../components/Messager.jsx';
import MessageSend from '../components/MessageSend.jsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Chat() {
  const [messages, setMessage] = useState([]);

  return (
    <div className="chat">
      <div className="chat-header">
        <Link to="/">
          <img src={Arrow_back} className="header__back" alt=""/>
        </Link>

        <div className="header__info">
          <div className="info__operator-avatar">
            <img src={Avatar} alt=""/>
          </div>

          <div className="info__operator-name">
            Ваш куратор
          </div>
        </div>

        <img src={Dots} className="header__more" alt=""/>
      </div>

      <Messager messages={messages} setMessage={setMessage}/>

      <div className="chat-footer">
        <MessageSend sendTo="Admin" messages={messages} setMessage={setMessage}/>
      </div>
    </div>
  )
}