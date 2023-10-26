import React, { useCallback, useEffect, useState } from 'react';
import {
    View,

    StyleSheet,

    ScrollView,
    Dimensions,
    TouchableOpacity,
    Text,
    Alert,
    Share,
    Linking
} from 'react-native';


import LGBackround from 'components/blocks/LGBackround/LGBackround';
import Header from './components/Header';
import FlatList from 'components/blocks/FlatList/FlatList';
import { useNavigation } from '@react-navigation/native';
import { REFRESH_TOKEN_KEY, ROLE, SCREENS, TOKEN_KEY } from 'constants/constants';

import { useDispatch, useSelector } from 'react-redux';
import { storageReadItem } from 'utils/asyncStorage';
// import { logout } from 'store/slices/authSlice';


const { height } = Dimensions.get('window')


const ProfileScreen=({onLogout})=> {
    const [role,setRole]=useState('')
    const [token,setToken]=useState('')
    console.log(onLogout ,'logoy')
  
 

  
    const navigation = useNavigation()

useEffect(()=>{
    storageReadItem(TOKEN_KEY,ROLE).then((token)=>{
        console.log(token,'token')
        setToken(token)
      }) 
      storageReadItem(ROLE,TOKEN_KEY).then((token)=>{
        console.log(token,'token')
        setRole(token)
      }) 
    
},[])
    const onChangePin = async () =>{
        Alert.alert('Сейчас в разработке')
    }
    const onSupport=()=>{
        Linking.openURL(`https://wa.me/+77078775016`)
    }
    console.log('logout')
    const onLogouts= useCallback(()=>{
      
      console.log('logouts')
        
    },[])
    return (
        <LGBackround>
            <ScrollView>
                <View style={styles.container}>
                </View>
                <View style={styles.container2}>
                   
                    <Header onLogout={onLogouts} />
                    <View style={{ marginTop: -580 }}>
                        <FlatList title={'Личные данные'} onPress={() => navigation.navigate(SCREENS.PROFILE_INFO as never)} icon={require('../../assests/images/profile.png')} />
                        <FlatList title={'Замеры и рассчеты '} onPress={() => navigation.navigate(SCREENS.PROFILE_MEASURE as never)} icon={require('../../assests/images/zamer.png')} />
                        <FlatList title={'Прикрепить документ '} onPress={() => navigation.navigate(SCREENS.PROFILE_DOCUMENTS as never)} icon={require('../../assests/images/Documents.png')} />
                        <FlatList title={'Служба поддержки '} onPress={onSupport} icon={require('../../assests/images/support.png')} />     
                       {role==='ADMIN'&&<FlatList title={'Финансовый план '} onPress={() => navigation.navigate(SCREENS.ADMIN_PLAN_FINANCE as never)} icon={require('../../assests/images/Goal.png')} />} 
                      {role ==='TRAINER'&& <FlatList title={'Сертификаты и регалии '} onPress={() => navigation.navigate(SCREENS.ADMIN_CERTIVIC as never)} icon={require('../../assests/images/Certificate.png')} />}
                      {role==='MANAGER'  && <FlatList title={'Анализ работы '} onPress={() => navigation.navigate(SCREENS.ADMIN_ANALIZY_WORK as never)} icon={require('../../assests/images/PIN.png')} />}
                       {role==='MANAGER' && <FlatList title={'Создать новость '} onPress={onChangePin} icon={require('../../assests/images/PIN.png')} />}
                       {role==='MANAGER' && <FlatList title={'Уведомления о заморозке '} onPress={onChangePin} icon={require('../../assests/images/PIN.png')} />}
                       <FlatList title={'Изменить ПИН-код'} onPress={onChangePin} icon={require('../../assests/images/PIN.png')} />
                    </View> 
                    
                   
                </View>
            </ScrollView>

        </LGBackround>


    )
}

export default ProfileScreen
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 144, 198, 1)',
        marginTop: 50,
        margin: 15,
        borderRadius: 15,
        height: 100,
    },
    container2: {
        backroundColor: '#000',
        height: height,
        width: Dimensions.get('window').width,
        borderTopRightRadius: 45,
        borderRadius: 40,
        borderTopLeftRadius: 45,


    }
})
