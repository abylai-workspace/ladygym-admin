import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LGBackround from 'components/blocks/LGBackround/LGBackround'
import {Calendar, LocaleConfig} from 'react-native-calendars';
import HeaderTitle from 'screens/HomeScreen/components/HeaderTitle';
import Feather from 'react-native-vector-icons/Feather'
import Buttons from 'screens/HomeScreen/components/GymInformation/Buttons/Buttons';
import { useNavigation } from '@react-navigation/native';
const ActivationAbonoment = () => {
    const navigation=useNavigation()
    const [selected, setSelected] = useState('');
    const [showCalendar,setShowCalendar]=useState(false);

  return (
    <LGBackround>
            <HeaderTitle title='Активация абонемента' onPress={()=>navigation.goBack()}/>
        <View style={styles.container}>
        <Text style={{color:'#fff',fontSize:14}}>Дата активации абонемента</Text>
        <TouchableOpacity style={styles.calendayContainerList} onPress={()=>setShowCalendar(!showCalendar)}>
            <Text style={styles.calendayContainerListText}>{selected}</Text>
            <Feather name="calendar" size={24} color="rgba(207, 84, 144, 1)" onPress={()=>setShowCalendar(!showCalendar)} />
        </TouchableOpacity>
        {showCalendar &&
        (
            
            <Calendar
            style={styles.calendayContainer}
            
          onDayPress={day => {
            setSelected(day.dateString);
            setShowCalendar(false);
          }}
          markedDates={{
            [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'rgba(207, 84, 144, 1)',}
          }}
          theme={{
              selectedDayTextColor: '#fff',
              selectedDayBackgroundColor: 'rgba(207, 84, 144, 1)',
              
          }}
         
        />
  
        )}
        <Text style={styles.text}>Активация абонемента возможна в течении месяца после покупки, 
если не активировать абонемент он сгорает.</Text>
       
        </View>
       <Buttons title='Сохранить' onPress={()=>{}} style={styles.buttonContainer}/>

    </LGBackround>
  )
}

export default ActivationAbonoment

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20,
        marginVertical:20,
    },
    calendayContainer:{
        backgroundColor: 'rgba(33, 33, 34, 1)',
        padding:10,
        borderRadius:10,
        alignContent:'center',
        justifyContent:'center',
        marginVertical:100,
        color:'white',


    },
    calendayContainerList:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'rgba(33, 33, 34, 1)',
        padding:10,
        marginTop:20,
        borderRadius:10,
        borderColor:'rgba(255, 255, 255, 0.4)',
        borderWidth:0.5
    },
    calendayContainerListText:{
        marginLeft:10,
        fontSize:16,
    },
    text:{
        color:'rgba(255, 255, 255, 0.4)',
        fontSize:10,
        width:300,
        marginLeft:5,
        marginTop:10
    },
    buttonContainer:{
position:'absolute',
paddingHorizontal:120,
bottom:20,

    }
})