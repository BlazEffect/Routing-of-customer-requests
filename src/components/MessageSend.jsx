import { useState } from 'react';
import axios from 'axios';
import ticketNames from '../data/ticket_name.json';

export default function MessageSend({ sendTo, messages, setMessage, setConsultantName }) {
  const [userInput, setUserInput] = useState('');

  const addMessage = (event) => {
    event.preventDefault();

    const currentDate = new Date();

    const words = userInput.split(' ');

    let newUserMessageId = Object.keys(messages).length + 1;
    let newUserMessage = {
      id: newUserMessageId,
      senderName: 'Пользователь',
      sendTo: sendTo,
      createdAt: currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      messageText: userInput
    };

    let newUserMessages = { ...messages, [newUserMessageId]: newUserMessage };

    setMessage(newUserMessages);

    if (words.length > 5) {
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
    } else {
      newUserMessageId = Object.keys(newUserMessages).length + 1;
      newUserMessage = {
        id: newUserMessageId,
        senderName: 'Админ',
        sendTo: 'User',
        createdAt: currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        messageText: 'Слишком маленькое сообщение'
      };

      newUserMessages = { ...newUserMessages, [newUserMessageId]: newUserMessage };

      setMessage(newUserMessages);
    }
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