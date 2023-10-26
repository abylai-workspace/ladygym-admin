import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { height } from 'react-native-dimension'
import { VARIABLES } from 'utils/variables';
import { COLORS } from 'utils/colors';

export const style = StyleSheet.create({
  logo: {
    marginTop: height(5),
    alignSelf: 'center',
  },
  phoneInputContainerStyle: {
    height: height(7),
    borderRadius: 20,
    backgroundColor: '#2C44D5',
  },
  phoneInputTextInputStyle: {
    color: '#fff',
    height: height(7),
    top: 2,
  },
  phoneInputTextContainerStyle: {
    backgroundColor: '#2C44D5',
    borderRadius: 20,
    padding: 10,
  },
  phoneCodeTextStyle: {
    color: '#FFF',
    marginLeft: -15
  },
  codeFieldRoot: { marginTop: 20, width: 310, alignSelf: 'center' },
  cell: {
    width: 40,
    height: 50,
    lineHeight: 34,
    borderWidth: 0,
    borderRadius: 6,
    fontSize: VARIABLES.fs3,
    // textTransform: 'uppercase',
    textAlignVertical: 'center',
    color: COLORS.white,
    textAlign: 'center',
    backgroundColor: '#2D44D5',
  },
  focusCell: {
    borderColor: COLORS.orange,
  },
})

export const Container = styled.View`
flex: 1;
  background-color: #3651fe;
  padding: 20px;
`
export const Section = styled.View`
  margin: 25px;
`
export const HeaderText = styled.Text`
  color: white;
  font-size: 20;
  line-height: 25;
  margin-top: 50;
`
export const PhoneContainer = styled.View`
  margin: 20px;
`
export const CheckboxContainer = styled.View`
  flex-direction: row;
  margin-left: 25px;
  margin-bottom: 40;
`
export const CheckboxText = styled.Text`
  font-size: 16px;
color:rgba(255, 255, 255, 0.7);
  margin-left: 10;
  line-height: 18px;
`
export const CheckBoxSecond = styled.Text`
  font-size: 16px;
  color: white;
`