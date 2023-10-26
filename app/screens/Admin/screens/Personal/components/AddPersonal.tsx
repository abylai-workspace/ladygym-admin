import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import LGBackround from 'components/blocks/LGBackround/LGBackround';
import HeaderTitle from 'screens/HomeScreen/components/HeaderTitle';
import Feather from 'react-native-vector-icons/Feather';
import Input from './Input';
import {SelectList} from 'react-native-dropdown-select-list';
import {Dropdown} from 'react-native-element-dropdown';
import CustomButton from 'components/blocks/Buttons/SmallPrimaryButton';
import {storageReadItem} from 'utils/asyncStorage';
import {ROLE, TOKEN_KEY} from 'constants/constants';
import {createUserAndPersonal, gymManageAll} from 'utils/axios';
import RNPickerSelect from 'react-native-picker-select';
import {useNavigation} from '@react-navigation/native';

const AddPersonal = () => {
  const navigation = useNavigation();
  const [gymData, setGymData] = React.useState([]);
  const [selectedGymData, setSelectedGym] = React.useState('');
  const [token, setToken] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    phoneNumber: '',
    role: 'user',
    email: '',
    gymId: '',
  });

  storageReadItem(TOKEN_KEY, ROLE).then(token => {
    setToken(token);
  });
  const data = [
    {key: '1', value: 'USER '},
    {key: '2', value: 'ADMIN '},
    {key: '3', value: 'TOP '},
    {key: '4', value: 'TRAINER '},
  ];

  const getGyms = useCallback(async () => {
    try {
      const response = await gymManageAll()?.then(res => {
        const gym = Object.keys(res?.data[0]?.gyms);

        const gymsArray = [];
        for (let i = 0; i < gym.length; i++) {
          gymsArray?.push({
            id: res?.data[0]?.gyms[i]?.id,
            name: res?.data[0]?.gyms[i]?.name,
          });
        }
        setGymData(gymsArray);
      });
      return response;
    } catch (error) {}
  }, []);
  useEffect(() => {
    getGyms();
  }, []);

  const handleInputChange = (name, value) => {
    setFormData({...formData, [name]: value});
  };

  const handleSelectChange = event => {
    setFormData({...formData, role: event});
    setSelectedGym(event);
  };
  const handleSelecetGyms = value => {
    setFormData({...formData, gymId: value});
    setSelectedGym(value);
  };
  const createUser = useCallback(async () => {
    console.log(formData);
    try {
      const response = await createUserAndPersonal(token, formData);
      if (response.status === 200) {
        Alert.alert('Сотрудник добавлен');
        navigation.goBack();
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, [token, formData]);

  console.log(formData);
  return (
    <LGBackround>
      <HeaderTitle styles={{marginTop: 10}} onPress={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.headerTitle}>Новый сотрудник</Text>
          <Text style={styles.headerSubTitle}>Добавить нового сотрудника</Text>
          <Input
            placeholder={'Имя'}
            label="Имя"
            onPress={value => handleInputChange('firstName', value)}
            value={formData.firstName}
          />
          <Input
            placeholder={'Фамилия'}
            label="Фамилия"
            onPress={value => handleInputChange('lastName', value)}
            value={formData.lastName}
          />
          <Input
            placeholder="email"
            label="email"
            onPress={value => handleInputChange('email', value)}
            value={formData.email}
          />
          <Input
            placeholder="Телефон"
            label="Телефон"
            onPress={value => handleInputChange('phoneNumber', value)}
            value={formData.phoneNumber}
          />
          <Input
            placeholder="Пароль"
            label="Пароль"
            icon={true}
            secureTextEntry={true}
            onPress={value => handleInputChange('password', value)}
            value={formData.password}
          />
          <Text style={{color: '#fff', marginTop: 10, marginBottom: 10}}>
            Выберите роль сотрудника
          </Text>
          <SelectList
            setSelected={val => handleSelectChange(val)}
            data={data}
            save="value"
            boxStyles={{backgroundColor: 'rgba(33, 33, 34, 1)', width: '100%'}}
            dropdownStyles={{backgroundColor: 'rgba(33, 33, 34, 1)'}}
            dropdownItemStyles={{backgroundColor: 'rgba(33, 33, 34, 1)'}}
            inputStyles={{color: '#fff'}}
            dropdownTextStyles={{color: '#fff'}}
            arrowicon={<Feather name="chevron-down" size={20} color="white" />}
            placeholder="Выберите роль сотрудника"
            notFoundText="Роли не найдены"
          />
          <Text style={{color: '#fff', marginTop: 10, marginBottom: 10}}>
            Выберите роль сотрудника {selectedGymData?.label}
          </Text>
          <RNPickerSelect
            placeholder={{label: 'Выберите адрес', value: null}}
            items={gymData.map(item => ({label: item.name, value: item?.id}))}
            onValueChange={value => {
              handleSelecetGyms(value);
            }}
            style={pickerSelectStyles}
            value={selectedGymData}
            useNativeAndroidPickerStyle={false}
          />
          <CustomButton
            variant="fill"
            label={'Добавить'}
            onPress={createUser}
            style={{marginTop: 20}}
          />
        </View>
      </ScrollView>
    </LGBackround>
  );
};

export default AddPersonal;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  headerSubTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
    backgroundColor: 'rgba(33, 33, 34, 1)',
    color: '#fff',
  },
  containerRender: {
    paddingHorizontal: 10,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    borderBottomWidth: 1,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: '#fff',
    paddingRight: 30,
    backgroundColor: 'rgba(33, 33, 34, 1)',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: '#fff',
    paddingRight: 30,

    backgroundColor: 'rgba(33, 33, 34, 1)',
  },
});
