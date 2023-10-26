import {View, Text, StyleSheet} from 'react-native';
import React, { useState } from 'react';
import StarRating from 'components/blocks/StarRating/StarRating';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Carousels from './Carousel';


const IMAGES = {
    image1: require('../../../../assests/images/carousel.png'),
    image2: require('../../../../assests/images/carousel.png'),
    image3: require('../../../../assests/images/carousel.png'),
    image4: require('../../../../assests/images/carousel.png'),

  };
  
const AboutFitnes = ({gymInfo}: any) => {
    const [images, setImages] = useState([
        { id: '1', image: IMAGES.image1 },
        { id: '2', image: IMAGES.image2 },
        { id: '3', image: IMAGES.image3 },
        { id: '4', image: IMAGES.image4 },
       
      ]);

 if (gymInfo){
  return(
    <>
     <View style={styles.container}>
            <View style={styles.headerContainer}>
              <View>
                <Text style={styles.headerText}>О фитнес клубе</Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <MaterialCommunityIcons name="map-marker-radius" size={20} color="#7536EA" />
                <Text style={styles.subtitle}>{gymInfo.address}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <MaterialCommunityIcons name="clock-outline" size={20} color="#7536EA" />
                <Text style={styles.subtitle}>10:00 - 21:00</Text>
                </View>
              </View>
              <View style={{alignItems:'center',alignContent:'center',marginTop:7}}>
                <StarRating ratings={gymInfo.rating} reviews={4.9}  styles={styles.startext}/>
              </View>
            </View>
            <View style={{marginTop:20,marginHorizontal:20}} >
            <Carousels images={images}   />
            </View>
          </View>

    </>
  )
 }
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText:{
    fontSize: 20,
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '600',
  },
  startext:{
    color:'#fff'
  },
  subtitle:{
    fontSize: 10,
    color: '#fff',
    marginLeft:5
  },
  logo:{
    width:20,
    height:20,
    marginRight:10
  }
});
export default AboutFitnes;
