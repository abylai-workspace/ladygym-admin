import { StyleSheet } from "react-native";

export const styles=StyleSheet.create({
   flatlistContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.09)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft:20,
        zIndex:999,
        marginRight:20,
        marginBottom:10,
        padding:10,
        borderRadius:15,
        borderColor:'white',
        // borderWidth:0.1,
        
    },
   
    iconContainer:{
        backgroundColor:'rgba(255, 255, 255, 0.1)',
        paddingHorizontal:8,
        paddingVertical:8,
        borderRadius:30,
        alignContent:'center',
        width:40,
        height:40,
        alignItems: 'center',
        alignSelf: 'center',
        
    },
    icontext:{
        color:'white',
        alignContent:'center',
        alignSelf:'center',
      
        left:15
    },
    price:{
        color:'white',
        fontSize:11,
        left:15
    },
    clickContainer:{
        alignSelf:'center',
        alignContent:'center',
        alignItems:'center',
        marginTop:5
    },
    textContainer:{
        alignSelf:'center',
    },
    discountContainer:{
        backgroundColor:'rgba(207, 84, 144, 1)',
        paddingHorizontal:10,
        paddingVertical:3,
        borderRadius:30,
        alignContent:'center',
      
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft:24
    }
})