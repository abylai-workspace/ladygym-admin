import React, { useEffect, useMemo, useState } from "react";
import Modal from "../../../components/UI/modal/Modal";
import Button from "../../../components/UI/button/Button";
import { instance } from "../../../config/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import TaskService from "../../../servises/tasks";

const CreateTask = ({ onClose, selectedOption }) => {
  const user = useSelector((state) => state?.auth);
  const token = user.token || null;
  const [description, setDescription] = useState("");
  const id = selectedOption?.value;

  const postTask = () => {
    const data = {
      description: description,
    };
    TaskService.createTask(id, data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Задание успешно создано!");
          onClose();
        }
        if (res.status === 404 && res.statusText === "Not Found") {
          toast.error("Задание не создано!");
        }
      })
      .catch((err) => toast.error("Задание не создано!"));

    // try {
    //   const response = instance
    //     .post(`/gym/tasks/create/${id}`, data, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     })
    //     .then((res) => {
    //       console.log(res);
    //       if (res.status === 200) {
    //         toast.success("Задание успешно создано!");
    //         onClose();
    //       }
    //       if (res.status === 404 && res.statusText === "Not Found") {
    //         toast.error("Задание не создано!");
    //       }
    //     });

    //   if (response.status === 404 && response.statusText === "Not Found") {
    //     toast.error("Задание не создано!");
    //   }
    //   return response;
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <Modal title="Создать задание" onClose={onClose}>
      <div>
        <textarea
          style={{
            width: "100%",
            height: 100,
            backgroundColor: "#212122",
            color: "white",
            padding: "10px",
            borderRadius: "10px",
          }}
          value={description}
          onChange={handleDescriptionChange}
          rows={10}
        ></textarea>
      </div>
      <Button onClick={postTask}>Создать</Button>
    </Modal>
  );
};

export default CreateTask;
