import React, { useState } from "react";
import "./style.css";
import RangeSlider from "./components/RangeSlider";
import Tabs from "../../components/UI/tabs/Tabs";
import TaskBoard from "./components/TaskBoard";
import Modal from "../../components/UI/modal/Modal";
import Button from "../../components/UI/button/Button";
import { Icon } from "@iconify/react";
function Tasks() {
    const items = ["Тренер", "Админ"];
    const [selectedTab, setSelectedTab] = useState("Мои");
    const [selectedItem, setSelectedItem] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [chooseVisible, setChooseVisible] = useState(false);
    const [createVisible, setCreateVisible] = useState(false);
    function showModalHandler() {
        setShowModal((prev) => !prev);
    }

    const handleTabChange = (tab: any) => {
        setSelectedTab(tab);
    };

    const tabs = ["Мои", "Админы", "Тренеры"];
    // const [sliderValue, setSliderValue] = useState(50);

    // const handleSliderChange = (newValue: any) => {
    //     setSliderValue(newValue);
    // };
    const [selectedCoach, setSelectedCoach] = useState("");

    const handleCoachChange = (event: any) => {
        setSelectedCoach(event.target.value);
        setChooseVisible(false);
        setCreateVisible(true);
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
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "10%",
                        justifyContent: "space-between",
                    }}
                >
                    <h1
                        style={{
                            color: "white",
                            alignSelf: "center",
                            marginRight: "10%",
                        }}
                    >
                        Задания
                    </h1>
                    <Tabs
                        tabs={tabs}
                        defaultTab={selectedTab}
                        onTabChange={handleTabChange}
                    />
                </div>
                <div className='createTask'>
                    <button
                        style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "white",
                        }}
                        onClick={showModalHandler}
                    >
                        Создать задание +
                    </button>
                </div>
            </div>

            <div className='tab-content'>
                <div
                    className={`tab-pane ${
                        selectedTab === "Мои" ? "active" : ""
                    }`}
                >
                    <TaskBoard />
                </div>
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
                    title='Создать задание'
                    onClose={() => setCreateVisible(false)}
                >
                    <div>
                        <textarea
                            placeholder='Введите текст задания'
                            style={{
                                width: "100%",
                                height: "10rem",
                                padding: "10px",
                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                                color: "white",
                                borderRadius: "10px",
                                marginBottom: "10px",
                            }}
                        ></textarea>
                        <div>
                            <Button>Создать</Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default Tasks;
