import React, { useEffect, useState } from 'react'
import Table from './components/Table';
import axios from 'axios';


const fakeData = [
  { id: 1, name: 'John', age: 30, city: 'New York' },
  { id: 2, name: 'Alice', age: 25, city: 'Los Angeles' },
  { id: 3, name: 'Bob', age: 35, city: 'Chicago' },
  { id: 4, name: 'Eve', age: 28, city: 'San Francisco' },
  // Add more data as needed
];


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