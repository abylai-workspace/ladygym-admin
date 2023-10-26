import {  Pressable, Text } from 'react-native'
import React, { useState } from 'react'
import LGBackround from 'components/blocks/LGBackround/LGBackround'
import {TabView, SceneMap} from 'react-native-tab-view';
import Train from './Train';
import Visit from './Visit';
import { View } from 'react-native';
import { styles } from './style';
const LadyQR = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Посещение'},
    {key: 'second', title: 'Тренер'},
  ]);
  
  const renderScene = SceneMap({
    first: Train,
    second: Visit,
  });
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
        <TabView
          key={index}
          navigationState={navigationState}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
       
          
        />
    </LGBackround>
  )
}

export default LadyQR