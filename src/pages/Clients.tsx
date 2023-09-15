import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Summary from "../components/summary/Summary";
import SaleChart from "../components/chart/Chart";
import DashboardTables from "../components/tables/DashboardTables";
import SearchBox from "../components/topnav/searchBox/SearchBox";
import { useSelector } from "react-redux";
import { instance } from "../config/api";
import axios from "axios";

import '../styles/Clients.css'
import DataTable from "../components/tables/dataTable";
import { TOKEN_KEY } from "../constants/constants";
// import DataTable from "../components/tables/dataTable";
const data = [
  {
    id: 1,
    name: 'John Doe',
    trainer: 'Trainer 1',
    activationDate: '2023-01-15',
    freeze: false,
    key: 'A1B2C3',
    documents: ['Document 1', 'Document 2'],
  },
  {
    id: 2,
    name: 'Jane Smith',
    trainer: 'Trainer 2',
    activationDate: '2023-02-20',
    freeze: true,
    key: 'D4E5F6',
    documents: ['Document 3'],
  },
  {
    id: 2,
    name: 'Jane Smith',
    trainer: 'Trainer 2',
    activationDate: '2023-02-20',
    freeze: true,
    key: 'D4E5F6',
    documents: ['Document 3'],
  },
  {
    id: 2,
    name: 'Jane Smith',
    trainer: 'Trainer 2',
    activationDate: '2023-02-20',
    freeze: true,
    key: 'D4E5F6',
    documents: ['Document 3'],
  },
  {
    id: 2,
    name: 'Jane Smith',
    trainer: 'Trainer 2',
    activationDate: '2023-02-20',
    freeze: true,
    key: 'D4E5F6',
    documents: ['Document 3'],
  },
  {
    id: 2,
    name: 'Jane Smith',
    trainer: 'Trainer 2',
    activationDate: '2023-02-20',
    freeze: true,
    key: 'D4E5F6',
    documents: ['Document 3'],
  },
  {
    id: 2,
    name: 'Jane Smith',
    trainer: 'Trainer 2',
    activationDate: '2023-02-20',
    freeze: true,
    key: 'D4E5F6',
    documents: ['Document 3'],
  },
  {
    id: 2,
    name: 'Jane Smith',
    trainer: 'Trainer 2',
    activationDate: '2023-02-20',
    freeze: true,
    key: 'D4E5F6',
    documents: ['Document 3'],
  },
  {
    id: 2,
    name: 'Jane Smith',
    trainer: 'Trainer 2',
    activationDate: '2023-02-20',
    freeze: true,
    key: 'D4E5F6',
    documents: ['Document 3'],
  },
  // Add more data entries as needed
];
function Dashboard() {
  const { t } = useTranslation();
  const [getSubcscriptions, setSubscriptions] = useState([]);
  
  const tokenStorage = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwNzA2ODgyMjcxIiwicm9sZXMiOlsiQURNSU4iXSwiZXhwIjoxNjk0ODQ0NTcyLCJpYXQiOjE2OTQ2NzE3NzJ9.g9Oj3MOk-9MLtypwlIA2HJmqyuevmg-IoS8JhT_nwHIVx0G9NsMZx-OFMxWb5-GlV1ugSlxDPiaWSN1fi9b-cQ';

  const token=localStorage.getItem('token')
  console.log(token,'token2')    
  // const tokenStorage = useSelector((state: any) => state?.token);
  const user=useSelector((state: any) => state?.auth);
  const userRole = useSelector((state:any) => state.role.role);

  const fetchAllsubscriptions=useCallback (async()=>{
    try {
      const response = await instance.get('/gym/subscriptions/manage/all', {
        headers: {
          Authorization: `Bearer ${await tokenStorage}`,
          'Content-Type': 'application/json',
        },
      }).then(res=>{
        setSubscriptions(res.data)
        console.log(res.data)
      });
      
      

    } catch (error) {
      console.log(error)
    }
  },[])

  useEffect(()=>{
    fetchAllsubscriptions()
  },[])

  return (
    <section>
     
     
       
       
      
      {/* <SearchBox/> */}
     <DataTable data={[...getSubcscriptions]}/>
      {/* <DashboardTables /> */}
    </section>
  );
}

export default Dashboard;
