import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import LGBackround from 'components/blocks/LGBackround/LGBackround'
import HeaderTitle from 'screens/HomeScreen/components/HeaderTitle'
import { useNavigation } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather'
import { getUserAndDocuments, instance } from 'utils/axios'
import { ROLE, TOKEN_KEY } from 'constants/constants'
import { storageReadItem } from 'utils/asyncStorage'
const Documents = () => {
    const navigation=useNavigation()
    const [userDpcuments,setUserDpcuments] =useState([])

    const [token, setToken] = useState('');

  storageReadItem(TOKEN_KEY, ROLE).then(token => {
    setToken(token);
  });
 const getUserAndDocuments=useCallback(async()=>{
  try {
    const response=await instance.get('/gym/user/info',{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    return response
  } catch (error) {
    console.log(error)
    
  }
 },[])
  
 console.log(token)
 useEffect(()=>{
  getUserAndDocuments()
 })
  return (
    <LGBackround>
      <HeaderTitle title='Документы' styles={{ marginTop: 10 }} onPress={()=>navigation.goBack()} />
      <View style={styles.container}>
      <Text>Documents</Text>
      <View style={styles.flex}>
          <Text style={{ color: '#fff' }}>Документы</Text>
          <TouchableOpacity onPress={()=>{}}>
            <Feather name="chevron-right" style={styles.clickContainer} size={30} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    </LGBackround>
  )
}

export default Documents

const styles = StyleSheet.create({
    container:{
        marginVertical: 10,
    marginHorizontal: 20,
    }
})