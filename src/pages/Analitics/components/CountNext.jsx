import React, { useEffect, useState } from 'react'
import { getAllClients } from '../../../config/axios';
import { useSelector } from 'react-redux';
import TableNext from './TableNext';

const CountNext = () => {
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
        <TableNext data={data}/>
    </div>
  )
}

export default CountNext