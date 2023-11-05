import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import LGBackround from 'components/blocks/LGBackround/LGBackround'
import HeaderTitle from 'screens/HomeScreen/components/HeaderTitle'
import { WithLocalSvg } from 'react-native-svg'
import StarRating from 'components/blocks/StarRating/StarRating'
import Buttons from 'screens/HomeScreen/components/GymInformation/Buttons/Buttons'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'

const InformationTrainer = ({route}) => {
  const list=route?.params?.info
  console.log(list,'list')
    const navigation=useNavigation()
    const [data,setData]=useState([ // fix: delete mock  & use requests
        {
          name:'Аида',
            decs:'Прекрасный тренер, все понравилось!'
        },
        {
          name:'Аида',

            decs:'Прекрасный тренер, все понравилось!'
    
        },
        {
          name:'Аида',
            decs:'Прекрасный тренер, все понравилось!'
    
        },
        {
          name:'Аида',
            decs:'Прекрасный тренер, все понравилось!'
        },
        {
          name:'Аида',
            decs:'Прекрасный тренер, все понравилось!'
    
        },
        {
          name:'Аида',
            
            decs:'Прекрасный тренер, все понравилось!'
    
        },
    ])

    const assignTrainer = async()=>{
      try {
        const response=await instance.post('/gym/subscriptions/assign/trainer',{
          trainerId: list.id,
          subscriptionId: 1,
        },{
          headers:{
            Authorization: `Bearer ${await tokenStorage}`,
            'Content-Type': 'application/json',
          }
        })
        if(response.data){
          console.log(response.data);
        }
        console.log(response.data)
      } catch (error) {
        
      }
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.blockContainer}>
               
                <Text style={styles.name}>{item.name}</Text>
                <StarRating/>
                <Text style={styles.descFlat}>{item.decs}</Text>
    
            </View>
        )
    }
  return (
    <LGBackround>
        <ScrollView>
        <HeaderTitle title='Тренер' onPress={()=>navigation.goBack()}/>

        <View style={styles.container}>
            <View style={styles.imageContainer}>
         
            <Image
            resizeMode="cover"
           source={{uri:`data:image/jpg;base64,${list.avatarBase64}`}} 
          style={styles.image}/>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{list.firstName + ' ' + list.lastName}</Text>
          <StarRating stars={list.rating} reviews={list.rating} styles={{color: '#fff'}} />
        </View>
        <View >
          <Text style={styles.decs}>{list.description}</Text>
          <Text style={styles.decs}>Образование: {list.education}  </Text>
          <Text style={styles.decs}>Звания: {list.ranks} </Text>
          <Text style={styles.decs}>Спортивные достижения: {list.sportsAchievements} </Text>
        </View>
        <FlatList data={data} renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={true}
        horizontal
        style={{marginTop:20}}
         />

  

          <Buttons title='Выбрать тренера' onPress={()=>{}}/>


        </View>
        </ScrollView>
    </LGBackround>
  )
}

export default InformationTrainer

const {width, height} =Dimensions.get('window')
const styles = StyleSheet.create({
    buttonContainer:{
        backgroundColor:'rgba(117, 54, 234, 1)',
    },
    input:{
       flex:1,
       color: '#fff',
       fontSize: 14,
       backgroundColor:'rgba(14, 14, 16, 0.6)',
       borderColor: 'rgba(255, 255, 255, 1)',
       borderWidth: 0.2,
       marginTop:20,
       borderRadius:5,
       height:150,
       padding:10
    },
    container:{
        marginHorizontal:20,
        marginVertical:10
    },
    blockContainer:{
      marginHorizontal:5,
      padding:10,
      backgroundColor:'rgba(255, 255, 255, 0.1)',
      borderRadius:5,
      paddingRight:0,
      borderColor:'gray',
      borderWidth:0.2
  },
  descFlat:{
    width:200,
    color: '#fff',
    fontSize:12,
    marginTop:4
  },
    decs:{
      color: '#fff',
      fontSize: 14,
      marginTop: 10,
    
    },
    imageContainer: {
      borderRadius: 10,
      backgroundColor: 'rgba(14, 14, 16, 0.6)',
      alignItems: 'center',
      marginTop: 0,
      borderColor: 'rgba(255, 255, 255, 1)',
      borderWidth: 0.2,
    },
    image:{
      width:200,height:250
    },
    counterContainer: {
      position: 'absolute',
      right: 15,
      top: 15,
      backgroundColor: '#000',
      width: 30,
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      borderColor: '#fff',
      borderWidth: 0.5,
      height: 30,
    },
    counter: {
      color: '#fff',
      fontSize: 12,
    },
    nameContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    name: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '500',
    },
  });