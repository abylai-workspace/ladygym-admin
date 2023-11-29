import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TaskBoard from "./TaskBoard";
import { instance } from "../../../config/api";
import ClientService from "../../../servises/clients";

function TabMe() {
  const [data, setData] = useState([]);

  useEffect(() => {
    ClientService.getMyTasks().then((res) => setData(res));
  }, []);

  return (
    <div>
      <TaskBoard data={data} />
    </div>
  );
}

export default TabMe;
