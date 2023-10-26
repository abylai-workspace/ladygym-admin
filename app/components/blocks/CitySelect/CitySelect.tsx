import React, { useEffect, useState } from "react"
import { StyleSheet, View, Text, Image, Pressable, Platform } from "react-native"
import { useSelector } from "react-redux"
import { instance } from "utils/axios"

const CitySelect = ({selectedCity, setSelectedCity}: any) => {

    const [cities, setCities] = useState<any[]>([])

    const tokenStorage = useSelector((state:any) => state.auth.token);

    useEffect(() => {
        if (!tokenStorage) return
        instance.get('gym/manage/cities').then((resp) => {
            return resp.data.map((city) => 
            {
                setCities((prevValues) => [...prevValues, city.name])
            }
        )})
        
    }, [tokenStorage])

    useEffect(() => {console.log(cities)}, [cities])

    return <View style={styles.container0}>
            <Pressable >
            <View style={styles.container}>
                <View style={styles.container2}>
                    <Image source={require('../../../assests/images/location2.1.png')}/>
                    <Text style={{color: 'white', fontSize: 16}}>{selectedCity}</Text>
                </View>
                <View>
                    <Image source={require('../../../assests/images/downArrow.png')}/>
                </View>
            </View>
            </Pressable>
          
        </View>
}

export default CitySelect


const styles = StyleSheet.create({
    container0: {
        zIndex: 10,
        position:'absolute',
        left:20,
       marginTop: Platform.OS === 'ios' ? 45 : 20
    } ,
    container: {
        paddingLeft: 21,
        paddingRight: 21,
        height: 55,
        width: 271,
        backgroundColor: '#CF5490',
        borderRadius: 39,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 10,
        
        display: 'flex',
        justifyContent: 'space-between',
    },
    container2: {
        flexDirection: 'row',
        gap: 20,
        color: '#FFF'
    },
  
})
