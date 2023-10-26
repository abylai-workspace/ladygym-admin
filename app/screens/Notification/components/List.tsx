import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'

interface IProps {
    onPress: () => void,
    title: string,
    subtitle: string,
    icon: string
}
const List = ({onPress, title, subtitle, icon}: IProps) => {
  return (
    <View style={styles.container} >
     <View style={styles.containerFlex}>
        <View style={{flexDirection:'row'}}>
            <View style={styles.containerIcon}>
                <Feather name={icon} size={24} color="white" />
            </View>
            <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
        </View>
        <View style={styles.RightcontainerIcon}>
            <TouchableOpacity onPress={onPress}>
            <Feather name="chevron-right" size={24} color="white" />

            </TouchableOpacity>
        </View>

     </View>
    </View>
  )
}


const styles=StyleSheet.create({
  container:{
   marginVertical:0,
   marginHorizontal:20,
    padding:10,
    // borderColor:'rgba(255,255,255,0.01',
   borderBottomColor:'gray',
    borderBottomWidth:0.4,
    
  },
  containerFlex:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  title:{
    color:'white',
  },
  containerIcon:{
    width:40,
    height:40,
    backgroundColor:'rgba(207, 84, 144, 1)',
    borderRadius:10,
    alignContent:'center',
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
   
  },
  RightcontainerIcon:{
    alignContent:'center',
    alignSelf:'center',
  },
  titleContainer:{
    marginLeft:10
  },
  subtitle:{
    color:'gray',
    fontSize:12
  }
})
export default List