import { useEffect, useState } from 'react';
import Message from './Message.jsx';
import data from '../data/messages.json';

export default function Messager({ messages, setMessage }) {
  useEffect(() => {
    setMessage(data);
  });

  useEffect(() => {
    if (Object.keys(messages).length !== 0) {
      setMessage(messages);
    }
  }, [messages]);

  const fetchMessages = () => {

  }

  return (
    <div className="chat-body">
      {messages && Object.values(messages).map(message => (
        <Message key={message.id} messageData={message}/>
      ))}
    </div>
  )
}