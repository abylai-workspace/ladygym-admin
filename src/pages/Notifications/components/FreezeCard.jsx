import React from "react";
import "./styles.css";
import { Icon } from "@iconify/react";
export const FreezeCard = () => {
    return (
        <>
            <div className='child-container-notifications'>
                <div style={{ padding: "2%" }}>
                    <h6>Заморозка абонемента до 23.11.2023</h6>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            backgroundColor: "#212122",
                            padding: "10px",
                            borderRadius: "10px",
                            borderColor: "rgba(207, 84, 144, 1)",
                            borderWidth: 1,
                            borderStyle: "solid",
                        }}
                    >
                        <h6>Справки</h6>
                        <Icon
                            icon='material-symbols:download'
                            width='24'
                            color='white'
                        />
                    </div>
                    <h6 style={{ color: "white", textAlign: "right" }}>
                        Клиент: Ким Анастасия
                    </h6>
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between",marginTop:10 }}>
            <div style={{ color: "#fff" ,backgroundColor:'transparent',padding:'4px',borderRadius:'10px',paddingLeft:'20px',paddingRight:'20px',borderColor:'rgba(207, 84, 144, 1)',borderWidth:1,borderStyle:'solid'}}><h6>Отменить</h6></div>
                <div style={{ color: "#fff" ,backgroundColor:'rgba(207, 84, 144, 1)',padding:'4px',borderRadius:'10px',paddingLeft:'15px',paddingRight:'15px'}}><h6>Заморозить</h6></div>
            </div>
        </>
    );
};
