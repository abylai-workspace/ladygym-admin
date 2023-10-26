import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Color, styles} from './style';



/** @param {import('@react-navigation/bottom-tabs').BottomTabBarProps} */
export default function SWTabBar({state, descriptors, navigation}) {
  return (
    <View style={styles.wrapper}>
    
      <SafeAreaView
        mode="margin"
        edges={['bottom', 'left', 'right']}
        style={styles.container}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          return (
           
            
            <TouchBarButton
               key={`tab_${index}`}
              route={route}
              descriptor={descriptors[route.key]}
              navigation={navigation}
              focused={focused}
              onLongPress={() => {
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                });
              }}
              onPress={() =>
                navigation.navigate({name: route.name, merge: true})
              }
            />
          
          );
        })}
        
      </SafeAreaView>
    </View>
  );
}

/**
 * @param {{
 *  route: import('@react-navigation/bottom-tabs').BottomTabBarProps['state']['routes'][number];
 *  descriptor: import('@react-navigation/bottom-tabs').BottomTabBarProps['descriptors'][string];
 *  navigation: import('@react-navigation/bottom-tabs').BottomTabBarProps['navigation'];
 *  focused: boolean;
 *  onPress?: (event: import('@react-navigation/native').EventArg<"tabPress", true, undefined>) => void;
 *  onLongPress?: (event: import('@react-navigation/native').EventArg<"tabLongPress", true, undefined>) => void;
 * }}
 */
function TouchBarButton({
  route,
  descriptor: {
    options: {tabBarLabel, tabBarIcon, tabBarTestID, tabBarAccessibilityLabel},
  },
  navigation,
  focused,
  onPress,
  onLongPress,
}) {
  const handlePress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });
    onPress?.(event);
  };
  const handleLongPress = () => {
    const event = navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    });
    onLongPress?.(event);
  };

  return (
    <TouchableOpacity
    key={`tabLongPress${route.key}`}
      accessibilityRole="button"
      accessibilityState={focused ? {selected: true} : {}}
      accessibilityLabel={tabBarAccessibilityLabel}
      testID={tabBarTestID}
      onPress={handlePress}
      onLongPress={handleLongPress}>
      <View style={[styles.tabButton, focused && styles.tabButtonFocused]}>
        {tabBarIcon({
          focused,
          size: 24,
          color: focused ? Color.buttonGradient[0] : Color.buttonGradient[1],
        })}
        {focused ? (
          <Text style={styles.tabBarLabel}>{tabBarLabel}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

