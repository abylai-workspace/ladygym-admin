// Tabs.js

import React, { useState } from 'react';

const Tabs = ({ tabs, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || 0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div style={{width: '100%'}}>
      <div className="tab-buttons" >
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={index === activeTab ? 'active' : ''}
            onClick={() => handleTabClick(index)}
            style={{backgroundColor:activeTab===index?"#CF5490":"",width:200, height:40,margin:4,alignSelf:'center',color:activeTab===index?"white":"white",fontSize:12}}
          >
            <h3 style={{marginTop:-10}}>
            {tab.title}
              </h3>
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
