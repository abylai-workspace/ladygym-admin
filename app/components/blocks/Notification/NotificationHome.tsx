import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

interface IProps{
  onPress:()=>void
}
const NotificationHome = ({onPress}:IProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
      <Ionicons name="notifications" size={24} color="rgba(207, 84, 144, 1)" />
      </TouchableOpacity>
    </View>
  )
}

export const styles=StyleSheet.create({
    container:{
        zIndex: 10,
        position:'absolute',
        right:20,
        marginTop:Platform.OS === 'ios' ? 65 : 40,
        padding:15,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor:'#fff',
        borderRadius:25,
        paddingVertical:15
    }
})
export default NotificationHome