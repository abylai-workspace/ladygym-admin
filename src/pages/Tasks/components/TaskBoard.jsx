import React, { useState } from 'react'
import '../style.css'
import RangeSlider from './RangeSlider'
import { useSelector } from 'react-redux';
import { instance } from '../../../config/api';
function TaskBoard(data) {
    const [sliderValue, setSliderValue] = useState(50);

  
    const user=useSelector((state) => state?.auth);
    const token = user.token
    const [isDisabled, setIsDisabled] = useState(false);

  

    const handleSliderChange = () => {
     setIsDisabled(true);
    };
    const getTask=data?.data?.map(task => task)
    const inProgressTasks = getTask.filter(task => task.status === 'IN_PROGRESS');
    const inWaitingTasks = getTask.filter(task => task.status === 'WAITING');
    const inCompletedTasks = getTask.filter(task => task.status === 'COMPLETED');
   

    const onCompletedTasks = async(task) => {
       
       try {
       const response = await instance.post(`/gym/tasks/status/${task?.id}?status=COMPLETED`,
       {},
       {
        headers:{
          Authorization: `Bearer ${token}`
        }
       })
    
       } catch (error) {
        console.log(error)
        
       }
    }

    const onWaitingTask = async(task) => {
        try {
            const response = await instance.post(`/gym/tasks/status/${task?.id}?status=IN_PROGRESS`,
            {},
            {
             headers:{
               Authorization: `Bearer ${token}`
             }
            })
            console.log(response)
            
        } catch (error) {
            
        }
    }
  return (
   
     <div className='container'>
                <div className='child-container'>
                    <div className='child-header'>
                        <h3>В ожидании</h3>
                    </div>
                    <div style={{height:500,overflow:'auto'}}>
                    {inWaitingTasks?.map((item,i)=>{
                        return(
                            <div className='child-task' key={i}>
                            <div className='child-task-container'>
                                <h3>Задание №{i}</h3>
                                <h6>{item?.description}</h6>
                                <RangeSlider
                                    min={0}
                                    max={100}
                                    step={1}
                                    value={sliderValue}
                                    onChange={handleSliderChange}
                                />
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginRight: "4%",
                                        marginLeft: "4%",
                                        marginTop: "2%"
                                    }}
                                >
                                    <h6>В ожидании</h6>
                                    <h6>В процессе</h6>
                                    <h6>Готово</h6>
                                </div>
                                <div>
                                    <button onClick={onWaitingTask(item)}>
                                        <h5>Начать выполнение</h5>
                                    </button>
                                </div>
                            </div>
                        </div>
                        )
                       
                    })}
                    </div>
                  
                   
                </div>
                <div className='child-container'>
                    <div className='child-header'>
                        <h3>В процессе</h3>
                    </div>
                    <div style={{height:500,overflow:'auto'}}>
                    {inProgressTasks?.map((item,i)=>{
                       return(
                        <div className='child-task' key={i}>
                        <div className='child-task-container'>
                            <h3>Задание №{i}</h3>
                            <h6>{item?.description}</h6>
                            <RangeSlider
                                min={0}
                                max={100}
                                step={1}
                                value={50}
                                onChange={handleSliderChange}
                                disabled={!isDisabled}
                                
                            />
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginRight: "4%",
                                    marginLeft: "4%",
                                    marginTop: "2%"
                                }}
                            >
                                <h6>В ожидании</h6>
                                <h6>В процессе</h6>
                                <h6>Готово</h6>
                            </div>
                            <div>
                                <button style={{ backgroundColor: "#fff" }} onClick={() => {
                                    onCompletedTasks(item);
                                    console.log(item);
                                }}>
                                    <h5 style={{ color: "#CF5490" }}>
                                        Завершить
                                    </h5>
                                </button>
                            </div>
                        </div>
                    </div>
                       )
                    })}
                    </div>
                   
                   
                </div>
                <div className='child-container'>
                    <div className='child-header-end'>
                        <h3> Завершено</h3>
                    </div>
                    <div style={{height:500,overflow:'auto'}}>
                    {inCompletedTasks?.map((item,i)=>{
                        return(
                            <div className='child-header-end-task' key={i}>
                            <div className='child-task-container-task-end'>
                                <h3 style={{ color: "#fff" }}>Задание №{i} - Завершено</h3>
                                <h6>{item?.description}</h6>
                                <RangeSlider
                                    min={0}
                                    max={100}
                                    step={1}
                                    value={100}
                                    onChange={handleSliderChange}
                                    disabled={!isDisabled}
                                />
                                 <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginRight: "4%",
                                        marginLeft: "4%",
                                        marginTop: "2%"
                                    }}
                                >
                                    <h6>В ожидании</h6>
                                    <h6>В процессе</h6>
                                    <h6>Готово</h6>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                    </div>
                   
                   
                </div>
            </div> 
  )
}

export default TaskBoard