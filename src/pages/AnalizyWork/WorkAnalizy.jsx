import React, { useState } from "react";
import Tabs from "../../components/UI/tabs/Tabs";
import "../Tasks/style.css";
import TaskBoard from "./components/Taskboard";
import Modal from "../../components/UI/modal/Modal";
import Button from "../../components/UI/button/Button";
import { Icon } from "@iconify/react";
import Input from "../../components/UI/input/Input";
// import TaskBoard from '../Tasks/components/TaskBoard';
function WorkAnalizy() {
    const items = ["Тренер", "Админ"];
    const tabs = ["Админы", "Тренеры"];

    const [selectedTab, setSelectedTab] = useState("Админы");
    const [selectedCoach, setSelectedCoach] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");

    const [chooseVisible, setChooseVisible] = useState(false);
    const [createVisible, setCreateVisible] = useState(false);
    function showModalHandler() {
        setShowModal((prev) => !prev);
    }
    const handleCoachChange = (event: any) => {
        setSelectedCoach(event.target.value);
        setChooseVisible(false);
        setCreateVisible(true);
    };

    const handleTabChange = (tab: any) => {
        setSelectedTab(tab);
    };
    const handleItemClick = (item: any) => {
        setSelectedItem(item);
        // setIsOpen(false); // Close the dropdown when an item is selected
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    
                }}
            >
                <div
                    style={{
                        display: "flex",

                        justifyContent: "space-between",
                        // flexWrap: "wrap",

                    }}
                >
                    <h5
                        style={{
                            color: "white",
                            alignSelf: "center",
                            marginRight: "10%",
                            width: 200,
                            // fontSize: "14px",
                        }}
                    >
                        Анализ работы
                    </h5>
                    <Tabs
                        tabs={tabs}
                        defaultTab={selectedTab}
                        onTabChange={handleTabChange}
                    />
                </div>
                <div className='createTask' style={{ width: "20%" }}>
                    <button
                        style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "white",
                            width: "100%",
                        }}
                        onClick={() => {showModalHandler()}}
                    >
                        Создать финансовый план
                    </button>
                </div>
            </div>

            <div className='tab-content'>
                <div
                    className={`tab-pane ${
                        selectedTab === "Админы" ? "active" : ""
                    }`}
                >
                    <TaskBoard />
                </div>
                <div
                    className={`tab-pane ${
                        selectedTab === "Тренеры" ? "active" : ""
                    }`}
                >
                    <TaskBoard />
                </div>
            </div>
            {showModal && (
                <Modal title='Для кого' onClose={() => setShowModal(false)}>
                    <div
                        // style={}
                        onClick={() => {
                            setChooseVisible(true);
                            setShowModal(false);
                        }}
                    >
                        <ul >
                            {items.map((item) => (
                               <div   className='dropdown-list'>
                                 <div style={{display:"flex"}}>
                                    <h4>admin</h4>
                                 <li
                                    key={item}
                                    onClick={() => handleItemClick(item)}
                                   
                                >
                                    {item}
                                </li>
                                 </div>
                                <Icon icon="material-symbols:chevron-right" width="24" color="white" />
                               </div>
                            ))}
                        </ul>
                    </div>
                </Modal>
            )}
            {chooseVisible && (
                <Modal
                    title='Выберите тренера'
                    onClose={() => setChooseVisible(false)}
                >
                    <select
                        value={selectedCoach}
                        onChange={handleCoachChange}
                        style={{
                            width: "100%",
                            height: "100%",
                            padding: "10px",
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            color: "white",
                            borderRadius: "10px",
                        }}
                    >
                        <option value=''>Выберите тренера</option>
                        <option value='coach1'>Тренер 1</option>
                        <option value='coach2'>Тренер 2</option>
                        <option value='coach3'>Тренер 3</option>
                        {/* Добавьте дополнительных тренеров по мере необходимости */}
                    </select>
                    {selectedCoach && (
                        <p>Вы выбрали тренера: {selectedCoach}</p>
                    )}
                </Modal>
            )}
            {createVisible && (
                <Modal
                    title='Создать фин. план'
                    onClose={() => setCreateVisible(false)}
                >
                    <div style={{ width: "100%" }}>
                       
                        <h5>Сумма</h5>
                            <input style={{ width: "100%",padding:"10px",backgroundColor:"rgba(255, 255, 255, 0.2)",border:'none',color:"white",borderRadius:"10px",marginBottom:"4%" }} placeholder='Введите сумму в тенге' type="number"/>
                        <h5>Крайний срок</h5>
                         
                            <input style={{ width: "100%",padding:"10px",backgroundColor:"rgba(255, 255, 255, 0.2)",border:'none',color:"white",borderRadius:"10px",marginBottom:"4%" }} placeholder='Введите сумму в тенге' type="date"/>
                            
                            <Button>Создать</Button>
                        
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default WorkAnalizy;
