import Avatar from '../assets/images/icon.png'

export default function Message({ messageData }) {
  const { sendTo, createdAt, messageText } = messageData;

  return (
    <div className={`message-card ${sendTo === 'User' ? '' : 'message-card--right'}`}>
      {sendTo === 'User' &&
        <div className="message-card__avatar">
          <img src={Avatar} alt=""/>
        </div>
      }

      <div className={`message-card__text ${sendTo === 'User' ? 'message-card__text--white' : 'message-card__text--green'}`}>
        { messageText }
      </div>

      <div className="message-card__time">
        { createdAt }
      </div>
    </div>
  )
}