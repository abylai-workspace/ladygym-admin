import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { instance } from 'utils/axios'
import { storageReadItem } from 'utils/asyncStorage'
import { ROLE, TOKEN_KEY } from 'constants/constants'
import CardTasks from './CardTasks'

const { height } = Dimensions.get('window')
const ManagerTasks = () => {
  const [data,setData]=useState([])
  const [token,setToken]=useState('')
  storageReadItem(TOKEN_KEY,ROLE).then((token)=>{
    setToken(token)
  })
  useEffect(()=>{
    fetchData()
      
  },[token,data])
  const fetchData = async () => {
    try {
      const response = await instance.get('/gym/tasks/managers',{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      .then(res=>{
        
        setData(res?.data)
      })
      return response
    } catch (error) {
      console.log(error)
    }
  }

  
  return (
    <ScrollView style={{
      height:height/1.4,
      marginBottom:60
    }}>
    <CardTasks data={data} />
    </ScrollView>
  )
}

export default ManagerTasks

const styles = StyleSheet.create({})