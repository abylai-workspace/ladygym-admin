import React, { useCallback, useEffect, useState } from "react";
import Modal from "../../../components/UI/modal/Modal";
import LGInput from "../../../components/UI/input/LGInput";
import Button from "../../../components/UI/button/Button";
import {
  createClient,
  createUser,
  createUserAndPersonal,
} from "../../../config/axios";
import { instance } from "../../../config/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import ClientService from "../../../servises/clients";

function AddUser({ onClose }) {
  const user = useSelector((state) => state?.auth);
  const token = user.token;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    phoneNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const createUser = useCallback(async () => {
    ClientService.createClient(formData).then((res) => console.log(res));
  }, [formData]);

  return (
    <>
      <Modal title="Новый пользователь " onClose={onClose}>
        <h5>Имя</h5>

        <LGInput
          placeholder="Введите ваше имя"
          value={formData.firstName}
          name={"firstName"}
          onChange={handleInputChange}
        />
        <h5>Фамилия</h5>
        <LGInput
          placeholder="Введите вашу фамилию"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        <h5>Email</h5>
        <LGInput
          placeholder="Введите ваш email"
          name={"email"}
          value={formData.email}
          onChange={handleInputChange}
        />
        <h5>Номер телефона</h5>
        <LGInput
          placeholder="Введите ваш номер телефона"
          name={"phoneNumber"}
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
        <h5>Пароль</h5>
        <LGInput
          placeholder="Введите ваш пароль"
          style={{ marginBottom: "5%" }}
          name={"password"}
          value={formData.password}
          onChange={handleInputChange}
        />
        <br />
        <br />

        <Button type="submit" onClick={createUser} style={{ marginTop: 20 }}>
          Добавить
        </Button>
        {/* </form> */}
      </Modal>
    </>
  );
}

export default AddUser;
