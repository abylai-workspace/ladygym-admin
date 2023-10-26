import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface Props {
 label?: string   
}
const HrLine = ({label}:Props) => {
  return (
    <View style={{flexDirection: 'row'}}>
    <View style={{backgroundColor: '#fff', height: 2, flex: 1, alignSelf: 'center'}} />
    <Text style={{textAlign:'center',color:'#fff',fontSize:14,marginHorizontal:10}}>{label}</Text>
    <View style={{backgroundColor: '#fff', height: 2, flex: 1, alignSelf: 'center'}} />
</View>
  )
}

export default HrLine

const styles = StyleSheet.create({})