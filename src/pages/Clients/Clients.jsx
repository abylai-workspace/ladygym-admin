import React, { useEffect, useState } from 'react'
import Table from './components/Table'
import axios from 'axios'
import { getAllClients } from '../../config/axios'
import { useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'


function Clients() {

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
},[user])
  // useEffect(()=>{
  //   try {
  //     const response=axios.get('https://dummyjson.com/users')
  //     .then(res=>{
  //       setData(res.data.users)
  //     })
   
  //   } catch (error) {
      
  //   }
  // },[])
  return (
    <div>
      <div><Toaster/></div>

      {/* <ToastContainer/> */}
      <Table data={data}/>
      

    </div>
  )
}

export default Clients