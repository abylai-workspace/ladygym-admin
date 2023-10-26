import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
const TwoGisButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>Построить{'\n'}маршрут в 2GIS</Text>
      <Feather name="chevron-right" size={18} color="rgba(154, 71, 179, 1)" /> 
      </TouchableOpacity>
    </View>
  );
};

export default TwoGisButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(207, 84, 144, 0.12)',
   padding: 8,
   position: 'absolute',
   bottom: 10,
   right: 0,
    alignContent: 'center',
    borderRadius: 15,
    paddingLeft: 15,
    
  },
  button:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text:{
    color: ' rgba(154, 71, 179, 1)',
    fontSize: 10,
    marginRight: 10
  }
});
