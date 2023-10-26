import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");
export const styles=StyleSheet.create({
    renderTabBarStyle: {
        flexDirection: 'row',
        marginTop: 10,
        margin: 10,
        borderRadius: 18,
        backgroundColor: '#2D44D5',
        zIndex: 2
      },
      renderTabBarNavStyle: {
        marginRight: 0,
        borderRadius: 18,
        width: width / 2.21,
        padding: 5,
        margin: 5,
      },
      renderTabBarTextStyle: {
        marginRight: 0,
        textAlign: 'center',
        margin: 5,
        fontSize: 14,
        fontFamily: 'Manrope'
      },
    
    
})