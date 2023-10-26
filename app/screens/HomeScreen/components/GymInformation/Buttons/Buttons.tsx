import { Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';


interface Props {
  onPress: () => void;
  title: string;
  style?: any;
}
const Buttons = ({onPress, title,style}: Props) => {
  return (
    <TouchableOpacity style={[styles.container,style]} onPress={onPress}>
      <Text style={styles.headerText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(207, 84, 144, 1)',
    justifyContent: 'center',
    alignItems: 'center',

    marginHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 15,
  },
  headerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '500',

    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Buttons;
