import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import an icon of your choice

const TextInputWithIcon = ({ iconName, iconSize, value,onPress,iconColor, ...textInputProps}) => {
    const onFocus = () => {
        console.log('onFocus   ')
    }
  return (
    <View style={styles.container}>
      <Icon name={iconName} size={iconSize} color={iconColor} style={{ marginRight: 10 }}  />
      <TextInput {...textInputProps} onFocus={onFocus}  value={value} onChangeText={onPress} style={styles.input}/>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row', alignItems: 'center',
        backgroundColor:'rgba(255,255,255,0.2)',
        marginHorizontal:20,
        borderRadius:25,
        paddingHorizontal:15,
        marginBottom:15
    },
    input:{
      height:40,
      color: 'white',
    }

})

export default TextInputWithIcon;
