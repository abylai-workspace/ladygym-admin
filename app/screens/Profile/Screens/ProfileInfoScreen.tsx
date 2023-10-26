import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import PersonalInfo from '../components/PersonalInfo';
import LGBackround from 'components/blocks/LGBackround/LGBackround';
import Header from 'components/headers/Header';
import CButton from 'components/blocks/Buttons/CButton';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {instance} from 'utils/axios';
import {storageReadItem} from 'utils/asyncStorage';
import {ROLE, TOKEN_KEY} from 'constants/constants';

interface UserInfoProps {
  values: Record<string, string | boolean>;
  errors: any;
  touched: any;
  onChange: any;
  onBlur: any;
}

const ProfileInfoScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState<any>({});
  const [userData, setUserData] = useState({
    id: '',
    firstName: '',
    fieldOfActivity: '',
    email: '',
    phoneNumber: '',
  });

  const [token, setToken] = useState('');

  storageReadItem(TOKEN_KEY, ROLE).then(token => {
    setToken(token);
  });


  const getUserInfo = useCallback(async () => {
    try {
      const response = await instance
        .get('/gym/user/info', {
          headers: {
            Authorization: `Bearer ${await token}`,
          },
        })
        .then(res => {
          const data = res.data;
          setUserData({
            id: data.id || '',
            firstName: data.firstName+''+data.lastName|| '',
            fieldOfActivity: data.fieldOfActivity || '',
            email: data.email || '',
            phoneNumber: data.phoneNumber || ''
          });
          setUserData(res?.data);
        });
        return response
    } catch (error) {
      console.error(error);
    }
  }, [token]);
  useEffect(() => {
    getUserInfo();
  }, [token]);

  const handleInputChange = (name, value) => {
    setUserData({...userData, [name]: value});
  };
  const onSave = async () => {
    const data = {
      firstName: userData.firstName,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      password: userData.fieldOfActivity,
    };
   
    try {
      const response = await instance.post(`/gym/user/edit/${userData.id}`, data,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
      
        navigation.goBack();
      }
      return response
    } catch (error) {}
  };

  console.log(userData, 'data');
  return (
    <LGBackround>
      <Header centerTitle="Личные данные" onBackPress={() => navigation.goBack()} title="" />
      <View style={styles.userInfo}>
        <PersonalInfo
          label="ФИО"
          placeholder="Иванов Иван Иванович"
          value={userData.firstName}
          onPress={e => handleInputChange('firstName', e)}
          rightIcon={false}
          style={{}}
          keyBoardType="default"
        />
        <PersonalInfo
          label="Email"
          placeholder="Email"
          rightIcon={true}
          value={userData.email}
          onPress={e => handleInputChange('email', e)}
          style={{}}
          keyBoardType="default"
        />
        <PersonalInfo
          label="Номер телефона"
          placeholder="+7 999 999 99 99"
          rightIcon={true}
          value={userData?.phoneNumber}
          onPress={e => handleInputChange('phoneNumber', e)}
          style={{}}
          keyBoardType="numeric"
        />
      </View>
      <View style={styles.userInfo1}>
        <PersonalInfo
          label="Сфера деятельности"
          placeholder={userData?.fieldOfActivity}
          rightIcon={true}
          value={userData?.fieldOfActivity}
          onPress={e => handleInputChange('fieldOfActivity', e)}
          style={{marginTop: 0}}
          keyBoardType="default"
        />
      </View>
      <Text style={{color: '#fff', marginHorizontal: 30, marginTop: 20}}>Противопоказания</Text>
      <View style={styles.userInfo2}>
        <TextInput placeholder="Противопоказания" placeholderTextColor={'gray'} />
      </View>
      <View style={styles.butttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onSave}>
          <Text style={styles.buttonLabel}>Отправить</Text>
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
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  userInfo2: {
    backgroundColor: 'rgba(33, 33, 34, 1)',
    marginHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
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
    bottom: 50,
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
    width:80
  },
});
export default ProfileInfoScreen;
