import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import LGBackround from 'components/blocks/LGBackround/LGBackround';
import HeaderTitle from 'screens/HomeScreen/components/HeaderTitle';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {getUserAndDocuments, instance} from 'utils/axios';
import {NORMAL_TOKEN_KEY, ROLE, TOKEN_KEY} from 'constants/constants';
import {storageReadItem} from 'utils/asyncStorage';
const Documents = () => {
  const navigation = useNavigation();
  const [userDpcuments, setUserDpcuments] = useState([]);

  const [token, setToken] = useState('');

  storageReadItem(NORMAL_TOKEN_KEY, ROLE).then(token => {
    setToken(token);
  });
  const getUserAndDocuments = useCallback(async () => {
    try {
      const response = await instance.get('/gym/user/info', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setUserDpcuments(response.data?.userFiles);
      return response;
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getUserAndDocuments();
  }, []);

  const renderClients = ({item}) => {
    return (
      <>
        <View style={styles.blockContainer}>
          <Text style={styles.color}>{item.name}</Text>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate(SCREENS.ADMIN_CLIENT_INFO, {
              //   clients: item as never,
              // } as never);
            }}>
            <Feather name="chevron-right" style={styles.clickContainer} size={30} color="gray" />
          </TouchableOpacity>
        </View>
      </>
    );
  };
  return (
    <LGBackround>
      <HeaderTitle title="Документы" styles={{marginTop: 10}} onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <Text>Documents</Text>
        <View style={styles.flex}>
          <Text style={{color: '#fff'}}>Документы</Text>
          <FlatList
            data={userDpcuments}
            renderItem={renderClients}
            keyExtractor={item => item?.id}
            key={item => item.id}
            style={{
              marginTop: 20,
              marginBottom: 70,
            }}
          />
        </View>
      </View>
    </LGBackround>
  );
};

export default Documents;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  color: {
    color: '#fff',
  },
  blockContainer: {
    marginHorizontal: 0,
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
});
