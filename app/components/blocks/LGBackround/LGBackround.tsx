import { ImageBackground, Platform, StyleSheet } from 'react-native'
import React from 'react'

const LGBackround = (props,{style}) => {
  return (
    <ImageBackground source={require('../../../assests/images/backround.png')}
    {...props} style={[styles.container, props.style,style]}
    imageStyle={[styles.image, props.imageStyle]}>
      
    </ImageBackground>
  )
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:Platform.OS === 'ios' ? 55 : 0,
   
  },
  image:{
    flex: 1,
    
  }
    
})
export default LGBackround