import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LGBackround from 'components/blocks/LGBackround/LGBackround'
import HeaderTitle from 'screens/HomeScreen/components/HeaderTitle'
import FlatList from 'components/blocks/FlatList/FlatList'
import { useNavigation } from '@react-navigation/native'
import { SCREENS } from 'constants/constants'

const TrainAndUsluga = () => {
  const navigation=useNavigation()
  return (
    <LGBackround>
      <HeaderTitle title='Тренер и услуги' styles={{ marginBottom: 20, marginTop: 20 }} onPress={()=>navigation.goBack()}/>
      <FlatList title={'Мой тренер'} onPress={()=>navigation.navigate('MyTrain' as never)}/>
      <FlatList title={'Выбрать услуги тренера'} onPress={()=>navigation.navigate(SCREENS.CHOOSE_TRAINER as never)}/>
    </LGBackround>
  )
}

export default TrainAndUsluga

const styles = StyleSheet.create({})