import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {instance} from 'utils/axios';
import {REFRESH_TOKEN_KEY, ROLE, TOKEN_KEY} from 'constants/constants';
import {storageDeleteItem, storageReadItem} from 'utils/asyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import RNRestart from 'react-native-restart';
import {useAppDispatch} from 'store/store';
import {logout} from 'store/actions/auth';
interface userProps {
  onLogout?: () => void;
}

const Header = ({onLogout}: userProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [data, setData] = useState<any>([]);
  const [tokenStorage, setToken] = useState('');
  const [userRole, setRole] = useState('');
  storageReadItem(TOKEN_KEY, ROLE).then(token => {
    setToken(token);
  });
  storageReadItem(ROLE, TOKEN_KEY).then(token => {
    setRole(token);
  });
  useEffect(() => {
    getUserData();
  }, [tokenStorage, data]);
  const getUserData = useCallback(async () => {
    try {
      const response = await instance
        .get('/gym/user/info', {
          headers: {
            Authorization: `Bearer ${tokenStorage}`,
          },
        })
        .then(res => {
          setData(res.data);
        });

      return response;
    } catch (error) {
      console.error(error);
    }
  }, []);

  const logoutPress = async () => {
    dispatch(logout());
  };
  return (
    <View style={styles.container}>
      <View style={styles.logocontainer}>
        <Image source={require('../../../assests/images/logoqr.png')} style={styles.image} />
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 40,
            top: 10,
          }}
          onPress={logoutPress}>
          <Ionicons name="exit-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={{alignContent: 'center', alignSelf: 'center'}}>
        <Text style={styles.userName}>
          {data?.firstName}
          {'\n'}
          {data?.lastName}
        </Text>
        {userRole === 'ADMIN' && (
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={{color: '#fff'}}>{'Админ'}</Text>
          </TouchableOpacity>
        )}
        {userRole === 'TRAINER' && (
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={{color: '#fff'}}>{'Тренер'}</Text>
          </TouchableOpacity>
        )}
        {userRole === 'USER' && (
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={{color: '#fff'}}>{'Постоянный '}</Text>
          </TouchableOpacity>
        )}
        {userRole === 'TOP' && (
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={{color: '#fff'}}>{'TOP'}</Text>
          </TouchableOpacity>
        )}
        {userRole === 'MANAGER' && (
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={{color: '#fff'}}>{'Управляющий'}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    marginTop: -60,
    height: '100%',
  },
  logocontainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    marginTop: 0,
  },
  image: {
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    marginTop: -40,
  },
  userName: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    backgroundColor: 'rgba(148, 60, 103, 1)',
    padding: 10,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    borderRadius: 40,
    marginLeft: 30,
    marginTop: 20,
  },
  line: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    height: 1,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
  },
});
export default Header;
