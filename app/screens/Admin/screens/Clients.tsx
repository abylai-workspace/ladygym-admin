import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import LGBackround from 'components/blocks/LGBackround/LGBackround';
import Header from 'components/headers/Header';
import TextInputWithIcon from '../components/TextInputWithIcon';
import {instance} from 'utils/axios';
import {storageReadItem} from 'utils/asyncStorage';
import {ROLE, SCREENS, TOKEN_KEY} from 'constants/constants';

import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
const Clients = () => {
  const navigation = useNavigation();
  const [client, setClients] = useState([]);
  const [query, setQuery] = useState('');
  const [token, setToken] = useState('');
  storageReadItem(TOKEN_KEY, ROLE).then(token => {
    setToken(token);
  });
  useEffect(() => {
    getClients();
  }, [token]);

  const getClients = useCallback(async () => {
    try {
      const response = await instance
        .get('/gym/subscriptions/manage/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          setClients(res.data);
        });

      return response;
    } catch (error) {}
  }, [token]);

  const filteredItems = client.filter(
    item =>
      item.user.firstName.toLowerCase().includes(query.toLowerCase()) &&
      item.user.lastName.toLowerCase().includes(query.toLowerCase()),
  );

  const renderClients = ({item}) => {
    // console.log(item.user)
    return (
      <>
        <View style={styles.blockContainer}>
          <Text style={styles.color}>
            {item.user.firstName} {item.user.lastName}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(SCREENS.ADMIN_CLIENT_INFO, {
                clients: item as never,
              } as never);
            }}>
            <Feather name="chevron-right" style={styles.clickContainer} size={30} color="gray" />
          </TouchableOpacity>
        </View>
      </>
    );
  };
  return (
    <LGBackround>
      <Header title="Клиенты" />
      <TextInputWithIcon
        value={query}
        onPress={setQuery}
        iconName="search" // Replace with the name of the icon you want to use
        iconSize={24}
        iconColor="gray"
        placeholder="Search"
      />
      <FlatList
        data={filteredItems}
        renderItem={renderClients}
        keyExtractor={item => item?.id}
        key={item => item.id}
        style={{
          marginBottom: 70,
        }}
      />
    </LGBackround>
  );
};

export default Clients;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
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
});
