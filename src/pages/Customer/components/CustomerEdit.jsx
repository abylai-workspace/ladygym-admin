import React, { useState } from "react";
import Modal from "../../../components/UI/modal/Modal";
import Input from "../../../components/UI/input/Input";
import Button from "../../../components/UI/button/Button";
import { updatePersonal } from "../../../config/axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function CustomerEdit({ data, onClose }) {
  const user=useSelector((state) => state?.auth);
  const token = user.token;
    const [userData, setUserData] = useState({
        id: data.id ||"",
        firstName: data?.firstName || "",
        lastName: data.lastName || "",
        email: data.email ||"",
        phoneNumber: data.phoneNumber || "",
        password: data.password || ""
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
        
      };
      const onSave = async() => {
        const data={
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          password: userData.password
        }
        try {
          const response = await updatePersonal(token, userData.id, data);
        if(response.status === 200) {
          toast.success("Данные пользователя успешно отредактированы!");
          onClose();
        }
        if(userData.email !== userData.email){
          toast.error("Данные пользователя не были отредактированы!");
        }
        if(response.status === 400) {
          toast.error("Данные пользователя не были отредактированы!");
        }
        } catch (error) {
          console.log(error);
        }
      }

     
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
                        type="text"
                        name="firstName"
                        value={userData?.firstName}
                        onChange={(e)=>setUserData({...userData, firstName: e.target.value})}
                       
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
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleInputChange}
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
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
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
                        value={userData.phoneNumber}
                        name="phoneNumber"
                        onChange={handleInputChange}
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
                        value={userData.password}
                        name="password"
                        onChange={handleInputChange}
                    />
                    <Button onClick={onSave}>Сохранить</Button>
                </div>
            </Modal>
        </div>
    );
}

export default CustomerEdit;
