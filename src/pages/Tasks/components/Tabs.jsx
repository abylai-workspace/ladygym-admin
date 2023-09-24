import React from 'react';

function Tabs({ selectedTab, setSelectedTab }) {
  const tabs = ['myTasks', 'adminTasks', 'trainerTasks'];

  return (
    <div className="Tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={selectedTab === tab ? 'active' : ''}
          onClick={() => setSelectedTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
