import React, { useCallback, useEffect, useState } from "react";
import Modal from "../../../components/UI/modal/Modal";
import LGInput from "../../../components/UI/input/LGInput";
import Button from "../../../components/UI/button/Button";
import { createUserAndPersonal, gymManageAll } from "../../../config/axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function AddUser({ onClose }) {
    const user = useSelector((state) => state?.auth);
    const token = user.token;
    const [gyms, setGyms] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        password: "",
        phoneNumber: "",
        role: "user",
        gymId: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const createUser = useCallback(async () => {
        try {
            const response = await createUserAndPersonal(token, formData);
            if (response.status === 200) {
                toast.success("Содрудник успешно добавлен!");
                onClose();
            }
        } catch (error) {
            console.log(error);
            toast.error("Что-то пошло не так!");
        }
    }, [token, formData]);

    const getGyms = useCallback(async () => {
        try {
            const response = await gymManageAll();
            const gyms = response.data;
            setGyms(gyms);
        } catch (error) {}
    }, []);
    useEffect(() => {
        getGyms();
    }, []);
    const optionsGyms = gyms.map((item) => {
        return item?.gyms;
    });

    const handleSelectChange = (event) => {
        setFormData({ ...formData, gymId: event.target.value });
        setSelectedOption(event.target.value);
    };
    console.log(formData);
    return (
        <div>
            <Modal title='Новый сотрудника' onClose={onClose}>
                <h5>Имя</h5>
                <LGInput
                    placeholder='Введите ваше имя'
                    name={"firstName"}
                    value={formData.firstName}
                    onChange={handleInputChange}
                />
                <h5>Фамилия</h5>
                <LGInput
                    placeholder='Введите вашу фамилию'
                    name={"lastName"}
                    value={formData.lastName}
                    onChange={handleInputChange}
                />
                <h5>Email</h5>
                <LGInput
                    placeholder='Введите ваш email'
                    name={"email"}
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <h5>Номер телефона</h5>
                <LGInput
                    placeholder='Введите ваш номер телефона'
                    name={"phoneNumber"}
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                />
                <h5>Пароль</h5>
                <LGInput
                    placeholder='Введите ваш пароль'
                    name={"password"}
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <label>
                    <h5>Роль</h5>
                    <select
                        name='role'
                        value={formData.role}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#212122",
                            padding: "10px",
                            borderRadius: "10px",
                            color: "white",
                            marginBottom: "4%",
                        }}
                    >
                        <option value='USER'>User</option>
                        <option value='ADMIN'>Admin</option>
                        <option value='TOP'>Top</option>
                        <option value='TRAINER'>TRAINER</option>
                        <option value='ADMIM'>ADMIN</option>
                    </select>
                </label>

                <select
                    value={selectedOption}
                    onChange={handleSelectChange}
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#212122",
                        padding: "10px",
                        borderRadius: "10px",
                        color: "white",
                        marginBottom: "4%",
                    }}
                >
                    <option value=''>Select an option</option>
                    {optionsGyms[0]?.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>

                <Button onClick={createUser}>Добавить</Button>
            </Modal>
        </div>
    );
}

export default AddUser;
