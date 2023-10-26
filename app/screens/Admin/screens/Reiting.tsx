import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LGBackround from 'components/blocks/LGBackround/LGBackround';
import {WithLocalSvg} from 'react-native-svg';
import { COLORS } from 'utils/colors';
import ReitingCard from '../components/ReitingCard';

const Reiting = () => {
  return (
    <LGBackround>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Рейтинг</Text>
        <View style={styles.containerCard}>
          <View style={styles.flexContainer}>
            <View style={styles.svg}>
              <Text style={styles.label}>Ким 
                         Анастасия</Text>
                         <Text style={styles.counter}>99</Text>
              <WithLocalSvg asset={require('../../../assests/images/reitingtwo.svg')} />
            </View>
            <View style={styles.svg2}>
              <Text style={styles.label1}>Ким Анастасия</Text>
              <Text style={styles.counter1}>99</Text>
              <WithLocalSvg asset={require('../../../assests/images/firsreiting.svg')} />
            </View>
            <View style={styles.svg3}>
              <Text  style={styles.label}>Ким Анастасия</Text>
              <Text style={styles.counter}>99</Text>
              <WithLocalSvg asset={require('../../../assests/images/threeplace.svg')} />
            </View>
          </View>
        </View>
        <ReitingCard/>
      </View>
    </LGBackround>
  );
};

export default Reiting;

const {width, height}=Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '500',
  },
  flexContainer: {
    // flexDirection:'row',
    // justifyContent:'space-between',

  },
  containerCard: {
    marginTop: 80,
    marginHorizontal: 20,
    marginBottom:height/3.2,
  },
  svg: {
    position: 'absolute',
    bottom: -230,
  },
  svg2: {
    position: 'absolute',
    bottom: -230,
    alignSelf: 'center',
  },
  svg3: {
    position: 'absolute',
    bottom: -230,
    right: 0,
  },
  label:{
    color:'white',
    fontSize:14,
    textAlign: 'center',
    width:80,
    top:20
  },
  label1:{
    color:'white',
    fontSize:14,
    textAlign: 'center',
    top:20

   
  },
  counter:{
    color:COLORS.LADY_GYB_BACKGROUND,
    fontSize:14,
    textAlign: 'center',
    zIndex:9,
   top: 80,
   fontWeight:'bold',
  },
  counter1:{
    color:COLORS.LADY_GYB_BACKGROUND,
    fontSize:14,
    textAlign: 'center',
    zIndex:9,
   top: 100,
   fontWeight:'bold',
  }
});
