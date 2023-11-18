import { useState } from 'react';

export default function MessageSend({ sendTo, messages, setMessage }) {
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

    setUserInput('');
  }

  return (
    <form onSubmit={addMessage} className="chat-form">
      <input
        type="text"
        id="userInput"
        placeholder="Введите текст:"
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