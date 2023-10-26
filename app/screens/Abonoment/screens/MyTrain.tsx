import { FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import LGBackround from 'components/blocks/LGBackround/LGBackround'
import HeaderTitle from 'screens/HomeScreen/components/HeaderTitle'
import { WithLocalSvg } from 'react-native-svg'
import StarRating from 'components/blocks/StarRating/StarRating'
import Buttons from 'screens/HomeScreen/components/GymInformation/Buttons/Buttons'
import { useNavigation } from '@react-navigation/native'

const MyTrain = () => {
    const navigation=useNavigation()
    const [data,setData]=useState([
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
        <View style={styles.container}>
            <HeaderTitle title='Тренер' onPress={()=>navigation.goBack()}/>
            <View style={styles.imageContainer}>
         
          <WithLocalSvg asset={require('../../../assests/images/train5.svg')} />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>Артыкбай Аида</Text>
          <StarRating stars={4} reviews={4.9} styles={{color: '#fff'}} />
        </View>
        <View >
          <Text style={styles.decs}>Тренер групповых программ, инструктор тренажёрного зала.</Text>
          <Text style={styles.decs}>Образование: колледж «Парасат» имени М. Сапарбаева по специальности «Физическая культура и спорт».  </Text>
          <Text style={styles.decs}>Звания: мастер спорта по футболу. </Text>
          <Text style={styles.decs}>Спортивные достижения: победитель Чемпионата Республики Казахстан по футболу. </Text>
        </View>
        <FlatList data={data} renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={true}
        horizontal
        style={{marginTop:20}}
         />

      <View style={{flexDirection:'row',marginTop:20,justifyContent:'space-between'}}>
        <Text style={styles.name}>Оставить отзыв</Text>
        <StarRating stars={4}  styles={{color: '#fff'}} />
      </View>
<View style={styles.input} >
<TextInput placeholder='Ваш отзыв'></TextInput>

</View>
<Buttons title='Отправить' onPress={()=>{}} style={styles.buttonContainer}/>
<Buttons title='Отправить' onPress={()=>{}}/>


        </View>
        </ScrollView>
    </LGBackround>
  )
}

export default MyTrain

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
        marginVertical:15
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