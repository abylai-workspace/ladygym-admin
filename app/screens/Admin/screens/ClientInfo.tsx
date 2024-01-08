import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LGBackround from 'components/blocks/LGBackround/LGBackround';
import HeaderTitle from 'screens/HomeScreen/components/HeaderTitle';
import AbonomentCard from '../components/AbonomentCard';
import Input from '../components/Input';

import Feather from 'react-native-vector-icons/Feather';
import {COLORS} from 'utils/colors';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {SCREENS} from 'constants/constants';
import CustomButton from 'components/blocks/Buttons/SmallPrimaryButton';

const ClientInfo = ({route}) => {
  const userRole = useSelector((state: any) => state?.authSlice?.tokens?.role);
  const [day, setDays] = useState(0);

  const navigation = useNavigation();
  const info = route.params?.clients;
  const createdAt: any = new Date(info.createdAt);
  const expirationDate: any = new Date(info?.subscription?.expirationDate);

  useEffect(() => {
    // Calculate the difference in milliseconds
    const timeDifference = expirationDate - createdAt;
    // Calculate the number of days difference
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    setDays(days);
  }, [day]);

  console.log(userRole);

  return (
    <LGBackround>
      <HeaderTitle title="О клиенте" styles={{marginTop: 10}} onPress={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={{
          marginBottom: 100,
        }}>
        <View style={styles.container}>
          <Text style={styles.headerTitle}>
            {info?.firstName} {info?.lastName}
          </Text>
          <AbonomentCard
            days={day}
            name={info?.subscriptionType?.name ? info?.subscriptionType?.name : 'Не выбран'}
            type={info?.subscriptionAdditionalType}
          />
          <Text style={styles.headerSubTitle}>Активация</Text>
          <Input
            placeholder={'Абонемент активирован '}
            value={info?.paid == true ? 'Абонемент активирован' : 'Абонемент не активирован'}
            onChangeText={() => {}}
          />
          <Text style={styles.headerSubTitle}>Заморозка</Text>
          <Input
            placeholder={'Абонемент заморожен до 02.07.2023 '}
            value={'Заморозка'}
            onChangeText={() => {}}
          />
          {userRole === 'TRAINER' && (
            <>
              <Text style={styles.headerSubTitle}>Цель</Text>
              <Input
                placeholder={'Абонемент заморожен до 02.07.2023 '}
                value={'Сброс веса'}
                onChangeText={() => {}}
              />
              <Text style={styles.headerSubTitle}>Противопоказания</Text>
              <Input
                placeholder={'Нагрузки на спину '}
                value={'Нагрузки на спину'}
                onChangeText={() => {}}
              />
            </>
          )}
          {userRole === 'TRAINER' && <></>}
          <Text style={styles.headerSubTitle}>Номер ключа</Text>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                ...styles.keyContainer,
                paddingHorizontal: 20,
                width: userRole === 'ADMIN' || userRole === 'MANAGER' ? '50%' : '100%',
              }}>
              <Text style={{color: '#fff'}}>{info?.gymKey}</Text>
            </View>
            {(userRole === 'ADMIN' || userRole === 'MANAGER') && (
              <View style={styles.keyContainer2}>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={{color: '#fff'}}>Выдать ключ</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Text style={styles.headerSubTitle}>Тренер</Text>
          <Input placeholder={'Тренер '} value={info?.trainerName} onChangeText={() => {}} />
          <View style={[styles.flex, {marginBottom: 20}]}>
            <Text style={{color: '#fff'}}>Документы</Text>
            <TouchableOpacity onPress={() => navigation.navigate(SCREENS.ADMIN_DOCUMENTS as never)}>
              <Feather name="chevron-right" style={styles.clickContainer} size={30} color="gray" />
            </TouchableOpacity>
          </View>
          {(userRole === 'MANAGER' || userRole === 'TOP') && (
            <CustomButton
              variant="fill"
              label="Заморозить"
              onPress={() =>
                navigation.navigate(SCREENS.ADMIN_FREEZE, {
                  subscriptionId: info?.subscription?.subscriptionType?.id as any,
                } as any)
              }
            />
          )}
          {/* {userRole === 'TOP' && (
            <CustomButton variant="fill" label="Подтвердить" onPress={() => {}} />
          )} */}
        </View>
      </ScrollView>
    </LGBackround>
  );
};

export default ClientInfo;

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
  headerSubTitle: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 10,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(33, 33, 34, 1)',
    paddingLeft: 20,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  clickContainer: {
    marginRight: 10,
  },
  keyContainer: {
    paddingHorizontal: 60,
    backgroundColor: 'rgba(33, 33, 34, 1)',
    borderRadius: 10,
    paddingVertical: 15,
  },
  keyContainer2: {
    paddingHorizontal: 30,
    backgroundColor: COLORS.LADY_GYB_BACKGROUND,
    borderRadius: 10,
    paddingVertical: 15,
  },
});
