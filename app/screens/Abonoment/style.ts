import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    flatlistContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.09)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft:20,
       
        marginRight:20,
        marginTop:10,
        padding:15,
        borderRadius:15,
        borderColor:'white',
        // borderWidth:0.1,
        
    },
    iconContainer:{
        backgroundColor:'rgba(255, 255, 255, 0.1)',
        padding:4,
        borderRadius:20
    },
    icontext:{
        color:'white',
        alignContent:'center',
        alignSelf:'center',
        left:15
    },
    clickContainer:{
        alignSelf:'center',
        alignContent:'center',
        alignItems:'center'
    }

})