import { View, Text, StyleSheet, TextInput, ViewStyle, Platform } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'

interface IProps{
    label?: string |number,
    onPress?:(event:any)=>void,
    value?:any,
    rightIcon?:boolean,
    placeholder?:string,
    style?:ViewStyle| ViewStyle[],
    keyBoardType:'numeric' | 'default',
}
const PersonalInfo = ({label, onPress, value, rightIcon,placeholder,style,keyBoardType}:IProps) => {
    return (
        <View style={[styles.userInfo,style]}>
            <View style={styles.flexContainer}>
                <View>
                    <Text style={styles.label}>{label}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <TextInput placeholder={placeholder} placeholderTextColor={'rgba(255, 255, 255, 0.2)'} 
                      keyboardType={keyBoardType}
                     value={value} onChangeText={onPress} style={styles.input}/>
                    {rightIcon &&  <Feather name="chevron-right" size={20} color="gray"  style={{alignSelf:'center'}}/>}
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    userInfo: {
        backgroundColor: 'rgba(33, 33, 34, 1)',
        marginHorizontal: 10,
        paddingHorizontal: 10,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
        borderBottomWidth: 1,
        paddingVertical:Platform.OS==='ios'?10:0
    },
    flexContainer: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
    },
    label: {
        color: 'white',
        fontSize:12,
        
    },
    input:{
        textAlign:'right',
        color:'white',
        
    }
})
export default PersonalInfo