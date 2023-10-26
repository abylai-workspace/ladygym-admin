import { View, Text, StyleSheet, TextInput, ViewStyle } from 'react-native'
import React from 'react'
interface IProps {
    placeholder?: string,
    style?:ViewStyle,
    onChangeText:(text:string)=>void,
    value?:string 
   
}
const Input = ({placeholder,style,onChangeText,value}:IProps) => {
  return (
    <View style={[styles.container,style]}>
      <TextInput placeholder={placeholder}    keyboardType="numeric" style={styles.input} placeholderTextColor={'rgba(255, 255, 255, 0.2)'} onChangeText={(text)=>onChangeText(text)} value={value}/>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        backgroundColor: 'rgba(33, 33, 34, 1)',
        // padding:10,
        borderRadius:10,
        marginBottom:10
    },
    input:{
        paddingHorizontal:20,
        color:'white',
        height:50
    }
})

export default Input