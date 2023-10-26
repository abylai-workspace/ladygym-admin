import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'

interface InputProps {
    placeholder: string;
    value?: string;
    onPress?: (text: string) => void;
    icon?:any,
    label?: string,
    secureTextEntry?: boolean,
    disabled?: boolean

}
const Input = ({placeholder, value, onPress,icon,label,secureTextEntry,disabled}: InputProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const togglePasswordVisibility = useCallback(() => {
        setIsPasswordVisible(!isPasswordVisible);
      },[])
  return (
    <View>
      <Text style={{color:'#fff'}}>{label}</Text>
      <TextInput style={styles.container}
      placeholder={placeholder}
      value={value}
      onChangeText={onPress}
      secureTextEntry={secureTextEntry}
      editable={disabled}
      />
      {icon &&<TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
      <Feather name={isPasswordVisible ? 'eye-off' : 'eye'} size={20} color="gray" />
      </TouchableOpacity>
}
    
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgba(33, 33, 34, 1)',
        height:50,
        marginVertical:10,
        borderRadius:10,
        borderColor:'rgba(255,255,255,0.1)',
        borderWidth:1,
        padding:10,
        color:'#fff',
    },
    icon:{
        position:'absolute',
        right:10,
        top:45,

    }
})