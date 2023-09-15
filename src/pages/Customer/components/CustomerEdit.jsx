import React from "react";
import Modal from "../../../components/UI/modal/Modal";
import Input from "../../../components/UI/input/Input";
import Button from "../../../components/UI/button/Button";

function CustomerEdit({ data, onClose }) {
    console.log(data, "da");
    return (
        <div>
            <Modal onClose={onClose} title='Редактировать данные'>
                <div>
                    <h5>Имя</h5>
                    <input
                        style={{
                            width: "100%",
                            backgroundColor: "#212122",
                            padding: 10,
                            border: "none",
                            borderRadius: 10,
                            color: "white",
                        }}
                        value={data.username}
                    />
                    <h5>Фамилия</h5>
                    <input
                        style={{
                            width: "100%",
                            backgroundColor: "#212122",
                            padding: 10,
                            border: "none",
                            borderRadius: 10,
                            color: "white",
                        }}
                        value={data.username}
                    />
                    <h5>Email</h5>
                    <input
                        style={{
                            width: "100%",
                            backgroundColor: "#212122",
                            padding: 10,
                            border: "none",
                            borderRadius: 10,
                            color: "white",
                        }}
                        value={data.email}
                    />
                  
                    <h5>Номер телефона</h5>
                    <input
                        style={{
                            width: "100%",
                            backgroundColor: "#212122",
                            padding: 10,
                            border: "none",
                            borderRadius: 10,
                            color: "white",
                          
                        }}
                        value={data.username}
                    />
                      <h5>Пароль</h5>
                    <input
                    type="password"
                        style={{
                            width: "100%",
                            backgroundColor: "#212122",
                            padding: 10,
                            border: "none",
                            borderRadius: 10,
                            color: "white",
                            marginBottom: 20,
                        }}
                        value={data.username}
                    />
                    <Button onClick={onClose}>Сохранить</Button>
                </div>
            </Modal>
        </div>
    );
}

export default CustomerEdit;
