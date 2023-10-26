import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, { useState } from 'react';
import ModalBottom from '../GymInformation/ModalBottom';
import HeaderTitle from '../HeaderTitle';
import {WithLocalSvg} from 'react-native-svg';
import StarRating from 'components/blocks/StarRating/StarRating';

interface Props {
  isModalVisible: boolean;
  toggleModal: () => void;
  goBack: () => void;
  trainerInfo:any
}

const Trainnformation = ({isModalVisible, toggleModal,goBack,trainerInfo}: Props) => {
   const [data,setData]=useState([
    {
      name:'Аида',

    },
])

const renderItem = ({ item }) => {
    return (
        <View style={styles.blockContainer}>
           
            <Text style={styles.name}>{item.name}</Text>
            <StarRating/>
            <Text style={styles.descFlat}>{item.decs}</Text>

        </View>
    )
}
  return (
    <ModalBottom isModalVisible={isModalVisible} toggleModal={toggleModal}>
      <View style={{marginHorizontal: 5}}>
        <HeaderTitle title={'Информация о тренере'} onPress={goBack} />
        <View style={styles.imageContainer}>
          <View style={styles.counterContainer}>
            <Text style={styles.counter}>99</Text>
          </View>
          <WithLocalSvg asset={require('../../../../assests/images/train5.svg')} />
        </View>
        <View style={styles.nameContainer}>
        {trainerInfo && <Text style={styles.name}>{trainerInfo.name ? trainerInfo.name : 'Артыкбай Аида'}</Text>}
          <StarRating stars={4} reviews={4.9} styles={{color: '#fff'}} />
        </View>
          {trainerInfo && <View >
          <Text style={styles.decs}>{trainerInfo.description}</Text>
          <Text style={styles.decs}>{trainerInfo.education}</Text>
          <Text style={styles.decs}>{trainerInfo.ranks}</Text>
          <Text style={styles.decs}>{trainerInfo.sportsAchievements}</Text>
        </View>}

        <View >
        <FlatList data={data} renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={true}
        horizontal
        style={{marginTop:20}}
         />
        </View>
      </View>
    </ModalBottom>
  );
};

const styles = StyleSheet.create({
  blockContainer:{
    marginHorizontal:5,
    padding:10,
    backgroundColor:'rgba(255, 255, 255, 0.1)',
    borderRadius:5,
    paddingRight:0,
    borderColor:'gray',
    borderWidth:0.2
},
descFlat:{
  width:200,
  color: '#fff',
  fontSize:12,
  marginTop:4
},
  decs:{
    color: '#fff',
    fontSize: 14,
    marginTop: 10,
  
  },
  imageContainer: {
    borderRadius: 10,
    backgroundColor: 'rgba(14, 14, 16, 0.6)',
    alignItems: 'center',
    marginTop: 0,
    borderColor: 'rgba(255, 255, 255, 1)',
    borderWidth: 0.2,
  },
  counterContainer: {
    position: 'absolute',
    right: 15,
    top: 15,
    backgroundColor: '#000',
    width: 30,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: '#fff',
    borderWidth: 0.5,
    height: 30,
  },
  counter: {
    color: '#fff',
    fontSize: 12,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});
export default Trainnformation;
