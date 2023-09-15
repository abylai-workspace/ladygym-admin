import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Table from './components/Table'

function NotificationFreeze() {
    const [data,setData]=useState([])

  useEffect(()=>{
    try {
      const response=axios.get('https://dummyjson.com/users')
      .then(res=>{
        setData(res.data.users)
      })
   
    } catch (error) {
      
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