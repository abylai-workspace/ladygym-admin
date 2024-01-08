import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import LGBackround from 'components/blocks/LGBackround/LGBackround';
import Input from './Input';
import HeaderTitle from 'screens/HomeScreen/components/HeaderTitle';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from 'components/blocks/Buttons/SmallPrimaryButton';
import {instance} from 'utils/axios';
import {storageReadItem} from 'utils/asyncStorage';
import {ROLE, SCREENS, TOKEN_KEY} from 'constants/constants';

const PersonalDeitails = ({route}) => {
  const navigation = useNavigation();
  const personal = route.params?.personal;
  const [token, setToken] = useState('');

  storageReadItem(TOKEN_KEY, ROLE).then(token => {
    setToken(token);
  });

  const [userData, setUserData] = useState({
    id: personal?.id,
    firstName: personal?.firstName,
    lastName: personal?.lastName,
    email: personal?.email,
    phoneNumber: personal?.phoneNumber,
    password: personal?.password,
    role: personal?.role,
  });

  const handleInputChange = (name, value) => {
    setUserData({...userData, [name]: value});
  };

  const onSave = async () => {
    const data = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      password: userData.password,
    };
    try {
      const response = await instance.post(
        `/gym/user/edit/${userData.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        navigation.goBack();
      }
      return response;
    } catch (error) {}
  };

  const acceptDelete = () => {
    Alert.alert('Подтвердите удаление', 'Вы уверены, что хотите удалить?', [
      {
        text: 'Нет',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'Да',
        onPress: () => deletePersonal(),
      },
    ]);
  };
  const deletePersonal = async () => {
    try {
      const response = await instance.delete(
        `/gym/user/delete/${userData.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        navigation.goBack();
      }
      return response;
    } catch (error) {}
  };
  console.log(personal);
  return (
    <LGBackround>
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <HeaderTitle
            title="Персональные данные"
            styles={{marginTop: 10}}
            onPress={() => navigation.goBack()}
          />

          <ScrollView style={styles.container}>
            <Input
              placeholder="Имя"
              label="Имя"
              value={userData.firstName}
              onPress={e => handleInputChange('firstName', e)}
            />
            <Input
              placeholder="Фамилия"
              label="Фамилия"
              value={userData.lastName}
              onPress={e => handleInputChange('lastName', e)}
            />
            {/* <Input
              placeholder="email"
              label="email"
              value={userData.email}
              onPress={e => handleInputChange('email', e)}
            /> */}
            <Input
              placeholder="Телефон"
              label="Телефон"
              value={userData?.phoneNumber}
              onPress={e => handleInputChange('phoneNumber', e)}
            />
            {/* <Input
              placeholder="Пароль"
              label="Пароль"
              icon={true}
              secureTextEntry={true}
              value={userData?.password}
              onPress={e => handleInputChange('password', e)}
            /> */}
            <Input
              label="Кем является"
              placeholder="Кем является"
              value={userData?.role}
              disabled={true}
              onPress={e => handleInputChange('role', e)}
            />
            {userData?.role === 'TRAINER' && (
              <TouchableOpacity
                style={styles.containerFlat}
                onPress={() =>
                  navigation.navigate(SCREENS.ADMIN_TRAINER_DETAILS, {
                    trainers: personal,
                  } as never)
                }>
                <Text
                  style={{color: '#fff', width: '90%', alignSelf: 'center'}}>
                  Информация о тренере
                </Text>
                <Feather name="chevron-right" size={30} color="gray" />
              </TouchableOpacity>
            )}
            <CustomButton
              variant="deleted"
              label="Удалить сотрудника"
              style={{marginTop: 10}}
              onPress={acceptDelete}
            />
            <CustomButton
              variant="fill"
              label="Сохранить"
              style={{marginTop: 10}}
              onPress={onSave}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LGBackround>
  );
};

export default PersonalDeitails;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  containerFlat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(33, 33, 34, 1)',
    padding: 10,
    borderRadius: 10,
  },
});
