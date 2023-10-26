import React from 'react'
import { Text, StyleSheet, Keyboard, View, Platform, TouchableOpacity } from 'react-native'
import CustomButton from 'components/blocks/Buttons/SmallPrimaryButton'
import { Portal } from '@gorhom/portal'
import {
  BottomSheetModalProvider,
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop
} from '@gorhom/bottom-sheet';
import Feather from 'react-native-vector-icons/Feather'

export interface BottomSheetDialogProps {
  isActive: boolean;
  title?: string | undefined;
  style?: any;
  stylesButton?: any
  snapIndex: number;
  snapPoints: string[] | number[];
  children?: any;
  disabled?: boolean;
  confirmBtnText?: string | undefined;
  cancelBtnText?: string;
  deleteBtnText?: string
  onConfirm?: () => void;
  onClose?: (dismissed?: boolean) => void;
  onDelete?: () => void;
  onBackdrop?: (dismissed?: boolean) => void;
  
}

const BottomSheetDialog = React.forwardRef(({
  isActive,
  title,
  style,
  stylesButton,
  snapIndex = 1,
  snapPoints = ['25%', '50%'],
  children,
  disabled,
  confirmBtnText,
  cancelBtnText,
  deleteBtnText,
  onClose,
  onDelete,
  onConfirm,
  onBackdrop



}: BottomSheetDialogProps, ref: any) => {
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => { setKeyboardVisible(true) }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => { setKeyboardVisible(false) }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  React.useEffect(() => {
    if (isActive) {
      bottomSheetModalRef.current?.present()
    } else {
      if (isKeyboardVisible) {
        setTimeout(() => {
          bottomSheetModalRef.current?.dismiss()
        }, 150)
      } else {
        bottomSheetModalRef.current?.dismiss()
      }
    }
  }, [isActive, isKeyboardVisible]);

  const handleOpen = React.useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, []);

  const handleClose = React.useCallback(() => {
    bottomSheetModalRef.current?.dismiss()
  }, []);

  const onClickClose = React.useCallback(() => {
    onClose  && onClose(false) 
  }, [onClose])

  const onBackClickClose = React.useCallback(() => {
    onBackdrop && onBackdrop(false)
  },[onBackdrop]);
  const renderBackdrop = React.useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={onClickClose || onBackClickClose}
      />
    ), []);

  React.useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
    snapToIndex: handleOpen,
  }));

  return (
    <Portal>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={snapIndex}
          onDismiss={onClickClose || onBackClickClose}
          snapPoints={snapPoints}
          keyboardBehavior='interactive'
          keyboardBlurBehavior='restore'
          android_keyboardInputMode='adjustResize'
          backdropComponent={renderBackdrop}
          handleStyle={{
            backgroundColor:"#fff",
            
          }}
          handleIndicatorStyle={{
              backgroundColor:"#000"
          }}
        >  
          <BottomSheetView style={styles.container}>
          {onBackdrop && (
                <TouchableOpacity 
                onPress={onBackClickClose}
                style={styles.iconContainer}>
                  <Feather name='arrow-left' size={30} color={'#fff'}/>
                </TouchableOpacity>
              )}
            {title ? (<Text style={[styles.title, style?.title]}>{title}</Text>) : null}
            {children && <BottomSheetView style={[styles.childrenContainer, style?.customChildren]}>{children}</BottomSheetView>}
            <View style={styles.buttons}>
              {onConfirm ? (
                <CustomButton
                  label={confirmBtnText}
                  variant="fill"
                  disabled={disabled}
                  onPress={onConfirm}
                  style={[styles.button, stylesButton]}
                />
              ) : null}
            
              {onClose && (
                <CustomButton
                label={confirmBtnText}
                variant="fill"
                disabled={disabled}
                onPress={onClickClose}
                style={[styles.button, stylesButton]}
                />
              )}

            
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </Portal>
  )
})
export default BottomSheetDialog

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff",

    paddingHorizontal:20,
    paddingVertical:20

  },
  title: {
    fontSize: 18, 
    fontWeight: Platform.OS === 'android' ? '700' : '600',
    lineHeight: 20,
    color: '#000',
    textAlign:'center'
  },
  childrenContainer: {
    marginTop: 10,
  },
  buttons: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 15,
  },
  button: {
    marginLeft: 0,
    marginRight: 0,
  },
  iconContainer:{
    backgroundColor:'gray',
    width:40,
    height :40,
    padding:5,
    borderRadius:10
  }
})
