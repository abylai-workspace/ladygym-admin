import {Dimensions, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import LGBackround from 'components/blocks/LGBackround/LGBackround';
import TextInputWithIcon from 'screens/Admin/components/TextInputWithIcon';
import { SceneMap, TabView } from 'react-native-tab-view';
import Manager from './components/Manager';
import AdminScreen from './components/AdminScreen';
import Trainers from './components/Trainers';
import { storageReadItem } from 'utils/asyncStorage';
import { ROLE, SCREENS, TOKEN_KEY } from 'constants/constants';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
const {width, height} = Dimensions.get('window');
const Personal = () => {

    const [token,setToken]=useState('')
  const [role,setRole]=useState('')
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
   
    {key: 'first', title: `${'Управляющие'}`},
    {key: 'second', title: 'Админы'},
    {key: 'thirth', title: 'Тренеры'},
  ]);

  const renderScene = SceneMap({
    first: Manager ,
    second: AdminScreen,
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
 


  return (
    <LGBackround>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Персонал</Text>
         <TabView
        navigationState={navigationState}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
       <View style={styles.addCounter}>
        <Pressable onPress={() => navigation.navigate(SCREENS.ADMIN_ADD_PERSONAL   as never)}>
          <Feather name="plus"  size={30} color="#fff" />
        </Pressable>
      </View>
      </View>
    </LGBackround>
  );
};

export default Personal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  renderTabBarStyle: {
    flexDirection: 'row',
    marginHorizontal: 20,
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
    width: width / 3.36,
    padding: 5,
    // margin: 5,
  },
  renderTabBarTextStyle: {
    marginRight: 0,
    textAlign: 'center',
    margin: 5,
    fontSize: 14,

  },
  addCounter:{
    position: 'absolute',
    bottom:Platform.OS === 'ios' ? 120:90,
    right: 20,
    backgroundColor: 'rgba(117, 54, 234, 1)',
    borderRadius: 50,
    padding: 10,
  }
});
