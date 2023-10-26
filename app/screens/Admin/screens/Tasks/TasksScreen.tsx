import { Dimensions, Pressable, ScrollView, StyleSheet, Text, Platform, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import LGBackround from 'components/blocks/LGBackround/LGBackround'
import { getTasksListMy, instance } from 'utils/axios'
import { storageReadItem } from 'utils/asyncStorage'
import { ROLE, SCREENS, TOKEN_KEY } from 'constants/constants'
import { useNavigation } from '@react-navigation/native'
import {TabView, SceneMap} from 'react-native-tab-view';
import AdminTasks from './components/AdminTasks'
import Trainers from './components/Trainers'
import Feather from 'react-native-vector-icons/Feather'
import MyTasks from './components/MyTasks'
import CardTasks from './components/CardTasks'
import ManagerTasks from './components/ManagerTasks'
const { height ,width} = Dimensions.get('window')


const TasksScreen = () => {
  const [data,setData]=useState([])
  const [token,setToken]=useState('')
  const [role,setRole]=useState('')
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
   
    {key: 'first', title: `${role === 'MANAGER' ? 'Управляющие': 'Мои'}`},
    {key: 'second', title: 'Админы'},
    {key: 'thirth', title: 'Тренеры'},
  ]);

  const renderScene = SceneMap({
    first: role == 'TOP' ? ManagerTasks :MyTasks ,
    second: AdminTasks,
    thirth: Trainers
  });
  storageReadItem(TOKEN_KEY,ROLE).then((token)=>{
    setToken(token)
  })
  storageReadItem(ROLE,TOKEN_KEY).then((token)=>{
    setRole(token)
  })
  




  const renderTabBar = React.useCallback((props: {navigationState; jumpTo}) => {
    const {navigationState, jumpTo} = props;
    return (
      <View

        style={styles.renderTabBarStyle}>
        {navigationState.routes.map((route, indexx: number) => {
          
          const color = indexx === navigationState.index ? '#fff' : 'gray';
          const backgroundColor =
            indexx === navigationState.index ? 'rgba(207, 84, 144, 1)' : 'rgba(255,255,255,0)';
          return (
            <Pressable key={route.key} onPress={() => jumpTo(route.key)}>
              <View style={[styles.renderTabBarNavStyle, {backgroundColor}]} key={route.key}>
                <Text style={[styles.renderTabBarTextStyle, {color}]}>{route.title}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    );
  }, []);

  
 
  const navigationState = React.useMemo(() => ({index, routes}), [index, routes]);
 


 
  
  useEffect(()=>{
    fetchData()
  },[token])
  const fetchData = useCallback(async() => {
    try {
      const response = await instance?.get('/gym/tasks/trainers',{
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
      <Text style={styles.headerTitle}>Задания</Text>
      {role==='USER' || role==='ADMIN' || role==='TRAINER'?(
          <ScrollView style={{
            height:height/1.4,
            marginBottom:60
          }}
         >
          <CardTasks data={data}/>
          </ScrollView>
      ):(
        <>
        <TabView
        navigationState={navigationState}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
     <View style={styles.addCounter}>
        <Pressable onPress={() => navigation.navigate(SCREENS.ADMIN_FORWHY_TASKS   as never)}>
          <Feather name="plus"  size={30} color="#fff" />
        </Pressable>
      </View>
      </>
      )
      }
    

     
     
    </LGBackround>
  )
}

const styles = StyleSheet.create({
  headerTitle:{
    color: '#fff',
    fontSize: 25,
    fontWeight: '500',
    marginHorizontal:20
  },
  renderTabBarStyle: {
    flexDirection: 'row',
    marginTop: 10,
    margin: 10,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    zIndex: 2,
    borderColor: 'rgba(255,255,255,0.4)',
    borderWidth: 1,
  },
  renderTabBarNavStyle: {
    marginRight: 0,
    borderRadius: 18,
    width: width / 3.18,
    padding: 5,
    // margin: 5,
  },
  renderTabBarTextStyle: {
    marginRight: 0,
    textAlign: 'center',
    margin: 5,
    fontSize: 14,

  },
  addCounter: {
    position: 'absolute',
    bottom:Platform.OS === 'ios' ? 120:90,
    right: 20,
    backgroundColor: 'rgba(117, 54, 234, 1)',
    borderRadius: 50,
    padding: 10,
  },
})
export default TasksScreen

