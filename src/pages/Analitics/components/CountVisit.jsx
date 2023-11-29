import React, { useEffect, useState } from "react";

import Table from "./Table";
import ClientService from "../../../servises/clients";
const CountVisit = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    ClientService.getAllClients().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <div>
      <Table data={data} />
    </div>
  );
};

export default CountVisit;
