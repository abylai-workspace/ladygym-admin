import { View, Text } from 'react-native'
import React from 'react'
import LGBackround from 'components/blocks/LGBackround/LGBackround'
import Header from 'components/headers/Header'
import List from './components/List'
import { useNavigation } from '@react-navigation/native'

const Notifications = () => {
  const navigation=useNavigation()
  return (
    <LGBackround>
      <Header centerTitle='Notifications'  onBackPress={() => navigation.goBack()} title=''/>
     <List title='Оценки' subtitle='11.00' onPress={() => {}} icon='star'/>
     <List title='Общие' subtitle='10.34' onPress={() => {}} icon='bell'/>
     <List title='Экстренные' subtitle='10.34' onPress={() => {}} icon='alert-circle'/>

    </LGBackround>
  )
}

export default Notifications