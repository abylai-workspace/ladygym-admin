import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import LGBackround from 'components/blocks/LGBackround/LGBackround';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGymsFilial} from 'store/slices/abonomentsFilial';
import {Text} from 'react-native';
import HeaderTitle from 'screens/HomeScreen/components/HeaderTitle';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SCREENS} from 'constants/constants';

const ChooseFil = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const gymsFilial = useSelector((state: []) => state.gymsfilial);
  const status = useSelector((state: boolean) => state.gymsfilial.status);
  const error = useSelector((state: string) => state.gymsfilial.error);
  const {gyms} = gymsFilial;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGymsFilial());
    }
  }, [dispatch, status]);
  if (status === 'loading') {
    return <Text>Loading...</Text>;
  } else if (status === 'failed') {
    return <Text>Error: {error}</Text>;
  }

  const goTo = item => {
    console.log('item', item);
    navigation.navigate(SCREENS.ABONEMENT_ABONOMENT_CHOOSE as never, {
      gymId: item.id,
      gymName: item.name,
    });
  };
  const renderItem = ({item}) => {
    return (
      <>
        <View>
          {item.gyms?.map((item: any, key) => (
            <View style={styles.flatlistContainer} key={key}>
              <View style={styles.flexContainer}>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons
                    name={'map-marker-radius-outline'}
                    size={24}
                    color="rgba(154, 71, 179, 1)"
                  />
                </View>
                <Text style={styles.address}>{item.address}</Text>
              </View>
              <TouchableOpacity style={styles.clickContainer} onPress={() => goTo(item)}>
                <Feather name="chevron-right" size={30} color="gray" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </>
    );
  };
  return (
    <LGBackround>
      <View style={styles.container}>
        <HeaderTitle title="Выберите филиал" onPress={() => navigation.goBack()} />
        <FlatList data={gyms} keyExtractor={item => item.id} renderItem={renderItem} />
      </View>
    </LGBackround>
  );
};

export default ChooseFil;

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
    borderRadius: 15,
    borderColor: 'white',
    // borderWidth:0.1,
  },

  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 30,
    alignContent: 'center',
    width: 40,
    height: 40,
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
    color: 'white',
  },
  clickContainer: {
    alignItems: 'center',
    alignSelf: 'center',
  },
});
