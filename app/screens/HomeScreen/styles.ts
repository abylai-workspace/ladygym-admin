import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { width } from 'react-native-dimension'

export const styles = StyleSheet.create({
    renderTabBarStyle: {
        flexDirection: 'row',
        marginTop: 10,
        margin: 10,
        borderRadius: 18,
        backgroundColor: '#2D44D5',
    },
    renderTabBarNavStyle: {
        marginRight: 0,
        borderRadius: 18,
        width: width(43.2),
        padding: 5,
        margin: 5,
    },
    renderTabBarTextStyle: {
        marginRight: 0,
        textAlign: 'center',
        margin: 5,
        fontSize: 14,
    }
})


export const Container = styled.View`
    flex: 1;
    background-color: #3651FE;
    padding: 10px;
`
export const ViewContainer=styled.View`
margin:7px;
`
export const DateHistoryText=styled.Text`
  text-align: center;
  margin-bottom: 5px;
  color: white;
`