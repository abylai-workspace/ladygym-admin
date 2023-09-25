import React, { useCallback, useEffect, useState } from "react";
import TaskBoard from "./components/TaskBoards";
import AdminTask from "./components/AdminTask";
import TrainerTask from "./components/TrainerTask";
import Tabs from './components/Tabs'
import MyTasks from "./components/MyTasks";
import ManagerTasks from "./components/ManagerTasks";
import ModalWhy from "./components/ModalWhy";
import { getAllPersonals } from "../../config/axios";
import { useSelector } from "react-redux";
import { instance } from "../../config/api";
import CreateTask from "./components/CreateTask";
import { Toaster } from "react-hot-toast";
function WorkAnalizy() {
    const user=useSelector((state) => state?.auth);
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

    const getPersonality = () => {
        try {
         const response=instance.get(`/gym/user/personal`,{
           
           headers:{
             Authorization:`Bearer ${token}`
           }
         })
         .then(res=>{
            const allUsers = res.data;
            const trainersAndManagers = allUsers.filter((user) => {
                return user.role === 'TRAINER' || user.role === 'ADMIN';
              });
              setData(trainersAndManagers)
        console.log(trainersAndManagers)
           
         })
         return response
        } catch (error) {
         
        }
      }
      useEffect(()=>{
        getPersonality()
      },[])
      const selectedData=useCallback((data)=>{
        setSelectedOption(data)
        setShowForWhy(false)
        setShowCreateTask(true)
      },[])
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
            <div style={{position:'absolute',right:20,marginTop:'0%',backgroundColor:'#7536EA',padding:'10px',borderRadius:'10px'}}
            onClick={()=>setShowForWhy(true)}>
                <h6>Создать финансовый план</h6>
            </div>
            <div>
            <Tabs tabs={tabs} defaultTab={0}/>
            </div>
            <div><Toaster/></div>
            {showForWhy &&<ModalWhy onClose={() => setShowForWhy(false)} data={data} selectedData={selectedData}/>}
            {showCreateTask && <CreateTask onClose={() => setShowCreateTask(false)} selectedOption={selectedOption} />}
        </div>
    );
}

export default WorkAnalizy;
