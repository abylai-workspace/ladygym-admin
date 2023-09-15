import React, { useState } from 'react'
import '../style.css'
import RangeSlider from '../../Tasks/components/RangeSlider';
// import RangeSlider from './RangeSlider'
function TaskBoard() {
    const [sliderValue, setSliderValue] = useState(50);

    const handleSliderChange = (newValue:any) => {
        setSliderValue(newValue);
    };
  return (
   
     <div className='container'>
                <div className='child-container'>
                    <div className='child-header'>
                        <h3>В ожидании</h3>
                    </div>
                    <div className='child-task'>
                        <div className='child-task-container'>
                            <h3>Задание №2</h3>
                            <h6>План на день 70 000</h6>
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
                          <h6 style={{textAlign: "right"}}>Администратор: Иванова Надежда</h6>
                        </div>
                    </div>
                </div>
                <div className='child-container'>
                    <div className='child-header'>
                        <h3 >В процессе</h3>
                    </div>
                    <div className='child-task'>
                        <div className='child-task-container'>
                            <h3>Задание №2</h3>
                            <h6>План на день 70 000</h6>
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
                            <h6 style={{textAlign: "right"}}>Администратор: Иванова Надежда</h6>

                        </div>
                    </div>
                </div>
                <div className='child-container'>
                    <div className='child-header-end'>
                        <h3> Завершено</h3>
                    </div>
                    <div className='child-header-end-task'>
                        <div className='child-task-container-task-end'>
                            <h3 style={{ color: "#fff" }}>Задание №1 - Завершено</h3>
                            <h6>Отработать счет 3510</h6>
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
                          <h6 style={{textAlign: "right"}}>Администратор: Иванова Надежда</h6>

                        </div>
                    </div>
                </div>
            </div> 
  )
}

export default TaskBoard