import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useFetch from "../../hook/useFetch";
import CustomTable from "../../components/tables/customTable/CustomTable";
import { IcustomersTable } from "../../interfaces/Itable";
import { customers, customersHeader } from "../../constants/tables";
import LoadingSpinner from "../../components/UI/loadingSpinner/LoadingSpinner";
import axios from "axios";
import Table from "./components/Table";
import { getAllClients, getAllPersonals, gymTrainers } from "../../config/axios";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

function Customers() {
  const { t } = useTranslation();


  const [data,setData]=useState([])
  const user=useSelector((state: any) => state?.auth);
  const fetchData =async()=>{
    try {
      const response=await getAllPersonals(user.token)
      .then(res=>{
        setData(res.data)
       
      })
      return response
    } catch (error) {
      
    }
  }
useEffect(()=>{
  fetchData()
},[data])
useEffect(()=>{
  const fetchTraingInfo =()=>{
    try {
      const response=gymTrainers(user.token)
      .then(res=>{
        // setData(res.data)
        // console.log(res.data)
      })
      return response
    } catch (error) {
      
    }
  }
  fetchTraingInfo()
},[])
  return (
    <section>
      <div><Toaster/></div>
    <Table data={data} />
    </section>
  );
}

export default Customers;
