import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { styles } from './style'
import QRCode from 'react-native-qrcode-svg';
import { instance } from 'utils/axios';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ROLE, TOKEN_KEY } from 'constants/constants';
import { storageReadItem } from 'utils/asyncStorage';

const Visit = () => {
  const [id,setId]=useState('')
  const [token,setToken]=useState('')
  storageReadItem(TOKEN_KEY,ROLE).then((token)=>{
    setToken(token)
  })
  useEffect(()=>{
    getToken()
  },[token,id])
  const getToken = useCallback(async () => {
    try {
      const response = await instance.get('/gym/user/info', {
        headers: {
          Authorization:`Bearer ${token}`,
        },
      });
      await setId(response.data?.id)
    } catch (error) {
      console.error(error);
    }
  }, [token,id]);
  const qrcode=`https://ladygymapp.kz/gym/records/arrival/${id}`
  return (
    <View style={styles.wrap}>
         <View style={styles.qrWrap}>
            <QRCode
                value={qrcode}
                size={150}
                logoBackgroundColor='transparent'
                logo={require('../../assests/images/logoqr.png')}
                
            />
        </View>
        <Text style={styles.qrTitle}>Отсканируйте ваш QR</Text>
        <Text style={styles.qrDesc}>Отсканируйте ваш QR код {'\n'}
для фиксации посещения </Text>

     
    </View>
  )
}

export default Visit