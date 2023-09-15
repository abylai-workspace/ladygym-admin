import React, { useState } from 'react';
import './style.css'
const Tabs = ({ tabs, defaultTab, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="tabs">
      <ul className="tab-list">
        {tabs.map((tab) => (
          <li
            key={tab}
            className={`tab-item ${tab === activeTab ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>
      <div className="tab-content">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`tab-pane ${tab === activeTab ? 'active' : ''}`}
          >
            {/* Content for the tab */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
