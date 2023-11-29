import { useEffect, useState } from "react";
import Table from "./components/Table";
import { Toaster } from "react-hot-toast";
import ClientService from "../../servises/clients";

function Clients() {
  const [data, setData] = useState([]);

  useEffect(() => {
    ClientService.getAllClients().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <div>
      <div>
        <Toaster />
      </div>

      {/* <ToastContainer/> */}
      <Table data={data} />
    </div>
  );
}

export default Clients;
