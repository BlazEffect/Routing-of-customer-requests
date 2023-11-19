import { useEffect } from 'react';
import Message from './Message.jsx';

export default function Messager({ messages, setMessage }) {
  useEffect(() => {
    if (Object.keys(messages).length !== 0) {
      setMessage(messages);
    }
  }, [messages]);

  return (
    <div className="chat-body">
      {messages && Object.values(messages).map(message => (
        <Message key={message.id} messageData={message}/>
      ))}
    </div>
  )
}