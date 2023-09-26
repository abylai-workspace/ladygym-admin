import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getAllClients } from '../../../config/axios';
import Table from './Table';
const CountVisit = () => {
    const [data,setData]=useState([])
    const user=useSelector((state) => state?.auth);
  useEffect(()=>{
    const fetchData =()=>{
      try {
        const response=getAllClients(user?.token)
        .then(res=>{
          setData(res.data)
        
          
        })
        return response
      } catch (error) {
        
      }
    }
    fetchData()
  },[])
  return (
    <div>
        <Table data={data}/>
    </div>
  )
}

export default CountVisit