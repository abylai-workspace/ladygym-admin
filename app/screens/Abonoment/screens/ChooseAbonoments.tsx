import {StyleSheet, Text, TouchableOpacity, View,FlatList} from 'react-native';
import React, {useEffect} from 'react';
import LGBackround from 'components/blocks/LGBackround/LGBackround';
import Header from 'components/headers/Header';
import HeaderTitle from 'screens/HomeScreen/components/HeaderTitle';
import {useNavigation} from '@react-navigation/native';

import {useDispatch, useSelector} from 'react-redux';
import {fetchGymsSubscriptionsType} from 'store/slices/abonomentSubscriptTypeslice';

import Feather from 'react-native-vector-icons/Feather';

import {WithLocalSvg} from 'react-native-svg';
import { SCREENS } from 'constants/constants';
const ChooseAbonoments = ({route}) => {
  const dispatch = useDispatch();
  console.log(route.params)
  const {gymId,gymName}=route.params
 
  const gymsgetData = useSelector((state: any) => state?.gymssubscriptype);
  const status = useSelector((state: any) => state.gymssubscriptype.status);
  const error = useSelector((state: any) => state.gymssubscriptype.error);
  const {gymssubscriptype} = gymsgetData;
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGymsSubscriptionsType());
    }
  }, [dispatch, status]);
  if (status === 'loading') {
    return <Text>Loading...</Text>;
  } else if (status === 'failed') {
    return <Text>Error: {error}</Text>;
  }
  // console.log(gymssubscriptype, 'gyms');
  const navigation = useNavigation();

  const goTo = (item) => {
    navigation.navigate(SCREENS.ABONOMENT_BUY as never,{
      subscriptionTypeId:item.id,
      subscriptionTypeName:item.name,
      gymId:gymId,
      gymName:gymName,
    });
  }
  console.log(gymId,'s')
  const renderItem = ({item}) => {
    console.log(item);
    return (
      <>
        <View>
          <View style={styles.flatlistContainer} key={item.id}>
            <View style={styles.flexContainer}>
              <View style={styles.iconContainer}>
                <WithLocalSvg asset={require('../../../assests/images/sport1.svg')} />
              </View>
              <View>
                <Text style={styles.address}>{item.name} </Text>
                <Text style={styles.addresssum}>от {item.sum} </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.clickContainer} onPress={()=>goTo(item)}>
              <Feather name="chevron-right" size={30} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };
  return (
    <LGBackround>
      <View style={styles.container}>
        <HeaderTitle title="Выберите абонемент" onPress={() => navigation.goBack()} />
        <FlatList data={gymssubscriptype} keyExtractor={item => item.id.toString()} renderItem={renderItem} />
      </View>
    </LGBackround>
  );
};

export default ChooseAbonoments;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 0,
    marginVertical: 20,
  },
  flatlistContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    zIndex: 999,
    marginRight: 20,
    marginBottom: 10,
    padding: 10,
    paddingVertical: 15,
    borderRadius: 15,
    borderColor: 'white',
    // borderWidth:0.1,
  },

  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 30,
    alignContent: 'center',

    alignItems: 'center',
    alignSelf: 'center',
  },
  icontext: {
    color: 'white',
    alignContent: 'center',
    alignSelf: 'center',

    left: 15,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  address: {
    marginLeft: 15,
    color: '#fff',
  },
  addresssum: {
    marginLeft: 15,
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  clickContainer: {
    alignItems: 'center',
    alignSelf: 'center',
  },
});
