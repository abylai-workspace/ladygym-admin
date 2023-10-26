import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SwipeablePanel } from 'rn-swipeable-panel'
import CustomButton from 'components/blocks/Buttons/SmallPrimaryButton'
import LGBackround from '../LGBackround/LGBackround'

export interface SwipeableDialogProps {
  isActive: boolean
  title?: string
  confirmBtnText?: string
  cancelBtnText?: string
  disabled?: boolean
  children?: any
  onConfirm?: () => void
  onClose?: (dismissed?: boolean) => void
  stylesButton?: any
  onDelete?: () => void
  deleteText?: string
  selectedValue?: string
  onSwipeClose?: () => void
  style?: any
  isLarge?: boolean
}

export default function SwipeableDialog({
  isActive,
  title,
  confirmBtnText,
  cancelBtnText,
  disabled,
  children,
  onClose,
  onDelete,
  onConfirm,
  stylesButton,
  deleteText,
  onSwipeClose,
  style,
  isLarge = false
}: SwipeableDialogProps) {
  const onDismissPanel = React.useCallback(() => {
    onClose && onClose(true);
    onSwipeClose && onSwipeClose(); 
  }, [onClose,onSwipeClose])

  const onClickClose = React.useCallback(() => {
    onClose && onClose(false);
  }, [onClose])

  return (
    <SwipeablePanel
      isActive={isActive}
      showCloseButton={false}
      onClose={onDismissPanel}
      style={style?.swipeableContainer}
      barStyle={{ backgroundColor: '#000' }}
      fullWidth
      closeOnTouchOutside
      onlyLarge={isLarge}
      scrollViewProps={{
        keyboardShouldPersistTaps: 'handled'
      }}
      
      closeRootStyle={style?.closeRootStyle}
      barContainerStyle={style?.barContainer}
    >
      <LGBackround>
        {title ? (<Text style={styles.title}>{title}</Text>) : null}
        {children && <View style={[styles.childrenContainer, style?.customChildren]}>{children}</View>}
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
          {onDelete && (
            <CustomButton
              label={deleteText}
              variant="delete"
              onPress={onDelete}
              style={[styles.button, { marginTop: 8 }]}
            />
          )}
          {onClose && (
            <CustomButton
              label={cancelBtnText}
              variant="outlineBlue"
              onPress={onClickClose}
              style={[styles.button, { marginTop: 8 }]}
            />
          )}
          
        </View>
      </LGBackround>
    </SwipeablePanel>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 40,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 20,
    color: '#000',
  },
  childrenContainer: {
    marginTop: 10,
  },
  buttons: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 24,
  },
  button: {
    marginLeft: 0,
    marginRight: 0,
  },
  barContainer:{
    backgroundColor: 'transparent',
  
  },
  swipeableContainer:{
    
  },
  closeRootStyle:{
    backgroundColor: 'transparent',
  }
})