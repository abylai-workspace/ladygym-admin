// Tabs.js

import React, { useState } from 'react';

const Tabs = ({ tabs, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || 0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div style={{width: '100%'}}>
      <div className="tab-buttons" style={{width: '100%',marginBottom:40}} >
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={index === activeTab ? 'active' : ''}
            onClick={() => handleTabClick(index)}
            style={{backgroundColor:activeTab===index?"#CF5490":"",width:100, height:40, margin:3,alignSelf:'center',color:activeTab===index?"white":"white",alignContent:'center',alignItems:'center'}}
          >
           <h5 style={{color:activeTab===index?"white":"white",top:-50,marginTop:-4}}> {tab.title}</h5>
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
