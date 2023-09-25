import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { instance } from '../../../config/api';
import TaskBoards from './TaskBoards';
const MyTasks = () => {
    const user=useSelector((state) => state?.auth);
    const token=user.token;
    const [data,setData]=useState([])
    const fetchData =  async() => {
      try {
        const response =await  instance.get('/gym/financials/my',{
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

export default MyTasks
