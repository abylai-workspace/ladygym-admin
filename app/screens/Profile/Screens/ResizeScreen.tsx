import {View, Text, Dimensions, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import PersonalInfo from '../components/PersonalInfo';
import Header from 'components/headers/Header';
import LGBackround from 'components/blocks/LGBackround/LGBackround';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {instance} from 'utils/axios';
import {storageReadItem} from 'utils/asyncStorage';
import {ROLE, SCREENS, TOKEN_KEY} from 'constants/constants';
import RNPickerSelect from 'react-native-picker-select';

const goalTypes = {
  WEIGHT_LOSS: 'Сброс веса',
  HEALTH_MAINTENANCE: 'Поддержание здоровья',
  KEEPING_FIT: 'Поддержка физической формы',
  MUSCLE_MASS: 'Набор мышечной массы',
};
const activityLevelOptions = [
  {label: 'Сброс веса', value: 'WEIGHT_LOSS'},
  {label: 'Поддержание здоровья', value: 'HEALTH_MAINTENANCE'},
  {label: 'Поддержка физической формы', value: 'KEEPING_FIT'},
  {label: 'Набор мышечной массы', value: 'MUSCLE_MASS'},
];
const ResizeScreen = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState('');
  storageReadItem(TOKEN_KEY, ROLE).then(token => {
    setToken(token);
  });
  const [userData, setUserData] = useState({
    id: '',
    height: '',
    weight: '',
    bust: '',
    waist: '',
    hipGirth: '',
    goalType: '',
  });
  const getGoalType = userData?.goalType;
  const getGoalText = day => {
    return goalTypes[day] || day; // If the day is not found in the mapping, return the original day
  };

  const daysOfWeekText = getGoalText(getGoalType);
  const [selectedText, setSelectedText] = useState('');
  const [visibleGoal, setVisibleGoal] = useState(true);
 

  const getUserInfo = useCallback(async () => {
    try {
      const response = await instance
        .get('/gym/user/info', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          const data = res?.data;
          setUserData({
            id: data?.id || '',
            height: data?.height || '',
            weight: data?.weight || '',
            bust: data?.bust || '',
            waist: data?.waist || '',
            hipGirth: data?.hipGirth || '',
            goalType: data?.goalType || '',
          });
        });
      return response;
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  useEffect(() => {
    getUserInfo();
  }, [token]);
  const postData = async () => {
    const requestData={
        height:userData.height,
        weight:userData.weight,
        bust:userData.bust,
        waist:userData.waist,
        hipGirth:userData.hipGirth,
        goalType:selectedText
    }
    console.log(requestData)
    console.log(selectedText)
    try {
      const response= await instance.post('/gym/user/body/info',{
        ...requestData
      },{
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }).then(res=>{
        console.log(res?.data)
        Alert.alert(res?.data?.message)
        navigation.goBack()
      })
      return response
   
    } catch (error) {
      console.error(error)
    }
  };
  const handleSelectChange = useCallback((value) => {
    setSelectedText(value);
  },[])

  const handleInputChange = (name, value) => {
    setUserData({...userData, [name]: value});
  };
  console.log(selectedText)
  return (
    <LGBackround>
      <Header centerTitle="Замеры " onBackPress={() => navigation.goBack()} title="" />
      <View style={styles.userInfo}>
        <PersonalInfo
          label="Рост "
          placeholder="163 см"
          rightIcon={true}
          value={userData.height?.toString()}
          onPress={e => handleInputChange('height', e)}
          style={{}}
          keyBoardType="numeric"
        />
        <PersonalInfo
          label="Вес "
          placeholder="52 кг"
          rightIcon={true}
          value={userData.weight?.toString()}
          onPress={e => handleInputChange('weight', e)}
          style={{}}
          keyBoardType="numeric"
        />
      </View>
      <Text style={{color: '#fff', marginHorizontal: 30, marginTop: 20}}>Замеры тела</Text>
      <View style={styles.userInfo1}>
        <PersonalInfo
          label="Обхват груди "
          placeholder="90"
          rightIcon={true}
          value={userData.bust.toString()}
          onPress={e => handleInputChange('bust', e)}
          style={{marginTop: 0}}
          keyBoardType="numeric"
        />
        <PersonalInfo
          label="Обхват талии "
          placeholder="90"
          rightIcon={true}
          value={userData.waist.toString()}
          onPress={e => handleInputChange('waist', e)}
          style={{marginTop: 0}}
          keyBoardType="numeric"
        />
        <PersonalInfo
          label="Обхват бедер "
          placeholder="90"
          rightIcon={true}
          value={userData.hipGirth.toString()}
          onPress={text => {
            handleInputChange('hipGirth', text);
          }}
          style={{marginTop: 0}}
          keyBoardType="numeric"
        />
      </View>
      {visibleGoal ?(
         <View style={styles.userInfo1}>
             <TouchableOpacity
            onPress={() => {
              setVisibleGoal(false);
            }}>
            <PersonalInfo
              label="Цель"
              placeholder="Сброс веса"
              onPress={() => {}}
              rightIcon={true}
              value={daysOfWeekText}
              style={{marginTop: 0}}
              keyBoardType="default"
            />
          </TouchableOpacity>
         </View>
      ):(
        <>
         <View style={{flexDirection:'row',justifyContent:'space-around', backgroundColor: 'rgba(33, 33, 34, 1)',marginHorizontal:30,marginTop:10,borderRadius:10}}>
            <Text style={{
                color: '#fff',
                marginTop:10,marginLeft:-30
            }}>Цель</Text>
            <RNPickerSelect
              style={pickerSelectStyles}
              placeholder={{label: 'Ваш образ жизни', value: null}}
              onValueChange={(value: any) => {
                handleSelectChange(value);
              }}
              items={activityLevelOptions}
              value={selectedText}
              useNativeAndroidPickerStyle={false}
            />
          </View>
        </>
      )}
      {/* <View style={styles.userInfo1}>
        {visibleGoal ? (
          <TouchableOpacity
            onPress={() => {
              setVisibleGoal(false);
            }}>
            <PersonalInfo
              label="Цель"
              placeholder="Сброс веса"
              onPress={() => {}}
              rightIcon={true}
              value={daysOfWeekText}
              style={{marginTop: 0}}
              keyBoardType="default"
            />
          </TouchableOpacity>
        ) : (
          <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            <Text>Цель</Text>
            <RNPickerSelect
              style={pickerSelectStyles}
              placeholder={{label: 'Ваш образ жизни', value: null}}
              onValueChange={(value: any) => {
                handleSelectChange(value);
                setVisibleGoal(true);
              }}
              items={activityLevelOptions}
              value={daysOfWeekText}
              useNativeAndroidPickerStyle={false}
            />
          </View>
        )}
      </View> */}

      <Text style={{color: '#fff', marginHorizontal: 35, marginTop: 20, marginBottom: 10}}>
        Расчеты
      </Text>
      <View style={styles.userInfo3}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.cardContainer}>
            <Text style={styles.label}>ИМТ</Text>
            <TouchableOpacity
              style={{paddingHorizontal: 5, paddingLeft: 25}}
              onPress={() => navigation.navigate(SCREENS.PROFILE_BODYMASSINDEX as never)}>
              <View
                style={{backgroundColor: 'rgba(207, 84, 144, 1)', padding: 10, borderRadius: 15}}>
                <Feather name="arrow-right" size={14} color="white" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContainer}>
            <View>
              <Text style={styles.label}>КБЖУ</Text>
            </View>
            <TouchableOpacity
              style={{paddingHorizontal: 5, paddingLeft: 25}}
              onPress={() => navigation.navigate(SCREENS.PROFILE_KBZU as never)}>
              <View
                style={{backgroundColor: 'rgba(207, 84, 144, 1)', padding: 10, borderRadius: 15}}>
                <Feather name="arrow-right" size={14} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.cardContainer2}>
          <View>
            <Text style={styles.label}>Фотографии ДО/ПОСЛЕ</Text>
          </View>
          <TouchableOpacity
            style={{backgroundColor: 'rgba(207, 84, 144, 1)', padding: 10, borderRadius: 15}}
            onPress={() => navigation.navigate(SCREENS.PROFILE_IMAGES as never)}>
            <Feather name="arrow-right" size={14} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.butttonContainer}>
        <TouchableOpacity style={styles.button} onPress={postData}>
          <Text style={styles.buttonLabel}>Сохранить</Text>
        </TouchableOpacity>
      </View>
    </LGBackround>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    backgroundColor: 'rgba(33, 33, 34, 1)',
    marginHorizontal: 30,
    borderRadius: 10,
    // paddingHorizontal:10
  },
  userInfo1: {
    backgroundColor: 'rgba(33, 33, 34, 1)',
    marginHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  userInfo3: {
    marginHorizontal: 30,
  },

  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: 'white',
  },
  butttonContainer: {
    marginHorizontal: 30,
    position: 'absolute',
    bottom: 20,
  },
  button: {
    backgroundColor: 'rgba(207, 84, 144, 1)',
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: Dimensions.get('window').width / 3.5,
  },
  buttonLabel: {
    color: 'white',
    textAlign: 'center',
  },
  cardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    //   paddingHorizontal:Dimensions.get('window').width/9.6,
    padding: 15,
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
  },
  cardContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 8,
    padding: 15,
    borderRadius: 10,

    alignItems: 'center',
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 12,
    paddingVertical: 12,
    paddingHorizontal: 0,
    textAlign: 'right',
    //   borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: '#fff',
    marginBottom: 15,
    backgroundColor: 'rgba(33, 33, 34, 1)',
  },
  inputAndroid: {
    fontSize: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    //   borderWidth: 1,
    zIndex: 999,
    borderColor: 'gray',
    borderRadius: 8,
    color: '#fff',
    marginBottom: 15,
    width: '100%',
    backgroundColor: 'rgba(33, 33, 34, 1)',
  },
});
export default ResizeScreen;
