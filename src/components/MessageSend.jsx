import { useState } from 'react';
import axios from 'axios';
import ticketNames from '../data/ticket_name.json';

export default function MessageSend({ sendTo, messages, setMessage, setConsultantName }) {
  const [userInput, setUserInput] = useState('');

  const addMessage = (event) => {
    event.preventDefault();

    const currentDate = new Date();

    const newUserMessageId = Object.keys(messages).length + 1;
    const newUserMessage = {
      id: newUserMessageId,
      senderName: 'Пользователь',
      sendTo: sendTo,
      createdAt: currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      messageText: userInput
    };

    const newUserMessages = { ...messages, [newUserMessageId]: newUserMessage };

    setMessage(newUserMessages);

    axios.post('/api/model/recognition/?text=' + userInput).then((data) => {
      let importance = '';

      switch (data.data.importance) {
        case 'standart_priority':
          importance = 'Обычный приоритет';
          break;
        case 'medium_priority':
          importance = 'Средний приоритет';
          break;
        case 'high_priority':
          importance = 'Высокий приоритет';
          break;
      }

      const ticketMessage = 'Мы обработали ваш запрос: Ваш менеджер: ' + data.data.sent_to_employee + ' Приоиртет' +
        ' в очереди: ' + importance + ' Тема запроса: ' + ticketNames[data.data.request];

      const newAdminMessageId = Object.keys(newUserMessages).length + 1;
      const newAdminMessage = {
        id: newAdminMessageId,
        senderName: 'Пользователь',
        sendTo: 'User',
        createdAt: currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        messageText: ticketMessage
      };

      const newAdminMessages = { ...newUserMessages, [newAdminMessageId]: newAdminMessage };

      setMessage(newAdminMessages);

      setConsultantName(data.data.sent_to_employee);
    });

    setUserInput('');
  }

  return (
    <form onSubmit={addMessage} className="chat-form">
      <input
        type="text"
        id="userInput"
        placeholder="Введите текст"
        className="chat-form__input"
        name="userInput"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button
        type="submit"
        className="chat-form__button"
      >
      </button>
    </form>
  )
}