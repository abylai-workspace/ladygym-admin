import React, { useCallback, useEffect, useState } from "react";
import Tabs from "./components/Tabs";
import TabMe from "./components/TabMe";
import TabAdmin from "./components/TabAdmin";
import TabTrainers from "./components/TabTrainers";
import ModalWhy from "./components/ModalWhy";
import { getAllPersonals } from "../../config/axios";
import { useSelector } from "react-redux";
import CreateTask from "./components/CreateTask";
import { Toaster } from "react-hot-toast";

function Tasks() {
    const user = useSelector((state) => state?.auth);
    const token = user.token;
    const [showForWhy, setShowForWhy] = useState(false);
    const [showCreateTask, setShowCreateTask] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [data, setData] = useState([]);

    const getPersonality = () => {
        try {
            const respons = getAllPersonals(token).then((res) => {
                setData(res?.data);
            });
        } catch (error) {}
    };
    useEffect(() => {
        getPersonality();
    }, []);

    const tabs = [
        {
            title: "Мои задания",
            content: <TabMe />,
        },
        {
            title: "Админы",
            content: <TabAdmin />,
        },
        {
            title: "Тренеры",
            content: <TabTrainers />,
        },
    ];

    const selectedData = useCallback((data) => {
        setSelectedOption(data);
        setShowForWhy(false);
        setShowCreateTask(true);
    }, []);

    return (
        <div>
            <div className='createTask'>
                <button
                    style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "white",
                    }}
                    onClick={() => setShowForWhy(true)}
                >
                    Создать задание +
                </button>
            </div>
            <h1
                style={{
                    color: "white",
                    alignSelf: "center",
                    marginRight: "0%",
                    marginBottom: "1%",
                    marginLeft: "1%",
                }}
            >
                Задания
            </h1>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Tabs tabs={tabs} defaultTab={0} />
            </div>
            <div>
                <Toaster />
            </div>
            {showForWhy && (
                <ModalWhy
                    onClose={() => setShowForWhy(false)}
                    data={data}
                    selectedData={selectedData}
                />
            )}
            {showCreateTask && (
                <CreateTask
                    onClose={() => setShowCreateTask(false)}
                    selectedOption={selectedOption}
                />
            )}
        </div>
    );
}

export default Tasks;
