import {Dimensions, ScrollView, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import LGBackround from 'components/blocks/LGBackround/LGBackround';
import HeaderTitle from 'screens/HomeScreen/components/HeaderTitle';
import {useNavigation} from '@react-navigation/native';

import {instance} from 'utils/axios';
import {ROLE, TOKEN_KEY} from 'constants/constants';
import {storageReadItem} from 'utils/asyncStorage';
import CardFinance from './components/CardFinance';

const {height, width} = Dimensions.get('window');
const PlanFinance = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [token, setToken] = useState('');

  storageReadItem(TOKEN_KEY, ROLE).then(token => {
    setToken(token);
  });

  useEffect(() => {

    fetchData();
  }, [token,data]);

  const fetchData = useCallback(async () => {
    try {
      const response = await instance
        ?.get('/gym/financials/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          console.log(res?.data);
          setData(res?.data);
        });

      return response;
    } catch (error) {
      console.log(error);
    }
  }, [token]);
  return (
    <LGBackround>
      <HeaderTitle title="Финансовый план" styles={{marginTop: 10}} onPress={() => navigation.goBack()} />
     <ScrollView style={{
      height: height/1,
     }}>
     <CardFinance data={data} />

     </ScrollView>
    </LGBackround>
  );
};

export default PlanFinance;


