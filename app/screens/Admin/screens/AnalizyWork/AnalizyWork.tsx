import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {TabView, SceneMap} from 'react-native-tab-view';
import AdminScreen from './components/AdminScreen';
import TrainersScreen from './components/TrainersScreen';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import LGBackround from 'components/blocks/LGBackround/LGBackround';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderTitle from 'screens/HomeScreen/components/HeaderTitle';
import {SCREENS} from 'constants/constants';
import Feather from 'react-native-vector-icons/Feather';
const {width, height} = Dimensions.get('window');

const renderScene = SceneMap({
  first: AdminScreen,
  second: TrainersScreen,
});

const AnalizyWork = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Админы'},
    {key: 'second', title: 'Тренеры'},
  ]);

  const renderTabBar = React.useCallback((props: {navigationState; jumpTo}) => {
    const {navigationState, jumpTo} = props;
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
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
      <>
        <View style={{height: '100%'}}>
          <HeaderTitle
            title="Анализы"
            styles={{marginTop: 0}}
            onPress={() => navigation.goBack()}
          />
          <TabView
            navigationState={navigationState}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
          />
          <View style={styles.addCounter}>
            <Pressable onPress={() => navigation.navigate(SCREENS.ADMIN_FORWHY   as never)}>
              <Feather name="plus"  size={30} color="#fff" />
            </Pressable>
          </View>
        </View>
      </>
    </LGBackround>
  );
};

export default AnalizyWork;

const styles = StyleSheet.create({
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
    width: width / 2.12,
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
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(117, 54, 234, 1)',
    borderRadius: 50,
    padding: 10,
  },
});
