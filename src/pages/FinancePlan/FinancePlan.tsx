import React, { useCallback, useEffect, useState } from "react";

import Tabs from './components/Tabs'
import MyTasks from "./components/MyTasks";

import { useSelector } from "react-redux";

function FinancePlan() {

    const tabs = [
        {
            title: "Мои задачи",
            content: <MyTasks />,
        },
      
       
    ];

 
    return (
        <div>
            <h1
                style={{
                    color: "white",
                    alignSelf: "center",
                   
                }}
            >
               Финансовый план
            </h1>
          
            <div>
            <Tabs tabs={tabs} defaultTab={0}/>
            </div>
           
        </div>
    );
}

export default FinancePlan;
