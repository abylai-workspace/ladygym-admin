import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomSheetDialog from 'components/BottomSheetDialog/BottomSheetDialog';
import { WithLocalSvg } from 'react-native-svg';

const screenDimensions = Dimensions.get('screen');


const SHEET_SIZE = {
  small: [Math.floor(screenDimensions.height * 0.32)],
  medium: [Math.floor(screenDimensions.height * 0.5)],
  large: [Math.floor(screenDimensions.height * 0.75)],
};
interface IProps{
    errorVisible: boolean,
    onClose:()=>void;
}

const ErrorBottomSheet = ({errorVisible,onClose}:IProps) => {
  return (
    <BottomSheetDialog snapIndex={0} snapPoints={SHEET_SIZE.medium}  onClose={onClose} isActive={errorVisible} confirmBtnText='Закрыть'>
    <View style={styles.container}>
      <WithLocalSvg asset={require('../../../../../../assests/images/errorbottom.svg')}  style={{alignContent:'center',marginLeft:20}}/>
      <Text style={{color:'#000',marginTop:20}}>Ошибка!</Text>
      <Text style={{color: 'gray',textAlign:'center',marginTop:20}}>Вы находитесь вне зоны фитнес зала,
пожалуйста подтвердите прибытие
находясь в зале!</Text>
    </View>
  </BottomSheetDialog>
  )
}

export default ErrorBottomSheet

const styles = StyleSheet.create({
    container: {
      alignContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
  });