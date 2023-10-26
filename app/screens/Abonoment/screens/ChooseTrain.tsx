import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LGBackround from 'components/blocks/LGBackround/LGBackround'
import HeaderTitle from 'screens/HomeScreen/components/HeaderTitle'
import { WithLocalSvg } from 'react-native-svg'
import StarRating from 'components/blocks/StarRating/StarRating'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { instance } from 'utils/axios'
import { ROLE, SCREENS, TOKEN_KEY } from 'constants/constants'
import { storageReadItem } from 'utils/asyncStorage'
export default function ChooseTrain() {
  const navigation=useNavigation()


const [list,setList]=useState([])

const [tokenStorage,setToken]=useState('')

useEffect(()=>{
storageReadItem(TOKEN_KEY,ROLE).then((token)=>{
    setToken(token)
  })
},[])

useEffect(() => {
  if ( !tokenStorage) return
  instance.get('/gym/user/trainers', { headers: {Authorization: `Bearer ${tokenStorage}`}})
      .then((resp) => {
        setList(resp.data)}).catch((err) => console.log(err.response))
}, [ tokenStorage])



const renderItem = ({ item }) => {
const fullName = item?.firstName +' '+ item?.lastName
console.log(item.reviews)
  return (
      <View style={styles.blockContainer}>
          <View style={styles.imageContainer}>
           
          <Image
            resizeMode="cover"
           source={{uri:`data:image/jpg;base64,${item.avatarBase64}`}} 
          style={styles.image}/>
          </View>
          <Text style={styles.name}>{fullName||'Артыкбай Аида'}</Text>
          <StarRating stars={item?.rating} />
          <Text style={styles.decs}>{item.description}</Text>
         <TouchableOpacity style={styles.buttonContainer} onPress={()=>{
          navigation.navigate(SCREENS.TRAINER_INFO as never,{
            info:item as never
          } as never) as never
          console.log(item)
         }}>
          <Feather name="arrow-right" size={20} color="#fff" />
         </TouchableOpacity>

      </View>
  )
}
  return (
    <LGBackround>
      <View style={{marginTop:20,marginBottom:50}}>
        <HeaderTitle title='Выберите тренер' onPress={()=>navigation.goBack()}/>
        <FlatList data={list} renderItem={renderItem}
        keyExtractor={(item, index) =>"_"+ index.toString()}
        scrollEnabled={true}
       numColumns={2}
       key={'_'}
         />
          </View>
    </LGBackround>
  )
}

const styles = StyleSheet.create({
  blockContainer:{
    marginHorizontal:10,
    padding:10,
    backgroundColor:'rgba(255, 255, 255, 0.1)',
    borderRadius:5,
    marginTop:10,
    
    borderColor:'gray',
    borderWidth:0.2
},
imageContainer:{
  backgroundColor:'rgba(207, 84, 144, 1)',
  borderRadius:5,
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
},
image:{
  width:150,height:200
},
name:{
  color:'#fff',
  fontSize:16,
  fontWeight:'500',
  width:100
},
decs:{
  color:'#fff',
  fontSize:12,
  width:150
},
buttonContainer:{
  backgroundColor:'rgba(207, 84, 144, 1)',
  width:30,
  borderRadius:10,
  textAlign: 'center',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  height:30,
  marginTop:10
},
})