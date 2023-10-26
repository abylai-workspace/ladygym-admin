import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import TextInputWithIcon from 'screens/Admin/components/TextInputWithIcon'
import { storageReadItem } from 'utils/asyncStorage'
import { ROLE, SCREENS, TOKEN_KEY } from 'constants/constants'
import { instance } from 'utils/axios'
import FlatList from 'components/blocks/FlatList/FlatList'
import { useNavigation } from '@react-navigation/native'
const {height, width} = Dimensions.get('window')
const Trainers = () => {
  const navigation=useNavigation()
  const [data,setData]=useState([])
  const [token,setToken]=useState('')
  const [query,setQuery]=useState('')
  storageReadItem(TOKEN_KEY,ROLE).then((token)=>{
    setToken(token)
  })
  useEffect(()=>{
    fetchData()   
  },[token])
  const fetchData = useCallback(async () => {
    try {
      const response = await instance.get('/gym/user/personal',{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      .then(res=>{
          const adminall=res?.data
          console.log(adminall)
          const filterAdmin=adminall.filter((el)=>{
            return el.role==='TRAINER'
          })

          const admins=filterAdmin.filter((el)=>{
            return el.deleted===false
          })

        setData(admins)
        
      })
      return response
    } catch (error) {
      console.log(error)
    }
  },[token])
 const filtersearch = data?.filter((el:any)=>{
     return el.firstName.toLowerCase().includes(query.toLowerCase())
     
 })
  return (
    <View>
      <TextInputWithIcon
          placeholder="Поиск"
          iconName="search" // Replace with the name of the icon you want to use
          iconSize={24}
          iconColor="gray"
          value={query}
          onPress={(text)=>setQuery(text)}
        />
        <ScrollView style={{
          height:height/1.42,
          marginBottom:60
        }}>
        {filtersearch?.map((data:any) => (
        <FlatList title={data?.firstName + ' ' + data?.lastName} key={data?.id} onPress={()=>{
          navigation.navigate(SCREENS.ADMIN_PERSONAL_DETAILS,{
            personal: data as never
          })
        }}/>
        ))}
        </ScrollView>
       
    </View>
  )
}

export default Trainers

const styles = StyleSheet.create({})