import React from "react";
import TaskBoard from "./components/TaskBoards";
import AdminTask from "./components/AdminTask";
import TrainerTask from "./components/TrainerTask";
import Tabs from './components/Tabs'
import MyTasks from "./components/MyTasks";
import ManagerTasks from "./components/ManagerTasks";
function FinancePlan() {
    const tabs = [
        {
            title: "Мои задачи",
            content: <MyTasks />,
        },
        {
            title: "Админ",
            content: <AdminTask />,
        },
        {
            title: "Тренер",
            content: <TrainerTask />,
        },
        {
            title: "Менеджер",
            content: <ManagerTasks />,
        }

       
       
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
            <div style={{position:'absolute',right:20,marginTop:'0%',backgroundColor:'#CF5490',padding:'10px',borderRadius:'10px'}}>
                <h6>Создать финансовый план</h6>
            </div>
            <div>
            <Tabs tabs={tabs} defaultTab={0}/>
            </div>
           
        </div>
    );
}

export default FinancePlan;
