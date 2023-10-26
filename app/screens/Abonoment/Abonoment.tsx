import React, {useEffect, useState} from 'react';
import LGBackround from 'components/blocks/LGBackround/LGBackround';
import Header from 'components/headers/Header';
import FlatList from 'components/blocks/FlatList/FlatList';
import {useNavigation} from '@react-navigation/native';
import AbonomentCard from './components/AbonomentCard';
import {ROLE, SCREENS, TOKEN_KEY} from 'constants/constants';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSubscripUser} from 'store/slices/subscripUser';
import {Alert, Text} from 'react-native';
import {instance} from 'utils/axios';
import { storageReadItem } from 'utils/asyncStorage';

const Abonoment = () => {
  const tokenStorage = useSelector((state: any) => state.auth.token);
  const [data, setData] = useState([]);
  const [token,setToken]=useState('')
  const [day, setDays] = useState(0);
  const [daysDifference, setDaysDifference] = useState(0);
  // console.log(tokenStorage, 'tokenStorage');
  storageReadItem(TOKEN_KEY,ROLE).then((token)=>{
    setToken(token)
  })
  useEffect(() => {
    if (!token) return;
    instance
      .get('/gym/subscriptions/users', {headers: {Authorization: `Bearer ${token}`}})
      .then(resp => {
        setData(resp.data);
      })
      .catch(err => console.log(err.response));
  }, [token]);
  const createdAtDate: any = new Date(data[0]?.createdAt);
  const expirationDateDate: any = new Date(data[0]?.expirationDate);

  useEffect(() => {
    // Calculate the difference in milliseconds
    const timeDifference = expirationDateDate - createdAtDate;
    // Calculate the number of days difference
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    setDays(days);
    
  }, [data]);

  const navigation = useNavigation();

  const handleSliderChange = value => {
    // Assuming the slider value is in the range 0 to 100 (adjust as needed)
    const percentage = value / 100;

    // Calculate the date difference based on the percentage
    const differenceInMillis = (expirationDateDate - createdAtDate) * percentage;
    console;
    // Calculate the new date
    const newDateInMillis = createdAtDate + expirationDateDate;
    console.log(newDateInMillis);
    // Update the createdAt date
    // setCreatedAt(new Date(newDateInMillis).toISOString());
    setDaysDifference(newDateInMillis);
  };
  //

  const goActiveAbonoment = ()=>{
    if(data[0].paid === true){
      navigation.navigate(SCREENS.ABONOMENT_ACTIVATE as never)
    }else{
      Alert.alert('Напишите админу')
    }
  }
  const goToPromoCode = ()=>{
    if(data[0].paid ===false){
      navigation.navigate(SCREENS.PROMOCODE as never)
    }else{
      Alert.alert('Абономент не активирован!')
    }
  }
  console.log(data, 'data');
  return (
    <LGBackround>
      <Header title="Абонемент" />
        <AbonomentCard
          data={data}
        />
      {data.length < 1 && (
        <FlatList
          icon={require('../../assests/images/Gym.png')}
          title={'Купить абонемент'}
          onPress={() => navigation.navigate(SCREENS.ABONEMENT_FILIAL as never)}
        />
      )}
      { data.length >1 && (
        <FlatList
          icon={require('../../assests/images/active.png')}
          title={'Активация абонемента'}
          onPress={goActiveAbonoment}
        />
      )}
      {data.length > 1 && (
        <FlatList
          icon={require('../../assests/images/profile.png')}
          title={'Выбор тренера и услуг'}
          onPress={() => navigation.navigate(SCREENS.ABONOMENT_TRAINER_USLUGA as never)}
        />
      )}
      {data.length > 1  && (
        <FlatList
          icon={require('../../assests/images/promocode.png')}
          title={'Промокод'}
          onPress={goToPromoCode}
        />
      )}
      <FlatList
        icon={require('../../assests/images/support.png')}
        title={'Служба поддержки'}
        onPress={() => {}}
      />
    </LGBackround>
  );
};

export default Abonoment;
