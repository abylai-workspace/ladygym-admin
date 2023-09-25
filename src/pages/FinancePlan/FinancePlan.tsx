import React from "react";
import TaskBoard from "./components/TaskBoards";
import AdminTask from "./components/AdminTask";
import TrainerTask from "./components/TrainerTask";
import Tabs from './components/Tabs'
function FinancePlan() {
    const tabs = [
        {
            title: "Админ",
            content: <AdminTask />,
        },
        {
            title: "Тренер",
            content: <TrainerTask />,
        },
       
    ];
    return (
        <div>
            <h1
                style={{
                    color: "white",
                    alignSelf: "center",
                    marginRight: "0%",
                    marginBottom: "1%",
                }}
            >
                Анализ работы
            </h1>
            <div>
            <Tabs tabs={tabs} defaultTab={0}/>
            </div>
          
            {/* <TaskBoard/> */}
        </div>
    );
}

export default FinancePlan;
