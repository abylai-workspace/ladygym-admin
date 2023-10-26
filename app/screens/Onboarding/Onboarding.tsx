import React, { useEffect } from 'react'
import { WithLocalSvg } from 'react-native-svg'
import {  Container, FooterText, Section, Textword } from './styles'
import CustomButton from 'components/blocks/Buttons/SmallPrimaryButton'

import { useTranslation } from 'react-i18next'
import { NavigationProp, useNavigation } from "@react-navigation/native";


import LGBackround from 'components/blocks/LGBackround/LGBackround'
import { StyleSheet, View } from 'react-native'
import { SCREENS } from 'constants/constants'




const Onboarding = () => {
  const navigation=useNavigation()
  useEffect(()=>{
    const timer=setTimeout(()=>{
      navigation.navigate(SCREENS.LOGIN as never)
    },1000)
    return () => clearTimeout(timer);
  },[navigation])

  return (
    <LGBackround>
      <View style={styles.container}>
<WithLocalSvg asset={require('../../assests/images/logomain.svg')}/>
      </View>
    </LGBackround>
  )
}

const styles=StyleSheet.create({
  container:{
    alignContent: 'center',
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    flex:1

  }
})
export default Onboarding
