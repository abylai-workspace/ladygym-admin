import React, { useEffect, useState } from 'react'
import Table from './components/Table';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { VisitCounterClients } from '../../config/axios';




function CountVisit() {
  const [data,setData]=useState([])
  const user=useSelector((state) => state?.auth);

  useEffect(()=>{
    const fetchData =()=>{
      try {
        const response=VisitCounterClients(user.token)
        .then(res=>{
          setData(res.data)
          console.log(res.data)
        })
        return response
      } catch (error) {
        
      }
    }
    fetchData()
  },[])
  console.log(data)
  return (
    <div>
       <Table data={data} />
    </div>
  )
}

export default CountVisit