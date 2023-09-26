import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Table from './components/Table'
import { getFreezeAll } from '../../config/axios'
import { useSelector } from 'react-redux';

function NotificationFreeze() {
  const user = useSelector((state) => state?.auth);
  const token = user.token;
    const [data,setData]=useState([])


  useEffect(()=>{
    try {
      const response=getFreezeAll(token)
     .then(res=>{
     
       setData(res.data)
     })
      
    } catch (error) {
      console.log(error)
    }
    
  },[])
  return (
    <div>
        <h1>Уведомления о заморозке</h1>
        <Table data={data}/>
    </div>
  )
}

export default NotificationFreeze