import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from 'utils/colors'

const SelectRadio = ({item,index,selectValue2,handleSelectiontwo}) => {
   
  return (
    <>
      <View key={index}  style={[styles.containerFlatlist, { borderColor: selectValue2 === item ? COLORS.LADY_GYB_BACKGROUND : 'transparent' }]}>
      <View style={styles.flexContainer}>
      <View>
      <View style={styles.flexContainer2}>
              <Text style={styles.label}>{item.label} - </Text>
              <Text style={styles.price}>{item.price} ₸ </Text>
            </View>
            
      </View>
      <TouchableOpacity
            key={item}
            onPress={() => handleSelectiontwo(item.enumName)}
            style={styles.radioButton}
          >
            <View style={[styles.radioButtonCircle, { borderColor: selectValue2 === item ? '#CF5490' : 'transparent' }]}>
              {selectValue2 === item.enumName && <View style={styles.selectedRb} />}
            </View>
          </TouchableOpacity>
      </View>
      </View>
      </>
  )
}

export default SelectRadio

const styles = StyleSheet.create({
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    
      },
    containerFlatlist: {
        borderColor: 'red',
        borderWidth: 1,
        marginVertical: 5,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 15,
        backgroundColor: 'rgba(255,255,255,0.1)',
    
    
      },
      radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        // alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        marginTop: 10
      },
      radioButtonCircle: {
        height: 20,
        width: 20,
        borderRadius: 15,
        borderWidth: 2,
        backgroundColor: COLORS.LADY_GYB_SUB_TEXT,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        alignContent: 'center',
    
    
      },
      flexContainer2:{
        flexDirection: 'row',
        justifyContent: 'space-between',
       marginTop:10
      },
      selectedRb: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.LADY_GYB_BACKGROUND,
      },
      label: {
        color: COLORS.white,
        fontWeight: '500',
        fontSize: 14
      },
      price: {
        color: COLORS.LADY_GYB_BACKGROUND,
        fontWeight: '500',
        fontSize: 14
      },
      time: {
        fontSize: 10,
        color: '#fff'
      },
})