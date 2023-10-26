import {  BackHandler, Keyboard, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import MapMarker from 'components/blocks/MapMarker/MapMarket'
import NotificationHome from 'components/blocks/Notification/NotificationHome'

import { useNavigation } from '@react-navigation/native'
import { SCREENS, TOKEN_KEY } from 'constants/constants'

import ModalBottom from './components/GymInformation/ModalBottom'
import HeaderAbonoment from './components/GymInformation/HeaderAbonoment'
import AboutFitnes from './components/GymInformation/AboutFitnes'
import Prices from './components/GymInformation/Prices'
import Buttons from './components/GymInformation/Buttons/Buttons'
import Counter from './components/GymInformation/Counter'
import TrainCards from './components/GymInformation/TrainCards'
import Trainnformation from './components/TrainInformation/Trainnformation'
import ImgBottomSheet from './components/ImgBottomSheet/ImgBottomSheet'
import Kbjusheet from './components/KbjuSheet/Kbjusheet'
import CitySelect from 'components/blocks/CitySelect/CitySelect'
import { SafeAreaView } from 'react-native-safe-area-context'
import SwipeableDialog from 'components/blocks/SwipeableDialog/SwipeableDialog'


const HomeScreen = () => {
 const [visibleFitnes,setVisibleFitnes]=useState(false)
 const [visibleTrainnformation,setVisibleTrainnformation]=useState(false)
 const [visibleIMGBottomSheet,setVisibleImgBottomSheet]=useState(false)
 const [visiblekbjusheet,setVisibleKBjusheet]=useState(false)

 const [gymId, setGymId] = useState<null | number>(null)
 const [gymInfo, setGymInfo] = useState<any>(null)
 const [trainerInfo, setTrainerInfo] = useState<any>(null)
 const [selectedCity, setSelectedCity] = useState<any>('Шымкент')


//  const getUserLocation=useCallback(async()=>{
//   try {
//     const response= await instance.get('/gym/manage/all',{
//       headers: {
//         Authorization: `Bearer ${await storageReadItem(TOKEN_KEY)}`,
//       },
      
//     })
//     // await setUserName(response.data.firstName)
//     // await  setLastName(response.data.lastName)
//     console.log(response.data,'response')
//     // console.log(response)
//   } catch (error) {
//     console.error(error)
//   }
 
//  },[])
//  useEffect(()=>{
//    getUserLocation()
//  })


const onPress=useCallback((id: number)=>{
  setVisibleFitnes(true)
  setGymId(id)
 },[visibleFitnes])


 const onSwipe=useCallback(()=>{
  setVisibleFitnes(false)

 
 },[visibleFitnes])

 const onPressTrainnformation=useCallback(()=>{
  setVisibleFitnes(false)
  setVisibleTrainnformation(true)
  console.log(visibleTrainnformation,'visibleTrainnformation')
 },[])

 const goBackGym=useCallback(()=>{
  setVisibleTrainnformation(false)
  setVisibleFitnes(true)
 },[])
 const govisibleIMGBottomSheet=useCallback(()=>{
  setVisibleImgBottomSheet(false)
  setVisibleFitnes(true)
  console.log(visibleIMGBottomSheet,'visibleIMGBottomSheet')
 },[])
 const goVisibleKBJUSheet=useCallback(()=>{
  setVisibleKBjusheet(false)
  setVisibleFitnes(true)
 },[])
  const navigation=useNavigation()
  return (
    <>
    <SafeAreaView>
    <NotificationHome  onPress={()=>navigation.navigate(SCREENS.NOTIFICATION as never)}/>
    <MapMarker onPress={onPress} setGymInfo={setGymInfo} selectedCity={selectedCity}/>
    <CitySelect {...{selectedCity, setSelectedCity}}/>

    <SwipeableDialog isActive={visibleFitnes} onSwipeClose={onSwipe}>
    <HeaderAbonoment/>
    <AboutFitnes/>
    <Prices/>
    <Buttons title='Записаться на пробное занятие' onPress={()=>{}}/>
    <Counter onPressIMT={()=>setVisibleImgBottomSheet(true)}  onPressKBJ={()=>setVisibleKBjusheet(true)}/>
    <TrainCards onPress={()=>setVisibleTrainnformation(true)} setTrainerInfo={setTrainerInfo} gymId={gymId}/>
    </SwipeableDialog>
    {/* <ModalBottom isModalVisible={visibleFitnes} toggleModal={onSwipe}>
    
    </ModalBottom> */}
    <Trainnformation isModalVisible={visibleTrainnformation} toggleModal={onPressTrainnformation} goBack={goBackGym} trainerInfo={trainerInfo}/>
    <ImgBottomSheet isModalVisible={visibleIMGBottomSheet} toggleModal={govisibleIMGBottomSheet} goBack={govisibleIMGBottomSheet}/>
    <Kbjusheet isModalVisible={visiblekbjusheet} toggleModal={goVisibleKBJUSheet} goBack={goVisibleKBJUSheet}/>
    </SafeAreaView>
    </>
  )
}


export default HomeScreen