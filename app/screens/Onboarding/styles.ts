import { StyleSheet } from "react-native";
import { height } from 'react-native-dimension'
import styled from "styled-components/native";

export const styles = StyleSheet.create({
    logo:{
        marginTop: height(4),
        alignSelf: 'center',
        marginBottom: height(3),
    },
    button:{
        marginTop: height(5)
    },
    airplane:{
        alignSelf: 'center',
    }
})


export const Container = styled.View`
flex: 1;
background-color: #3651FE;
padding: 20px;
`


export const Section = styled.View`
    
    margin-top: 30;
`
export const Textword=styled.Text`
    font-size: 20px;
    color: white;
    font-weight: 300;
    margin:20px
`
export const FooterText=styled.Text`
position: absolute;
text-align: center;
   color: white;
   align-self: center;
  bottom: 20px;
`
