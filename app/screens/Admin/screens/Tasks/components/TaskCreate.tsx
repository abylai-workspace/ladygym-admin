import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import LGBackround from 'components/blocks/LGBackround/LGBackround'
import HeaderTitle from 'screens/HomeScreen/components/HeaderTitle'
import { useNavigation } from '@react-navigation/native'
import CustomButton from 'components/blocks/Buttons/SmallPrimaryButton'
import { instance } from 'utils/axios'
import { storageReadItem } from 'utils/asyncStorage'
import { ROLE, TOKEN_KEY } from 'constants/constants'

const TaskCreate = ({route}) => {
  
  const id=route?.params?.clients
  const navigation = useNavigation()
  const [description,setDescription]=useState('')
  const [token, setToken] = useState('')
  storageReadItem(TOKEN_KEY, ROLE).then(token => {
    setToken(token);
  });

  const postTask=()=>{
    const data={
        description:description
    }
    try {
        const response=instance.post(`/gym/tasks/create/${id}`,data,{
            headers:{
                Authorization: `Bearer ${token}`
            }

        })
        .then(res=>{
        
            if (res.status===200){
             
              Alert.alert(
                res.data.message
              )
              navigation.goBack()

               
              
            }
            if(res.status===404 && res.statusText==='Not Found'){
              Alert.alert(
                res.data.message
              )
              navigation.goBack()
              
            }
        })
        
      
       return response
        
    } catch (error) {
        console.log(error)
       
        
    }
}
  return (
    <LGBackround>
    <HeaderTitle title='Создать задание' styles={{ marginTop: 10 }} onPress={()=>navigation.goBack()} />
    <View style={styles.container}>
      <TextInput
      style={styles.input}
      numberOfLines={1}
      placeholder='Cоздать задание'
      value={description}
      onChangeText={(text)=>setDescription(text)}
      />

<CustomButton variant='fill' label='Создать' onPress={()=>{
            // console.log(sum)
            postTask()
           }} style={{marginTop:20}}/>
      </View>
    </LGBackround>
  )
}

export default TaskCreate

const styles = StyleSheet.create({
  container:{
    marginHorizontal:20

  },
  input:{
    height: 50,
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 0.2,
    color: '#fff',
  }
})