import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { WithLocalSvg } from 'react-native-svg'
import StarRating from 'components/blocks/StarRating/StarRating'
import NextButton from './Buttons/NextButton'
import Feather from 'react-native-vector-icons/Feather'
import { instance } from 'utils/axios'
import { useSelector } from 'react-redux'

const TrainCards = (props) => {
  const [data,setData]=useState()
  const tokenStorage = useSelector((state:any) => state.auth.token);
  useEffect(() => {
    if (!props.gymId && !tokenStorage) return
    instance.get('/gym/user/trainers', {params: {gymId: props.gymId}, headers: {Authorization: `Bearer ${tokenStorage}`}})
        .then((resp) => {
          setData(resp.data)}).catch((err) => console.log(err.response))
  }, [props.gymId, tokenStorage])
  
const renderItem = ({ item }) => {
    return (
        <View style={styles.blockContainer}>
            <View style={styles.imageContainer}>
              <View style={styles.counterContainer}>
              <Text style={styles.counter}>99</Text>
              </View>
            <WithLocalSvg asset={require(`../../../../assests/images/train1.svg`)}/>
            </View>
            <Text style={styles.name}>{item.name}</Text>
            <StarRating stars={item.rating} />
            <Text style={styles.decs}>{item.description}</Text>
           <TouchableOpacity style={styles.buttonContainer} onPress={() => {
            props.setTrainerInfo(item)
            props.onPress()
           }}>

            <Feather name="arrow-right" size={20} color="#fff" />
           </TouchableOpacity>

        </View>
    )
}
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Тренеры</Text>
        <FlatList data={data} renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={true}
        horizontal
         />
         <View style={styles.flexContainer}>
        <TouchableOpacity style={styles.whatbutton}>
          <Text style={styles.text}>Whatsapp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.callButton}>
          <Text style={styles.text}>Позвонить</Text>
        </TouchableOpacity>
         </View>
    </View>
  )
}

export default TrainCards

const styles = StyleSheet.create({
  container: {
    marginHorizontal:20,
    marginBottom:120
},
flexContainer:{
flexDirection:'row',
justifyContent:'space-between',
marginTop:20,
marginBottom:30
},
text:{
  color:'white'
},
whatbutton:{
backgroundColor:'rgba(9, 185, 39, 1)',
paddingHorizontal:40,
paddingVertical:10,
borderRadius:20,
},
callButton:{
  backgroundColor:'rgba(207, 84, 144, 1)',
  paddingHorizontal:40,
  paddingVertical:10,
  borderRadius:20,
},
headerText:{
    fontSize: 20,
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '600',
    marginBottom:10
  },
  blockContainer:{
      marginHorizontal:5,
      padding:10,
      backgroundColor:'rgba(255, 255, 255, 0.1)',
      borderRadius:5,
      
      borderColor:'gray',
      borderWidth:0.2
  },
  imageContainer:{
    backgroundColor:'rgba(207, 84, 144, 1)',
    borderRadius:5,
    // alignContent: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf: 'center',
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
  counterContainer:{
   position:'absolute',
   right:5,
   top:5,
   backgroundColor:'#000',
   width:20,
   alignContent: 'center',
   alignItems: 'center',
   justifyContent: 'center',
   borderRadius:10,
   borderColor:'#fff',
   borderWidth:0.5,
   height:20

  },
  counter:{
    color:'#fff',
    fontSize:12
  }
})