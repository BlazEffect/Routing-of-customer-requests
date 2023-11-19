import { useState } from 'react';
import axios from 'axios';

export default function MessageSend({ sendTo, messages, setMessage, setConsultantName, setTicketName, setImportance }) {
  const [userInput, setUserInput] = useState('');

  const addMessage = (event) => {
    event.preventDefault();

    const currentDate = new Date();

    const newMessageId = Object.keys(messages).length + 1;
    const newMessage = {
      id: newMessageId,
      senderName: 'Тест 2',
      sendTo: sendTo,
      createdAt: currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      messageText: userInput
    };

    const newMessages = { ...messages, [newMessageId]: newMessage };

    setMessage(newMessages);

    const jwt = axios.post('/api/model/recognition/?text=' + userInput,
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Credentials': true,
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-site'
        }}).then((data) => {
          setConsultantName(data.data.consult);
          setTicketName(data.data.request);

          switch (data.data.importance) {
            case 'standart_priority':
              setImportance('Обычный приоритет');
              break;
            case 'medium_priority':
              setImportance('Средний приоритет');
              break;
            case 'high_priority':
              setImportance('Высокий приоритет');
              break;
          }
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