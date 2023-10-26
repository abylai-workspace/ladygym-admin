import {View, Text, StyleSheet, ImageBackground, ScrollView} from 'react-native';
import React from 'react';

const HeaderAbonoment = () => {
  return (
    <ImageBackground
      source={require('../../../../assests/images/DotsBack.png')}
      style={styles.container}
     >
           <ScrollView  style={{marginHorizontal:20}}>
      <Text style={styles.headerText}>Абонемент {'\n'}со скидкой 20%</Text>
      <Text style={styles.subtitle}>Абонемент со скидкой 20%</Text>
      </ScrollView>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal:20,
    backgroundColor: 'rgba(11, 11, 12, 1)',
    padding: 10,
    paddingVertical: 35,
    borderRadius: 5,
   
    borderColor: 'rgba(255, 255, 255, 1)',
    borderWidth: 0.3,
    marginBottom:4
  },
  headerText:{
    fontSize: 20,
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '600',
  },
  subtitle:{
    fontSize: 12,
    color: 'gray',
  }
});
export default HeaderAbonoment;
