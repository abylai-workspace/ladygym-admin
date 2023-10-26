import { StyleSheet } from "react-native";
import { width, height } from 'react-native-dimension'
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    renderTabBarStyle: {
        flexDirection: 'row',
        marginTop: height(24),
        marginLeft: width(15.2),
        marginRight: width(18.2),
        borderRadius: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    renderTabBarNavStyle: {
        marginRight: 10,
        borderRadius: 18,
        width: width(32.2),
        padding: 5,
        // margin: 5,
    },
    renderTabBarTextStyle: {
        marginRight: 0,
        textAlign: 'center',
        margin: 5,
        fontSize: 14,
    },
  


    ////////////////////////////////
    wrap:{
        alignContent:'center',
        alignSelf:'center',
        alignItems:'center',
        marginTop:20
    },
    qrWrap:{
        alignContent:'center',
        alignSelf:'center',
        alignItems:'center',
        marginTop:20
    },
    qrTitle:{
        fontSize:20,
        color: 'white',
        marginTop:20
    },
    qrDesc:{
        fontSize:14,
        color: 'gray',
        marginTop:20
    }

})