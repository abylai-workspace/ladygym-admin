import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import Feather from 'react-native-vector-icons/Feather'
const NextButton = (props) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer,props.styles]} onPress={props.onPress}>
      <Feather name="chevron-right" size={20} color="white"  />
    </TouchableOpacity>
  )
}

export default NextButton

const styles = StyleSheet.create({
    buttonContainer:{
        backgroundColor: 'rgba(207, 84, 144, 1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        padding:10,
        borderRadius: 15,
        
    }
})