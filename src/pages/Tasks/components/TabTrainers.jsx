import React, { useEffect, useState } from "react";
import { instance } from "../../../config/api";
import { useSelector } from "react-redux";
import TaskBoard from "./TaskBoard";
import ClientService from "../../../servises/clients";

const TabTrainers = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    ClientService.getTrainersTasks().then((res) => setData(res));
  }, []);
  return (
    <div>
      <div className="container">
        <TaskBoard data={data} />
      </div>
    </div>
  );
};

export default TabTrainers;
