import React, { useEffect, useState } from "react";
import TableNext from "./TableNext";
import ClientService from "../../../servises/clients";

const CountNext = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    ClientService.getAllClients().then((res) => {
      setData(res);
    });
  }, []);
  return (
    <div>
      <TableNext data={data} />
    </div>
  );
};

export default CountNext;
