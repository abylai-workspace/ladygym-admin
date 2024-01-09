import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LGBackround from 'components/blocks/LGBackround/LGBackround';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS} from 'utils/colors';
import StarRating from 'components/blocks/StarRating/StarRating';
import Input from './Input';
import CustomButton from 'components/blocks/Buttons/SmallPrimaryButton';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from 'constants/constants';
const {width, height} = Dimensions.get('window');


const TrainersDeitails = ({route}) => {
  const navigation = useNavigation();
  const trainers = route.params?.trainers?.trainerDetails;

  console.log(trainers);

  const renderItem = ({item}: any) => (
    <View>
      <Text style={{width: 90, color: '#fff'}}>{item}</Text>
    </View>
  );
  return (
    <LGBackround>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Информация о тренере</Text>
          <TouchableOpacity>
            <Text style={styles.rightTitle}>Изменить</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{
            height: height / 1.2,
          }}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: `data:image/jpg;base64,${trainers?.avatarBase64}`}}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            <Text style={styles.name}>
              {trainers?.firstName} {trainers?.lastName}
            </Text>
            <StarRating
              stars={trainers?.rating}
              reviews={trainers?.rating}
              styles={{color: '#fff'}}
            />
          </View>
          <View style={styles.decsContainer}>
            <Text style={styles.decs}>{trainers?.description}</Text>
            <Text style={styles.decs}>Образование: {trainers?.education}</Text>
            <Text style={styles.decs}>Звания: {trainers?.ranks}</Text>
            <Text style={styles.decs}>Спортивные достижения: {trainers?.sportsAchievements}</Text>
          </View>
          {trainers?.daysOfWeek && (
            <View style={{marginTop: 10}}>
              <Text style={{color: '#fff'}}>Расписание</Text>
              <FlatList
                data={trainers?.daysOfWeek}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                style={styles.Flatcontainer}
              />
              <View style={styles.Flatcontainer}>
                <Text style={{color: '#FFF'}}>
                  {trainers?.workTimeFrom} - {trainers?.workTimeTo}
                </Text>
              </View>

              <CustomButton
                label="Изменить расписание"
                variant="fill"
                style={{marginTop: 10}}
                onPress={() => {
                  navigation.navigate(SCREENS.ADMIN_TRAINER_SCHEDULER_DETAILS, {
                    trainers: trainers,
                  });
                }}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </LGBackround>
  );
};

export default TrainersDeitails;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    textAlign: 'center',
    color: 'white',
  },
  rightTitle: {
    color: COLORS.LADY_GYB_BACKGROUND,
    fontSize: 13,
  },
  image: {
    width: 200,
    height: 300,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderColor: COLORS.LADY_GYB_BACKGROUND,
    borderWidth: 1,
    borderRadius: 10,
  },
  name: {
    color: COLORS.white,
    fontSize: 16,
    width: 200,
  },
  decsContainer: {
    backgroundColor: 'rgba(33, 33, 34, 1)',
    borderRadius: 10,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    padding: 10,
  },
  decs: {
    color: COLORS.white,
    marginVertical: 10,
  },
  textContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  Flatcontainer: {
    backgroundColor: 'rgba(33, 33, 34, 1)',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
});
