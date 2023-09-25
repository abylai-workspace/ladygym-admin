import React from "react";
import "./styles.css";
import RangeSlider from "../../Tasks/components/RangeSlider";
const TaskBoards = ({ data }) => {
    console.log(data, "datas");
    const getTask = data?.map((task) => task);
    const inProgressTasks = getTask.filter(
        (task) => task.status === "IN_PROGRESS"
    );
    const inUncompletedTasks = getTask.filter(
        (task) => task.status === "UNCOMPLETED"
    );
    const inCompletedTasks = getTask.filter(
        (task) => task.status === "COMPLETED"
    );

    return (
        <div className='container'>
            <div className='child-container'>
                <div className='child-header'>
                    <h3>В процессе</h3>
                </div>
                <div style={{height:550,overflow:'auto'}}>
                {inProgressTasks?.map((item, i) => {
                    return (
                        <div className='child-task' key={i}>
                            <div className='child-task-container'>
                                <h3>Задание №{i}</h3>
                                <div style={{ display: "flex" }}>
                                    <h6>Осталось {item?.currentBalance}</h6>
                                    <h6>- до {item?.endDate}</h6>
                                </div>
                                <RangeSlider min={0} max={100} step={1} value={50} disabled />
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginRight: "4%",
                                        marginLeft: "4%",
                                        marginTop: "2%",
                                    }}
                                >
                                    <h6>от</h6>

                                    <h6>{item?.destinationSum}₸</h6>
                                </div>
                                <div>
                                    <h6
                                        style={{
                                            color: "white",
                                            textAlign: "right",
                                        }}
                                    >
                                        {item?.assignedUserName}
                                    </h6>
                                </div>
                            </div>
                        </div>
                    );
                })}
                </div>
                
            </div>

            <div className='child-container'>
                <div
                    className='child-header-complted'
                    style={{ backgroundColor: "##B4B4B4" }}
                >
                    <h3>Выполнен</h3>
                </div>
                <div style={{height:500,overflow:'auto'}}>
                {inCompletedTasks?.map((item, i) => {
                    return (
                        <div className='child-task' key={i}>
                            <div className='child-task-container-complted'>
                                <h3>Задание №{i}</h3>
                                <div style={{ display: "flex" }}>
                                    <h6>Осталось {item?.currentBalance}</h6>
                                    <h6>- до {item?.endDate}</h6>
                                </div>
                                <RangeSlider min={0} max={100} step={1} value={100} disabled />
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginRight: "4%",
                                        marginLeft: "4%",
                                        marginTop: "2%",
                                    }}
                                >
                                    <h6>от</h6>

                                    <h6>{item?.destinationSum}₸</h6>
                                </div>
                                <div>
                                    <h6
                                        style={{
                                            color: "white",
                                            textAlign: "right",
                                        }}
                                    >
                                        {item?.assignedUserName}
                                    </h6>
                                </div>
                            </div>
                        </div>
                    );
                })}
                </div>
                
            </div>
            <div className='child-container'>
                <div className='child-header-complted'>
                    <h3>Не выполнен</h3>
                </div>
                {inUncompletedTasks?.map((item, i) => {
                    return (
                        <div className='child-task' key={i}>
                            <div className='child-task-container-complted'>
                                <h3>Задание №{i}</h3>
                                <div style={{ display: "flex" }}>
                                    <h6>Осталось {item?.currentBalance}</h6>
                                    <h6>- до {item?.endDate}</h6>
                                </div>
                                <RangeSlider min={0} max={100} step={1} value={50} disabled />
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginRight: "4%",
                                        marginLeft: "4%",
                                        marginTop: "2%",
                                    }}
                                >
                                    <h6>от</h6>

                                    <h6>{item?.destinationSum}₸</h6>
                                </div>
                                <div>
                                    <h6
                                        style={{
                                            color: "white",
                                            textAlign: "right",
                                        }}
                                    >
                                        {item?.assignedUserName}
                                    </h6>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TaskBoards;
