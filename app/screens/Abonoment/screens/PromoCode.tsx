import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import LGBackround from 'components/blocks/LGBackround/LGBackround'
import HeaderTitle from 'screens/HomeScreen/components/HeaderTitle'
import { useNavigation } from '@react-navigation/native'
import { storageReadItem } from 'utils/asyncStorage'
import { ROLE, TOKEN_KEY } from 'constants/constants'
import { instance } from 'utils/axios'

const PromoCode = () => {
  const navigation=useNavigation()
  const [data,setData] = useState([])
  const [token,setToken]=useState('')
  
  storageReadItem(TOKEN_KEY,ROLE).then((token)=>{
    setToken(token)
  })
  useEffect(()=>{
    fetchData()
  },[token])
  const fetchData = useCallback(async () => {
    try {
      const response = await instance.get('/gym/user/promocode',{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      .then(res=>{
       
        setData(res?.data)
      })
      return response
    } catch (error) {
      console.log(error)
    }
  },[token])

  
  return (
    <LGBackround>
      <HeaderTitle title='Промокод' styles={{ marginBottom: 10, marginTop: 20 }} onPress={()=>navigation.goBack()}/>
      <View style={styles.container}>
      </View>
      <View style={styles.container2}>
        <ImageBackground source={require('../../../assests/images/backround.png')} style={styles.container2}>
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>Ваш персональный реферальный код</Text>
            <Text style={styles.code}>{data?.message}</Text>
            <Text style={styles.desc}>Делитесь с подругами кодом 
и получайте 10% скидки на покупку абонемента. 
Накапливайте скидки до 100%.</Text>

          </View>

        </ImageBackground>
      </View>
    </LGBackround>
  )
}

export default PromoCode

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 144, 198, 1)',
    marginTop: 70,
    marginHorizontal: 15,
    borderRadius: 15,
    height: 100,
  },
  container2: {
    backroundColor: '#000',
    height: '100%',
    width: Dimensions.get('window').width,
    borderTopRightRadius: 45,
    borderRadius: 40,
    borderTopLeftRadius: 45,
    marginTop: -20,
  },
  textContainer: {
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  headerText:{
    color:'white',
  },
  code:{
    color:'white',
    textTransform:'uppercase',
    fontSize:20,
    fontWeight:'500',
    marginTop:30,
    marginBottom:30
  },
  desc:{
color:'white',
width:300,
textAlign:'center'
  }
})