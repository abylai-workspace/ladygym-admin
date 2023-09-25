import React, { useEffect, useState } from 'react'
import TaskBoards from './TaskBoards'
import { useSelector } from 'react-redux';
import { instance } from '../../../config/api';

const AdminTask = () => {
  const user=useSelector((state) => state?.auth);
  const token=user.token;
  const [data,setData]=useState([])
  const fetchData =  async() => {
    try {
      const response =await  instance.get('/gym/financials/admins',{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      .then(res=>{
       //  console.log(res?.data)
        setData(res?.data)
      })
      return response
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchData()
  },[])


  return (
    <div>
      <TaskBoards data={data}/>
    </div>
  )
}

export default AdminTask
