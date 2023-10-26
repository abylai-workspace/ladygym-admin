import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LGBackround from 'components/blocks/LGBackround/LGBackround';
import HeaderTitle from 'screens/HomeScreen/components/HeaderTitle';
import {WithLocalSvg} from 'react-native-svg';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from 'constants/constants';
const data = [
  {
    id: 1,
    image: require('../../../../../assests/images/sport1.svg'),
    title: 'Тренеры',
  },
  {
    id: 2,
    image: require('../../../../../assests/images/sport12.svg'),
    title: 'Админы',
  },
];
const ForWhyTask = () => {
  const navigation = useNavigation();

  const onPress = item => {
    console.log(item);
    navigation.navigate(SCREENS?.ADMIN_TASKSWORKCHOOSETRAINER, {
      personal: item as never,
    } as never);
  };
  const renderItem = ({item}) => {
    console.log(item);

    return (
      <>
        <TouchableOpacity style={styles.blockContainer} onPress={() => onPress(item?.id)}>
          <View style={{flexDirection: 'row'}}>
            <WithLocalSvg asset={item.image} />
            <Text style={styles.price}>{item.title}</Text>
          </View>
          <Feather name="chevron-right" size={30} color="gray" />
        </TouchableOpacity>
      </>
    );
  };
  return (
    <LGBackround>
      <HeaderTitle title="Для кого" styles={{marginTop: 10}} onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={true}
        />
      </View>
    </LGBackround>
  );
};

export default ForWhyTask;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  blockContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 4,
    padding: 10,
    borderRadius: 10,
    borderColor: 'rgba(255,255,255,0.4)',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
    alignSelf: 'center',
  },
});
