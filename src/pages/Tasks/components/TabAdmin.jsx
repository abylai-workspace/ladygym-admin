import React, { useEffect, useState } from "react";
import TaskBoard from "./TaskBoard";
import { useSelector } from "react-redux";
import { instance } from "../../../config/api";
import ClientService from "../../../servises/clients";

function TabAdmin() {
  const [data, setData] = useState([]);
  useEffect(() => {
    ClientService.getAdminTasks().then((res) => setData(res));
  }, []);

  return (
    <div>
      <TaskBoard data={data} />
    </div>
  );
}

export default TabAdmin;
