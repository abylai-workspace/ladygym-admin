import { Alert, Animated, Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker ,PROVIDER_GOOGLE} from 'react-native-maps';
import { instance } from 'utils/axios';
import { storageReadItem } from 'utils/asyncStorage';
import { TOKEN_KEY } from 'constants/constants';
import StarRating from '../StarRating/StarRating';
import { WithLocalSvg } from 'react-native-svg';
import TwoGisButton from '../TwoGisButton';
import {styles} from './styles'
import LogoCard from '../../../assests/images/logo_slide_card.svg'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;


type MapMarketProps = {
  onPress: (id: number) => void
  setGymInfo: any
  selectedCity: any
}

const MapMarket = ({onPress, setGymInfo, selectedCity}: MapMarketProps) => {
  const [position, setPosition] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({ latitude: null, longitude: null });
  const [address, setAddress] =useState<{
    latitude: number | null;
    longitude: number | null;
  }>({ latitude: null, longitude: null });
  const [markerCoordinates, setMarkerCoordinates] = useState<any>(null);

  const _scrollView = useRef<any>(null);
  const tokenStorage = useSelector((state:any) => state.auth.token);
  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        // console.log(pos);
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
    
      },
      (error) => console.log('GetCurrentPosition Error', JSON.stringify(error)),
      { enableHighAccuracy: true }
    );
  };
  const getUserLocation=useCallback(async()=>{
    try {
      if (tokenStorage) {
        const response= await instance.get('/gym/manage/cities',{
          headers: {
            Authorization: `Bearer ${await storageReadItem(TOKEN_KEY)}`,
          },
          
        })
       setMarkerCoordinates(response.data[0])
        // console.log(response.data[0],'sd')
        await setAddress(response.data[0])
      }

    } catch (error) {
      console.error(error)
    }
   
   },[])
   useEffect(()=>{
     getUserLocation() 
     if (!tokenStorage && !selectedCity) return
    
     if (tokenStorage && selectedCity) {
       console.log(selectedCity)
       //renders list of the available gyms
       instance.get('/gym/manage/all', {
         headers: {
           Authorization: `Bearer ${tokenStorage}`
         }
       }).then((resp) => resp.data.map((city) => {
         if (city.name === selectedCity) {
           setAddress(resp.data[0].gyms)
         }
       })).catch((err) => console.log(err))
     }
     //  getUserLocation() 
      getCurrentPosition();
 
    
   },[tokenStorage, selectedCity])

// console.log(address,'selected')

  return (
    <View style={styles.container}>
      
      
        {position?.latitude !== null && position?.latitude !== null ? (
          <>
          <MapView
       
            style={{width:'100%',height:'100%'}}
           initialRegion={{
             latitude: 42.333309,
             longitude:69.586029,
             latitudeDelta: 42.333309,
             longitudeDelta: 69.586029
           }}
           zoomEnabled={true}
         showsUserLocation={false}
         showsMyLocationButton={false}
         showsCompass={true}
         scrollEnabled={true}
         followsUserLocation={true}
      
            provider={PROVIDER_GOOGLE}
          >
            {markerCoordinates && <Marker
            coordinate={{
              latitude: Platform.OS === 'ios' ? markerCoordinates?.latitude : parseFloat(markerCoordinates?.latitude),
              longitude: Platform.OS === 'ios' ? markerCoordinates?.longitude : parseFloat(markerCoordinates?.longitude)
            }}
            title={markerCoordinates?.name}
            description="Шымкент"
            />}

           {/* {address?.gyms?.map((marker, index) => {
            console.log(marker,'marker')
            return(
              <>
              <Marker
              key={index}
            coordinate={{
              latitude: parseFloat(marker?.latitude && null),
              longitude: parseFloat(marker?.longitude && null)
            }}
            title={marker?.id}
            description="Шымкент"
            />
              </>
            )
           })} */}
          </MapView>

          <Animated.ScrollView
        ref={_scrollView}
        horizontal
        
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}
       
      >
     
        {address?.gyms?.map((marker, index) =>(
        

         
          <View style={styles.card} key={index}>
             <TouchableOpacity onPress={()=>{
            onPress(marker?.id)
            setGymInfo(marker)
            }}>

           

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <WithLocalSvg asset={LogoCard}/>
            <StarRating ratings={marker.rating} reviews={marker.rating} />
            </View>
            </TouchableOpacity>
            <View style={styles.textContent}>
              <View >
                <View style={{
                  flexDirection: 'row',
                }}>
                  <Ionicons name="time-outline" size={20} color={'rgba(117, 54, 234, 1)'} />
                  <Text  style={styles.cardtitle}>10:00</Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                }}>
                  <Ionicons name="time-outline" size={20} color={'rgba(117, 54, 234, 1)'} />
                  <Text style={styles.cardDescription}>{marker?.address}</Text>
                </View>
             
              </View>
             <TwoGisButton/>
        
              
            </View>
        
          </View>
        
        ))}
         </Animated.ScrollView>

          
          </>
        ): <Text>Loading</Text>}
     
    </View>
  )
}

export default MapMarket

