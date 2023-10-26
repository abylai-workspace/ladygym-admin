import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
const HeaderTitle = (props) => {
  return (
    <TouchableOpacity style={[styles.conatainer,props.styles]} onPress={props.onPress}>
        <Feather name="arrow-left" size={20} color="white"  />
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  )
}

export default HeaderTitle


const styles = StyleSheet.create({
    conatainer:{
      
       
        marginBottom:30,
        marginHorizontal:20,
       
      
    },
    text:{
     
        textAlign:'center',
marginTop:-20,
        color:'white',
        fontSize:14,
        fontWeight:'500',
    }
})