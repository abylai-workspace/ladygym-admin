import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from 'utils/colors'

const ReitingCard = () => {
  return (
    <View style={styles.container}>
        <View style={styles.flexDirection}>
            <View style={{flexDirection:'row'}}>
                <View style={styles.countarContainer}>
                <Text style={styles.counter}>12</Text>
                </View>
                <Text style={styles.client}>Вы</Text>
            </View>
            <View>
                <Text style={styles.place}>12</Text>
            </View>
        </View>
    </View>
  )
}

export default ReitingCard

const styles = StyleSheet.create({
    container:{
        backgroundColor:COLORS.LADY_GYB_BACKGROUND,
        padding:15,
        paddingHorizontal:15,
        borderRadius:10
    },
    flexDirection:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent: 'center',
        alignItems: 'center',
    },
    countarContainer:{
        backgroundColor:'rgba(255,255,255,0.1)',
        padding:5,
        paddingHorizontal:8,
        borderRadius:50,
        // margin:
    },
    counter:{
        color:'white',
    },
    client:{
        color:'white',
        textAlign:'center',
        alignSelf:'center',
        marginLeft:5,
        fontSize:16
    },
    place:{
        color:'white',
        textAlign:'center',
        alignSelf:'center',
        fontSize:18
    }
})