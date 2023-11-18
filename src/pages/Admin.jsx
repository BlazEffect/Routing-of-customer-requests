import { useState } from 'react';
import ticketData from '../data/tickets.json';

export default function Admin () {
  const [activeTab, setActiveTab] = useState(1);

  const groupedData = ticketData.reduce((acc, currentItem) => {
    const { statusId, ...rest } = currentItem;
    if (!acc[statusId]) {
      acc[statusId] = [rest];
    } else {
      acc[statusId].push(rest);
    }
    return acc;
  }, {});

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="tickets">
      <h3 className="tickets-category">Название отдела</h3>

      <div className="tabs">
        <div className={`tab ${activeTab === 1 ? 'active' : ''}`} onClick={() => handleTabClick(1)}>
          Активные
        </div>
        <div className={`tab ${activeTab === 2 ? 'active' : ''}`} onClick={() => handleTabClick(2)}>
          В ожидании
        </div>
        <div className={`tab ${activeTab === 3 ? 'active' : ''}`} onClick={() => handleTabClick(3)}>
          Закрытые
        </div>
      </div>

      {Object.keys(groupedData).map((category) => (
        <div key={category} className="tab-content" style={{ display: activeTab === parseInt(category) ? 'block' : 'none' }}>
            {groupedData[category].map((item) => (
              <div key={item.id} className="ticket">
                <div className="ticket-name">
                  { item.name }
                </div>

                <div className="ticket-message">
                  { item.ticketMessage }
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}