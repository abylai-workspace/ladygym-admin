import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 20
    },
    headerContainer: {
        backgroundColor: 'red',
        padding: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        color: '#fff'

    },
    infoContainer: {
        padding: 15,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    infoHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    flexDirection: {
        flexDirection: 'row',

    },
    customText: {
        alignSelf: 'center',
        color: '#000',
    },
    sessionNumber: {
        color: '#000',
        fontWeight: '500',
        alignSelf: 'center',

    },
    sesionCode: {
        color: '#gray',
        marginRight: 5,
        alignSelf: 'center',

        // fontWeight: '500',
    },
    airName: {
        color: '#gray',

    },
    airCode: {
        color: '#000',
        fontSize: 18,
        fontWeight: '500',
    },
    time: {
        color: '#000',

    }
})


export const AirCodeView = styled.View`
    flex-direction: row;
   justify-content: space-between;

    `
export const AirCode = styled.Text`
`