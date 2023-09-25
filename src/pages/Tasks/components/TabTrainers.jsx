import React, { useEffect, useState } from 'react'
import { instance } from '../../../config/api'
import { useSelector } from 'react-redux'
import TaskBoard from './TaskBoard';

const TabTrainers = () => {
    const [data,setData]=useState([])
   
    const user=useSelector((state) => state?.auth);
   const token=user.token;
   const fetchData = async () => {
     try {
       const response = await instance.get('/gym/tasks/trainers',{
         headers:{
           Authorization: `Bearer ${token}`
         }
       })
       .then(res=>{
         
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
      <div className='container'>
        <TaskBoard data={data}/>
      </div>
    </div>
  )
}

export default TabTrainers
