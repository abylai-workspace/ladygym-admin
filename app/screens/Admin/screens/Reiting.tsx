import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LGBackround from 'components/blocks/LGBackround/LGBackround';
import {WithLocalSvg} from 'react-native-svg';
import {COLORS} from 'utils/colors';
import ReitingCard from '../components/ReitingCard';
import {instance} from 'utils/axios';
import {storageReadItem} from 'utils/asyncStorage';
import {NORMAL_TOKEN_KEY} from 'constants/constants';

const Reiting = () => {
  const [ratingList, setRatingList] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    storageReadItem(NORMAL_TOKEN_KEY).then(token => {
      setToken(token);
    });
  }, []);

  const renderTrainers = ({item, index}) => {
    return (
      <View style={styles.containerRenderCard}>
        <View style={styles.flexDirection}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.countarContainer}>
              <Text style={styles.counterCard}>{index + 1}</Text>
            </View>
            <Text style={styles.client}>
              {item.firstName} {item.lastName}
            </Text>
          </View>
          <View>
            <Text style={styles.place}>{item.rating}</Text>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    instance.get(`/gym/trainer/ratings/1?sortOrder=desc`).then(res => setRatingList(res.data));
  }, []);

  return (
    <LGBackround>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Рейтинг</Text>
        <View style={styles.containerCard}>
          <View style={styles.flexContainer}>
            {ratingList[1] && (
              <View style={styles.svg}>
                <Text style={styles.label}>
                  {ratingList[1]?.firstName + ' ' + ratingList[1]?.lastName}
                </Text>
                <Text style={styles.counter}>{ratingList[1]?.rating}</Text>
                <WithLocalSvg asset={require('../../../assests/images/reitingtwo.svg')} />
              </View>
            )}

            <View style={styles.svg2}>
              <Text style={styles.label1}>
                {ratingList[0]?.firstName + ' ' + ratingList[0]?.lastName}
              </Text>
              <Text style={styles.counter1}>{ratingList[0]?.rating}</Text>
              <WithLocalSvg asset={require('../../../assests/images/firsreiting.svg')} />
            </View>
            {ratingList[2] && (
              <View style={styles.svg3}>
                <Text style={styles.label}>
                  {ratingList[2]?.firstName + ' ' + ratingList[2]?.lastName}
                </Text>
                <Text style={styles.counter}>{ratingList[2]?.rating}</Text>
                <WithLocalSvg asset={require('../../../assests/images/threeplace.svg')} />
              </View>
            )}
          </View>
        </View>
        <ReitingCard />

        <FlatList
          data={ratingList}
          renderItem={renderTrainers}
          keyExtractor={item => item?.id}
          key={item => item.id}
          style={{
            // marginBottom: 10,
            marginTop: 10,
          }}
        />
      </View>
    </LGBackround>
  );
};

export default Reiting;

const {width, height} = Dimensions.get('screen');
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
    marginBottom: height / 3.2,
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
  label: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    width: 80,
    top: 20,
  },
  label1: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    top: 20,
  },
  counter: {
    color: COLORS.LADY_GYB_BACKGROUND,
    fontSize: 14,
    textAlign: 'center',
    zIndex: 9,
    top: 80,
    fontWeight: 'bold',
  },
  counter1: {
    color: COLORS.LADY_GYB_BACKGROUND,
    fontSize: 14,
    textAlign: 'center',
    zIndex: 9,
    top: 100,
    fontWeight: 'bold',
  },
  color: {
    color: '#fff',
  },
  blockContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 10,

    alignItems: 'center',
  },
  clickContainer: {
    paddingLeft: 15,
  },

  containerRenderCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 5,
  },
  flexDirection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  countarContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 5,
    paddingHorizontal: 8,
    borderRadius: 50,
    // margin:
  },
  counterCard: {
    color: 'white',
  },
  client: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    marginLeft: 5,
    fontSize: 16,
  },
  place: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 18,
  },
});
