import React, { useCallback, useEffect, useState } from "react";

import Tabs from './components/Tabs'
import MyTasks from "./components/MyTasks";

import { useSelector } from "react-redux";

function FinancePlan() {
    const user=useSelector((state:any) => state?.auth);
    const token=user.token;
    const [showForWhy, setShowForWhy] = useState(false);
    const [showCreateTask, setShowCreateTask] = useState(false);
    const [selectedOption,setSelectedOption] = useState(null);
    const [data,setData]=useState([])
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
