import React, { useState } from "react";
import Modal from "../../../components/UI/modal/Modal";
import LGInput from "../../../components/UI/input/LGInput";
import Button from "../../../components/UI/button/Button";

function AddUser({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user', // Default role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a POST request to your API to add the user with formData
    // Make the API call here and handle the response
    console.log('Form data:', formData);
  };
    return (
        <div >
            <Modal title='Новый сотрудника' onClose={onClose} >
              <form >
              <h5>Имя</h5>
                <LGInput placeholder='Введите ваше имя' />
                <h5>Фамилия</h5>
                <LGInput placeholder='Введите вашу фамилию' />
               <h5>Email</h5>
                <LGInput placeholder='Введите ваш email' />
                <h5>Номер телефона</h5>
                <LGInput placeholder='Введите ваш номер телефона' />
                <h5>Пароль</h5>
                <LGInput placeholder='Введите ваш пароль' />
                <label>
        <h5>Роль</h5>
        <select name="role" value={formData.role} onChange={handleChange} style={{width:'100%',height:'100%',backgroundColor:'#212122',padding:'10px',borderRadius:'10px',color:'white',marginBottom:'4%'}}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="top">Top</option>
        </select>
      </label>
      <Button>Добавить</Button>
              </form>
             
            </Modal>
        </div>
    );
}

export default AddUser;
