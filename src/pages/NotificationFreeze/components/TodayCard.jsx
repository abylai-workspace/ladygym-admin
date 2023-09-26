import { Icon } from "@iconify/react";
import React from "react";
import Button from "../../../components/UI/button/Button";
import './style.css'
import { formatEndTime } from "../../../utils/formatEndTime";
function TodayCard({data}) {

    
    const formattedEndTime = formatEndTime(data?.endTime);
    console.log(data, "formattedEndTime");

   
   
    return (
        <div style={{ marginTop: 10, margin: 0, width: "60%" }}>
            <div
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    padding: "10px",
                    borderRadius: "10px",
                }}
            >
                <h6>Заморозка абонемента до {formattedEndTime}</h6>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        backgroundColor: "#212122",
                        padding: "10px",
                        borderRadius: "10px",
                    }}
                >
                    <h5 className='text-center'>Справки</h5>
                    <Icon
                        icon='material-symbols:download'
                        width='24'
                        color='white'
                    />
                </div>
                <h6 style={{ color: "white", textAlign: "right" }}>
                    Клиент:{data?.clientFirstName+" " + data?.clientLastName}
                </h6>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',}}>
                <div className="btn" style={{}}><h6 style={{color:'white',marginTop:3}}>Отменить</h6></div>
                <div className="btn" style={{backgroundColor:'#CF5490'}}><h6 style={{color:'white',marginTop:3}}>Заморозить</h6></div>
               
            </div>
        </div>
    );
}

export default TodayCard;
