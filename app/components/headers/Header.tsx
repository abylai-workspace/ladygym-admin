import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
interface IProps {
  title: string;
  centerTitle?: string;
  onBackPress?: () => void;
}

const Header = ({onBackPress, title, centerTitle}: IProps) => {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      {centerTitle &&(
             <View style={{alignContent: 'center',alignSelf: 'center',top:20}}>
             <Text style={styles.centerTitle}>{centerTitle}</Text>
           </View>
        )
        }
      <View style={styles.flexContainer}>
        {onBackPress && (
          <TouchableOpacity activeOpacity={0.6}>
            <Ionicons name="chevron-back" size={30} color="#fff" onPress={onBackPress} />
          </TouchableOpacity>
        )}
       
       
      </View>
    </View>
  );
};


export default Header;
