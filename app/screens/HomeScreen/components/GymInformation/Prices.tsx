import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import { WithLocalSvg } from 'react-native-svg'


const Prices = () => {
    const [data,setData]=useState([
        {
            price:'от 10',
            image:require('../../../../assests/images/sport1.svg'),
            counter:'Недельный'
        },
        {
            price:'от 10',
            image:require('../../../../assests/images/sport1.svg'),
            counter:'Месячный'

        },
        {
            price:'от 10',
            image:require('../../../../assests/images/sport1.svg'),
            counter:'Трехмесячный'

        },
        {
            price:'от 10',
            image:require('../../../../assests/images/sport1.svg'),
            counter:'Недельный'
        },
        {
            price:'от 10',
            image:require('../../../../assests/images/sport1.svg'),
            counter:'Месячный'

        },
        {
            price:'от 10',
            image:require('../../../../assests/images/sport1.svg'),
            counter:'Трехмесячный'

        },
    ])
    const renderItem = ({ item }) => {
        return (
            <View style={styles.blockContainer}>
                <View style={styles.imageContainer}>
               <WithLocalSvg asset={item.image} />
                </View>
                <Text style={styles.price}>{item.price}</Text>
                <Text style={styles.counter}>{item.counter}</Text>

            </View>
        )
    }
  return (
    <View style={styles.container}>
        <Text style={styles.headerText}>Цены</Text>
        <FlatList data={data} renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={true}
        horizontal
         />
      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal:20,
        
       
    },
    headerText:{
        fontSize: 20,
        color: 'rgba(255, 255, 255, 1)',
        fontWeight: '600',
        marginBottom:10
      },
      blockContainer:{
          marginHorizontal:5,
          padding:10,
          backgroundColor:'rgba(255, 255, 255, 0.1)',
          borderRadius:5,
          paddingRight:45,
          borderColor:'gray',
          borderWidth:0.2
      },
      imageContainer:{
        backgroundColor:'rgba(255, 255, 255, 0.1)',
        borderRadius:50,
        width:50,
        height:50,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center'

        

      },
      price:{
        color:'#fff',
        fontSize:16,
        fontWeight:'500'
      },
      counter:{
        color:'#fff',
        fontSize:12
      }
})
export default Prices