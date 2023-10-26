import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import NextButton from './Buttons/NextButton';


interface Props {
  onPressIMT: () => void,
  onPressKBJ:()=>void
}
const Counter = ({onPressIMT,onPressKBJ}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Расчеты</Text>
      <View style={styles.flexContainer}>
        <View style={styles.fkexContainer2}>
          <Text style={styles.text}>ИМТ</Text>
          <NextButton styles={{backgroundColor:'rgba(207, 84, 144, 1)',right:-30}} onPress={onPressIMT}/>
        </View>
        <View style={styles.fkexContainer2}>
          <Text style={styles.text}>КБЖУ</Text>
          <NextButton styles={{backgroundColor:'rgba(207, 84, 144, 1)',right:-30}} onPress={onPressKBJ}/>
        </View>
      </View>
    </View>
  );
};

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom:14,
    
   
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 1)',
    marginTop: 10,
    marginBottom:10
   
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
   
  },
  fkexContainer2:{
    flexDirection: 'row',
   justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems:'center',
    paddingLeft:15,
    borderRadius:5,
    paddingHorizontal:width/15,
    borderColor:'rgba(255, 255, 255, 1)',
    borderWidth:0.2,
    paddingVertical:5
  
  },
  text:{
    color:'#fff'
  }
});
export default Counter;
