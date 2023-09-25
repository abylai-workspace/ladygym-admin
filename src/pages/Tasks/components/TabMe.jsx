import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import TaskBoard from './TaskBoard';
import { instance } from '../../../config/api';

function TabMe() {
    const [data,setData]=useState([])
   
    const user=useSelector((state) => state?.auth);
   const token=user.token;
   const fetchData = async () => {
     try {
       const response = await instance.get('/gym/tasks/my',{
         headers:{
           Authorization: `Bearer ${token}`
         }
       })
       .then(res=>{
        //  console.log(res?.data)
         setData(res?.data)
       })
     } catch (error) {
       console.log(error)
     }
   }
   useEffect(()=>{
     fetchData()
       
   },[data])
  return (
    <div>
      <TaskBoard data={data}/>
    </div>
  )
}

export default TabMe
