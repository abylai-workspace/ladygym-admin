import React, { useEffect, useState } from 'react'
import Table from './components/Table';
import axios from 'axios';




function CountVisit() {
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
  console.log(data)
  return (
    <div>
       <Table data={data} />
    </div>
  )
}

export default CountVisit