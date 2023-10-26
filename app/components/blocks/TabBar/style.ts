import { StyleSheet } from "react-native";
import shadowGenerator from "utils/shadowGenerator";
/* fonts */

/* font sizes */
export const FontSize = {
    size_xl: 20,
    size_3xs: 10,
    textSmNormal_size: 14,
    size_base: 16,
    size_xs: 12,
    size_5xl: 24,
    size_sm: 14,
    size_smi: 13
};
/* Colors */
export const Color = {
  lightBlue: '#4970FF',
  black: '#000',
  blue1: '#191F33',
  white: '#fff',
  white2: '#f8f8f8',
  whitesmoke_100: '#f5f5f5',
  style3: '#f2f2f2',
  whitesmoke_200: 'rgba(242, 242, 242, 0.3)',
  style1: '#1b6fc5',
  gray_100: '#fafafa',
  gray_200: '#1a1f33',
  style4: '#191f33',
  blackColor: '#131313',
  style2: '#b3b3b3',
  color: '#283050',
  d85: '#009d85',
  fDC854: '#fdc854',
  silver: '#c0c0c0',
  gray500: '#667085',
  powderblue: '#cae7e3',
  blanchedalmond: '#feefcd',
  mistyrose: '#f5d9d6',
  gainsboro: 'rgba(217, 217, 217, 0)',
  red: "#F81414",
  gray_95: '#f2f2f2',
  grayTint: "#9B9EA6",
  placeholderGray: "#9098B1",
  warningRed: "#FF6161",
  buttonGradient: ['#FFF', 'rgba(188, 188, 188, 1)'],
  black1: '#292D32',
  background: 'rgba(207, 84, 144, 1)',
};
/* Paddings */
export const Padding = {
  p_99xl: 118,
  p_smi: 13,
  p_base: 16,
  p_xs: 12,
  p_5xs: 8,
  p_7xs: 6,
  p_5xl: 24,
  p_15xl: 34,
  p_7xl: 26,
  p_3xl: 22,
  p_2xs: 11,
  p_11xs: 2,
  p_12xl: 31,
  p_xl: 20,
};
/* border radiuses */
export const Border = {
  br_3xs: 10,
  br_xl: 20,
  br_11xl: 30,
  br_119xl: 138,
  br_31xl: 50,
  br_81xl: 100,
  br_29xl: 48,
  br_xs: 12,
  br_9xl: 28,
  br_5xs: 8,
};

export const styles = StyleSheet.create({
    wrapper: {
      position: 'absolute',
      bottom: Padding.p_base,
      left: 0,
      right: 0,
      paddingHorizontal: Padding.p_base,
    },
    container: {
      // paddingHorizontal: 5,
      // paddingVertical: Padding.p_xs,
      flexDirection: 'row',
      justifyContent: 'space-between',
  
      backgroundColor: Color.white,
      borderRadius: Border.br_11xl,
  
      ...shadowGenerator(1),
    },
    containerAdd:{
      // paddingHorizontal: Padding.p_15xl,
      // paddingVertical: Padding.p_xs,
      // flexDirection: 'row',
      borderTopRightRadius: Border.br_xl,
      borderTopLeftRadius: Border.br_xl,
      // justifyContent: 'space-between',
      backgroundColor: Color.buttonGradient[1],
      position: 'absolute',
     
  width:200,
  height:70,
  margin:6,
  marginTop:-50,
      ...shadowGenerator(4),
    },
    tabButton: {
      flex: 1,
      paddingVertical: Padding.p_5xs,
      paddingHorizontal: 20,

      alignSelf: 'center',
      justifyContent: 'center',
      // flexDirection: 'row',
      alignItems: 'center',
  
      // borderRadius: Border.br_31xl,
    },
    tabButtonFocused: {
      backgroundColor: Color.background,
      borderRadius:30,
    },
    tabBarLabel: {
      // fontFamily: FontFamily.montBold,
      fontSize: FontSize.size_3xs,
      color: Color.buttonGradient[0],
      textAlign: 'center',
    },
  });
  