import { Dimensions, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomSheetDialog from 'components/BottomSheetDialog/BottomSheetDialog'

const screenDimensions = Dimensions.get('screen')
const platform = Platform.OS

const SHEET_SIZE = {
  small: [Math.floor(screenDimensions.height * 0.32)],
  medium: [Math.floor(screenDimensions.height * 0.5)],
  large: [Math.floor(screenDimensions.height * 0.75)]
}
interface AProps{
    onClose?:()=>void,
    onPress?:()=>void,
    visibile?:boolean | undefined,
}
const AccessVisitBottomSheet = ({ onClose,onPress,visibile}:AProps) => {
  return (
    <View>
    <BottomSheetDialog
     snapIndex={0}
     snapPoints={SHEET_SIZE.small}
     isActive={visibile}
     title='Подтвердить посещение?'
     onBackdrop={onClose}
     onConfirm={onPress}
     confirmBtnText="Далее"
     style={{customChildren: {flex: 1}}}
     >
        <Text style={styles.description}>Вам необходимо подтвердить 
посещение клиента, вбить номер ключа 
и поменять тренера если в этом есть необходимость.</Text>

     </BottomSheetDialog>
    </View>
  )
}

export default AccessVisitBottomSheet

const styles = StyleSheet.create({
    description:{
        color:'gray',
        textAlign:'center',
    }
})