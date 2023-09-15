import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useFetch from "../../hook/useFetch";
import CustomTable from "../../components/tables/customTable/CustomTable";
import { IcustomersTable } from "../../interfaces/Itable";
import { customers, customersHeader } from "../../constants/tables";
import LoadingSpinner from "../../components/UI/loadingSpinner/LoadingSpinner";
import axios from "axios";
import Table from "./components/Table";
const url =
  "https://admin-panel-79c71-default-rtdb.europe-west1.firebasedatabase.app/customers.json";
function Customers() {
  const { t } = useTranslation();
  // const { data, error, status } = useFetch<IcustomersTable[]>(url);
  // let customerTable;

  // if (status === "loading") {
  //   customerTable = <LoadingSpinner />;
  // }

  // if (error) {
  //   customerTable = (
  //     <CustomTable limit={10} headData={customersHeader} bodyData={customers} />
  //   );
  // }

  // if (status === "fetched" && data) {
  //   customerTable = (
  //     <CustomTable limit={10} headData={customersHeader} bodyData={data} />
  //   );
  // }


  const [data,setData]=useState([])

  useEffect(()=>{
    try {
      const response=axios.get('https://dummyjson.com/users')
      .then(res=>{
        setData(res.data.users)
      })
   
    } catch (error) {
      
    }
  },[])
  return (
    <section>
   
    <Table data={data} />
    </section>
  );
}

export default Customers;
