import { StyleSheet } from "react-native";

export const styles=StyleSheet.create({
    container:{        
        margin:10,
       top:-20,
        padding:10,
       
    },
    flexContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
       
    },
    title:{
        fontSize:25,
        fontWeight:'bold',
        color:'#fff',
    },
    centerTitle:{
        fontSize:16,
        fontWeight:'500',
        color:'#fff',
        textAlign:'center',
        alignContent:'center',
        alignSelf:'center',
        // marginRight:100
    }
})