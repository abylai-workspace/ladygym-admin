import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { storageReadItem } from 'utils/asyncStorage';
import { ROLE, TOKEN_KEY } from 'constants/constants';
import { instance } from 'utils/axios';
import CardFinance from './CardFinance';

const AdminScreen = () => {
    const [data, setData] = useState([]);
    const [token, setToken] = useState('');
    storageReadItem(TOKEN_KEY,ROLE).then((token)=>{
      setToken(token)
    })
  
    useEffect(()=>{
      fetchData()
    },[token])
    const fetchData = useCallback(async() => {
      try {
        const response = await instance?.get('/gym/financials/admins',{
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
    },[token])
  return (
    <ScrollView style={styles.container}>
      <CardFinance data={data} />
    </ScrollView>
  )
}

export default AdminScreen

const styles = StyleSheet.create({
    container:{
        margin:0
    }
})